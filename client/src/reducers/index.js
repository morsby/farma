import { combineReducers } from 'redux';
import drugsReducer from './drugsReducer';

export default combineReducers({
	drugs: drugsReducer
});
