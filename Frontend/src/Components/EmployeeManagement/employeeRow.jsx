import React from 'react'

class EmployeeRow extends React.Component {

    render() {
        return (
            <tr>
                <td>
                    <h4 className='ui image header'>
                        <img src='/images/avatar2/small/lena.png' className='ui mini rounded image'/>
                        <div className='content'>
                            {this.props.employee.firstName} {this.props.employee.lastName}
                            <div className='sub header'>{this.props.employee.departmentName}</div>
                        </div>
                    </h4>
                </td>
                <td>
                    {this.props.employee.roleName}
                </td>
                <td>
                    {this.props.employee.maxLeaveDays}
                </td>
                <td className='right aligned'>
                    <button className='circular ui icon button'>
                        <i className='pencil alternate icon'></i>
                    </button>
                    <button className='circular ui icon red button'>
                        <i className='trash alternate icon'></i>
                    </button>
                </td>
            </tr>
        );
    }
}

export default EmployeeRow
