import React, { Component } from "react"
import EventManager from '../../modules/EventManager'


class EditEventModal extends Component {

    state = {
        eventName: "",
        location: "",
        date: "",
        // userId: "",
        loadingStatus: true
    }

    handleFieldChange = event => {
        const stateToChange = {};
        stateToChange[event.target.id] = event.target.value;
        this.setState(stateToChange);
    };

    updateExistingEvent = event => {
        event.preventDefault()
        // if (this.state.eventName === "" || this.state.location === "" || this.state.date === "") {
        //     window.alert("Please fill out all fields")
        // } else {
            this.setState({ loadingStatus: true })
            // const currentUser = EventFilterFunction.foundUser()
            const editedEvent = {
                eventName: this.state.eventName,
                location: this.state.location,
                date: this.state.date
                // id: this.props.match.params.eventId
                // userId: JSON.parse(sessionStorage.getItem("userId"))
            }
            EventManager.update(editedEvent)
                .then(() => this.props.closeModal())
        // }
    }

    componentDidMount() {
        // NEED TO CHANGE THIS - WE DON'T HAVE PARAMS IN A MODAL
        EventManager.get(this.props.match.params.eventId)
        .then(event => {
            this.setState({
              eventName: event.eventName,
              loadingStatus: false,
            });
        });
      }

    render() {
        return (
            <>
                <h1>Edit Event</h1>
                <label htmlFor="">Event Name</label>
                <input type="text" id="eventName" onChange={this.handleFieldChange}></input>
                <p></p>
                <label htmlFor="">Event Location</label>
                <input type="text" id="location" onChange={this.handleFieldChange}></input>
                <p></p>
                <label htmlFor="">Event Name</label>
                <input type="date" id="date" onChange={this.handleFieldChange}></input>
                <button onClick={this.updateExistingEvent}>Save</button>
            </>
        )
    }
}

export default EditEventModal
