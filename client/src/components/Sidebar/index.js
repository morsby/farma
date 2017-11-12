import React, { Component } from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';

import Sidebar from 'grommet/components/Sidebar';
import Box from 'grommet/components/Box';
import Header from 'grommet/components/Header';
import Title from 'grommet/components/Title';
import Search from 'grommet/components/Search';
import Button from 'grommet/components/Button';
import CloseIcon from 'grommet/components/icons/base/Close';
import ClearIcon from 'grommet/components/icons/base/Clear';
import MoreIcon from 'grommet/components/icons/base/More';

import Menu from './Menu';

import * as actions from '../../actions';

class Navigation extends Component {
	constructor(props) {
		super(props);

		this.state = { searchVal: '', searchTerm: '' };
		this.onClick = this.onClick.bind(this);
		this.onSearch = this.onSearch.bind(this);
		this.setSearchTerm = _.debounce(this.setSearchTerm.bind(this), 150);
		this.onClear = this.onClear.bind(this);
	}

	onClick() {
		if (this.props.nav.responsive === 'single')
			this.props.navVisible(this.props.nav.visible);
	}

	onSearch(event) {
		let val = event.target.value.replace(' ', '');

		this.setState({ searchVal: val });
		this.setSearchTerm(val);
	}

	setSearchTerm(term) {
		this.setState({ searchTerm: term });
	}

	onClear() {
		this.setState({ searchVal: '', searchTerm: '' });
	}

	render() {
		let onClick = this.onClick;
		let flex = true;
		let mobileHeader = (
			<Box>
				<Title responsive={false} truncate={false}>
					<Button icon={<CloseIcon />} onClick={onClick} /> Stofliste
				</Title>
			</Box>
		);
		let padding = '72px';

		if (this.props.nav.responsive === 'multiple') {
			flex = null;
			onClick = null;
			mobileHeader = <Title truncate={false}>Stofliste</Title>;
			padding = '100px';
		}
		return (
			<Sidebar
				colorIndex="light-2"
				size="small"
				style={{ paddingTop: padding }}
			>
				<Header
					style={{
						position: 'fixed',
						top: 0,
						background: '#fff !important'
					}}
					direction="row"
					wrap={true}
					fixed={true}
				>
					{mobileHeader}
					<Box
						align="center"
						size="small"
						flex={flex}
						justify="end"
						direction="row"
						responsive={false}
						margin={{
							left: 'small',
							right: 'medium',
							vertical: 'small'
						}}
					>
						<Search
							placeHolder="Søg"
							inline={true}
							responsive={false}
							value={this.state.searchVal}
							onDOMChange={this.onSearch}
						/>
						<Button icon={<ClearIcon />} onClick={this.onClear} />
					</Box>
				</Header>
				<Menu
					drugs={this.props.drugs}
					searchVal={this.state.searchTerm}
				/>
			</Sidebar>
		);
	}
}

function mapStateToProps({ drugs, nav }) {
	return { drugs, nav };
}

export default connect(mapStateToProps, actions)(Navigation);
