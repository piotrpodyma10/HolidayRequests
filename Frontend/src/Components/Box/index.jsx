import React, { Component, Fragment } from 'react'
import './styles.scss'

class Box extends Component {
  render() {
    return (
      <Fragment>
        <div className="boxWrapper">
          <div 
            className="boxContainer">
            <div className="box">
              <div className="boxHeader">
                {this.props.title}
              </div>
              <div className="boxBody">
                {this.props.value}
              </div>
            </div>
          </div>
        </div>
      </Fragment>
    )
  }
}

export default Box