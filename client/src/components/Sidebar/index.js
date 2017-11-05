import React, { Component } from 'react';
import { connect } from 'react-redux';

import * as actions from '../../actions';

import Sidebar from 'grommet/components/Sidebar';
import Header from 'grommet/components/Header';
import Menu from './Menu.js';
/*
import Animate from 'grommet/components/Animate';
<Animate
	enter={{ animation: 'slide-right', duration: 250, delay: 0 }}
	leave={{ animation: 'slide-right', duration: 250, delay: 0 }}
	keep={false}
>
	....
</Animate>
 */

class Navigation extends Component {
	constructor(props) {
		super(props);

		this.onClick = this.onClick.bind(this);
	}

	onClick() {
		this.props.navVisible(this.props.nav.visible);
	}

	render() {
		return (
			<Sidebar>
				<Header
					onClick={this.onClick}
					fixed={true}
					float={false}
					style={{ position: 'fixed', top: 0 }}
				>
					X
				</Header>
				<Menu drugs={this.props.drugs} />
			</Sidebar>
		);
	}
}

function mapStateToProps({ drugs, nav }) {
	return { drugs, nav };
}

export default connect(mapStateToProps, actions)(Navigation);
