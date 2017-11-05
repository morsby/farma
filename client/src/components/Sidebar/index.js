import React, { Component } from 'react';
import { connect } from 'react-redux';

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
	render() {
		return (
			<Sidebar>
				<Header>X</Header>
				<Menu drugs={this.props.drugs} />
			</Sidebar>
		);
	}
}

function mapStateToProps({ drugs }) {
	return { drugs };
}

export default connect(mapStateToProps)(Navigation);
