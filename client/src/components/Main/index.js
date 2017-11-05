import React from 'react';

import Header from 'grommet/components/Header';
import Title from 'grommet/components/Title';
import Box from 'grommet/components/Box';

const Main = () => {
	return (
		<div>
			<Header>
				<Title responsive={false}>Farma.morsby.dk</Title>
			</Header>
			<Box
				colorIndex="neutral-2"
				justify="center"
				align="center"
				pad="medium"
			>
				Right Side
			</Box>
		</div>
	);
};

export default Main;
