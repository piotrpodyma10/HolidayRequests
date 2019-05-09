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

export const setMonthRequestsReducer = (state = { previous: [], current: [], next: []}, action) => {
  switch (action.type) {
    case 'SET_MONTH_REQUESTS':
      return {...state, ...action.payload};
    case 'CHANGE_TO_PREVIOUS_MONTH_REQUESTS':
      return {...state, previous: [], current: state.previous, next: state.current};
    case 'CHANGE_TO_NEXT_MONTH_REQUESTS':
      return {...state, previous: state.current, current: state.next, next: []};
    default:
      return state
  }
}

