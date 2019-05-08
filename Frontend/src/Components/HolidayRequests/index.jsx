import React from 'react'
import { connect } from 'react-redux'
import HolidayRequestRow from './holidayRequestRow'

class HolidayRequests extends React.Component {

    render() {
        return (
            <table className='ui very basic padded table' style={{ padding: '0px 32px' }}>
                <thead>
                    <tr>
                    <th className='left aligned'>Employee</th>
                        <th>Holiday start date</th>
                        <th>Holiday end date</th>
                        <th>Number of days off</th>
                        <th className='actions'>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {this.props.openRequests.map((request) => <HolidayRequestRow request={request} />)}
                </tbody>
            </table>
        );
    }
}

const mapStateToProps = state => {
  return {
  }
}

export default connect ( 
  mapStateToProps, {
  }
)(HolidayRequests)
