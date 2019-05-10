import React, { Component } from 'react'
import './styles.scss'
import Box from '../../Components/Box'
import { connect } from 'react-redux'
import { getEmployeeData, getOpenLeaveRequests, getAllEmployees } from './../../Store/Actions/'
import { createBrowserHistory } from 'history'
import HolidayRequests from '../../Components/HolidayRequests'
import HolidayReport from '../../Components/HolidayReport'
import EmployeeManagement from '../../Components/EmployeeManagement'
import DepartmentManagement from '../../Components/DepartmentManagement'

class Manager extends Component {
	state = {
		context: 'HOLIDAY_REQUESTS'
	}

	componentDidMount() {
    this.props.getEmployeeData(this.props.userId)
    this.props.getOpenLeaveRequests(this.props.userId)
    this.props.getAllEmployees()
	}

	render() {
		return (
			<div className='managerContainer'>
        <div className='managerWrapper'>
          {this.renderSidebar()}
          {this.renderBoard()}
        </div>
			</div>
		)
	}

	renderSidebar(){
		return (
			<div className='managerSidebar'>
				{
					this.props.employee && 
					<React.Fragment>
						<div onClick={() => this.setState({context: 'HOLIDAY_REQUESTS'})}>
							<Box title={'Pending leave requests:'} value={this.props.numberOfPendingRequests}/>
						</div>
						<div onClick={() => this.setState({context: 'EMPLOYEE_MANAGEMENT'})}>
							<Box title={'Employee management'} />
						</div>
						<div onClick={() => this.setState({context: 'HOLIDAY_REPORT'})}>
							<Box title={'Holiday report'} />
						</div>
						<div onClick={() => this.setState({context: 'DEPARTMENT_MANAGEMENT'})}>
							<Box title={'Department management'} />
						</div>
						<div onClick={() => createBrowserHistory({ forceRefresh: true }).push('/Employee')}>
							<Box title={'To Employee view'} />
						</div>
					</React.Fragment>
				}
			</div>
		)
	}

	renderBoard(){
		return (
			<div className='managerMain'>
				{this.renderContext()}
			</div>
		)
	}

	renderContext(){
		switch (this.state.context) {
			case 'HOLIDAY_REQUESTS':
				return	(
						<div className='ui four column centered grid' style={{paddingTop: '32px'}}>
							<div className='row'>
								<h1 className='ui header'>Holiday requests</h1>
							</div>	
							
							<div className='row'>
								<HolidayRequests openRequests={this.props.openRequests} />
							</div>
						</div>
					);
			case 'EMPLOYEE_MANAGEMENT':
				return	(
						<div className='ui four column centered grid' style={{paddingTop: '32px'}}>
							<div className='row'>
								<h1 className='ui header'>Employee Management</h1>
							</div>	
							
							<div className='row'>
								<EmployeeManagement allEmployees={this.props.allEmployees} />
							</div>
						</div>
					);
			case 'HOLIDAY_REPORT':
				return	(
						<div className='ui four column centered grid' style={{paddingTop: '32px'}}>
							<div className='row'>
								<h1 className='ui header'>Holiday Report</h1>
							</div>	
							
							<HolidayReport />
						</div>
					);
			case 'DEPARTMENT_MANAGEMENT':
				return	(
						<div className='ui four column centered grid' style={{paddingTop: '32px'}}>
							<div className='row'>
								<h1 className='ui header'>Department Management</h1>
							</div>	
							
							<div className='row'>
								<DepartmentManagement />
							</div>
						</div>
					);
			default:
				return	(
						<div className='ui four column centered grid' style={{paddingTop: '32px'}}>
							<h1 className='ui header'>Nothing to see here!</h1>
						</div>
					);
		}
	}
}

const mapStateToProps = state => {
  return {
    employee: state.employee.employee,
	  userId: state.signIn.user.id,
    openRequests: state.openLeaveRequests.openRequests && state.openLeaveRequests.openRequests.openLeaveRequests || [],
    numberOfPendingRequests: state.openLeaveRequests.openRequests && state.openLeaveRequests.openRequests.numberOfRequests || 0,
    allEmployees: state.allEmployeeData.allEmployees || []
  }
}

export default connect ( 
  mapStateToProps, {
  getEmployeeData,
  getOpenLeaveRequests,
  getAllEmployees
  }
)(Manager)