import axios from 'axios';

import * as actions from './types';

export const fetchDrugs = () => async dispatch => {
	const res = await axios.get('/api/drugs');

	return dispatch({
		type: actions.FETCH_DRUGS,
		payload: res.data
	});
};

export const toggleDrug = drugId => {
	return {
		type: actions.TOGGLE_DRUG,
		drugId: drugId
	};
};

export const scrollToDrug = drugId => {
	return {
		type: actions.SCROLL_TO_DRUG,
		drugId: drugId
	};
};

export const navVisible = visible => {
	return { type: actions.NAV_VISIBLE, visible: visible };
};

export const navResponsive = responsive => {
	return { type: actions.NAV_RESPONSIVE, responsive: responsive };
};

export const navLastOpenedDrug = drugId => {
	return {
		type: actions.NAV_LAST_OPENED_DRUG,
		drugId: drugId
	};
};
