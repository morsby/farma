import * as actions from '../actions/types';
import _ from 'lodash';

export default function(state = { drugs: {}, chapters: {} }, action) {
	switch (action.type) {
		case actions.FETCH_DRUGS:
			let chaptersArr = [];

			let drugs = action.payload.map(drug => {
				if (drug.chapters[0] === null) {
					chaptersArr.push('Intet kapitel');
				} else {
					chaptersArr.push(drug.chapters);
				}
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
				_.set(chapters, [x, 'visible'], true);
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
		case actions.TOGGLE_CHAPTER:
			let newState;
			if (action.chapter === 'all') {
				newState = _.forEach(state.chapters, chapter => {
					_.set(chapter, 'visible', true);
				});
			} else if (action.chapter === 'none') {
				newState = _.forEach(state.chapters, chapter => {
					_.set(chapter, 'visible', false);
				});
			} else {
				const val = state.chapters[action.chapter].visible;

				newState = _.set(
					{ ...state.chapters },
					[action.chapter, 'visible'],
					!val
				);
			}
			return { ...state, chapters: { ...newState } };

		default:
			return state;
	}
}
