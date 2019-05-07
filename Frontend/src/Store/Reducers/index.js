import { combineReducers } from 'redux'
import {
  signInReducer,
} from './userReducers'
import {
  employeeDataReducer,
  leaveRequestReducer,
  leaveRequestsByUsereducer,
  deleteLeaveRequestReducer
} from './employeeReducer'

export default combineReducers({
  signIn: signInReducer,
  employee: employeeDataReducer,
  leaveRequest: leaveRequestReducer,
  requestsByUser: leaveRequestsByUsereducer,
  deleteRequest: deleteLeaveRequestReducer
})