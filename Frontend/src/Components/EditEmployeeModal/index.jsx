import React from 'react'
import { getAllEmployees } from './../../Store/Actions/'
import { connect } from 'react-redux'
import './styles.scss'

class EditEmployeeModal extends React.Component { 
  state = {
    name: '' || this.props.selectedEmployee.name,
    setDaysOff: '' || this.props.selectedEmployee.setDaysOff,
    actualDaysOff: '' || this.props.selectedEmployee.actualDaysOff,
    roleId: '' || this.props.selectedEmployee.roleId,
    departmentId: '' || this.props.selectedEmployee.departmentId,
  }

  handleNameChange = (event) => {
    this.setState({ name: event.target.value})
  } 

  handleRoleChange = (event) => {
    this.setState({ roleId: parseInt(event.target.value)})
  } 

  handleSetDaysChange = (event) => {
    this.setState({ setDaysOff: event.target.value})
  } 

  handleActualDaysChange = (event) => {
    this.setState({ actualDaysOff: event.target.value})
  } 

  handleDepartmentChange = (event) => {
    this.setState({ departmentId: parseInt(event.target.value)})
  } 

  handleSubmit = async (e) => {
    const { name, setDaysOff, actualDaysOff, departmentId, roleId} = this.state
    await this.props.editEmployeeRequest(
      this.props.selectedEmployee.employeeId,
      name,
      setDaysOff,
      actualDaysOff,
      departmentId,
      roleId
    )
    await this.props.getAllEmployees()
  }

  render() {
    const { role, roleId, departmentId, departmentName } = this.props.selectedEmployee
    return (
      <div className="editEmployeeModal">
        <h3>Employee data</h3>
        <form>
          Name
          <br/>
          <input 
            type="text"
            value={this.state.name}
            onChange={this.handleNameChange}
          />
          <br/>

          Role
          <br/>
          <select
            onChange={this.handleRoleChange}
            value={this.state.roleId}
          >
          <option value={roleId}>{role}</option>
            {
              this.props.roles.filter(x => x.id !== roleId).map(role => {
                return <option key={role.id}
                  value={role.id} 
                  >{role.name}</option> 
              })
            }
          </select>
          <br/>

          Set days off per year
          <br/>
          <input 
            type="text"
            value={this.state.setDaysOff}
            onChange={this.handleSetDaysChange}
          />
          <br/>

          Actual number of days off
          <br/>
          <input 
            type="text"
            value={this.state.actualDaysOff}
            onChange={this.handleActualDaysChange}
          />
          <br/>

          Department
          <br/>
          <select
            onChange={this.handleDepartmentChange}
            value={this.state.departmentId}
          >
            <option value={departmentId}>{departmentName}</option>
            {
              this.props.departments.filter(x => x.id !== departmentId).map(department => {
                return <option key={department.id}
                  value={department.id} 
                  >{department.name}</option> 
              })
            }
          </select>

          <button 
            onClick={this.handleSubmit}
          >
            Update employee
          </button>
        </form>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
  }
}

export default connect ( 
  mapStateToProps, {
    getAllEmployees
  }
)(EditEmployeeModal)