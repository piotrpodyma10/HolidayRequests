import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux'
import reducers from './Store/Reducers'
import App from './App'
import thunk from 'redux-thunk'
import Employee from './Views/Employee'
import Manager from './Views/Manager'
import RequestHistory from './Views/RequestHistory'
import { Router, Route } from 'react-router-dom'
import { createBrowserHistory } from 'history'

const middlewares = [thunk]
const store = createStore(reducers, applyMiddleware(...middlewares))

ReactDOM.render(
  <Provider store={store}>
    <Router history={createBrowserHistory()}>
      <Route 
        exact component={App}
        path="/"
      />
      <Route
        component={Employee}
        path="/Employee"
      />
      <Route
        component={Manager}
        path="/Manager"
      />
      <Route
        component={RequestHistory}
        path="/RequestHistory"
      />
    </Router>
  </Provider>,
  document.querySelector('#root')
)