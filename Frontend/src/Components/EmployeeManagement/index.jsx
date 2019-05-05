import React from 'react'
import { connect } from 'react-redux'
import EmployeeRow from './employeeRow';

class EmployeeManagement extends React.Component {

    render() {
        return (
            <table className='ui very basic padded table' style={{ padding: '0px 32px' }}>
                <thead>
                    <tr>
                        <th>Employee</th>
                        <th>Role</th>
                        <th>Max leave days</th>
                        <th className='right aligned'>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {this.props.employees.map( employee => <EmployeeRow employee={employee} /> )}
                </tbody>
            </table>
        );
    }
}

const mapStateToProps = state => {
  return {
    employees: [{
        firstName: 'A_First',
        lastName: 'A_Last',
        departmentName: 'A_Dept',
        roleName: 'A_Role',
        maxLeaveDays: 22
    },{
        firstName: 'B_First',
        lastName: 'B_Last',
        departmentName: 'B_Dept',
        roleName: 'B_Role',
        maxLeaveDays: 22
    },{
        firstName: 'C_First',
        lastName: 'C_Last',
        departmentName: 'C_Dept',
        roleName: 'C_Role',
        maxLeaveDays: 22
    }],
  }
}

export default connect ( 
  mapStateToProps, {
  }
)(EmployeeManagement)
