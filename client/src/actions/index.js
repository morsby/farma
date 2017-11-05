import axios from 'axios';

import * as actions from './types';

export const fetchDrugs = () => async dispatch => {
	const res = await axios.get('/api/drugs');
	return dispatch({
		type: actions.FETCH_DRUGS,
		payload: res.data
	});
};

export const navActivate = active => {
	return { type: actions.NAV_ACTIVATE, active: active };
};

export const navEnable = enabled => {
	return { type: actions.NAV_ENABLE, enabled: enabled };
};

export const navResponsive = responsive => {
	return { type: actions.NAV_RESPONSIVE, responsive: responsive };
};
