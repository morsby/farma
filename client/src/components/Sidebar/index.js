import React, { Component } from 'react';
import { connect } from 'react-redux';

import Sidebar from 'grommet/components/Sidebar';
import Box from 'grommet/components/Box';
import Header from 'grommet/components/Header';
import Title from 'grommet/components/Title';
import Search from 'grommet/components/Search';
import CloseIcon from 'grommet/components/icons/base/Close';

import Menu from './Menu';

import * as actions from '../../actions';

class Navigation extends Component {
	constructor(props) {
		super(props);

		this.state = { searchVal: '' };
		this.onClick = this.onClick.bind(this);
		this.onSearch = this.onSearch.bind(this);
	}

	onClick() {
		if (this.props.nav.responsive === 'single')
			this.props.navVisible(this.props.nav.visible);
	}

	onSearch(event) {
		this.setState({ searchVal: event.target.value });
	}

	render() {
		let mobileHeader = <Title truncate={false}>Stofliste</Title>;
		let onClick = null;
		if (this.props.nav.responsive === 'single') {
			onClick = this.onClick;
			mobileHeader = (
				<Box>
					<Title
						responsive={false}
						onClick={onClick}
						truncate={false}
					>
						<CloseIcon /> Stofliste
					</Title>
				</Box>
			);
		}
		return (
			<Sidebar colorIndex="light-2" size="small">
				<Header
					fixed={true}
					style={{
						position: 'fixed',
						top: 0,
						backgroundColor: '#fff'
					}}
					direction="row"
					wrap={true}
				>
					{mobileHeader}
					<Box
						flex={false}
						justify="end"
						direction="row"
						responsive={false}
					>
						<Search
							placeHolder="Søg"
							inline={true}
							responsive={false}
							value={this.state.searchVal}
							onDOMChange={this.onSearch}
						/>
					</Box>
				</Header>
				<Menu
					drugs={this.props.drugs}
					searchVal={this.state.searchVal}
				/>
			</Sidebar>
		);
	}
}

function mapStateToProps({ drugs, nav }) {
	return { drugs, nav };
}

export default connect(mapStateToProps, actions)(Navigation);
