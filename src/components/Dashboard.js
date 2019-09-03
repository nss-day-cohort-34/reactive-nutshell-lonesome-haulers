import React, { Component } from 'react';
import MessageList from './message/MessageList';
import FeatureViews from './FeatureViews';
import NavBar from './nav/NavBar';
import "./Dashboard.css"
import FriendManager from "../modules/FriendManager"

class Dashboard extends Component {
    state = {
        friends:[]
    }

    

    updateFriends = () => {
        FriendManager.getAll()
            .then(friends => {
                this.setState({
                    friends: friends,
                })
            })
    }

    componentDidMount() {
        this.updateFriends()
    }


    logout = () => {
        sessionStorage.clear()
        this.props.history.push("/")
    }
    render() {
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
                        <FeatureViews
                        updateFriends={this.updateFriends}
                        friends={this.state.friends}
                        {...this.props} />
                    </div>
                    <div className="rightContainer">
                        <div className="messageListContainer">
                            <MessageList
                                updateFriends={this.updateFriends}
                                friends={this.state.friends}
                                {...this.props} />
                        </div>
                    </div>
                </div>
            </>
        )
    }
}

export default Dashboard;