import {
  ADD_COMIC,
  ADD_COMIC_FAIL,
  ADD_COMIC_SUCCESS,
  DELETE_COMIC,
  DELETE_COMIC_FAIL,
  DELETE_COMIC_SUCCESS,
} from '../constants';

import { favorites } from '../models';

const INITIAL_STATE = { favorites };

const favoritesComicReducer = (state = INITIAL_STATE, { type, payload = {} }) => {
  switch (type) {
    case ADD_COMIC:
      return {
        ...state,
        loading: true,
      };

    case ADD_COMIC_FAIL:
      return {
        ...state,
        error: payload,
      };

    case ADD_COMIC_SUCCESS:
      return {
        data: payload,
        loading: false,
        error: '',
      };

    case DELETE_COMIC:
      return {
        ...state,
        loading: true,
      };

    case DELETE_COMIC_SUCCESS:
      return {
        data: payload,
        loading: false,
        error: '',
      };

    case DELETE_COMIC_FAIL:
      return {
        ...state,
        error: payload,
      };

    default:
      return state;
  }
};

export default favoritesComicReducer;
