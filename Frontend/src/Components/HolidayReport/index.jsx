import React from 'react'
import { connect } from 'react-redux'
import './styles.scss'
import EmployeeRow from './employeeRow';
import { changeToPreviousMonthRequests, changeToNextMonthRequests } from '../../Store/Actions/managerActions'
import { getCurrentMonthsRequests } from './../../Store/Actions/'

const weekDays = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']

class HolidayReport extends React.Component {
    constructor(props){
        super(props);
        const currentDate = new Date();
        
        this.state = {
            selectedDate: new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0)
        }
    }

    componentDidMount(){
        this.props.getCurrentMonthsRequests(new Date(), this.props.departmentId);
    }

    render() {
        return (
            <>
                <div className='row' style={{display: 'flex', flexWrap: 'nowrap', justifyContent: 'flex-end', alignItems: 'center'}}>
                    <button className='circular ui icon button' style={{margin: '30px 20px 20px'}} onClick={() => this.onPreviousMonthClick()}>
                        <i className='icon angle left'></i>
                    </button>
                    <h2>{this.state.selectedDate.toLocaleString('en-US', { year: 'numeric', month: 'long' })}</h2>
                    <button className='circular ui icon button' style={{margin: '30px 40px 20px'}} onClick={() => this.onNextMonthClick()}>
                        <i className='icon angle right'></i>
                    </button>
                </div>
                <div className='row'>
                    <table>
                        {this.renderDaysOfMonth()}
                        {this.renderRows()}
                    </table>
                </div>
            </>
        );
    }

    onPreviousMonthClick(){
        const newDate = new Date(Date.UTC(this.state.selectedDate.getFullYear(), this.state.selectedDate.getMonth() - 1, 1));
        this.setState({ selectedDate: new Date(this.state.selectedDate.getFullYear(), this.state.selectedDate.getMonth(), 0) });

        this.props.changeToPreviousMonthRequests(newDate, this.props.departmentId);
    }

    onNextMonthClick(){
        const newDate = new Date(Date.UTC(this.state.selectedDate.getFullYear(), this.state.selectedDate.getMonth() + 1, 1));
        this.setState({ selectedDate: new Date(this.state.selectedDate.getFullYear(), this.state.selectedDate.getMonth() + 2, 0) });

        this.props.changeToNextMonthRequests(newDate, this.props.departmentId);
    }

    renderDaysOfMonth(){
        return (
            <tr>
                <td></td>
                <td></td>
                <td>
                    {[...Array(this.state.selectedDate.getDate())].map((v, i) =>
                        <div className='dayHeader'> {i + 1} <br /> {this.getWeekDay(i)}</div>
                    )}
                </td>
            </tr>
        )
    }
    
    getWeekDay(dayNumber) {
        const selectedDate = this.state.selectedDate;
        const date = new Date(selectedDate.getFullYear(), selectedDate.getMonth(), dayNumber);

        return date.toLocaleString('en-US', { weekday: 'short' });
    }

    renderRows(){
        const daysQuantity = this.state.selectedDate.getDate();
        return (
            <>
                {this.props.currentMonthEmployeeRequests.map((employee) =>
                    <EmployeeRow employee={employee} daysQuantity={daysQuantity} selectedDate={this.state.selectedDate}/>
                )}
            </>
        )
    }
}

const mapStateToProps = state => {
  return {
      previousMonthEmployeeRequests: state.monthRequests.previous,
      currentMonthEmployeeRequests: state.monthRequests.current,
      nextMonthEmployeeRequests: state.monthRequests.next,
      departmentId: state.employee.employee.departmentId
  }
}

export default connect (mapStateToProps, {
    changeToPreviousMonthRequests,
    changeToNextMonthRequests,
    getCurrentMonthsRequests,
})(HolidayReport);