import * as actions from '../actions/types';

let initialState = {
	responsive: 'mobile',
	visible: true,
	navLastOpenedDrug: null
};

export default function(state = initialState, action) {
	switch (action.type) {
		case actions.NAV_RESPONSIVE:
			if (action.responsive < 768) {
				return { ...state, responsive: 'mobile' };
			}

			return { ...state, responsive: 'wide' };
		case actions.NAV_VISIBLE:
			if (state.responsive !== 'mobile') {
				return state;
			}
			return { ...state, visible: !state.visible };
		case actions.NAV_LAST_OPENED_DRUG:
			return { ...state, navLastOpenedDrug: action.drugId };
		default:
			return state;
	}
}
