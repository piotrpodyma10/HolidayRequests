import { 
  openRequests, 
  rejectOpenRequest, 
  acceptOpenRequest,
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