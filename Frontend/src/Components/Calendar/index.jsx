/* eslint-disable react/react-in-jsx-scope */
import {  DatesRangeInput } from 'semantic-ui-calendar-react'
import React from 'react'
import { Form } from 'semantic-ui-react'
import moment from 'moment';
import 'moment/locale/en-gb';
import { connect } from 'react-redux'
import { sendLeaveRequest } from './../../Store/Actions/'

class DateTimeFormInline extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      date: '',
      startDate: '',
      endDate: '',
      daysOff: '',
      error: false
    };
  }

  cancelModal = () => {
    this.props.openModal()
  }

  submitModal = (data, e) => {
    e.preventDefault()
    const { startDate, endDate, daysOff } = data
    if (daysOff === "0") {
      this.setState({ error: true})
      return
    }

    this.props.sendLeaveRequest(1,startDate, endDate, true, daysOff, 2)
    this.props.openModal()
  }

  countWorkingDays = (days) => {
    const dates = days.split(' - ')
    const data = {}
    data.daysOff = "0"
    if (dates[0].length < 1) return data
    data.startDate = moment(dates[0], 'DD-MM-YYYY').format('MM-DD-YYYY')
    data.daysOff = "1"
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
    const daysOffText = `You take ${data.daysOff} ${data.daysOff === "1" ? 'one day' : 'days'} off`
    return (
      <Form>
        {daysOffText}
        <DatesRangeInput localization='en-gb'
          inline
          name='date'
          marked={moment()}
          markColor={"olive"}
          // inlineLabel
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
            className="declimeButton"
            onClick={this.cancelModal}
          > Reject
          </button>
          {this.state.error && <div className="error">NIE WOLNMO!</div>}
        </div>
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
    sendLeaveRequest
  }
)(DateTimeFormInline)