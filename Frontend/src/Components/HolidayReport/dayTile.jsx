import React from 'react'
import { connect } from 'react-redux'
import './styles.scss'

class DayTile extends React.Component {
    render(){
        
        switch (this.props.day.status) {
            case 'Open':
                return (<div 
                            className='dayCell openRequest'
                            data-title={`Waiting for approval`} 
                            data-tooltip={`Waiting for approval - From: ${this.getLocaleDate(this.props.day.fromDate)}, To: ${this.getLocaleDate(this.props.day.toDate)}`}
                        ></div>)
            case 'Accepted':
                return (<div 
                        className='dayCell acceptedRequest'
                        data-title={`Approved vacation`} 
                        data-tooltip={`Approved vacation - From: ${this.getLocaleDate(this.props.day.fromDate)}, To: ${this.getLocaleDate(this.props.day.toDate)}`}
                    ></div>)
            default:
                return (<div className='dayCell'></div>)
        }
    }

    getLocaleDate(date){
        return date.toLocaleString('default', { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric' })
    }
}

export default DayTile;