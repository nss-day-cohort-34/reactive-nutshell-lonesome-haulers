import { Route, Redirect } from "react-router-dom";
import React, { Component } from "react";
import Home from "./Home";
import ArticleList from "./article/ArticleList";
import FriendList from "./friend/FriendList";
import EventList from "./event/EventList";
import TaskList from "./task/TaskList";
import TaskForm from "./task/TaskForm";
import TaskEditForm from "./task/TaskEditForm";

export default class ApplicationViews extends Component {

  render() {
    return (
      <React.Fragment>

        <Route
          exact path="/" render={props => {
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
          exact path="/tasks" render={props => {
            return <TaskList {...props}/>
            // Remove null and return the component which will show the user's tasks
          }}
        />

        <Route path="/tasks/new" render={(props) => {
                return <TaskForm {...props} />
                }} />

          <Route
          path="/tasks/:taskId(\d+)/edit" render={props => {
            return <TaskEditForm {...props} />
          }} />

      </React.Fragment>
    );
  }
}
