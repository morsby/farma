import { combineReducers } from 'redux';
import drugsReducer from './drugsReducer';
import navReducer from './navReducer';
import searchReducer from './searchReducer';

export default combineReducers({
	drugs: drugsReducer,
	nav: navReducer,
	search: searchReducer
});
