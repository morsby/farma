//TODO: Fiks scrolling, så det virker på smal skærm. Evt. noget med ikke at returnere scrollableArea?

import React from 'react';
import _ from 'lodash';
import { connect } from 'react-redux';

import { scrollableArea } from 'react-redux-scroll';
import Box from 'grommet/components/Box';
import Header from 'grommet/components/Header';
import Title from 'grommet/components/Title';
import DisplayDrug from './DisplayDrug';
import DisplayOpenDrugs from './DisplayOpenDrugs';

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

const DrugContainer = props => {
	let openDrugs = '';
	let style = { overflowY: 'scroll' };
	if (props.nav.responsive === 'single') {
		openDrugs = <DisplayOpenDrugs drugs={props.drugs} />;
		style = {};
	}

	return (
		<Box full="vertical" style={style}>
			<div>
				<Header>
					<Title responsive={false} onClick={() => onClick(props)}>
						Farma.morsby.dk
					</Title>
					{openDrugs}
				</Header>
				<Box>{_.map(props.drugs, drug => renderDrug(drug))}</Box>
			</div>
		</Box>
	);
};

function mapStateToProps({ drugs, nav }) {
	return { drugs, nav };
}

export default connect(mapStateToProps, actions)(DrugContainer);
