import React, { Component } from 'react';
import MessageList from './message/MessageList';
import AddMessage from './message/AddMessage';
import FeatureViews from './FeatureViews';
import NavBar from './nav/NavBar';
import MessageManager from "../modules/MessageManager"
import "./Dashboard.css"

class Dashboard extends Component {
    state = {
        messages: [],
        message: "",
    }

    scrollToBottom = () => {
        const messageListContainer = document.querySelector(".messageListContainer")
        messageListContainer.scrollTop = messageListContainer.scrollHeight
    }

    componentDidMount() {
        MessageManager.getAll().then(messages => {
            console.log("CDM")
            console.log(this.state.messages.length)
            this.setState({ messages: messages })
            this.scrollToBottom()
        })
    }


    updateDom = () => {
        this.componentDidMount()
    }
    logout = () => {
        sessionStorage.clear()
        this.props.history.push("/")
    }
    render() {
        console.log("render")
        const username = (JSON.parse(sessionStorage.getItem("credentials")))
        return (
            <>
                <div className="masterContainer">
                    <div className="leftContainer">
                        <div className="headerContainer">
                            <h2>NutShell</h2>
                            <h3>Welcome {username.username}</h3>
                            <button className="btn" onClick={this.logout}>Logout</button>
                        </div>
                        <NavBar />
                        <FeatureViews />
                    </div>
                    <div className="rightContainer">
                        <div className="messageListContainer" ref={(location) => { this.messageContain = location; }}>
                            <MessageList updateDom={this.updateDom}
                                parentState={this.state}
                                {...this.props} />
                        </div>
                        <div>
                            <AddMessage updateDom={this.updateDom}
                                scrollToBottom={this.scrollToBottom}
                                {...this.props} />
                        </div>
                    </div>
                </div>
            </>
        )
    }
}

export default Dashboard;