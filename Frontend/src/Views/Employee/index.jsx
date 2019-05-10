import React, { Component, Fragment } from 'react'
import './styles.scss'
import Box from '../../Components/Box'
import { connect } from 'react-redux'
import { getEmployeeData } from './../../Store/Actions/'
import Modal from '../../Components/Modal'
import { createBrowserHistory } from 'history'
import RequestBar from '../../Components/RequestBar'
import { Link } from 'react-router-dom'
import Logout from '../../Components/LogOut'
class Employee extends Component {

  state = {
    openedModal: false,
    successfullyAddedRequest: false
  }

  componentDidMount() {
    this.props.getEmployeeData(this.props.userId)
  }

  openModal = () => {
    this.setState({ openedModal: !this.state.openedModal })
  }

  displayRequestBar = async () => {
    this.setState({ successfullyAddedRequest: true})
    setTimeout(() => {
      this.setState({ successfullyAddedRequest: false})
    }, 4000)
  }

  render() {
    return (
      <Fragment>
        <div className="employeeContainer" style={this.state.openedModal ? {filter: "blur(4px)"} : {}}>
          <div className="boxList">
            {this.props.employee && <React.Fragment>
              <Box title={this.props.employee.userTitle} value={`${this.props.employee.firstName} ${this.props.employee.lastName}`} />
              <Box title={this.props.employee.actualLeaveDaysTitle} value={this.props.employee.actualLeaveDaysNumber} />
              <Box title={this.props.employee.departmentTitle} value={this.props.employee.departmentName} />
              <Box title={this.props.employee.roleTitle} value={this.props.employee.role} />
              <div className="eventBox" onClick={() => this.openModal()}>
                <Box title={this.props.employee.modalTitle} modal />
              </div>
              <Link to="/RequestHistory">
                <Box title={"Requests history view"} />
              </Link>
              { 
                this.props.employee.role === "Manager" && 
                <div 
                  onClick={() => createBrowserHistory({ forceRefresh: true }).push('/Manager')}
                  style={{ marginBottom: "120px" }}
                >
                  <Box title={"Manager view"} />
                </div>
              }
              <Link to="/">
                <Logout />
              </Link>
            </React.Fragment>
            }
          </div>
        </div>
        {this.state.openedModal && <Modal openModal={this.openModal} displayRequestBar={this.displayRequestBar} />}
        {this.state.successfullyAddedRequest && <RequestBar />}
      </Fragment>
    )
  }
}

const mapStateToProps = state => {
  return {
    employee: state.employee.employee,
    userId: state.signIn.user.id
  }
}

export default connect ( 
  mapStateToProps, {
    getEmployeeData
  }
)(Employee)