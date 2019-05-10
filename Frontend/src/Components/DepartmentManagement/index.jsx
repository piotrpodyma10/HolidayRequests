import React from 'react'
import { connect } from 'react-redux'
import DepartmentRow from './departmentRow';

class DepartmentManagement extends React.Component {

    render() {
        return (
            <table className='ui very basic padded table' style={{ padding: '0px 256px' }}>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th className='right aligned' style={{paddingRight: "60px"}}>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {this.props.departments.map(department => <DepartmentRow department={department} />)}
                </tbody>
            </table>
        );
    }
}

const mapStateToProps = state => {
  return {
    departments: [
        {name: 'HR'},
        {name: 'Testers'},
        {name: 'Devs'}
    ],
  }
}

export default connect ( 
  mapStateToProps, {
  }
)(DepartmentManagement)