import React from 'react';
import _ from 'lodash';

import { scrollableArea } from 'react-redux-scroll';
import Box from 'grommet/components/Box';
import Header from 'grommet/components/Header';
import Title from 'grommet/components/Title';
import DisplayDrug from './DisplayDrug';

import { connect } from 'react-redux';

import * as actions from '../../actions';

const renderDrug = drug => {
	if (drug.visible) {
		return <DisplayDrug drug={drug} key={drug._id} />;
	} else {
		return null;
	}
};

const onClick = props => {
	props.navVisible(props.nav.visible);
};

const DrugContainer = scrollableArea(props => {
	return (
		<Box style={{ height: '100%', overflow: 'scroll' }}>
			<div>
				<Header onClick={() => onClick(props)}>
					<Title responsive={false}>Farma.morsby.dk</Title>
				</Header>
				<Box>{_.map(props.drugs, drug => renderDrug(drug))}</Box>
			</div>
		</Box>
	);
});

function mapStateToProps({ drugs, nav }) {
	return { drugs, nav };
}

export default connect(mapStateToProps, actions)(DrugContainer);
