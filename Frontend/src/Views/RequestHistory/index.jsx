import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import { getLeaveRequestsByUser } from './../../Store/Actions'
import RequestRow from '../../Components/RequestRow'
import './styles.scss'
import { Link } from 'react-router-dom'
import ActionModal from '../../Components/ActionModal'
import moment from 'moment'
import RequestBar from './../../Components/RequestBar/'
class RequestHistory extends Component {
  state = {
    displayActionModal: false,
    editModal: true,
    modalData: '',
    requestId: '',
    selectedDate: '',
    daysOff: '',
    successfullyUpdatedRequest: false,
    successfullyDeletedRequest: false,
    showTypeOfBar: false,
  }

  changeFormatOfDate = (startDate, endDate) => {
    const start = moment(startDate, "YYYY-MM-DD").format("DD-MM-YYYY")
    const end = moment(endDate, "YYYY-MM-DD").format("DD-MM-YYYY")

    return `${start} - ${end && end}`
  }

  openModal = () => {
    this.setState({ 
      displayActionModal: !this.state.displayActionModal 
    })
  }

  openRequestActionModal = (data, e, editModal = true) => {
    e.preventDefault()
    this.setState({ 
      editModal: editModal,
      requestId: data.requestId,
      selectedDate: this.changeFormatOfDate(data.startDate, data.endDate),
      daysOff: data.daysOff,
      displayActionModal: !this.state.displayActionModal 
    })
  }

  displayRequestBar = async (type = 'update') => {
    this.setState({ showTypeOfBar: type})
    setTimeout(() => {
      this.setState({ showTypeOfBar: false})
    }, 4000)
  }

  componentDidMount() {
    this.props.getLeaveRequestsByUser(this.props.userId)
  }

  render() {
    const { displayActionModal, editModal, selectedDate, daysOff, requestId } = this.state
    return (
      <Fragment>
        <div className={`requestHistoryContainer ${this.state.displayActionModal && 'blurBackground'}`}>
          <div className="menu">
            <Link to="/Employee">
              <i class="fas fa-arrow-left icon"></i>
            </Link>
            <div className="title">
              Leave requests history
            </div>
          </div>
          <div className="requestHistory">
            <div className="requestRowHeader">
              <div className="startDateHeader">Start date</div>
              <div className="endDateHeader">End date</div>
              <div className="daysOffHeader">Business days</div>
              <div className="statusHeader">Status</div>
              <div className="approverNameHeader">Approver name</div>
              <div className="approverRoleHeader">Approver role</div>
              <div className="actionsHeader">Actions</div>
            </div>
              {this.props.requests && this.props.requests.map((request, index) => {
                return <RequestRow key={index} data={request} openRequestActionModal={this.openRequestActionModal} />
              })}
          </div>
        </div>
        {displayActionModal && <ActionModal 
          editModal={editModal} 
          selectedDate={selectedDate} 
          openModal={this.openModal} 
          daysOff={daysOff} 
          displayRequestBar={this.displayRequestBar}  
          requestId={requestId}
        />}
        {this.state.showTypeOfBar && <RequestBar typeOfBar={this.state.showTypeOfBar} />}
      </Fragment>
    )
  }
}

const mapStateToProps = state => {
  return {
    requests: state.requestsByUser.requestsByUser,
    userId: state.signIn.user.id
  }
}

export default connect ( 
  mapStateToProps, {
    getLeaveRequestsByUser
  }
)(RequestHistory)