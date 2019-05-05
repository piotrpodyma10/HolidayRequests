/* eslint-disable react/react-in-jsx-scope */
import {  DatesRangeInput } from 'semantic-ui-calendar-react'
import React, { Fragment } from 'react'
import { Form } from 'semantic-ui-react'
import moment from 'moment';
import 'moment/locale/en-gb';
import { connect } from 'react-redux'
import { 
  sendLeaveRequest,
  getEmployeeData
} from './../../Store/Actions/'
import './styles.scss'

class DateTimeFormInline extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      date: '',
      startDate: '',
      endDate: '',
      daysOff: '',
      error: false
    }
  }

  cancelModal = () => {
    this.props.openModal()
  }

  submitModal = async (data, e) => {
    e.preventDefault()
    const { startDate, endDate, daysOff } = data
    
    if (daysOff === 0) {
      this.setState({ error: true})
      return
    }

    await this.props.sendLeaveRequest(1,startDate, endDate, true, daysOff, 2)
    await this.props.getEmployeeData(1)
    await this.props.openModal()
    await this.props.displayRequestBar()
  }

  countWorkingDays = (days) => {
    const dates = days.split(' - ')
    const data = {}
    data.daysOff = 0

    if (dates[0].length < 1) return data
    const startDate = moment(dates[0], 'DD-MM-YYYY')
    const condition = dates[1].length < 1 && (startDate.isoWeekday() === 6 || startDate.isoWeekday() === 7)
    
    if (condition) return data
    data.startDate = startDate.format('MM-DD-YYYY')
    data.daysOff = 1

    if (dates[1].length < 1) return data
    let start = moment(dates[0], 'DD-MM-YYYY')
    const end = moment(dates[1], 'DD-MM-YYYY')
    const allDays = end.diff(start, 'days') +1
    let daysOff = allDays

    for(let i=0; i < allDays; i++) {
      if (start.isoWeekday() === 6 || start.isoWeekday() === 7) daysOff --
      start = start.add(1, 'days');
    }
    data.daysOff = daysOff
    data.endDate = end.format('MM-DD-YYYY')
    return data
  }

  handleChange = (event, {name, value}) => {
     if (this.state.hasOwnProperty(name)) {
       this.setState({ [name]: value });
     }
   }

   render() {
    const data = this.countWorkingDays(this.state.date)
    const daysOffText = `You take ${data.daysOff} ${data.daysOff === 1 ? 'day' : 'days'} off`
    return (
      <Form>
        <div className="formHeader">
          <div className="formTitle">
            Take some day off
          </div>
          <div className="formNumberAboutDays">
            {daysOffText}
          </div>
        </div>
        <DatesRangeInput localization='en-gb'
          inline
          name='date'
          marked={moment()}
          markColor={"olive"}
          initialDate={moment()}
          value={this.state.date}
          onChange={this.handleChange}
        />
        <div className="buttons">
          <button 
            className="acceptButton"
            onClick={(e) => this.submitModal(data, e)}
          > Accept
          </button>
          <button 
            className="cancelButton"
            onClick={this.cancelModal}
          > Cancel
          </button>
        </div>
          {this.state.error && <div className="error">You have to select any business day</div>}
      </Form>
    );
  }
 }

const mapStateToProps = state => {
  return {
  }
}

export default connect ( 
  mapStateToProps, {
    sendLeaveRequest,
    getEmployeeData
  }
)(DateTimeFormInline)
