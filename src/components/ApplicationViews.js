import { Route, Redirect } from "react-router-dom";
import React, { Component } from "react";
import Login from "./auth/Login"
import Register from "./auth/Register"
import Dashboard from "./Dashboard"

export default class ApplicationViews extends Component {

  render() {
    return (
      <React.Fragment>

        <Route
          exact path="/" render={props => {
            return <Login {...props}/>
            // Remove null and return the component which will show news articles
          }}
        />

        <Route
          path="/register" render={props => {
            return <Register {...props}/>
            // Remove null and return the component which will show list of friends
          }}
        />

        <Route
          path="/home" render={props => {
            return <Dashboard />
            // Remove null and return the component which will show the messages
          }}
        />

        <Route
          path="/tasks" render={props => {
            return null
            // Remove null and return the component which will show the user's tasks
          }}
        />
        
      </React.Fragment>
    );
  }
}
