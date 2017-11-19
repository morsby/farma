import React, { Component } from 'react';
import _ from 'lodash';
import { connect } from 'react-redux';
import * as actions from '../../actions';

import { Nav, NavItem, NavLink } from 'reactstrap';

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

			// Tjek om navnet er filtreret og indgår i valgte i kapitler
			if (
				!drug.name
					.toLowerCase()
					.includes(this.props.searchVal.toLowerCase()) ||
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
					<span
						style={{
							position: 'absolute',
							right: '10px',
							float: 'right',
							zIndex: '2'
						}}
					>
						√
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
