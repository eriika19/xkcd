import { runSaga } from 'redux-saga';
import initialState from 'store/initialState';

export async function recordSaga(saga, initialAction) {
  const dispatched = [];
  await runSaga(
    {
      dispatch: action => dispatched.push(action),
      getState: () => initialState,
    },
    saga,
    initialAction,
  ).done;

  return dispatched[0];
}
