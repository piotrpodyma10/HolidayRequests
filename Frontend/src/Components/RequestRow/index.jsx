import React, { Component, Fragment } from 'react'
import './styles.scss'

class RequestRow extends Component {

  state = {
    actionModalOpened: true
  }

  render() {
    return (
      <Fragment>
        <div className="requestRowContainer">
          <div className="startDate">{this.props.data.startDate}</div>
          <div className="endDate">{this.props.data.endDate}</div>
          <div className="daysOff">{this.props.data.daysOff}</div>
          <div className="status">{this.props.data.status}</div>
          <div className="approverName">{this.props.data.approverName}</div>
          <div className="approverRole">{this.props.data.approverRole}</div>
          <div className="actions">
            {this.props.data.actions && <div className="actionsContainer">
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