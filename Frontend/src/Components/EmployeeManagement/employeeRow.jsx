import React, { Fragment } from 'react'
import faker from 'faker'
import './styles.scss'

class EmployeeRow extends React.Component {
  render() {
      return (
          <tr>
              <td className='left aligned'>
                  <h4 className='ui image header'>
                      <img alt='img' src={`${faker.image.avatar()}`} className='ui circular image'/>
                      <div className='content'>
                          {this.props.employee.name} 
                          <div className='sub header'>{this.props.employee.departmentName}</div>
                      </div>
                  </h4>
              </td>
              <td>
                  {this.props.employee.role}
              </td>
              <td>
                  {this.props.employee.setDaysOff}
              </td>
              <td>
                  {this.props.employee.actualDaysOff}
              </td>
              <td>
                  <button 
                    className='editEmployee'
                    onClick={(e) => this.props.openModal(this.props.employee, e)}
                  >
                      <i className='pencil alternate icon'></i>
                  </button>
                  <button className='deleteEmployee'>
                      <i className='trash alternate icon'></i>
                  </button>
              </td>
          </tr>
      );
    }
}

export default EmployeeRow
