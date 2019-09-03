import React, { Component } from "react"
import EventManager from '../../modules/EventManager'
import EventCard from './EventCard'
import FirstEventCard from './FirstEventCard'
// import AddEventModal from "./AddEventModal";
import ModalHelper from "./ModalHelper";
import "./EventList.css"

class EventList extends Component {

    componentDidMount() {
        this.didMountFunction()
    }

    didMountFunction = () => {
        this.props.updateEvents()
    }

    deleteEvent = id => {
        EventManager.delete(id)
            .then(() => {
                this.didMountFunction()
            })
    }

    render() {
        console.log(this.props.events)
        return (
            <>
                <ModalHelper
                    didMountFunction={this.didMountFunction}
                />
                <div id="eventsContainer">
                    {this.props.events.map(event => {
                        if (event === this.props.events[0]) {
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