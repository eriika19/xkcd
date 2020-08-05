import { createSelector } from 'reselect';

const stateSelector = state => state;
export const getState = createSelector([stateSelector], state => state);

const comicSelector = state => state.comic;
export const getComicData = createSelector([comicSelector], comic => comic.data);
export const getCurrentComic = createSelector([comicSelector], comic => comic.data.num);
export const getTotal = createSelector([comicSelector], comic => comic.total);

const favoritesSelector = state => state.favorites;
export const getFavoritesData = createSelector([favoritesSelector], favorites => favorites.data);
