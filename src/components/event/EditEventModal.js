import React, { Component } from "react"
import EventManager from '../../modules/EventManager'


class EditEventModal extends Component {

    state = {
        eventName: "",
        location: "",
        date: "",
        id: 0,
        loadingStatus: true
    }

    handleFieldChange = event => {
        const stateToChange = {};
        stateToChange[event.target.id] = event.target.value;
        this.setState(stateToChange);
    };

    updateExistingEvent = event => {
        const username = JSON.parse(sessionStorage.getItem("credentials"))
        event.preventDefault()
        if (this.state.eventName === "" || this.state.location === "" || this.state.date === "") {
            window.alert("Please fill out all fields")
        } else {
            this.setState({ loadingStatus: true })
            // const currentUser = EventFilterFunction.foundUser()
            const editedEvent = {
                eventName: this.state.eventName,
                location: this.state.location,
                date: this.state.date,
                id: parseInt(this.state.id),
                userId: username.id
            }
            EventManager.update(editedEvent)
                .then(() => {
                    this.props.closeModal()
                    this.props.didMountFunction()
                })

        }
    }

    componentDidMount() {
        EventManager.get(this.props.event.id)
        .then(event => {
            this.setState({
              eventName: event.eventName,
              location: event.location,
              date: event.date,
              id: event.id,
              loadingStatus: false,
            });
        });
      }

    render() {
        console.log(this.props)
        return (
            <>
                <h1>Edit Event</h1>
                <label htmlFor="">Event Name</label>
                <input type="text" id="eventName" onChange={this.handleFieldChange} value={this.state.eventName}></input>
                <p></p>
                <label htmlFor="">Event Location</label>
                <input type="text" id="location" onChange={this.handleFieldChange} value={this.state.location}></input>
                <p></p>
                <label htmlFor="">Event Name</label>
                <input type="date" id="date" onChange={this.handleFieldChange} value={this.state.date}></input>
                <button onClick={this.updateExistingEvent}>Save</button>
            </>
        )
    }
}

export default EditEventModal
