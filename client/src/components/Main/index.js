import React, { Component } from 'react';
import { connect } from 'react-redux';

import Split from 'grommet/components/Split';

import DrugContainer from './DrugContainer';
import DrugContainerScrollable from './DrugContainerScrollable';

import DisplayOpenDrugs from './DisplayOpenDrugs';

import * as actions from '../../actions';

class Main extends Component {
	constructor(props) {
		super(props);

		this.onClick = this.onClick.bind(this);
	}

	onClick() {
		this.props.navVisible(this.props.nav.visible);
	}

	render() {
		let openDrugs = '';
		let displayDrugContainer = <DrugContainer />;
		if (this.props.nav.responsive === 'multiple') {
			openDrugs = <DisplayOpenDrugs drugs={this.props.drugs} />;
			displayDrugContainer = <DrugContainerScrollable />;
		}

		return (
			<Split flex="left" priority="left">
				{displayDrugContainer}

				{openDrugs}
			</Split>
		);
	}
}

function mapStateToProps({ drugs, nav }) {
	return { drugs: drugs.drugs, chapters: drugs.chapters, nav };
}

export default connect(mapStateToProps, actions)(Main);
