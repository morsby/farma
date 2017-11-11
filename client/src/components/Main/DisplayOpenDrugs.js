import React, { Component } from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';

import * as actions from '../../actions';

import Box from 'grommet/components/Box';
import Select from 'grommet/components/Select';

class DisplayOpenDrugs extends Component {
	constructor() {
		super();
		this.onClick = this.onClick.bind(this);
		this.renderOpen = this.renderOpen.bind(this);
		this.state = { openDrugs: [] };
	}

	onClick(id) {
		this.props.scrollToDrug(id);
	}

	renderOpen() {
		let renderList = [];
		let selectOptions = [];

		_.map(this.props.drugs, drug => {
			if (drug.visible) {
				renderList.push(
					<a onClick={() => this.onClick(drug._id)} key={drug._id}>
						{drug.name}
					</a>
				);
				selectOptions.push({ label: drug.name, value: drug._id });
			} else {
				return null;
			}
		});

		return {
			renderList,
			selectOptions
		};
	}

	render() {
		if (this.props.nav.responsive === 'multiple') {
			return (
				<Box size="small">
					<h6>Åbne stoffer</h6>
					{this.renderOpen().renderList}
				</Box>
			);
		} else {
			return (
				<div
					style={{
						position: 'fixed',
						top: '5px',
						right: '15px',
						background: '#fff'
					}}
				>
					<Select
						placeHolder="Åbne stoffer"
						options={this.renderOpen().selectOptions}
						onChange={selected => {
							this.onClick(selected.option.value);
						}}
					/>
				</div>
			);
		}
	}
}

function mapStateToProps({ nav }) {
	return { nav };
}

export default connect(mapStateToProps, actions)(DisplayOpenDrugs);
