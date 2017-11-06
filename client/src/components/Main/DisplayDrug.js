import React, { Component } from 'react';
import { connect } from 'react-redux';
import marked from 'marked';

import Box from 'grommet/components/Box';
import CaretDownIcon from 'grommet/components/icons/base/CaretDown';
import CaretUpIcon from 'grommet/components/icons/base/CaretUp';
import CloseIcon from 'grommet/components/icons/base/Close';

import * as actions from '../../actions';

class DisplayDrug extends Component {
	constructor() {
		super();

		this.state = { expanded: true };

		this.onToggleClick = this.onToggleClick.bind(this);
		this.onCloseClick = this.onCloseClick.bind(this);
	}

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
		this.el.scrollIntoView({ behaviour: 'smooth' });
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
			<Box pad="medium" margin="small">
				<h1
					style={style}
					ref={el => {
						this.el = el;
					}}
				>
					{drug.name}
				</h1>
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
