import React, { Component } from 'react'
import { signInUser } from '../../Store/Actions/userActions'
import { connect } from 'react-redux'
import { createBrowserHistory } from 'history'
import './styles.scss'

class LoginView extends Component {
  state = {
    email: '',
    password: '',
    error: false
  }

  addErrorClass(error) {
    return error ? 'error' : ''
  }

  componentWillReceiveProps(nextProps) {
    if(nextProps.user !== this.props.user) {
      if(nextProps.user.role) {
        createBrowserHistory({ forceRefresh: true }).push(`/${nextProps.user.role}`)
      } else {
        this.setState({ error: true})
      }
    }
  }
    
  render() {
    return (
      <div className="Container">
        <div className='ui form'>
          <div>
            <div className={`field ${this.addErrorClass(this.state.error)}`}>
              <div className='ui left icon input'>
                <input type='text' placeholder='Email' value={this.state.email} onChange={(e) => this.setState({email: e.target.value})} />
                <i className='user icon'></i>
              </div>
            </div>
            
            <div className={`field ${this.addErrorClass(this.state.error)}`}>
              <div className='ui left icon input'>
                <input type='password' placeholder='Password' value={this.state.password}  onChange={(e) => this.setState({password: e.target.value})} />
                <i className='lock icon'></i>
              </div>
            </div>
            <div className="field">
              <button className='ui blue submit button' onClick={() => this.props.signInUser(this.state.email, this.state.password)} label='Sign In'>
                Sign In
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    user: state.signIn.user
  }
}

export default connect ( 
  mapStateToProps, {
    signInUser
  }
)(LoginView)