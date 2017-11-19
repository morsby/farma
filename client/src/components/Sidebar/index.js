import React, { Component } from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';

import { Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';
import { IoIosCloseOutline } from 'react-icons/lib/io';
import Menu from './Menu';

import * as actions from '../../actions';

class Navigation extends Component {
	constructor(props) {
		super(props);

		this.state = {
			searchVal: '',
			searchTerm: '',
			filterVisible: false
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
			let checked = chapter.visible ? true : false;
			return (
				<FormGroup
					check
					inline
					style={{ minWidth: '40px', marginLeft: '10px' }}
					key={chapter.chapter}
				>
					<Label check>
						<Input
							type="checkbox"
							checked={checked}
							onChange={() =>
								this.onToggleChapter(chapter.chapter)
							}
						/>
						{chapter.chapter}
					</Label>
				</FormGroup>
			);
		});
	}

	render() {
		let chapterFilter = '';

		if (this.state.filterVisible === true) {
			chapterFilter = (
				<div>
					<Form>{this.renderChapters()}</Form>

					<Button
						outline
						color="success"
						onClick={() => this.onToggleChapter('all')}
					>
						Vælg alle
					</Button>
					<Button
						outline
						color="danger"
						onClick={() => this.onToggleChapter('none')}
						className="ml-1"
					>
						Fravælg alle
					</Button>
				</div>
			);
		}
		return (
			<div>
				<h2>Stofliste</h2>

				<Form inline>
					<Label for="filter" className="sr-only">
						Filtrer stoffer
					</Label>
					<div className="input-group">
						<Input
							name="filter"
							id="filter"
							placeholder="Filtrer"
							type="text"
							value={this.state.searchVal}
							onChange={this.onSearch}
							autoComplete="off"
							autoCorrect="off"
							autoCapitalize="off"
							spellCheck="false"
						/>
						<div className="input-group-addon">
							<IoIosCloseOutline
								size={30}
								onClick={this.onClear}
							/>
						</div>
					</div>
				</Form>
				<h4 onClick={this.onChapterFilterClick}>
					Filtrer efter stoffer
				</h4>
				{chapterFilter}
				<Menu
					drugs={this.props.drugs}
					searchVal={this.state.searchTerm}
					chapters={this.props.chapters}
				/>
			</div>
		);
	}
}

function mapStateToProps({ drugs, nav }) {
	return { drugs: drugs.drugs, chapters: drugs.chapters, nav };
}

export default connect(mapStateToProps, actions)(Navigation);
