import React from 'react';
import _ from 'lodash';
import { connect } from 'react-redux';

import Box from 'grommet/components/Box';
import Header from 'grommet/components/Header';
import Title from 'grommet/components/Title';
import MenuIcon from 'grommet/components/icons/base/Menu';

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
	let mobileHeader = '';
	if (props.nav.responsive === 'single') {
		openDrugs = <DisplayOpenDrugs drugs={props.drugs} />;
		style = {};
		mobileHeader = (
			<Header fixed={true} style={{ position: 'fixed', top: 0 }}>
				<Box flex={true}>
					<Title responsive={false} onClick={() => onClick(props)}>
						<MenuIcon /> Stofliste
					</Title>
				</Box>
				<Box justify="end" direction="row" margin="small">
					{openDrugs}
				</Box>
			</Header>
		);
	}

	return (
		<Box full="vertical" style={style}>
			{mobileHeader}
			<Box>{_.map(props.drugs, drug => renderDrug(drug))}</Box>
		</Box>
	);
};

function mapStateToProps({ drugs, nav }) {
	return { drugs, nav };
}

export default connect(mapStateToProps, actions)(DrugContainer);
