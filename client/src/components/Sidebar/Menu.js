import React, { Component } from 'react';
import _ from 'lodash';
import { connect } from 'react-redux';
import * as actions from '../../actions';

import { Nav, NavItem, NavLink } from 'reactstrap';
import { IoIosCheckmarkOutline } from 'react-icons/lib/io';

class DrugList extends Component {
	constructor(props) {
		super(props);

		this.onClick = this.onClick.bind(this);
	}

	onClick(id) {
		// toggleDrug
		this.props.toggleDrug(id);
		this.props.navLastOpenedDrug(id);
	}

	generateListItems() {
		return _.map(this.props.drugs, drug => {
			// Tjek om kapitlet er sat til skjult
			let isChapterSelected = () => {
				return _.map(drug.chapters, chapter => {
					if (!chapter) {
						chapter = 'Intet kapitel';
					}
					return this.props.chapters[chapter].visible;
				});
			};

			if (
				this.props.search &&
				!this.props.searchResults.includes(drug._id)
			) {
				return null;
			} else if (
				// Tjek om navnet er filtreret og indgår i valgte i kapitler
				(!this.props.search &&
					!drug.name
						.toLowerCase()
						.includes(this.props.searchVal.toLowerCase())) ||
				!isChapterSelected().includes(true)
			) {
				return null;
			}

			const important = drug.important ? 'important' : '';
			const hasInfo = drug.hasInfo ? '' : 'no-info';
			const classes = `${important} ${hasInfo}`;

			let onClick;
			if (drug.hasInfo) {
				onClick = () => this.onClick(drug._id);
			}

			let selected;
			if (drug.visible) {
				selected = (
					<span className="drug-is-open">
						<IoIosCheckmarkOutline size={24} />
					</span>
				);
			}

			return (
				<NavItem
					justify="between"
					key={drug.name}
					className={classes}
					onClick={onClick}
				>
					<NavLink>
						{drug.name}

						{selected}
					</NavLink>
				</NavItem>
			);
		});
	}

	render() {
		return (
			<Nav vertical className="mt-3">
				{this.generateListItems()}
			</Nav>
		);
	}
}

export default connect(null, actions)(DrugList);
