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

export const leaveRequestsByUser = async (id) => {
  let result
  await axios.get(`${BASE_URL}/GetLeaveRequestByUser`, {
    params: {
      id
    }
  }).then(requests => {
    result = requests.data
  }).catch(error => {
    console.log(error)
  })

  return await result
}

export const deleteRequest = async (id) => {
  let result
  await axios.delete(`${BASE_URL}/DeleteLeaveRequest`, {
    data: { Id: id }, 
    headers: { 'Content-Type': 'application/json' }
  }).then(sendRequest => {
    result = sendRequest.data
  }).catch(error => {
    console.log(error)
  })

  return await result
}

export const allEmployeeData = async () => {
  let result
  await axios.get(`${BASE_URL}/GetAllEmployees`)
    .then(employee => {
      result = employee.data
  }).catch(error => {
    console.log(error)
  })

  return await result
}

export const departments = async () => {
  let result
  await axios.get(`${BASE_URL}/GetDepartments`)
    .then(employee => {
      result = employee.data
  }).catch(error => {
    console.log(error)
  })

  return await result
}

export const editEmployee = async (
    id,
    employeeName,
    leaveDaysPerYear,
    actualLeaveDaysNumber,
    departmentId,
    roleId
  ) => {
  let result
  await axios.post(`${BASE_URL}/EditEmployee`, {
    id,
    employeeName,
    leaveDaysPerYear,
    actualLeaveDaysNumber,
    departmentId,
    roleId
  }).then(sendRequest => {
    result = sendRequest.data
  }).catch(error => {
    console.log(error)
  })

  return await result
}

export const roles = async () => {
  let result
  await axios.get(`${BASE_URL}/GetRoles`)
    .then(employee => {
      result = employee.data
  }).catch(error => {
    console.log(error)
  })

  return await result
}