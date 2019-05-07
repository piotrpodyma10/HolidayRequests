import React from 'react'
import { connect } from 'react-redux'
import './styles.scss'
import EmployeeRow from './employeeRow';

const weekDays = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']

class HolidayReport extends React.Component {
    constructor(props){
        super(props);
        const currentDate = new Date();
        
        this.state = {
            selectedDate: new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0)
        }
    }

    render() {
        
        return (
            <div>
                {this.state.selectedDate.getMonth()} <br/>
                {this.state.selectedDate.getFullYear()} <br/>
                {this.state.selectedDate.getDate()} <br/>
                <button onClick={() => this.setState({selectedDate: new Date(this.state.selectedDate.getFullYear(), this.state.selectedDate.getMonth(), 0)})}> - </button> <br/>
                <button onClick={() => this.setState({selectedDate: new Date(this.state.selectedDate.getFullYear(), this.state.selectedDate.getMonth() + 2, 0)})}> + </button> <br/>
                {this.renderDaysOfMonth()}
                {this.renderRows()}
            </div>
        );
    }

    renderDaysOfMonth(){
        return (
            <div>
                {[...Array(this.state.selectedDate.getDate())].map((v, i) =>
                    <div className='dayHeader'> {i + 1} <br /> {this.getWeekDay(i)}</div>
                )}
            </div>
        )
    }
    
    getWeekDay(dayNumber) {
        const selectedDate = this.state.selectedDate;
        const date = new Date(selectedDate.getFullYear(), selectedDate.getMonth(), dayNumber);

        return weekDays[date.getDay()];
    }

    renderRows(){
        const daysQuantity = this.state.selectedDate.getDate();
        return (
            <>
                {this.props.employees.map((employee) =>
                    <EmployeeRow employee={employee} daysQuantity={daysQuantity} selectedDate={this.state.selectedDate}/>
                )}
            </>
        )
    }
}

const mapStateToProps = state => {
  return {
    employees: [{
            firstName: 'A_First',
            lastName: 'A_Last',
            requests: [
                {
                    startDate: new Date('2019-05-04'),
                    endDate: new Date('2019-05-11'),
                    status: 'Open'
                },
                {
                    startDate: new Date('2019-05-30'),
                    endDate: new Date('2019-06-7'),
                    status: 'Accepted'
                }
            ]
        },{
            firstName: 'B_First',
            lastName: 'B_Last',
            requests: [
                {
                    startDate: new Date('2019-04-29'),
                    endDate: new Date('2019-05-05'),
                    status: 'Open'
                },
                {
                    startDate: new Date('2019-05-15'),
                    endDate: new Date('2019-05-19'),
                    status: 'Accepted'
                }
            ]
        }
    ],
  }
}

export default connect ( 
  mapStateToProps, {
  }
)(HolidayReport)