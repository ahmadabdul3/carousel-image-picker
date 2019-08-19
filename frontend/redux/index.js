import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router'
import placeholder from './placeholder';

export default (history) => combineReducers({
  router: connectRouter(history),
  placeholder,
});
