import { combineReducers } from 'redux';
import cnn from './cnn/cnn';
import user from './user';
import todo from './todo';

export default combineReducers({
  cnn: cnn,
  user,
  todo
});
