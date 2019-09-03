import React, { Component } from 'react'
// import EditEventModal from "./EditEventModal"
import EditModalHelper from './EditModalHelper';
import './Event.css'

class FirstEventCard extends Component {

    // startModal = () => {
    //     return <EditModalHelper />
    // }

    render() {
        const currentUser = JSON.parse(sessionStorage.getItem("credentials"))
        if (this.props.event.user.username === currentUser.username) {
            return (
                <div className="card">
                    <div className="card-content card--first">
                        <h3 className="firstEventName">{this.props.event.eventName}</h3>
                        <p>Location: {this.props.event.location}</p>
                        <p>Date: {this.props.event.date}</p>
                        <p>Created by {this.props.event.user.username}</p>
                        <EditModalHelper {...this.props} />
                        <button type="button" onClick={() => this.props.deleteEvent(this.props.event.id)}>Delete</button>
                    </div>
                </div>
            );
        } else {
            return (
                <div className="card">
                    <div className="card-content card--first">
                        <h3 className="firstEventName">{this.props.event.eventName}</h3>
                        <p>Location: {this.props.event.location}</p>
                        <p>Date: {this.props.event.date}</p>
                        <p>Created by {this.props.event.user.username}</p>
                    </div>
                </div>
            );

        }
    }
}

export default FirstEventCard;