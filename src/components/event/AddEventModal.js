import React, { Component } from "react"
import EventManager from '../../modules/EventManager'
import UserManager from '../../modules/UserManager'

// const currentUserId = UserManager.getAll().then(users => {
//     users.forEach(user => {
//         if (user.username === sessionStorage.getItem("username")) {
//             return user.id
//         }
//     });
// })

class AddEventModal extends Component {

    state = {
        eventName: "",
        location: "",
        date: "",
        loadingStatus: false
    }

    handleFieldChange = event => {
        const stateToChange = {};
        stateToChange[event.target.id] = event.target.value;
        this.setState(stateToChange);
    };

    createNewEvent = event => {
        event.preventDefault()
        const username = JSON.parse(sessionStorage.getItem("credentials"))
        // if (this.state.eventName === "" || this.state.location === "" || this.state.date === "") {
        //     window.alert("Please fill out all fields")
        // } else {
            this.setState({ loadingStatus: true })
            const newEvent = {
                eventName: this.state.eventName,
                location: this.state.location,
                date: this.state.date,
                userId: username.id
            }
            EventManager.post(newEvent)
                .then(() => this.props.closeModal())
                .then(() => {
                    this.props.didMountFunction()
                })
        // }
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
