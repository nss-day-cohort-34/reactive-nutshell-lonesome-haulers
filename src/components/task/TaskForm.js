import React, { Component } from 'react';
import TaskManager from '../../modules/TaskManager';
import ReactModal from 'react-modal'
import { Button } from 'reactstrap';
// import './TaskForm.css'

const userId = parseInt(sessionStorage.getItem("userId"))

const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)'
    }
};
ReactModal.setAppElement('#root')

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
   
    constructor() {
        super();
        this.openModal = this.openModal.bind(this);
        this.closeModal = this.closeModal.bind(this);
    }

    openModal() {
        this.setState({ modalIsOpen: true });
    }


    closeModal() {
        this.setState({ modalIsOpen: false });
    }

    constructNewTask = evt => {
        const username = (JSON.parse(sessionStorage.getItem("credentials")))
        evt.preventDefault();
        if (this.state.taskName === "" || this.state.date === "") {
            window.alert("Please input a task name and due date");
        } else {
            this.setState({ loadingStatus: true });
            // const userId = parseInt(sessionStorage.getItem("userId"))
            const task = {
                task: this.state.taskName,
                date: this.state.date,
                isCompleted: this.state.isCompleted,
                userId: parseInt(username.id),
                modalIsOpen: false
            };

            // Create the task and redirect user to task list
            TaskManager.post(task)
            .then(() => this.props.history.push("/tasks"));
        }
    };

    render(){

        return(
            <>
            <ReactModal
                isOpen={this.state.modalIsOpen}
                onRequestClose={this.closeModal}
                style={customStyles}
                contentLabel="Modal"
                ></ReactModal>
        <div className="task_form_container">
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
                        <Button outline color="dark" size="sm" className=""
                        type="button"
                        disabled={this.state.loadingStatus}
                        onClick={this.constructNewTask}
                        >Submit</Button>
                    </div>
                </fieldset>
            </form></div>
        </>
        )
    }
}

export default TaskForm