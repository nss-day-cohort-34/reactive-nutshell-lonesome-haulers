import React, { Component } from 'react';
import { Button } from 'reactstrap';


class TaskCompleted extends Component {

handleCheck = event => {
    event.preventDefault()
    this.props.task.isCompleted = !this.props.task.isCompleted
    this.props.updateTask(this.props.task)
}

    render() {
        return (
            <>
            <div className="card-completed">
                 
                    <h3 className="taskComplete_name"><b>{this.props.task.task}</b></h3>
                    <p>Date: {this.props.task.date}</p>
                    <p>Mark as Done: <input type="checkbox" id="isCompleted" checked={this.props.task.isCompleted} onChange={this.handleCheck} /></p>
                    <Button variant="light" size="sm" onClick={() => this.props.deleteTask(this.props.task.id)}>Delete</Button>
            </div>
            </>
        );
    }
}

export default TaskCompleted;
