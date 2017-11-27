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

export const toggleChapter = chapter => {
	return {
		type: actions.TOGGLE_CHAPTER,
		chapter
	};
};

export const closeAllDrugs = () => {
	return {
		type: actions.CLOSE_ALL_DRUGS
	};
};

export const scrollToDrug = drugId => {
	return {
		type: actions.SCROLL_TO_DRUG,
		drugId: drugId
	};
};

export const navVisible = () => {
	return { type: actions.NAV_VISIBLE };
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

export const searchDrugs = searchTerm => async dispatch => {
	if (searchTerm !== null) {
		const res = await axios.get(`/api/drugs/search/${searchTerm}`);

		return dispatch({
			type: actions.SEARCH_DRUGS,
			ids: res.data
		});
	}
};
