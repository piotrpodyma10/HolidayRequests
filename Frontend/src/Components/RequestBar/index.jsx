import React, { Component } from 'react'
import './styles.scss'

class RequestBar extends Component {
  returnCorrectlyBarText = (type) => {
    switch (type) {
      case 'update':
        return 'Your request was successfully updated'
      case 'delete':
        return 'Your request was successfully deleted'
      default:
        return 'Your request was added successfully'
    }
  }


  render() {
    return (
      <div className="requestBar" style={ this.props.typeOfBar === 'delete' && { backgroundColor: '#980000'} || {}}>
        { this.returnCorrectlyBarText(this.props.typeOfBar) }
      </div>
    )
  }
}

export default RequestBar