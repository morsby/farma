import React from 'react';
import _ from 'lodash';

import { scrollableArea } from 'react-redux-scroll';
import Box from 'grommet/components/Box';
import Header from 'grommet/components/Header';
import Title from 'grommet/components/Title';
import DisplayDrug from './DisplayDrug';

const renderDrug = drug => {
	if (drug.visible) {
		return <DisplayDrug drug={drug} key={drug._id} />;
	} else {
		return null;
	}
};

export default scrollableArea(props => {
	return (
		<Box
			style={{
				overflow: 'auto',
				width: '100%',
				height: '100%',
				minHeight: '100%'
			}}
		>
			<Header onClick={this.onClick}>
				<Title responsive={false}>Farma.morsby.dk</Title>
			</Header>
			<Box>{_.map(props.drugs, drug => renderDrug(drug))}</Box>
		</Box>
	);
});
