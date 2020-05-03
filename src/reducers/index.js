import { combineReducers } from 'redux';
import setLanguageReducer from './setLanguageReducer';
import setFilterByReducer from './setFilterByReducer';

export default combineReducers({
  language: setLanguageReducer,
  filterBy: setFilterByReducer
});
