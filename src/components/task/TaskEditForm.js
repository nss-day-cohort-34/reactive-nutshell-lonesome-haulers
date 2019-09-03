import React, { Component } from "react"
import TaskManager from "../../modules/TaskManager"
// import "./OwnerForm.css"

class TaskEditForm extends Component {
    //set the initial state
    state = {
      taskName: "",
        date: "",
        isCompleted: false,
        loadingStatus: true,
    };

    handleFieldChange = evt => {
      const stateToChange = {}
      stateToChange[evt.target.id] = evt.target.value
      this.setState(stateToChange)
    }

    updateExistingTask = evt => {
      evt.preventDefault()
      this.setState({ loadingStatus: true });
      const editedTask = {
        id: this.props.match.params.taskId,
        task: this.state.taskName,
        date: this.state.date,
        userId: this.state.userId,
        isCompleted: false,
      };

      TaskManager.update(editedTask)
      .then(() => this.props.history.push("/tasks"))
    }

    componentDidMount() {
      TaskManager.get(this.props.match.params.taskId)
      .then(task => {
          this.setState({
            taskName: task.task,
            date: task.date,
            loadingStatus: false,
            userId: task.userId,
            isCompleted: false,
          });
      });
    }

    render() {
      return (
        <>
        <form>
          <fieldset>
            <div className="formgrid">
              <label htmlFor="taskName">Task Name</label>
              <input
                type="text"
                required
                className="form-control"
                onChange={this.handleFieldChange}
                id="taskName"
                value={this.state.taskName}
              />

            <label htmlFor="date">Due Date</label>  
              <input
                type="date"
                required
                className="form-control"
                onChange={this.handleFieldChange}
                id="date"
                value={this.state.date}
              />
            </div>
            <div className="alignRight">
              <button
                type="button" disabled={this.state.loadingStatus}
                onClick={this.updateExistingTask}
                className="btn btn-primary"
              >Submit</button>
            </div>
          </fieldset>
        </form>
        </>
      );
    }
}

export default TaskEditForm