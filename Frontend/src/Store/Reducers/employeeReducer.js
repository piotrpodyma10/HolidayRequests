export const employeeDataReducer = (state = [], action) => {
  switch (action.type) {
    case 'FETCH_EMPLOYEE_DATA':
      return {...state, employee: action.payload}
    default:
      return state
  }
}

export const leaveRequestReducer = (state = [], action) => {
  switch (action.type) {
    case 'POST_LEAVE_REQUEST':
      return {...state, leaveRequest: action.payload}
    default:
      return state
  }
}

export const leaveRequestsByUsereducer = (state = [], action) => {
  switch (action.type) {
    case 'FETCH_LEAVE_REQUESTS_BY_USER':
      return {...state, requestsByUser: action.payload}
    default:
      return state
  }
}

export const deleteLeaveRequestReducer = (state = [], action) => {
  switch (action.type) {
    case 'DELETE_LEAVE_REQUEST':
      return {...state, leaveRequest: action.payload}
    default:
      return state
  }
}