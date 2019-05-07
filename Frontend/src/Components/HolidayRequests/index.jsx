import React from 'react'
import { connect } from 'react-redux'
import HolidayRequestRow from './holidayRequestRow';

class HolidayRequests extends React.Component {

    render() {
        return (
            <table className='ui very basic padded table' style={{ padding: '0px 32px' }}>
                <thead>
                    <tr>
                        <th>Employee</th>
                        <th>Holiday start date</th>
                        <th>Holiday end date</th>
                        <th className='right aligned'>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {this.props.requests.map( request => <HolidayRequestRow request={request} />)}
                </tbody>
            </table>
        );
    }
}

const mapStateToProps = state => {
  return {
    requests: [{
        employeeFirstName: 'A_First',
        employeeLastName: 'A_Last',
        departmentName: 'A_Dept',
        startDate: '22-12-2019',
        endDate: '02-01-2020'
    },{
        employeeFirstName: 'B_First',
        employeeLastName: 'B_Last',
        departmentName: 'B_Dept',
        startDate: '22-06-2019',
        endDate: '02-07-2020'
    },{
        employeeFirstName: 'C_First',
        employeeLastName: 'C_Last',
        departmentName: 'C_Dept',
        startDate: '12-11-2019',
        endDate: '15-11-2020'
    }],
  }
}

export default connect ( 
  mapStateToProps, {
  }
)(HolidayRequests)
