import React from 'react';
import _ from 'lodash';
import { connect } from 'react-redux';

import Box from 'grommet/components/Box';
import Header from 'grommet/components/Header';
import Title from 'grommet/components/Title';
import MenuIcon from 'grommet/components/icons/base/Menu';
import Button from 'grommet/components/Button';

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
	let marginTop = '0px';
	if (props.nav.responsive === 'single') {
		openDrugs = <DisplayOpenDrugs drugs={props.drugs} />;
		style = {};
		mobileHeader = (
			<Header style={{ position: 'fixed', top: 0 }} fixed={true}>
				<Box flex={true}>
					<Title responsive={false}>
						<Button
							icon={<MenuIcon />}
							onClick={() => onClick(props)}
						/>
					</Title>
				</Box>
				<Box justify="end" direction="row" margin="small">
					{openDrugs}
				</Box>
			</Header>
		);
		marginTop = '72px';
	}

	return (
		<Box full="vertical" style={style}>
			{mobileHeader}
			<Box style={{ marginTop }}>
				{_.map(props.drugs, drug => renderDrug(drug))}
			</Box>
		</Box>
	);
};

function mapStateToProps({ drugs, nav }) {
	return { drugs: drugs.drugs, chapters: drugs.chapters, nav };
}

export default connect(mapStateToProps, actions)(DrugContainer);
