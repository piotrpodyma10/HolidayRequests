import React from 'react'

class HolidayRequestRow extends React.Component {

    render() {
        return (
            <tr>
                <td>
                    <h4 className='ui image header'>
                        <img src='/images/avatar2/small/lena.png' className='ui mini rounded image'/>
                        <div className='content'>
                            {this.props.request.employeeFirstName} {this.props.request.employeeLastName}
                            <div className='sub header'>{this.props.request.departmentName}</div>
                        </div>
                    </h4>
                </td>
                <td>
                    {this.props.request.startDate}
                </td>
                <td>
                    {this.props.request.endDate}
                </td>
                <td className='right aligned'>
                    <button className='circular ui icon green button'>
                        <i className='check icon'></i>
                    </button>
                    <button className='circular ui icon red button'>
                        <i className='x icon icon'></i>
                    </button>
                </td>
            </tr>
        );
    }
}

export default HolidayRequestRow
