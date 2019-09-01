import React, { Component } from "react"
import MessageCard from "./MessageCard"
import MessageManager from "../../modules/MessageManager"


class MessageList extends Component {
    
    state = {
        messages: [],
        modalIsOpen: false,
        message: "",
        loadingStatus: false
    }
    
    

    componentDidMount() {
        MessageManager.getAll().then(messages => {
            this.setState({messages: messages})
        })
    }
    updateDom = () => {
        this.componentDidMount()
    }

    handleFieldChange = event => {
        const stateToChange = {}
        stateToChange[event.target.id] = event.target.value
        this.setState(stateToChange)
    }

    deleteMessage = id => {
        MessageManager.delete(id)
          .then(() => {
            this.componentDidMount()
      })
    }

    constructNewMessage = event => {
        const username = (JSON.parse(sessionStorage.getItem("credentials")))
        event.preventDefault();
        if (this.state.message === "") {
            window.alert("Please input a message");
        } else {
            this.setState({ loadingStatus: true });
            const message = {
                message: this.state.message,
                userId: parseInt(username.id)
            };

            MessageManager.post(message)
                .then(() => {
                this.componentDidMount()
                document.querySelector("#message").value = ""})
        }
    };
    render() {
        return (
            <>
                <div className="messageContainer">
                    {this.state.messages.map(message =>
                        <MessageCard
                            key={message.id}
                            message={message}
                            updateDom={this.updateDom}
                            deleteMessage={this.deleteMessage}
                            {...this.props}
                        />
                    )}
                </div>
                <div>
                    <input
                        type="text"
                        required
                        className="form-control"
                        onChange={this.handleFieldChange}
                        id="message"
                        placeholder="Enter a Message"
                    />
                </div>
                <button onClick={this.constructNewMessage}>Submit</button>
            </>
        )
    }
}

export default MessageList;