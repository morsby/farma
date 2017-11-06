import * as actions from '../actions/types';
import _ from 'lodash';

export default function(state = {}, action) {
	switch (action.type) {
		case actions.FETCH_DRUGS:
			let drugs = action.payload.map(drug => {
				let hasInfo;
				if (/\S/.test(drug.content)) {
					hasInfo = true;
				} else {
					hasInfo = false;
				}
				return { ...drug, visible: false, hasInfo: hasInfo };
			});

			return _.mapKeys(drugs, '_id');
		case actions.TOGGLE_DRUG:
			// If content contains anything but whitespace
			if (/\S/.test(state[action.drugId].content)) {
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
