import { combineReducers } from 'redux'
import {
  signInReducer,
} from './userReducers'
import {
  employeeDataReducer,
  leaveRequestReducer
} from './employeeReducer'

export default combineReducers({
  signIn: signInReducer,
  employee: employeeDataReducer,
  leaveRequest: leaveRequestReducer
})