import { createLogger } from 'redux-logger'
import createSagaMiddleware from 'redux-saga'
import { configureStore } from '@reduxjs/toolkit'

import allReducers from '../reducers'
//Redux saga
import rootSaga from '../sagas/rootSaga'
//Middleware
const sagaMiddleware = createSagaMiddleware()
const logger = createLogger({
  // ...options
})

//Từ applyMiddleware vào Reducers thì tạo một store, sagaMiddleware nằm giữa Action và Reducers.
const IsEnableLogger = true

let store = configureStore({
  reducer: allReducers,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(sagaMiddleware, logger)
})

sagaMiddleware.run(rootSaga)
export default store
