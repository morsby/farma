import React, { Component } from 'react';
import { connect } from 'react-redux';

import Split from 'grommet/components/Split';
import Header from 'grommet/components/Header';
import Title from 'grommet/components/Title';
import Box from 'grommet/components/Box';
import Paragraph from 'grommet/components/Paragraph';

import DrugContainer from './DrugContainer';

import DisplayOpenDrugs from './DisplayOpenDrugs';

import * as actions from '../../actions';

class Main extends Component {
	constructor(props) {
		super(props);

		this.onClick = this.onClick.bind(this);
		//this.renderDrug = this.renderDrug.bind(this);
	}

	onClick() {
		this.props.navVisible(this.props.nav.visible);
	}

	render() {
		return (
			<Split flex="left">
				<DrugContainer drugs={this.props.drugs} />

				<DisplayOpenDrugs drugs={this.props.drugs} />
			</Split>
		);
	}
}

function mapStateToProps({ drugs, nav }) {
	return { drugs, nav };
}

export default connect(mapStateToProps, actions)(Main);
