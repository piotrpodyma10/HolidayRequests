import React, { Component, Fragment } from 'react'
import DateTimeFormInline from './../Calendar/'
import './styles.scss'

class Modal extends Component {
  render() {
    return (
      <div className="modalContainer">
        <div className="modal">
          <div className="calendar">
            <DateTimeFormInline openModal={this.props.openModal} displayRequestBar={this.props.displayRequestBar} />
          </div>
        </div>
      </div>
    )
  }
}

export default Modal