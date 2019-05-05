import React, { Component } from 'react'
import { connect } from 'react-redux'
import './styles.scss'

class RequestHistory extends Component {
  render() {
    return (
      <div className="requestHistoryContainer">
        <div className="menu"></div>
        <div className="requestHistory">

        </div>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
  }
}

export default connect ( 
  mapStateToProps, {
  }
)(RequestHistory)