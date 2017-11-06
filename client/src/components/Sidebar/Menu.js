import React, { Component } from 'react';
import _ from 'lodash';
import { connect } from 'react-redux';
import * as actions from '../../actions';

import Menu from 'grommet/components/Menu';
import List from 'grommet/components/List';
import ListItem from 'grommet/components/ListItem';

class DrugList extends Component {
	constructor(props) {
		super(props);

		this.onClick = this.onClick.bind(this);
	}

	onClick(id) {
		// toggleDrug
		this.props.toggleDrug(id);
	}

	generateListItems() {
		return _.map(this.props.drugs, drug => {
			let style = { whiteSpace: 'pre-line' };
			style = drug.important
				? { ...style, fontWeight: 'bold' }
				: { ...style };

			let onClick;
			if (drug.content) {
				onClick = () => this.onClick(drug._id);
			}
			return (
				<ListItem
					justify="between"
					key={drug.name}
					style={style}
					wrap={true}
					onClick={onClick}
				>
					{drug.name}
				</ListItem>
			);
		});
	}

	render() {
		return (
			<Menu responsive={false}>
				<List>{this.generateListItems()}</List>
			</Menu>
		);
	}
}

export default connect(null, actions)(DrugList);
