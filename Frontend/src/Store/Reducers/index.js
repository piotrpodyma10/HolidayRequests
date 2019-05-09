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

import {
  getOpenLeaveRequestsReducer,
  rejectOpenLeaveRequestReducer,
  acceptOpenLeaveRequestReducer,
  setMonthRequestsReducer,
} from './managerReducer'

export default combineReducers({
  signIn: signInReducer,
  employee: employeeDataReducer,
  leaveRequest: leaveRequestReducer,
  requestsByUser: leaveRequestsByUsereducer,
  deleteRequest: deleteLeaveRequestReducer,
  openLeaveRequests: getOpenLeaveRequestsReducer,
  rejectOpenLeaveRequest: rejectOpenLeaveRequestReducer,
  acceptOpenLeaveRequest: acceptOpenLeaveRequestReducer,
  monthRequests: setMonthRequestsReducer,
})