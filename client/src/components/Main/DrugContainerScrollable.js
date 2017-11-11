import React from 'react';
import { scrollableArea } from 'react-redux-scroll';

import DrugContainer from './DrugContainer';

export default scrollableArea(() => {
	return <DrugContainer />;
});
