import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions';

import GrommetApp from 'grommet/components/App';
import Split from 'grommet/components/Split';
import Box from 'grommet/components/Box';
import Spinner from 'react-spinkit';

import 'grommet/grommet.min.css';
import '../style.css';

import Sidebar from './Sidebar';
import Main from './Main';

class App extends Component {
	constructor(props) {
		super(props);

		this.onResponsive = this.onResponsive.bind(this);
		this.displayApp = this.displayApp.bind(this);
	}

	componentDidMount() {
		this.props.fetchDrugs();
	}

	onResponsive(responsive) {
		this.props.navResponsive(responsive);
	}

	displayApp() {
		if (Object.keys(this.props.drugs).length === 0) {
			return (
				<Box align="center" full="vertical" justify="center">
					<Spinner name="ball-pulse-sync" fadeIn="none" />
				</Box>
			);
		} else {
			let priority = 'right';
			if (
				this.props.nav.visible &&
				this.props.nav.responsive === 'single'
			) {
				priority = 'left';
			}

			return (
				<Split
					flex="right"
					priority={priority}
					onResponsive={this.onResponsive}
				>
					<Sidebar />
					<Main />
				</Split>
			);
		}
	}

	render() {
		return <GrommetApp centered={false}>{this.displayApp()}</GrommetApp>;
	}
}

function mapStateToProps({ drugs, nav }) {
	return { drugs: drugs.drugs, chapters: drugs.chapters, nav };
}

export default connect(mapStateToProps, actions)(App);
