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

		this.state = { nav: true };

		this.onClick = this.onClick.bind(this);
	}

	componentDidMount() {
		this.props.fetchDrugs();
	}

	onClick() {
		let curr = this.state.nav;
		console.log(curr);
		this.setState({ nav: !curr });
	}

	render() {
		let nav = '';
		if (this.state.nav) {
			nav = <Sidebar />;
		}
		const priority = this.state.nav ? 'left' : 'right';

		return (
			<GrommetApp centered={false}>
				<Split flex="right" priority={priority}>
					{nav}
					<Main />
				</Split>
			</GrommetApp>
		);
	}
}
export default connect(null, actions)(App);
