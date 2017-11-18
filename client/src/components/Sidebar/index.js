import React, { Component } from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';

import Sidebar from 'grommet/components/Sidebar';
import Box from 'grommet/components/Box';
import Header from 'grommet/components/Header';
import Title from 'grommet/components/Title';
import Accordion from 'grommet/components/Accordion';
import AccordionPanel from 'grommet/components/AccordionPanel';
import Form from 'grommet/components/Form';
import FormFields from 'grommet/components/FormFields';
import CheckBox from 'grommet/components/CheckBox';

import Button from 'grommet/components/Button';
import CloseIcon from 'grommet/components/icons/base/Close';
import ClearIcon from 'grommet/components/icons/base/Clear';
import MoreIcon from 'grommet/components/icons/base/More';

import Menu from './Menu';

import * as actions from '../../actions';

class Navigation extends Component {
	constructor(props) {
		super(props);

		this.state = {
			searchVal: '',
			searchTerm: '',
			filterVisible: false,
			selectedChapters: []
		};
		this.onDrugClick = this.onDrugClick.bind(this);
		this.onChapterFilterClick = this.onChapterFilterClick.bind(this);
		this.onSearch = this.onSearch.bind(this);
		this.setSearchTerm = _.debounce(this.setSearchTerm.bind(this), 150);
		this.onClear = this.onClear.bind(this);
	}

	onDrugClick() {
		if (this.props.nav.responsive === 'single')
			this.props.navVisible(this.props.nav.visible);
	}

	onChapterFilterClick() {
		this.setState({ filterVisible: !this.state.filterVisible });
	}

	onToggleChapter(chapter) {
		this.props.toggleChapter(chapter);
	}

	onSearch(event) {
		let val = event.target.value.replace(' ', '');

		this.setState({ searchVal: val });
		this.setSearchTerm(val);
	}

	setSearchTerm(term) {
		this.setState({ searchTerm: term });
	}

	onClear() {
		this.setSearchTerm.cancel();
		this.setState({ searchVal: '', searchTerm: '' });
	}

	renderChapters() {
		return _.map(this.props.chapters, chapter => {
			return (
				<CheckBox
					label={chapter.chapter}
					key={chapter.chapter}
					checked={chapter.visible}
					toggle={true}
					onClick={() => this.onToggleChapter(chapter.chapter)}
				/>
			);
		});
	}

	render() {
		let onDrugClick = this.onDrugClick;
		let flex = true;
		let mobileHeader = (
			<Box>
				<Title responsive={false} truncate={false}>
					<Button icon={<CloseIcon />} onClick={onDrugClick} />{' '}
					Stofliste
				</Title>
			</Box>
		);
		let padding = '72px';

		if (this.props.nav.responsive === 'multiple') {
			flex = null;
			onDrugClick = null;
			mobileHeader = <Title truncate={false}>Stofliste</Title>;
			padding = '100px';
		}

		let chapterFilter = '';

		if (this.state.filterVisible === true) {
			chapterFilter = (
				<Form>
					<FormFields>{this.renderChapters()}</FormFields>
				</Form>
			);
		}
		return (
			<Sidebar
				colorIndex="light-2"
				size="small"
				style={{ paddingTop: padding }}
			>
				<Header
					style={{
						position: 'fixed',
						top: 0,
						background: '#fff !important'
					}}
					direction="row"
					wrap={true}
					fixed={true}
				>
					{mobileHeader}
					<Box
						align="center"
						flex={flex}
						justify="end"
						direction="row"
						responsive={false}
						full="horizontal"
					>
						<input
							placeholder="Filtrer"
							type="text"
							value={this.state.searchVal}
							onChange={this.onSearch}
							style={{ width: '90%' }}
							autoComplete="off"
							autoCorrect="off"
							autoCapitalize="off"
							spellCheck="false"
						/>
						<Button icon={<ClearIcon />} onClick={this.onClear} />
					</Box>
					<Box size="small">
						<h6 onClick={this.onChapterFilterClick}>
							Filtrer efter kapitel
						</h6>
						{chapterFilter}
					</Box>
				</Header>
				<Menu
					drugs={this.props.drugs}
					searchVal={this.state.searchTerm}
					chapters={this.props.chapters}
				/>
			</Sidebar>
		);
	}
}

function mapStateToProps({ drugs, nav }) {
	return { drugs: drugs.drugs, chapters: drugs.chapters, nav };
}

export default connect(mapStateToProps, actions)(Navigation);
