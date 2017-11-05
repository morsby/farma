import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions';

import GrommetApp from 'grommet/components/App';
import Split from 'grommet/components/Split';

import 'grommet/grommet.min.css';

import Sidebar from './Sidebar';
import Main from './Main';

class App extends Component {
	constructor(props) {
		super(props);

		this.onResponsive = this.onResponsive.bind(this);
	}

	componentDidMount() {
		this.props.fetchDrugs();
	}

	onResponsive(responsive) {
		this.props.navResponsive(responsive);
	}

	render() {
		/*	let nav = '';
		if (
			this.props.nav.visible ||
			this.props.nav.responsive === 'multiple'
		) {
			nav = <Sidebar />;
		} */

		let priority = 'right';
		if (this.props.nav.visible && this.props.nav.responsive === 'single') {
			priority = 'left';
		}

		return (
			<GrommetApp centered={false}>
				<Split
					flex="right"
					priority={priority}
					onResponsive={this.onResponsive}
				>
					<Sidebar />
					<Main />
				</Split>
			</GrommetApp>
		);
	}
}

function mapStateToProps({ nav }) {
	return { nav };
}

export default connect(mapStateToProps, actions)(App);
