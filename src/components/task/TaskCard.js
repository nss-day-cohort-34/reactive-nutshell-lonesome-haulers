import React, { Component } from 'react'
import { Link } from "react-router-dom";
import { Button } from 'reactstrap';
// import './task.css'


class TaskCard extends Component {
 
    handleCheck = event => {
        event.preventDefault()
        this.props.task.isCompleted = !this.props.task.isCompleted
        this.props.updateTask(this.props.task)
    }
 
    render() {

    return (
       <>
       <div className="card">
        <div className="card-content">
        <h3 className="task__name">{this.props.task.task}</h3>
          <p>Due Date: {this.props.task.date}</p>
          <p>Mark as Done: <input type="checkbox" id="isCompleted" checked={this.props.task.isCompleted} onChange={this.handleCheck} /></p>
          <div className="card__Buttons">
          <Button outline color="dark" size="sm"
          onClick={() => {this.props.history.push(`/tasks/${this.props.task.id}/edit`)}}>Edit</Button>
          <Button outline color="danger" size="sm" onClick={() => this.props.deleteTask(this.props.task.id)}>Delete</Button></div>
        </div></div>
       </>
    );
  }
}

export default TaskCard;
