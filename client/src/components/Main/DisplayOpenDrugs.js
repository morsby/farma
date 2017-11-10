import React, { Component } from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';

import * as actions from '../../actions';

import Box from 'grommet/components/Box';
//TODO: React-redux-scroll
class DisplayOpenDrugs extends Component {
	constructor() {
		super();
		this.onClick = this.onClick.bind(this);
		this.renderOpen = this.renderOpen.bind(this);
	}

	onClick(id) {
		this.props.scrollToDrug(id);
	}

	renderOpen() {
		return _.map(this.props.drugs, drug => {
			if (drug.visible) {
				return (
					<a onClick={() => this.onClick(drug._id)} key={drug._id}>
						{drug.name}
					</a>
				);
			}
		});
	}

	render() {
		return (
			<Box size="small">
				<h6>Åbne stoffer</h6>
				{this.renderOpen()}
			</Box>
		);
	}
}

export default connect(null, actions)(DisplayOpenDrugs);
