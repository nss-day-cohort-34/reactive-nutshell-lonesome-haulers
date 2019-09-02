import React, { Component } from 'react'
// import EditEventModal from "./EditEventModal"
import EditModalHelper from './EditModalHelper';
// import './Event.css'

class EventCard extends Component {

    // startModal = () => {
    //     return <EditModalHelper />
    // }

  render() {
    return (
      <div className="card">
        <div className="card-content">
          <h3>{this.props.event.eventName}</h3>
          <p>Location: {this.props.event.location}</p>
          <p>Date: {this.props.event.date}</p>
          <p>Created by {this.props.event.user.username}</p>
          <EditModalHelper />
          {/* <button type="button"
            onClick={ () => { this.startModal() }}>Edit</button> */}
          <button type="button" onClick={() => this.props.deleteEvent(this.props.event.id)}>Delete</button>
        </div>
      </div>
    );
  }
}

export default EventCard;