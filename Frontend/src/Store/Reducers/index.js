import { combineReducers } from 'redux'
import {
    signInReducer,
} from './userReducers'

export default combineReducers({
    signIn: signInReducer,
})