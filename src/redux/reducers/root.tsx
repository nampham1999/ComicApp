import {combineReducers} from 'redux';
import history from './history';
import chapReducer from './chaps';
import categories from './categories';
import home from './home';
import network from './network';

const rootReducer = combineReducers({
  history,
  chapReducer,
  categories,
  home,
  network,
});
export default rootReducer;
