import React, { Component, Fragment } from 'react'
import './styles.scss'
import Box from '../../Components/Box'
import { connect } from 'react-redux'
import { getEmployeeData } from './../../Store/Actions/'
import Modal from '../../Components/Modal'


class Employee extends Component {

  state = {
    openedModal: false
  }

  componentDidMount() {
    this.props.getEmployeeData(1)
  }

  openModal = () => {
    this.setState({ openedModal: !this.state.openedModal })
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
              <Box title={"Check your requests history"} />
            </React.Fragment>
            }
          </div>
        </div>
        <Modal openedModal={this.state.openedModal} openModal={this.openModal} />
      </Fragment>
    )
  }
}

const mapStateToProps = state => {
  return {
    employee: state.employee.employee
  }
}

export default connect ( 
  mapStateToProps, {
    getEmployeeData
  }
)(Employee)