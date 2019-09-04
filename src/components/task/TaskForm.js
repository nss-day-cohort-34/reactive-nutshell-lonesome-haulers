import React, { Component } from 'react';
import TaskManager from '../../modules/TaskManager';
// import './TaskForm.css'



class TaskForm extends Component {
    state = {
        task: "",
        date: "",
        isCompleted: false,
        loadingStatus: false,
    };
    
    
    handleFieldChange = evt => {
        const stateToChange = {};
        stateToChange[evt.target.id] = evt.target.value;
        this.setState(stateToChange);
    };

    /*  Local method for validation, set loadingStatus, create employee object, invoke the TaskManager post method, and redirect to the full employee list
    */
   

    constructNewTask = evt => {
        const username = (JSON.parse(sessionStorage.getItem("credentials")))
        evt.preventDefault();
        if (this.state.taskName === "" || this.state.date === "") {
            window.alert("Please input a task name and due date");
        } else {
            this.setState({ loadingStatus: true });
            const task = {
                task: this.state.taskName,
                date: this.state.date,
                isCompleted: this.state.isCompleted,
                userId: parseInt(username.id),
            };

            // Create the task and redirect user to task list
            TaskManager.post(task)
            .then(() => this.props.history.push("/tasks"));
        }
    };

    render(){

        return(
            <>
            <form>
                <fieldset>
                    <div className="formgrid">
                        <label htmlFor="taskName"> Name</label>
                        <input type="text"
                        required
                        onChange={this.handleFieldChange}
                        id="taskName"
                        placeholder="Task name"
                        />
                        <label htmlFor="date"> Date</label>
                        <input
                        type="date"
                        required
                        onChange={this.handleFieldChange}
                        id="date"
                        placeholder="Due Date"
                        />
                        
                    </div>
                    <div className="alignRight">
                        <button className="btn-primary"
                        type="button"
                        disabled={this.state.loadingStatus}
                        onClick={this.constructNewTask}
                        >Submit</button>
                    </div>
                </fieldset>
            </form>
        </>
        )
    }
}

export default TaskForm