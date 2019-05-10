import React from 'react'
import faker from 'faker'
import { connect } from 'react-redux'
import { 
  getOpenLeaveRequests,
  rejectOpenLeaveRequest,
  acceptOpenLeaveRequest,
  getAllEmployees
} from './../../Store/Actions'
import './styles.scss'

class HolidayRequestRow extends React.Component {

  acceptRequest = async () => {
    await this.props.acceptOpenLeaveRequest(this.props.request.requestId)
    await this.props.getOpenLeaveRequests(this.props.userId)
  }

  rejectRequest = async () => {
    await this.props.rejectOpenLeaveRequest(this.props.request.requestId, this.props.request.daysOff)
    await this.props.getOpenLeaveRequests(this.props.userId)
    await this.props.getAllEmployees()
  }

    render() {
        return (
            <tr>
                <td className='left aligned'>
                    <h4 className='ui image header'>
                        <img alt='img' src={`${faker.image.avatar()}`} className='ui circular image'/>
                        <div className='content'>
                            {this.props.request.employeeName}
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
                <td>
                    {this.props.request.daysOff}
                </td>
                <td>
                    <button 
                      className='acceptRequest'
                      onClick={this.acceptRequest}
                    >
                        <i class="fas fa-check-circle"></i>
                    </button>
                    <button 
                      className='rejectRequest'
                      onClick={this.rejectRequest}
                      >
                        <i class="fas fa-times-circle"></i>
                    </button>
                </td>
            </tr>
        )
    }
}

const mapStateToProps = state => {
  return {
    userId: state.signIn.user.id,
  }
}

export default connect ( 
  mapStateToProps, {
    rejectOpenLeaveRequest,
    acceptOpenLeaveRequest,
    getOpenLeaveRequests,
    getAllEmployees
  }
)(HolidayRequestRow)
