import React from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';

import * as actions from '../../actions';

import { Nav, NavItem } from 'reactstrap';

const onClick = (id, props) => {
	props.scrollToDrug(id);
	if (props.toggleCollapsible) {
		props.toggleCollapsible();
	}
};

const renderOpen = (drugs, props) => {
	return _.map(drugs, drug => {
		if (drug.visible) {
			return (
				<NavItem
					onClick={() => onClick(drug._id, props)}
					key={drug._id}
				>
					{drug.name}
				</NavItem>
			);
		} else {
			return null;
		}
	});
};

const DisplayOpenDrugs = props => {
	return (
		<Nav navbar className="open-drugs">
			<h6>Åbne stoffer</h6>
			{renderOpen(props.drugs, props)}
		</Nav>
	);
};

function mapStateToProps({ drugs, nav }) {
	return { drugs: drugs.drugs, nav };
}

export default connect(mapStateToProps, actions)(DisplayOpenDrugs);
