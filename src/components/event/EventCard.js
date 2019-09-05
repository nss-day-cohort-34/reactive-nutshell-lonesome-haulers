import React, { Component } from 'react'
// import EditEventModal from "./EditEventModal"
import EditModalHelper from './EditModalHelper';
// import './Event.css'
import { Button } from 'reactstrap';

let styles = {
    backgroundColor: 'cornsilk',
  };
class EventCard extends Component {

    

    render() {
        if (this.props.users === 0) {
            return <></>
        } else {
        const currentUser = JSON.parse(sessionStorage.getItem("credentials"))
        const foundUser = this.props.users.find(user => user.id === this.props.event.userId)
                    const userColor = {
                        color: foundUser.color
                    }
        if (this.props.event.user.username === currentUser.username) {
            return (
                <div className="card">
                    <div className="card-content">
                        <h3>{this.props.event.eventName}</h3>
                        <p>Location: {this.props.event.location}</p>
                        <p>Date: {this.props.event.date}</p>
                        <p>Created by <span style={userColor}>{this.props.event.user.username}</span></p>
                        <EditModalHelper {...this.props} />
                        <Button outline color="danger" size="sm" onClick={() => this.props.deleteEvent(this.props.event.id)}>Delete</Button>
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
                        <p><i>Created by <span style={userColor}>{this.props.event.user.username}</span></i></p>
                    </div>
                </div>
            );

        }
    }
    }
}

export default EventCard;