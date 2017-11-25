import React from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';

import * as actions from '../../actions';

import { Nav, NavItem, Button } from 'reactstrap';

import { IoIosCloseEmpty } from 'react-icons/lib/io';

const onClick = (id, props) => {
	props.scrollToDrug(id);
	if (props.toggleCollapsible) {
		props.toggleCollapsible();
	}
};

const onCloseAll = props => {
	props.closeAllDrugs();
};

const renderOpen = (drugs, props) => {
	return _.map(drugs, drug => {
		if (drug.visible) {
			let classes = drug.important ? 'important' : '';
			return (
				<NavItem
					onClick={() => onClick(drug._id, props)}
					key={drug._id}
					className={classes}
				>
					{drug.name}
				</NavItem>
			);
		} else {
			return null;
		}
	});
};

const isNull = arr => {
	return arr.join().replace(/,/g, '').length === 0;
};

const DisplayOpenDrugs = props => {
	let openDrugs = renderOpen(props.drugs, props);

	let button = isNull(openDrugs) ? (
		''
	) : (
		<Button
			outline
			onClick={() => onCloseAll(props)}
			color="danger"
			size="sm"
			className="p-0"
		>
			<IoIosCloseEmpty size={30} />
		</Button>
	);

	return (
		<Nav navbar className="open-drugs">
			<h6>
				Åbne stoffer
				{button}
			</h6>

			{openDrugs}
		</Nav>
	);
};

function mapStateToProps({ drugs, nav }) {
	return { drugs: drugs.drugs, nav };
}

export default connect(mapStateToProps, actions)(DisplayOpenDrugs);
