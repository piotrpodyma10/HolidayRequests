import React, { Fragment } from 'react'
import './styles.scss'

class EditEmployeeModal extends React.Component { 
  state = {
    name: '' || this.props.selectedEmployee.name,
    role: '' || this.props.roles,
    role2: '' || this.props.selectedEmployee.role,
    setDaysOff: '' || this.props.selectedEmployee.setDaysOff,
    actualDaysOff: '' || this.props.selectedEmployee.actualDaysOff,
    departmentName: '' || this.props.selectedEmployee.departmentName,
  }

  handleNameChange = (event) => {
    this.setState({ name: event.target.value})
  } 

  handleRoleChange = (event) => {
    this.setState({ role: event.target.value})
  } 

  handleSetDaysChange = (event) => {
    this.setState({ setDaysOff: event.target.value})
  } 

  handleActualDaysChange = (event) => {
    this.setState({ actualDaysOff: event.target.value})
  } 

  handleDepartmentChange = (event) => {
    this.setState({ departmentName: event.target.value})
  } 

  handleSubmit = () => {
  }

  render() {
    console.log('INDEX', this.state)
      return (
        <div className="editEmployeeModal">
          <h3>Employee data</h3>
          <form onSubmit={this.handleSubmit}>
            <input 
              type="text"
              value={this.state.name}
              onChange={this.handleNameChange}
            />
            <input 
              type="text"
              value={this.state.role}
              onChange={this.handleRoleChange}
            />
            <input 
              type="text"
              value={this.state.setDaysOff}
              onChange={this.handleSetDaysChange}
            />
            <input 
              type="text"
              value={this.state.actualDaysOff}
              onChange={this.handleActualDaysChange}
            />
            <input 
              type="text"
              value={this.state.departmentName}
              onChange={this.handleDepartmentChange}
            />
            <button type="submit">Update employee</button>
          </form>
        </div>
      );
    }
}

export default EditEmployeeModal
