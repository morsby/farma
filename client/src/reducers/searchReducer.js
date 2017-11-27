import * as actions from '../actions/types';
import _ from 'lodash';

export default function(
	state = { active: false, results: [], term: '' },
	action
) {
	switch (action.type) {
		case actions.SEARCH_ACTIVE:
			return { ...state, active: action.bool };

		case actions.SEARCH_DRUGS:
			let ids = [];

			_.map(action.ids, id => {
				ids.push(id._id);
			});

			return { ...state, results: ids, term: action.term };
		default:
			return state;
	}
}
