import {
  GET_COMIC,
  GET_COMIC_FAIL,
  GET_COMIC_SUCCESS,
  GET_LAST_COMIC,
  GET_LAST_COMIC_FAIL,
  GET_LAST_COMIC_SUCCESS,
} from '../constants';

export const getComic = (payload = {}) => ({
  type: GET_COMIC,
  payload,
});

export const getComicSuccess = payload => ({
  type: GET_COMIC_SUCCESS,
  payload,
});

export const getComicFail = payload => ({
  type: GET_COMIC_FAIL,
  payload,
});

export const getLastComic = (payload = {}) => ({
  type: GET_LAST_COMIC,
  payload,
});

export const getLastComicSuccess = payload => ({
  type: GET_LAST_COMIC_SUCCESS,
  payload,
});

export const getLastComicFail = payload => ({
  type: GET_LAST_COMIC_FAIL,
  payload,
});
