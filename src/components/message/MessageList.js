import React, { Component } from "react"
import MessageCard from "./MessageCard"
import MessageManager from "../../modules/MessageManager"
import { Button } from 'reactstrap';



class MessageList extends Component {

    state = {
        messages: [],
        modalIsOpen: false,
        message: ""
    }

    scrollToBottom = () => {
        const messageContainer = document.querySelector(".messageContainer")
        messageContainer.scrollTop = messageContainer.scrollHeight
    }

    updateDom = () => {
        MessageManager.getAll().then(messages => {
            this.setState({messages: messages})
            this.scrollToBottom()
        })
    }

    componentDidMount() {
        this.updateDom()
    }
    

    handleFieldChange = event => {
        const stateToChange = {}
        stateToChange[event.target.id] = event.target.value
        this.setState(stateToChange)
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
                this.updateDom()
                document.querySelector("#message").value = ""
                this.setState({
                    message: ""
                })})
        }
    };
    render() {
        return (
            <>
            <h1 className="feature__name h1_messages">Messages</h1>
            <hr></hr>
                <div className="messageContainer">
                    {this.state.messages.map(message =>
                        <MessageCard
                            key={message.id}
                            message={message}
                            updateDom={this.updateDom}
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
                    <div className="friend_submit">
                <Button outline color="dark" size="sm" block onClick={this.constructNewMessage}>Submit</Button></div>
                </div>
            </>
        )
    }
}
export default MessageList;