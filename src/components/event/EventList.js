import React, { Component } from "react"
import EventManager from '../../modules/EventManager'
import EventCard from './EventCard'
// import AddEventModal from "./AddEventModal";
import ModalHelper from "./ModalHelper";
import "./EventList.css"

class EventList extends Component {

    state = {
        events: []
    }

    componentDidMount() {
        EventManager.getAll()
          .then((events) => {
            const sortedEvents = events.sort((a, b) => (a.date > b.date) ? 1 : -1)
            this.setState({
              events: sortedEvents
            })
          })
      }

      didMountFunction = () => {
          this.componentDidMount()
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
                    {this.state.events.map(event =>
                        
                        <EventCard
                            key={event.id}
                            event={event}
                            deleteEvent={this.deleteEvent}
                            {...this.props}
                            didMountFunction={this.didMountFunction}
                        />
                    )}
                </div>
            </>
                )
            }
        }
        
export default EventList;