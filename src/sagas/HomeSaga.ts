import { takeLatest, put } from 'redux-saga/effects'
import { homeActions } from '../reducers/HomeReducer'
import {getProduct, getColor} from '../api/Request'
import { Alert } from 'react-native';

export default [
    takeLatest(homeActions.requestProduct.type, requestProduct),
    takeLatest(homeActions.requestColor.type, requestColor)
]

function* requestProduct() {
    try {
        const {data, error} = yield getProduct();
        if(error) {
            Alert.alert("get data product error")
            yield put(homeActions.requestProductFailed())
        }
       yield put(homeActions.requestProductSuccess(data))
    } catch (error) {
        yield put(homeActions.requestProductFailed())
    }
}


function* requestColor() {
    try {
        const {data, error} = yield getColor();
        if(error) {
            Alert.alert("get data Color error")
            yield put(homeActions.requestColorFailed())
        }
       yield put(homeActions.requestColorSuccess(data))
    } catch (error) {
        yield put(homeActions.requestColorFailed())
    }
}