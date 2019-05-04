import React, { Component, Fragment } from 'react'
import DateTimeFormInline from './../Calendar/'
import './styles.scss'

class Modal extends Component {
  render() {
    return (
      this.props.openedModal && <Fragment>
      <div className="modalContainer">
        <div className="modal">
          <div className="calendar">
            <DateTimeFormInline openedModal={this.props.openedModal} openModal={this.props.openModal} />
          </div>
        </div>
      </div>
      </Fragment>
    )
  }
}

export default Modal