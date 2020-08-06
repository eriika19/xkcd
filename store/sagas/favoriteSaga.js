import { takeLatest, put, select } from 'redux-saga/effects';

import { ADD_COMIC, DELETE_COMIC } from '../constants';
import { addComicSuccess, addComicFail, deleteComicSuccess, deleteComicFail } from '../actions';

const getCurrentFav = state => state.favorites.data;

export function* addComicToFav({ payload }) {
  try {
    const currentFav = yield select(getCurrentFav);
    const newFav = currentFav.concat(payload);
    yield put(addComicSuccess(newFav));
  } catch (error) {
    console.error(error);
    yield put(addComicFail(error));
  }
}

export function* deleteComicfromFav({ payload }) {
  try {
    const currentFav = yield select(getCurrentFav);
    const newFav = currentFav.filter(e => e.num !== payload.num);
    yield put(deleteComicSuccess(newFav));
  } catch (error) {
    console.error(error);
    yield put(deleteComicFail(error));
  }
}

function* favoritesSaga() {
  yield takeLatest(ADD_COMIC, addComicToFav);
  yield takeLatest(DELETE_COMIC, deleteComicfromFav);
}

export default favoritesSaga;
