import * as actions from '../actions/types';
import _ from 'lodash';

export default function(state = {}, action) {
	switch (action.type) {
		case actions.FETCH_DRUGS:
			return _.mapKeys(action.payload, '_id');
		default:
			return state;
	}
}
