const INCREMENT = 'INCREMENT'
const ASYNC_INCREMENT = 'ASYNC_INCREMENT'
const CALL_FAKE_API = 'CALL_FAKE_API'

export const increment = () => ({
  type: INCREMENT,
})
// Action for incrementing count asynchronously
export const asyncIncrement = seconds => ({
  type: ASYNC_INCREMENT,
  seconds
})
// Action for calling a fake api call
// There's no case for this one in the reducer because
// the process will be taken by the redux-saga, (see below on rootSaga)
export const callFakeApi = () => ({
  type: CALL_FAKE_API
})
