import React from 'react'
import { connect } from 'react-redux'
import './styles.scss'
import DayTile from './dayTile';

class EmployeeRow extends React.Component {
    
    render(){
        const days = this.getEmployeeMonth(this.props.employee.requests);

        return (
            <div>
                { days.map( day => <DayTile day={day} />) }
            </div>
        )
    }

    getEmployeeMonth(requests) {
        let days = [...Array(this.props.daysQuantity).fill({status: 'WORK_DAY'})];
        
        if(!requests || requests.length == 0) { return days; }

        let currentDate = new Date(this.props.selectedDate);
        currentDate.setUTCHours(0, 0, 0, 0);
        
        requests.forEach(request => {
            for(let i = 0; i < days.length; i++){
                currentDate.setDate(i + 1);

                if(currentDate >= request.startDate && currentDate <= request.endDate) {
                    days[i] = {
                        status: request.status,
                        fromDate: request.startDate,
                        toDate: request.endDate
                    };
                }
            }
        });

        return days;
    }
}

export default EmployeeRow;