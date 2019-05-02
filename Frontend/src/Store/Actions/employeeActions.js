import { employeeData } from '../../Models/employee'

export const getEmployeeData = (id) => async dispatch => {
  const response = await employeeData(id)

  dispatch({ 
    type: 'FETCH_EMPLOYEE_DATA', 
    payload: response 
  })
}