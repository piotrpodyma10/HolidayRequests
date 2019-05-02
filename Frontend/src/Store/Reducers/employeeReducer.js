export const employeeDataReducer = (state = [], action) => {
  switch (action.type) {
    case 'FETCH_EMPLOYEE_DATA':
      return {...state, employee: action.payload}
    default:
      return state
  }
}