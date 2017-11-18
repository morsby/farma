import React, { Component } from 'react';
import _ from 'lodash';
import { connect } from 'react-redux';
import * as actions from '../../actions';

import Menu from 'grommet/components/Menu';
import List from 'grommet/components/List';
import ListItem from 'grommet/components/ListItem';
import CheckmarkIcon from 'grommet/components/icons/base/Checkmark';

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
			let style = { whiteSpace: 'pre-line' };
			style = drug.important
				? { ...style, fontWeight: 'bold' }
				: { ...style };
			style = drug.hasInfo
				? { ...style }
				: { ...style, color: 'rgb(122, 122, 122)' };

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
							float: 'right'
						}}
					>
						<CheckmarkIcon />
					</span>
				);
			}

			return (
				<ListItem
					justify="between"
					key={drug.name}
					style={style}
					onClick={onClick}
				>
					{drug.name}

					{selected}
				</ListItem>
			);
		});
	}

	render() {
		return (
			<Menu responsive={false}>
				<List style={{ overflow: 'hidden' }}>
					{this.generateListItems()}
				</List>
			</Menu>
		);
	}
}

export default connect(null, actions)(DrugList);
