import { 
  openRequests, 
  rejectOpenRequest, 
  acceptOpenRequest,
  fetchMonthRequests
} from '../../Models/manager'

export const getOpenLeaveRequests = (id) => async dispatch => {
  const response = await openRequests(id)

  dispatch({ 
    type: 'FETCH_OPEN_LEAVE_REQUEST', 
    payload: response 
  })
}

export const rejectOpenLeaveRequest = (id) => async dispatch => {
  const response = await rejectOpenRequest(id)
  
  dispatch({ 
    type: 'REJECT_LEAVE_REQUEST', 
    payload: response 
  })
}

export const acceptOpenLeaveRequest = (id) => async dispatch => {
  const response = await acceptOpenRequest(id)
  
  dispatch({ 
    type: 'ACCEPT_LEAVE_REQUEST', 
    payload: response 
  })
}

export const getCurrentMonthsRequests = (currentDate, departmentId) => async dispatch => {
  const date = new Date(Date.UTC(currentDate.getUTCFullYear(), currentDate.getUTCMonth(), 1, 0, 0, 0,0));
  fetchMonthRequests(date, departmentId)
  .then(result => {
    dispatch(setMonthRequests({current: result}));
  });

  const previousMonth = new Date(Date.UTC(currentDate.getUTCFullYear(), currentDate.getUTCMonth() - 1, 1, 0, 0, 0,0));
  fetchMonthRequests(previousMonth, departmentId)
  .then(result => {
    dispatch(setMonthRequests({previous: result}));
  })
  
  const nextMonth = new Date(Date.UTC(currentDate.getUTCFullYear(), currentDate.getUTCMonth() + 1, 1, 0, 0, 0,0));
  fetchMonthRequests(nextMonth, departmentId)
  .then(result => {
    dispatch(setMonthRequests({next: result}));
  })
}

export const changeToPreviousMonthRequests = (newDate, departmentId) => async dispatch => {
  dispatch(changeToPreviousMontRequests());
  
  fetchMonthRequests(new Date(Date.UTC(newDate.getFullYear(), newDate.getMonth() - 1, 1)), departmentId)
  .then(result => {
    dispatch(setMonthRequests({previous: result}));
  })
}

export const changeToNextMonthRequests = (newDate, departmentId) => async dispatch => {
  dispatch(changeToNextMontRequests());
  
  fetchMonthRequests(new Date(Date.UTC(newDate.getFullYear(), newDate.getMonth() + 1, 1)), departmentId)
  .then(result => {
    dispatch(setMonthRequests({next: result}));
  })
}

export const setMonthRequests = (requestsMap) => {
  return {
    type: 'SET_MONTH_REQUESTS',
    payload: requestsMap
  }
}

export const changeToPreviousMontRequests = () => {
  return {
    type: 'CHANGE_TO_PREVIOUS_MONTH_REQUESTS'
  }
}

export const changeToNextMontRequests = () => {
  return {
    type: 'CHANGE_TO_NEXT_MONTH_REQUESTS'
  }
}