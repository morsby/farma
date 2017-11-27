import React, { Component } from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';

import { ButtonGroup, Button, Form, FormGroup, Label, Input } from 'reactstrap';
import { IoIosCloseOutline, IoIosArrowUp } from 'react-icons/lib/io';
import Menu from './Menu';

import * as actions from '../../actions';

// TODO: ved state.search === true; filtrer så kun de rigtige kommer frem
class Navigation extends Component {
	constructor(props) {
		super(props);

		this.state = {
			searchVal: '',
			searchTerm: '',
			filterVisible: false,
			search: false
		};
		this.toggleSidebar = this.toggleSidebar.bind(this);
		this.onDrugClick = this.onDrugClick.bind(this);
		this.onChapterFilterClick = this.onChapterFilterClick.bind(this);
		this.onSearch = this.onSearch.bind(this);
		this.toggleSearch = this.toggleSearch.bind(this);
		this.setSearchTerm = _.debounce(this.setSearchTerm.bind(this), 150);
		this.onClear = this.onClear.bind(this);
	}

	toggleSidebar() {
		this.props.navVisible();
	}

	onDrugClick() {
		if (this.props.nav.responsive === 'mobile') this.props.navVisible();
	}

	onChapterFilterClick() {
		this.setState({ filterVisible: !this.state.filterVisible });
	}

	onToggleChapter(chapter) {
		this.props.toggleChapter(chapter);
	}

	onSearch(event) {
		let val = event.target.value;
		if (!this.state.search) {
			val = val.replace(' ', '');
		}
		this.setState({ searchVal: val });
		this.setSearchTerm(val);
	}

	toggleSearch(search) {
		if (search === 'name') {
			this.setState({ search: false });
		} else {
			this.setState({ search: true });
		}
		this.setSearchTerm(this.state.searchVal);
	}

	setSearchTerm(term) {
		if (this.state.search) {
			this.props.searchDrugs(term);
		}
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
				<div className="py-3 chapter-filter">
					<Form>{this.renderChapters()}</Form>
					<ButtonGroup>
						<Button
							color="warning"
							onClick={() => this.onToggleChapter('all')}
						>
							Vælg alle
						</Button>
						<Button
							color="warning"
							onClick={() => this.onToggleChapter('none')}
						>
							Fravælg alle
						</Button>
					</ButtonGroup>
				</div>
			);
		}
		let icon =
			this.props.nav.responsive === 'mobile' ? (
				<IoIosArrowUp size={30} />
			) : null;

		let drugs = this.props.drugs;
		return (
			<div>
				<div className="filtering">
					<h2 onClick={this.toggleSidebar}>{icon}Stofliste</h2>

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
						<ButtonGroup>
							<Button onClick={() => this.toggleSearch('name')}>
								Navn
							</Button>
							<Button onClick={() => this.toggleSearch('text')}>
								Tekst
							</Button>
						</ButtonGroup>
					</Form>
					<h4 onClick={this.onChapterFilterClick}>
						<Button
							color="warning"
							className="mt-3"
							style={{ width: '100%' }}
						>
							Filtrer efter kapitel
						</Button>
					</h4>
					{chapterFilter}
				</div>
				<Menu
					drugs={drugs}
					searchVal={this.state.searchTerm}
					chapters={this.props.chapters}
					search={this.state.search}
					searchResults={this.props.search}
				/>
			</div>
		);
	}
}

function mapStateToProps({ drugs, nav, search }) {
	return { drugs: drugs.drugs, chapters: drugs.chapters, nav, search };
}

export default connect(mapStateToProps, actions)(Navigation);
