import React, { Component } from 'react'
// import EditEventModal from "./EditEventModal"
import EditModalHelper from './EditModalHelper';
// import './Event.css'
import { Button } from 'reactstrap';

class EventCard extends Component {

    // startModal = () => {
    //     return <EditModalHelper />
    // }

    render() {
        const currentUser = JSON.parse(sessionStorage.getItem("credentials"))
        if (this.props.event.user.username === currentUser.username) {
            return (
                <div className="card">
                    <div className="card-content">
                        <h3>{this.props.event.eventName}</h3>
                        <p>Location: {this.props.event.location}</p>
                        <p>Date: {this.props.event.date}</p>
                        <p>Created by {this.props.event.user.username}</p>
                        <EditModalHelper {...this.props} />
                        <Button outline color="danger" size="sm" onClick={() => this.props.deleteEvent(this.props.event.id)}>Delete</Button>
                    </div>
                </div>
            );
        } else {
            return (
                <div className="card">
                    <div className="card-content">
                        <h3>{this.props.event.eventName}</h3>
                        <p>Location: {this.props.event.location}</p>
                        <p>Date: {this.props.event.date}</p>
                        <p>Created by {this.props.event.user.username}</p>
                    </div>
                </div>
            );

        }
    }
}

export default EventCard;