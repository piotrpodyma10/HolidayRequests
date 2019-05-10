import React, { Fragment } from 'react'
import { connect } from 'react-redux'
import EmployeeRow from './employeeRow'
import { getRoles, getDepartments, editEmployeeRequest } from './../../Store/Actions'
import EditEmployeeModal from './../EditEmployeeModal'

class EmployeeManagement extends React.Component {
  state = {
    displayModal: false,
    selectedEmployee: {}
  } 

  componentDidMount() {
    this.props.getRoles()
    this.props.getDepartments()
  }
  
  openModal = (employee, e) => {
    e.preventDefault()
    this.setState({ displayModal: !this.state.displayModal, selectedEmployee: employee })
  }
  
  
  render() {
    const { displayModal, selectedEmployee } = this.state
    const { roles, departments } = this.props

    return (
      <Fragment>
        <table className='ui very basic padded table' style={displayModal && {filter: "blur(4px)", padding: "0 32px"} || {padding: "0 32px"}} >
            <thead>
                <tr>
                    <th className='left aligned'>Employee</th>
                    <th>Role</th>
                    <th>Actual number of days off</th>
                    <th>Set days off</th>
                    <th className='actions'>Actions</th>
                </tr>
            </thead>
            <tbody>
                {this.props.allEmployees.map(employee => <EmployeeRow employee={employee} openModal={this.openModal}/> )}
            </tbody>
        </table>
        {displayModal && <EditEmployeeModal 
          selectedEmployee={selectedEmployee} 
          departments={departments}
          roles={roles}
          editEmployeeRequest={this.props.editEmployeeRequest}
        />}
        </Fragment>
      );
  }
}

const mapStateToProps = state => {
  return {
    roles: state.roles.roles,
    departments: state.departments.departments
  }
}

export default connect ( 
  mapStateToProps, {
    editEmployeeRequest,
    getRoles,
    getDepartments
  }
)(EmployeeManagement)
