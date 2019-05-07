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
import { BrowserRouter, Route } from 'react-router-dom'

const loadState = () => {
  try {
    const serializedState = localStorage.getItem('state');
    if(serializedState === null) {
      return undefined
    }
    return JSON.parse(serializedState);
  } catch (e) {
    return undefined
  }
};

const saveState = (state) => {
  const obj = {
    'signIn': {
      'user': {
        'id': state.signIn.user.id
      }
    }
  }
  try {
    const serializedState = JSON.stringify(obj)
    localStorage.setItem('state', serializedState)
  } catch (e) {
    console.log(e);
  }
}
const peristedState = loadState()
const middlewares = [thunk]
const store = createStore(
  reducers, 
  peristedState,
  applyMiddleware(...middlewares)
)

store.subscribe(() => {
  saveState(store.getState())
})

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
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
    </BrowserRouter>
  </Provider>,
  document.querySelector('#root')
)