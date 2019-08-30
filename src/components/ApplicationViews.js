import { Route, Redirect } from "react-router-dom";
import React, { Component } from "react";
import Login from "./auth/Login"
import Register from "./auth/Register"
import Dashboard from "./Dashboard"
import ArticleList from "./article/ArticleList";
import FriendList from "./friend/FriendList";
import EventList from "./event/EventList";
import TaskList from "./task/TaskList";



class ApplicationViews extends Component {
  isAuthenticated = () => sessionStorage.getItem("credentials") !== null
  render() {
    return (
      <React.Fragment>
        <Route exact path="/" component={Login} />
        <Route
          exact path="/home" render={props => {
            if (this.isAuthenticated()) {
              return <Dashboard {...props} />
            } 
            return <Redirect to="/" />
            // Remove null and return the component which will show news articles
          }}
        />

        <Route
          path="/register" render={props => {
            return <Register {...props} />
            // Remove null and return the component which will show list of friends
          }}
        />
        <Route
          exact path="/articles" render={props => {
            if (this.isAuthenticated()) {
              return <Dashboard {...props} />
            } 
            return <Redirect to="/" />
            // Remove null and return the component which will show news articles
          }}
        />

        <Route
          path="/friends" render={props => {
            if (this.isAuthenticated()) {
              return <Dashboard {...props} />
            } 
            return <Redirect to="/" />
            // Remove null and return the component which will show list of friends
          }}
        />

        <Route
          path="/events" render={props => {
            if (this.isAuthenticated()) {
              return <Dashboard {...props} />
            } 
            return <Redirect to="/" />
            // Remove null and return the component which will show the messages
          }}
        />

        <Route
          path="/tasks" render={props => {
            if (this.isAuthenticated()) {
              return <Dashboard {...props} />
            } 
            return <Redirect to="/" />
            // Remove null and return the component which will show the user's tasks
          }}
        />


      </React.Fragment>
    );
  }
}

export default ApplicationViews
