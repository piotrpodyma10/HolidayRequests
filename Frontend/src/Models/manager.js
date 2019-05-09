import axios from 'axios'
import { BASE_URL } from '../Api/contant'

export const openRequests = async (approverId) => {
  let result
  await axios.get(`${BASE_URL}/GetOpenLeaveRequest`, {
    params: {
      id: approverId
    }
  }).then(openRequests => {
    result = openRequests.data
  }).catch(error => {
    console.log(error)
  })

  return await result
}

export const rejectOpenRequest = async (requestId) => {
  let result
  await axios.post(`${BASE_URL}/RejectLeaveRequest`, {
    LeaveRequestId: requestId
  }).then(sendRequest => {
    result = sendRequest.data
  }).catch(error => {
    console.log(error)
  })

  return await result
}

export const acceptOpenRequest = async (requestId) => {
  let result
  await axios.post(`${BASE_URL}/AcceptLeaveRequest`, {
    LeaveRequestId: requestId
  }).then(sendRequest => {
    result = sendRequest.data
  }).catch(error => {
    console.log(error)
  })

  return await result
}

export const fetchMonthRequests = async (date, departmentId) => {
  let result;

  await axios.get(`${BASE_URL}/GetMonthRequests`, {
    params: {
      date,
      departmentId
    }
  }).then(sendRequest => {
    result = sendRequest.data
  }).catch(error => {
    console.log(error)
  })

  return await result
}
