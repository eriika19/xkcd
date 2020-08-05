import {
  ADD_COMIC,
  ADD_COMIC_FAIL,
  ADD_COMIC_SUCCESS,
  DELETE_COMIC,
  DELETE_COMIC_FAIL,
  DELETE_COMIC_SUCCESS,
} from '../constants';

export const addComic = (payload = {}) => ({
  type: ADD_COMIC,
  payload,
});

export const addComicFail = payload => ({
  type: ADD_COMIC_FAIL,
  payload,
});

export const addComicSuccess = payload => ({
  type: ADD_COMIC_SUCCESS,
  payload,
});

export const deleteComic = (payload = {}) => ({
  type: DELETE_COMIC,
  payload,
});

export const deleteComicFail = payload => ({
  type: DELETE_COMIC_FAIL,
  payload,
});

export const deleteComicSuccess = payload => ({
  type: DELETE_COMIC_SUCCESS,
  payload,
});
