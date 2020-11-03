import { put, call, fork, join, delay, takeEvery, takeLatest } from 'redux-saga/effects'

const INCREMENT = 'INCREMENT'
const ASYNC_INCREMENT = 'ASYNC_INCREMENT'
const CALL_FAKE_API = 'CALL_FAKE_API'
const RECORD_USER = 'RECORD_USER'

// Create a saga
function* rootSaga() {
  // Catch all actions with type ASYNC_INCREMENT
  // This would take every ASYNC_INCREMENT action type
  yield takeEvery(ASYNC_INCREMENT, sagaAsyncIncrement);

  // Catch all actions with type CALL_FAKE_API
  // takeLatest will only take the last action type CALL_FAKE_API and
  // the others that were not completed before the latest
  // will be cancelled
  yield takeLatest(CALL_FAKE_API, fetchData);
}

// Function to be called by saga taking action ASYNC_INCREMENT
// The data that was passed in the action creator will also be passed to saga
function* sagaAsyncIncrement(payload) {
  const { seconds } = payload;

  // Wait after how many seconds
  yield delay(seconds * 1000);

  // Dispatch an action with type INCREMENT
  // redux-saga "put" effect acts as a redux dispatch
  yield put({ type: INCREMENT });
}

// Declare some function that would return some data
// This can be an Api Call
const getUserData = () => {
  return {
    name: 'John Doe',
    gender: 'Male' };

};

// Function to be called by saga taking action CALL_FAKE_API
function* fetchData() {
  // Simulate some server delay
  const forked = yield fork(testForkJoin);
  yield delay(1500);
  // Call a function
  // redux-saga "call" effect allows you to call a function
  const testResult = yield join(forked);
  console.log('Test Result:', testResult);

  const result = yield call(getUserData);
  yield put({ type: RECORD_USER, result });
}

function* testForkJoin() {
  yield delay(1500);

  return 1;
}

export default rootSaga