import React, { Component } from "react"
import ReactModal from 'react-modal'
import TaskCard from './TaskCard'
import TaskManager from '../../modules/TaskManager'
import './TaskList.css'
ReactModal.setAppElement('#root')

const userId = parseInt(sessionStorage.getItem("userId"))
class TaskList extends Component {
    //define what this component needs to render
    state = {
        tasks: [],
        isCompleted: false,
        userId
    }

    

componentDidMount(){
    console.log("TASK LIST: ComponentDidMount");
    //getAll from TaskManager and hang on to that data; put it in state
    const userId = parseInt(sessionStorage.getItem("userId"))
    TaskManager.getAll(this.userId)
    .then((tasks) => {
        this.setState({
            tasks: tasks,
            isCompleted: false,
            userId
        })
    })
}

handleCheck = (id, event) => {
    console.log("Checked")
}

userId = parseInt(sessionStorage.getItem("userId"))

deleteTask = id => {
    TaskManager.delete(id)
    .then(() => {
    TaskManager.getAll(this.userId)
    .then((newTasks) => {
        this.setState({
            tasks: newTasks
        })
    })
    })
}

render(){
    console.log("task obj", this.state.tasks);

    return(
    <>
    <section className="task-content">
        <h1 className="feature__name">Tasks</h1>
    <button type="button"
        className="btn"
        onClick={() => {this.props.history.push("/tasks/new")}}>
        Add a new task
    </button>
    </section>
    <div className="task_container">
        {this.state.tasks.map(task =>
        <TaskCard
            key={task.id}
            task={task}
            handleCheck={this.handleCheck}
            deleteTask={this.deleteTask}
            {...this.props}
        />
        )}
    </div>
    
    </>
    )
}
}   

export default TaskList;