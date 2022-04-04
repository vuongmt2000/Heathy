import { all } from 'redux-saga/effects'
import homeSaga from './HomeSaga'

export default function* rootSaga() {
    yield all([
        ...homeSaga
    ])
}