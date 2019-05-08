export const getOpenLeaveRequestsReducer = (state = [], action) => {
  switch (action.type) {
    case 'FETCH_OPEN_LEAVE_REQUEST':
      return {...state, openRequests: action.payload}
    default:
      return state
  }
}

export const rejectOpenLeaveRequestReducer = (state = [], action) => {
  switch (action.type) {
    case 'REJECT_LEAVE_REQUEST':
      return {...state, rejectedLeaveRequest: action.payload}
    default:
      return state
  }
}

export const acceptOpenLeaveRequestReducer = (state = [], action) => {
  switch (action.type) {
    case 'ACCEPT_LEAVE_REQUEST':
      return {...state, acceptedLeaveRequest: action.payload}
    default:
      return state
  }
}