import React from 'react'

class DepartmentRow extends React.Component {

    render() {
        return (
            <tr>
                <td>
                    <h4 className='ui header'>
                        <div className='content'>
                            { this.props.department.name }
                        </div>
                    </h4>
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

export default DepartmentRow
