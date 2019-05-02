import { combineReducers } from 'redux'
import {
  signInReducer,
} from './userReducers'
import {
  employeeDataReducer,
} from './employeeReducer'

export default combineReducers({
  signIn: signInReducer,
  employee: employeeDataReducer
})