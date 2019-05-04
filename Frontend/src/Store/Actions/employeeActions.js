import { employeeData, sendRequest } from '../../Models/employee'

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