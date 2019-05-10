import React from 'react';
import { connect } from 'react-redux';
import './styles.scss';
import DayTile from './dayTile';
import faker from 'faker';

class EmployeeRow extends React.Component {
    
    render(){
        const days = this.getEmployeeMonth(this.props.employee.requests);

        return (
            <tr>
                <td>
                    <img className='ui avatar image' src={`${faker.image.avatar()}`} />
                </td>
                <td>
                    <h4 className='ui header'>
                        <div className='content'>
                            {this.props.employee.lastName}
                            <div className='sub header'>{this.props.employee.firstName}</div>
                        </div>
                    </h4>
                </td>
                <td className='fifteen wide column'>
                    { days.map( day => <DayTile day={day} />) }
                </td>
            </tr>
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
                const startDate = new Date(request.startDate);
                const endDate = new Date(request.endDate);
                if(startDate <= currentDate && currentDate <= endDate) {
                    days[i] = {
                        status: request.status,
                        fromDate: startDate,
                        toDate: endDate
                    };
                }
            }
        });

        return days;
    }
}

export default EmployeeRow;