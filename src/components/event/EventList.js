import React, { Component } from "react"
import EventManager from '../../modules/EventManager'
import EventCard from './EventCard'
import FirstEventCard from './FirstEventCard'
// import AddEventModal from "./AddEventModal";
import ModalHelper from "./ModalHelper";
import "./EventList.css"

class EventList extends Component {

    state = {
        events: []
    }

    componentDidMount() {
        this.didMountFunction()
    }

    didMountFunction = () => {
        EventManager.getAll()
            .then((events) => {
                const sortedEvents = events.sort((a, b) => (a.date > b.date) ? 1 : -1)
                this.setState({
                    events: sortedEvents
                })
            })
    }

    deleteEvent = id => {
        EventManager.delete(id)
            .then(() => {
                this.componentDidMount()
            })
    }

    render() {
        return (
            <>
                <ModalHelper
                    didMountFunction={this.didMountFunction}
                />
                <div id="eventsContainer">
                    {this.state.events.map(event => {
                        if (event === this.state.events[0]) {
                            return <FirstEventCard
                                key={event.id}
                                event={event}
                                deleteEvent={this.deleteEvent}
                                {...this.props}
                                didMountFunction={this.didMountFunction}
                            />
                        } else {
                            return <EventCard
                                key={event.id}
                                event={event}
                                deleteEvent={this.deleteEvent}
                                {...this.props}
                                didMountFunction={this.didMountFunction}
                            />
                        }
                    }
                    )}

                </div>
            </>
        )
    }
}

export default EventList;