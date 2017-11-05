import React, { Component } from 'react';
import _ from 'lodash';

import Menu from 'grommet/components/Menu';
import List from 'grommet/components/List';
import ListItem from 'grommet/components/ListItem';

class DrugList extends Component {
	generateListItems() {
		return _.map(this.props.drugs, drug => {
			let style = { whiteSpace: 'pre-line' };
			style = drug.important
				? { ...style, fontWeight: 'bold' }
				: { ...style };
			return (
				<ListItem
					justify="between"
					key={drug.name}
					style={style}
					wrap={true}
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

export default DrugList;
