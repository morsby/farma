import * as actions from '../actions/types';

let initialState = {
	responsive: 'single',
	visible: true,
	lastOpenedDrug: null
};

export default function(state = initialState, action) {
	switch (action.type) {
		case actions.NAV_RESPONSIVE:
			return { ...state, responsive: action.responsive };
		case actions.NAV_VISIBLE:
			if (state.responsive === 'multiple') {
				return state;
			}
			return { ...state, visible: !state.visible };
		case actions.NAV_LAST_OPENED_DRUG:
			return { ...state, navLastOpenedDrug: action.drugId };
		default:
			return state;
	}
}
