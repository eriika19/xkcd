import { all } from 'redux-saga/effects';
//sagas
import comicSaga from './comicSaga';
import favoriteSaga from './favoriteSaga';

function* rootSaga() {
  yield all([comicSaga(), favoriteSaga()]);
}

export default rootSaga;
