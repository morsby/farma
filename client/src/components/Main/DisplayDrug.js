import React, { Component } from 'react';
import { connect } from 'react-redux';

import { scrollToWhen } from 'react-redux-scroll';

import marked from 'marked';

import Box from 'grommet/components/Box';
import CaretDownIcon from 'grommet/components/icons/base/CaretDown';
import CaretUpIcon from 'grommet/components/icons/base/CaretUp';
import CloseIcon from 'grommet/components/icons/base/Close';

import * as actions from '../../actions';
import * as actionTypes from '../../actions/types';

// TODO: Valider Markdown for at sikre ensartet udseende

class DisplayDrug extends Component {
	constructor() {
		super();

		this.state = { expanded: true };
		this.isDrugClicked = this.isDrugClicked.bind(this);
		this.onToggleClick = this.onToggleClick.bind(this);
		this.onCloseClick = this.onCloseClick.bind(this);

		this.ScrollableHeader = scrollToWhen(this.isDrugClicked, null, null, [
			'id'
		])('h1');
	}
	isDrugClicked = (action, props) => {
		const res =
			action.type === actionTypes.SCROLL_TO_DRUG &&
			props.id === action.drugId;

		return res;
	};
	createMarkup(md) {
		return { __html: marked(md) };
	}

	onToggleClick() {
		this.setState({ expanded: !this.state.expanded });
	}

	onCloseClick() {
		this.props.toggleDrug(this.props.drug._id);
	}

	componentDidMount() {
		//	this.el.scrollIntoView({ behaviour: 'smooth' });
	}

	render() {
		let drug = this.props.drug;

		let style = {};
		if (drug.important) {
			style.fontWeight = 'bold';
		}

		let content = null;
		if (this.state.expanded) {
			content = (
				<div
					dangerouslySetInnerHTML={this.createMarkup(drug.content)}
					className="drug-content"
				/>
			);
		}

		let icon = this.state.expanded ? <CaretUpIcon /> : <CaretDownIcon />;

		return (
			<Box pad="medium" margin="small" style={{ display: 'block' }}>
				<this.ScrollableHeader
					style={style}
					ref={el => {
						this.el = el;
					}}
					id={drug._id}
				>
					{drug.name}
				</this.ScrollableHeader>
				{content}
				<div>
					<span onClick={this.onToggleClick}>{icon}</span>
					<CloseIcon onClick={this.onCloseClick} />
				</div>
			</Box>
		);
	}
}

export default connect(null, actions)(DisplayDrug);
