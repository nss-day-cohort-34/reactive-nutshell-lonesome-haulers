import { Route, Redirect } from "react-router-dom";
import React, { Component } from "react";
import Home from "./Home";
import ArticleList from "./article/ArticleList";
import FriendList from "./friend/FriendList";
import EventList from "./event/EventList";
import TaskList from "./task/TaskList";

export default class ApplicationViews extends Component {

  render() {
    return (
      <React.Fragment>

        <Route
          exact path="/home" render={props => {
            return <Home />
            // Remove null and return the component which will show news articles
          }}
        />
        <Route
          exact path="/articles" render={props => {
            return <ArticleList />
            // Remove null and return the component which will show news articles
          }}
        />

        <Route
          path="/friends" render={props => {
            return <FriendList />
            // Remove null and return the component which will show list of friends
          }}
        />

        <Route
          path="/events" render={props => {
            return <EventList />
            // Remove null and return the component which will show the messages
          }}
        />

        <Route
          path="/tasks" render={props => {
            return <TaskList />
            // Remove null and return the component which will show the user's tasks
          }}
        />

      </React.Fragment>
    );
  }
}
