import React, { Component } from "react"
import EventManager from '../../modules/EventManager'
import { Button } from 'reactstrap';

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
            window.alert("Please fill out all fields with a date that has not passed")
        } else {
            this.setState({ loadingStatus: true })
            const editedEvent = {
                eventName: this.state.eventName,
                location: this.state.location,
                date: this.state.date,
                id: parseInt(this.state.id),
                userId: currentUser.id
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
                <Button outline color="dark" size="sm" onClick={this.updateExistingEvent}>Save</Button>
            </>
        )
    }
}

export default EditEventModal
