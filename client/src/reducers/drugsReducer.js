import * as actions from '../actions/types';
import _ from 'lodash';

export default function(state = {}, action) {
	switch (action.type) {
		case actions.FETCH_DRUGS:
			let drugs = action.payload.map(drug => {
				return { ...drug, visible: false };
			});

			return _.mapKeys(drugs, '_id');
		case actions.TOGGLE_DRUG:
			// If content (through preview) contains anything but whitespace
			if (/\S/.test(state[action.drugId].preview)) {
				const val = state[action.drugId].visible;
				const newState = _.set(
					{ ...state },
					[action.drugId, 'visible'],
					!val
				);
				return newState;
			} else {
				return state;
			}
		default:
			return state;
	}
}
