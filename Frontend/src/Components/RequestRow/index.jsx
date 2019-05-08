import React, { Component, Fragment } from 'react'
import './styles.scss'

class RequestRow extends Component {

  colorCell = (status) => {
    switch (status) {
      case 'Accepted':
        return 'accepted'
      case 'Rejected':
        return 'rejected'
      default:
        return ''
    }
  }

  state = {
    actionModalOpened: true
  }

  render() {
    const { startDate, endDate, status, daysOff, approverName, approverRole, actions } = this.props.data
    return (
      <Fragment>
        <div className="requestRowContainer">
          <div className="startDate">{startDate}</div>
          <div className="endDate">{endDate}</div>
          <div className="daysOff">{daysOff}</div>
          <div className={`status ${this.colorCell(status)}`}>{status}</div>
          <div className="approverName">{approverName}</div>
          <div className="approverRole">{approverRole}</div>
          <div className="actions">
            {actions && <div className="actionsContainer">
              <div className="edit" onClick={(e) => this.props.openRequestActionModal(this.props.data, e)}>
                <i class="fas fa-file-edit"></i>
              </div>
              <div className="delete" onClick={(e) => this.props.openRequestActionModal(this.props.data, e, false)}>
                <i class="fas fa-trash"></i>
              </div>
            </div>
            }
          </div>
        </div>
      </Fragment>
    )
  }
}

export default RequestRow