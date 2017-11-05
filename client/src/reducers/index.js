import { combineReducers } from 'redux';
import drugsReducer from './drugsReducer';
import navReducer from './navReducer';

export default combineReducers({
	drugs: drugsReducer,
	nav: navReducer
});
