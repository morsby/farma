import React, { Component } from 'react';
import _ from 'lodash';
import { connect } from 'react-redux';

import { Collapse, Navbar, NavbarBrand } from 'reactstrap';

import { IoIosListOutline, IoIosArrowDown } from 'react-icons/lib/io';

import DisplayDrug from './DisplayDrug';
import DisplayOpenDrugs from './DisplayOpenDrugs';

import * as actions from '../../actions';

class DrugContainer extends Component {
	constructor() {
		super();
		this.state = { isOpen: false };
		this.toggleSidebar = this.toggleSidebar.bind(this);
		this.toggleCollapsible = this.toggleCollapsible.bind(this);
	}
	toggleSidebar() {
		this.props.navVisible();
	}

	toggleCollapsible() {
		this.setState({ isOpen: !this.state.isOpen });
	}

	renderDrug = drug => {
		if (drug.visible) {
			return <DisplayDrug drug={drug} key={drug._id} />;
		} else {
			return null;
		}
	};

	render() {
		let mobileHeader;
		if (this.props.nav.responsive === 'mobile') {
			mobileHeader = (
				<Navbar color="faded" dark>
					<NavbarBrand onClick={this.toggleSidebar}>
						<IoIosArrowDown size={30} />Stofliste
					</NavbarBrand>
					<IoIosListOutline
						size={30}
						onClick={this.toggleCollapsible}
					/>
					<Collapse isOpen={this.state.isOpen} navbar>
						<DisplayOpenDrugs
							toggleCollapsible={this.toggleCollapsible}
						/>
					</Collapse>
				</Navbar>
			);
		}

		return (
			<div>
				{mobileHeader}
				<div>
					{_.map(this.props.drugs, drug => this.renderDrug(drug))}
				</div>
			</div>
		);
	}
}

function mapStateToProps({ drugs, nav }) {
	return { drugs: drugs.drugs, chapters: drugs.chapters, nav };
}

export default connect(mapStateToProps, actions)(DrugContainer);
