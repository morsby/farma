import * as actions from '../actions/types';
import _ from 'lodash';

export default function(state = [], action) {
	switch (action.type) {
		case actions.SEARCH_DRUGS:
			let ids = [];

			_.map(action.ids, id => {
				ids.push(id._id);
			});

			return ids;
		default:
			return state;
	}
}
