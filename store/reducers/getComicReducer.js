import {
  GET_COMIC,
  GET_COMIC_FAIL,
  GET_COMIC_SUCCESS,
  GET_LAST_COMIC,
  GET_LAST_COMIC_FAIL,
  GET_LAST_COMIC_SUCCESS,
} from '../constants';

import { comic } from '../models';

const INITIAL_STATE = { comic };

const getComicReducer = (state = INITIAL_STATE, { type, payload = {} }) => {
  switch (type) {
    case GET_COMIC:
      return {
        ...state,
        loading: true,
      };

    case GET_COMIC_FAIL:
      return {
        ...state,
        error: payload,
        loading: false,
      };

    case GET_COMIC_SUCCESS:
      return {
        ...state,
        data: payload,
        loading: false,
        error: '',
      };

    case GET_LAST_COMIC:
      return {
        ...state,
        loading: true,
      };

    case GET_LAST_COMIC_FAIL:
      return {
        ...state,
        error: payload,
        loading: false,
      };

    case GET_LAST_COMIC_SUCCESS:
      return {
        ...state,
        total: payload.num,
      };

    default:
      return state;
  }
};

export default getComicReducer;
