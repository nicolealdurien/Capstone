import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/pages/App';
import ProductManage from '../src/components/pages/ProductManage'
import BaseLayout from './components/pages/BaseLayout';
import CustRegisterPage from './components/pages/CustRegisterPage'
import reportWebVitals from './reportWebVitals';
import { createStore, applyMiddleware, compose } from 'redux'
import reducer from '../src/stores/reducer';
import { Provider } from 'react-redux'
import thunk from 'redux-thunk'
import { Router, Route, Switch } from 'react-router-dom'
import { createBrowserHistory } from 'history'

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(reducer, composeEnhancers(
  applyMiddleware(thunk) 
))

const history = createBrowserHistory()


ReactDOM.render(
  <React.StrictMode>
    <Provider store = {store}>
      <Router history = {history}>
        <BaseLayout>
          <Switch>
            <Route exact path = "/product-manage" component = {ProductManage} />
            <Route exact path = "/" component = {App} />
            <Route exact path = '/auth/register' component = {CustRegisterPage}/>
            {/* no routes below exist yet */}
            {/* 
            <Route exact path = '/auth/login' component = {LoginScreen}/>
            <Route exact path = '/auth/forgotpassword' component = {ForgotPswdScreen}/>
            <Route exact path = '/auth/passwordreset/:resetToken' component = {ForgotPswdScreen}/> */}
            
          </Switch>
        </BaseLayout>
      </Router>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);


reportWebVitals();
