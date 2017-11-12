import * as actions from '../actions/types';
import _ from 'lodash';

export default function(state = { drugs: {}, chapters: {} }, action) {
	switch (action.type) {
		case actions.FETCH_DRUGS:
			let chaptersArr = [];

			let drugs = action.payload.map(drug => {
				chaptersArr.push(drug.chapters);
				let hasInfo;
				if (/\S/.test(drug.content)) {
					hasInfo = true;
				} else {
					hasInfo = false;
				}
				return { ...drug, visible: false, hasInfo: hasInfo };
			});

			chaptersArr = _.sortBy(_.flatten(chaptersArr));
			var chapters = {};
			chaptersArr.forEach(x => {
				if (!x) {
					x = 'null';
				}
				_.set(chapters, [x, 'chapter'], x);
				_.set(chapters, [x, 'count'], (chapters[x].count || 0) + 1);
				_.set(chapters, [x, 'visible'], 1);
			});

			return { drugs: _.mapKeys(drugs, '_id'), chapters };
		case actions.TOGGLE_DRUG:
			// If content contains anything but whitespace
			if (/\S/.test(state.drugs[action.drugId].content)) {
				const val = state.drugs[action.drugId].visible;
				const newState = _.set(
					{ ...state.drugs },
					[action.drugId, 'visible'],
					!val
				);
				return { ...state, drugs: newState };
			} else {
				return state;
			}
		default:
			return state;
	}
}
