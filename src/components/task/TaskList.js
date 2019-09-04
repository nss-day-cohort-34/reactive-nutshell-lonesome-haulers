import React, { Component } from "react"
import ReactModal from 'react-modal'
import TaskCard from './TaskCard'
import TaskCompleted from './TaskCompleted'
import TaskManager from '../../modules/TaskManager'
import { Button } from 'reactstrap';
import './TaskList.css'

ReactModal.setAppElement('#root')



class TaskList extends Component {
    //define what this component needs to render
    state = {
        tasks: [],
        isHidden: true,
    }

    

componentDidMount(){
    const username = (JSON.parse(sessionStorage.getItem("credentials")))
    TaskManager.getAll(username.id)
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
    const username = (JSON.parse(sessionStorage.getItem("credentials")))
    TaskManager.delete(id)
    .then(() => {
    TaskManager.getAll(username.id)
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
    const username = (JSON.parse(sessionStorage.getItem("credentials")))
    return(
    <React.Fragment>
            <section className="task-content">
                <h1 className="feature__name">Tasks</h1>
                <hr></hr>
            <Button outline color="secondary" size="sm"
                onClick={() => {this.props.history.push("/tasks/new")}}>
                Add a new task
            </Button>
            <Button outline color="secondary" size="sm" className="outline_button" onClick={this.toggleHidden.bind(this)}>Toggle Completed Tasks</Button>
            </section>
            <div className="task_container">
                {this.state.tasks.filter(task => task.isCompleted === false && task.userId === username.id)
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
                {this.state.tasks.filter(task => task.isCompleted === true && !this.state.isHidden && task.userId === username.id)
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