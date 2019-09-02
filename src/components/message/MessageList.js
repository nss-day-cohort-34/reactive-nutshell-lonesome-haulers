import React, { Component } from "react"
import MessageCard from "./MessageCard"


class MessageList extends Component {

    state = {
        messages: []
    }

componentDidUpdate(prevState) {
    if (this.state.messages !== prevState.parentState.messages) {
        this.setState({ messages: prevState.parentState.messages })
    }
}


render() {
    return (
        <>
            <div className="messageContainer">
                {this.state.messages.map(message =>
                    <MessageCard
                        key={message.id}
                        message={message}
                        {...this.props}
                    />
                )}
            </div>
        </>
    )
}
}

export default MessageList;