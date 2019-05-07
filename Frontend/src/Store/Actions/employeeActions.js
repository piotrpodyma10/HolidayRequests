import { 
  employeeData, 
  sendRequest, 
  leaveRequestsByUser,
  deleteRequest
} from '../../Models/employee'

export const getEmployeeData = (id) => async dispatch => {
  const response = await employeeData(id)

  dispatch({ 
    type: 'FETCH_EMPLOYEE_DATA', 
    payload: response 
  })
}

export const sendLeaveRequest = (
  employeeId,
    startDate,
    endDate,
    isPayed,
    daysOff,
    approverId
) => async dispatch => {
  const response = await sendRequest(
    employeeId,
    startDate,
    endDate,
    isPayed,
    daysOff,
    approverId
  )

  dispatch({ 
    type: 'POST_LEAVE_REQUEST', 
    payload: response 
  })
}

export const getLeaveRequestsByUser = (id) => async dispatch => {
  const response = await leaveRequestsByUser(id)

  dispatch({ 
    type: 'FETCH_LEAVE_REQUESTS_BY_USER', 
    payload: response 
  })
}

export const deleteLeaveRequest = (id) => async dispatch => {
  const response = await deleteRequest(id)
  
  dispatch({ 
    type: 'DELETE_LEAVE_REQUEST', 
    payload: response 
  })
}