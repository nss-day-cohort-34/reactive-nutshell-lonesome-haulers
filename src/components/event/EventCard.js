import React, { Component } from 'react'
// import EditEventModal from "./EditEventModal"
import EditModalHelper from './EditModalHelper';
// import './Event.css'

let styles = {
    backgroundColor: 'cornsilk',
  };
class EventCard extends Component {

    

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
                        <button type="button" onClick={() => this.props.deleteEvent(this.props.event.id)}>Delete</button>
                    </div>
                </div>
            );
        } else {
            return (
                <div className="card">
                    <div className="card-content" style={styles}>
                        <h3><i>{this.props.event.eventName}</i></h3>
                        <p><i>Location: {this.props.event.location}</i></p>
                        <p><i>Date: {this.props.event.date}</i></p>
                        <p><i>Created by {this.props.event.user.username}</i></p>
                    </div>
                </div>
            );

        }
    }
}

export default EventCard;