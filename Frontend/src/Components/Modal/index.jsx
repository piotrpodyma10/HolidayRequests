import React, { Component, Fragment } from 'react'
import './styles.scss'

class Modal extends Component {
  render() {
    return (
      this.props.openModal && <Fragment>
      <div className="modalContainer">
        <div className="modal">
          <div className="calendar">DATA</div>
          <div className="data">DANE</div>
        </div>
      </div>
      </Fragment>
    )
  }
}

export default Modal