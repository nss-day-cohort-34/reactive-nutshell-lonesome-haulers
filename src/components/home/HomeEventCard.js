import React, { Component } from "react"



class HomeEventCard extends Component {



    render() {
        if (this.props.events.length !== 0) {
        return (
            <div className="card">
                <div className="card-content ">
                    <h3>Upcoming Event</h3>
                    <h3>{this.props.events[0].eventName}</h3>
                    <p>Location: {this.props.events[0].location}</p>
                    <p>Date: {this.props.events[0].date}</p>
                    <p>Created by {this.props.events[0].user.username}</p>
                </div>
            </div>
        )
        } else {
            return <h3>No Upcoming Events</h3>
        }
    }
}

export default HomeEventCard