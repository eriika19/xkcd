import { combineReducers } from 'redux';

import getComicReducer from './getComicReducer';
import favoritesComicReducer from './favoritesComicReducer';

const rootReducer = combineReducers({
  comic: getComicReducer,
  favorites: favoritesComicReducer,
});

export default rootReducer;
