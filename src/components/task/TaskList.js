import React, { Component } from "react"
import ReactModal from 'react-modal'
import TaskCard from './TaskCard'
import TaskCompleted from './TaskCompleted'
import TaskManager from '../../modules/TaskManager'
import './TaskList.css'

ReactModal.setAppElement('#root')


class TaskList extends Component {
    //define what this component needs to render
    state = {
        tasks: [],
        isHidden: true,
    }

    
username = (JSON.parse(sessionStorage.getItem("credentials")))

componentDidMount(){
    console.log("TASK LIST: ComponentDidMount");
    
    TaskManager.getAll(this.username.id)
    .then((tasks) => {

        this.setState({
            tasks: tasks,
        })
    })
}


toggleHidden() {
    this.setState({
        isHidden: !this.state.isHidden
    })
}

deleteTask = id => {
    TaskManager.delete(id)
    .then(() => {
    TaskManager.getAll(this.username.id)
    .then((newTasks) => {
        this.setState({
            tasks: newTasks
        })
    })
    })
}

updateTask = taskObj => {
    TaskManager.saveEditedTask(taskObj)
        .then(() => {
            this.componentDidMount()
        })
}

render(){
    console.log("task obj", this.state.tasks);
    
    return(
    <React.Fragment>
            <section className="task-content">
                <h1 className="feature__name">Tasks</h1>
            <button type="button"
                className="button"
                onClick={() => {this.props.history.push("/tasks/new")}}>
                Add a new task
            </button>
            <button className="button" onClick={this.toggleHidden.bind(this)}>Toggle Completed Tasks</button>
            </section>
            <div className="task_container">
                {this.state.tasks.filter(task => task.isCompleted === false && task.userId === this.username.id)
                .map(task =>
                <TaskCard
                    key={task.id}
                    task={task}
                    handleCheck={this.handleCheck}
                    deleteTask={this.deleteTask}
                    updateTask={this.updateTask}
                    {...this.props}
                />
                )}
            </div>
            <div className="task_completed">
                {this.state.tasks.filter(task => task.isCompleted === true && !this.state.isHidden && task.userId === this.username.id)
                    .map(task =>
                        <TaskCompleted
                    key={task.id}
                    task={task}
                    handleCheck={this.handleCheck}
                    deleteTask={this.deleteTask}
                    updateTask={this.updateTask}
                    {...this.props}
                />
                )}
            </div>
        </React.Fragment>
    )
}
}   

export default TaskList;