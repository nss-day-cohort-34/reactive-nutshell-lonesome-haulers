import React, { Component } from "react"
import EventManager from '../../modules/EventManager'

class AddEventModal extends Component {

    state = {
        eventName: "",
        location: "",
        date: ""
    }

    handleFieldChange = event => {
        const stateToChange = {};
        stateToChange[event.target.id] = event.target.value;
        this.setState(stateToChange);
    };

    createNewEvent = event => {
        event.preventDefault()
        const now = new Date()
        let day = now.getDate()
        if (day < 10) {
            day = ("0" + day)
        }
        const month = ("0" + (now.getMonth() + 1)).slice(-2)
        const today = `${now.getFullYear()}-${month}-${day}`
        const currentUser = JSON.parse(sessionStorage.getItem("credentials"))
        if (this.state.eventName === "" || this.state.location === "" || this.state.date === "" || this.state.date < today) {
            window.alert("Please fill out all fields")
        } else {
            const newEvent = {
                eventName: this.state.eventName,
                location: this.state.location,
                date: this.state.date,
                userId: currentUser.id
            }
            EventManager.post(newEvent)
                .then(() => this.props.closeModal())
                .then(() => {
                    this.props.didMountFunction()
                })
        }
    }

    render() {
        return (
            <>
                <h1>New Event</h1>
                <label htmlFor="">Event Name</label>
                <input type="text" id="eventName" onChange={this.handleFieldChange}></input>
                <p></p>
                <label htmlFor="">Event Location</label>
                <input type="text" id="location" onChange={this.handleFieldChange}></input>
                <p></p>
                <label htmlFor="">Event Name</label>
                <input type="date" id="date" onChange={this.handleFieldChange}></input>
                <button onClick={this.createNewEvent}>Save</button>
            </>
        )
    }
}

export default AddEventModal
