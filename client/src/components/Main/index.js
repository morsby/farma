import React, { Component } from 'react';
import { connect } from 'react-redux';

import * as actions from '../../actions';

import Header from 'grommet/components/Header';
import Title from 'grommet/components/Title';
import Box from 'grommet/components/Box';

class Main extends Component {
	constructor(props) {
		super(props);

		this.onClick = this.onClick.bind(this);
	}

	onClick() {
		this.props.navVisible(this.props.nav.visible);
	}

	render() {
		return (
			<div>
				<Header onClick={this.onClick}>
					<Title responsive={false}>Farma.morsby.dk</Title>
				</Header>
				<Box
					colorIndex="neutral-2"
					justify="center"
					align="center"
					pad="medium"
				>
					Right Side
				</Box>
			</div>
		);
	}
}

function mapStateToProps({ drugs, nav }) {
	return { drugs, nav };
}

export default connect(mapStateToProps, actions)(Main);
