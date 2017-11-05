import * as actions from '../actions/types';

let initialState = {
	responsive: 'single',
	visible: true
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
		default:
			return state;
	}
}
