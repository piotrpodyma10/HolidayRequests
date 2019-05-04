import axios from 'axios'
import { BASE_URL } from '../Api/contant'

export const employeeData = async (id) => {
  let result
  await axios.get(`${BASE_URL}/GetUserById`, {
    params: {
      id
    }
  }).then(employee => {
    result = employee.data
  }).catch(error => {
    console.log(error)
  })

  return await result
}

export const sendRequest = async (
    employeeId,
    startDate,
    endDate,
    isPayed,
    daysOff,
    approverId
  ) => {
  let result
  await axios.post(`${BASE_URL}/SendLeaveRequest`, {
    employeeId,
    startDate,
    endDate,
    isPayed,
    daysOff,
    approverId
  }).then(sendRequest => {
    result = sendRequest.data
  }).catch(error => {
    console.log(error)
  })

  return await result
}