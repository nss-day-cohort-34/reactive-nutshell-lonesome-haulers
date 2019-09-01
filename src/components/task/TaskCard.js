import React, { Component } from 'react'
import { Link } from "react-router-dom";
// import './task.css'


class TaskCard extends Component {
  render() {

    return (
       <>
        <div className="card-content">
        <h3 className="task__name">{this.props.task.task}</h3>
          <p>Due Date: {this.props.task.date}</p>
          <p>Done: {this.props.task.isCompleted}</p><input type="checkbox" checked={this.props.isCompleted} onChange={() => this.handleCheck}/>
          <div className="card__Buttons">
          <button className="btn" type="button"
          onClick={() => {this.props.history.push(`/tasks/${this.props.task.id}/edit`)}}>Edit</button>
          <button className="btn" type="button" onClick={() => this.props.deleteTask(this.props.task.id)}>Delete</button></div>
        </div>
       </>
    );
  }
}

export default TaskCard;
