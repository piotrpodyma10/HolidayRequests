import { 
  employeeData, 
  sendRequest, 
  leaveRequestsByUser,
  deleteRequest,
  allEmployeeData,
  editEmployee,
  roles,
  departments
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

export const getAllEmployees = () => async dispatch => {
  const response = await allEmployeeData()

  dispatch({ 
    type: 'FETCH_ALL_EMPLOYEES', 
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

export const getDepartments = () => async dispatch => {
  const response = await departments()

  dispatch({ 
    type: 'FETCH_DEPARTMENTS', 
    payload: response 
  })
}

export const getRoles = () => async dispatch => {
  const response = await roles()

  dispatch({ 
    type: 'FETCH_ROLES', 
    payload: response 
  })
}

export const editEmployeeRequest = (
  id,
  employeeName,
  leaveDaysPerYear,
  actualLeaveDaysNumber,
  departmentId,
  roleId
) => async dispatch => {
  const response = await editEmployee(
    id,
    employeeName,
    leaveDaysPerYear,
    actualLeaveDaysNumber,
    departmentId,
    roleId
  )
  
  dispatch({ 
    type: 'EDIT_EMPLOYEE_REQUEST', 
    payload: response 
  })
}