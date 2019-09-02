import React, { Component } from "react"
import EventManager from '../../modules/EventManager'
import EventCard from './EventCard'
// import AddEventModal from "./AddEventModal";
import ModalHelper from "./ModalHelper";

class EventList extends Component {

    state = {
        events: []
    }

    componentDidMount() {
        EventManager.getAll()
          .then((events) => {
            this.setState({
              events: events
            })
          })
      }

      didMountFunction = () => {
          this.componentDidMount()
      }

      deleteEvent = id => {
        EventManager.delete(id)
          .then(() => {
            EventManager.getAll()
              .then((newEvents) => {
                this.setState({
                  events: newEvents
                })
              })
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