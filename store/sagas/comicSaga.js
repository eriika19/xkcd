import { call, takeLatest, put } from 'redux-saga/effects';
import { GET_COMIC, GET_LAST_COMIC } from '../constants';
import { getComicFail, getComicSuccess, getLastComicFail, getLastComicSuccess } from '../actions';
import { getComic } from './api';

function* getXkcdComic({ payload }) {
  const { num } = payload;
  const response = num ? yield call(getComic, num) : yield call(getComic);
  const { data } = response;
  if (num) {
    try {
      yield put(getComicSuccess(data));
    } catch (error) {
      console.error(error);
      yield put(getComicFail(error));
    }
  } else {
    try {
      yield put(getComicSuccess(data));
      yield put(getLastComicSuccess(data));
    } catch (error) {
      console.error(error);
      yield put(getLastComicFail(error));
    }
  }
}

function* comicSaga() {
  yield takeLatest(GET_COMIC, getXkcdComic);
  yield takeLatest(GET_LAST_COMIC, getXkcdComic);
}

export default comicSaga;
