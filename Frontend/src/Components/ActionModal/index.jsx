import React, { Component, Fragment } from 'react'
import Calendar from './../Calendar/'
import { getLeaveRequestsByUser, deleteLeaveRequest, getEmployeeData } from './../../Store/Actions'
import { connect } from 'react-redux'
import './styles.scss'

class ActionModal extends Component {
  deleteSelectedRequest = async (id, e) => {
    e.preventDefault()
    await this.props.deleteLeaveRequest(id)
    await this.props.getLeaveRequestsByUser(this.props.userId)
    await this.props.getEmployeeData(this.props.userId)
    await this.props.openModal()
    await this.props.displayRequestBar('delete')
  }

  render() {
    const { editModal, daysOff, requestId } = this.props
    return (
      <Fragment>
        <div className="modalContainer">
          <div className="modal">
            {editModal 
              && 
              <Calendar 
                openModal={this.props.openModal} 
                selectedDate={this.props.selectedDate} 
                daysOff={daysOff} 
                displayRequestBar={this.props.displayRequestBar}  
              /> 
              || 
              <div className="delete">
                <div className="deleteTitle">
                  Do you really want to delete this record?
                </div>
                <div className="button deleteButtonsWrapper">
                  <button
                    className="deleteButton"
                    onClick={(e) => this.deleteSelectedRequest(requestId, e)}
                  > Accept
                  </button>
                  <button 
                    className="cancelButton"
                    onClick={this.props.openModal}
                  > Cancel
                  </button>
                </div>
              </div>
            }
          </div>
        </div>
      </Fragment>
    )
  }
}

const mapStateToProps = state => {
  return {
    userId: state.signIn.user.id
  }
}

export default connect ( 
  mapStateToProps, {
    getLeaveRequestsByUser,
    deleteLeaveRequest,
    getEmployeeData
  }
)(ActionModal)