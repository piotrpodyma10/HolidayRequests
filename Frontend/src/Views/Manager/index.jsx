import React, { Component, Fragment } from 'react'
import './styles.scss'
import Box from '../../Components/Box'
import { connect } from 'react-redux'
import { getEmployeeData } from './../../Store/Actions/'
import { createBrowserHistory } from 'history'
import HolidayRequests from '../../Components/HolidayRequests'
import HolidayReport from '../../Components/HolidayReport'
import EmployeeManagement from '../../Components/EmployeeManagement'
import DepartmentManagement from '../../Components/DepartmentManagement'


class Manager extends Component {

	state = {
		context: 'none'
	}

	componentDidMount() {
		this.props.getEmployeeData(2)
	}

	render() {
		return (
			<div className='managerContainer'>
				{this.renderSidebar()}
				{this.renderBoard()}
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
							<Box title={'Pending leave requests:'} value={'5'}/>
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
								<HolidayRequests />
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
								<EmployeeManagement />
							</div>
						</div>
					);
			case 'HOLIDAY_REPORT':
				return	(
						<div className='ui four column centered grid' style={{paddingTop: '32px'}}>
							<div className='row'>
								<h1 className='ui header'>Holiday Report</h1>
							</div>	
							
							<div className='row'>
								<HolidayReport />
							</div>
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
	employee: state.employee.employee
  }
}

export default connect ( 
  mapStateToProps, {
	getEmployeeData
  }
)(Manager)