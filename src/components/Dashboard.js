import React, { Component } from 'react';
import MessageList from './message/MessageList';
import FeatureViews from './FeatureViews';
import NavBar from './nav/NavBar';
import "./Dashboard.css"
import FriendManager from "../modules/FriendManager"
import { Button } from 'reactstrap';

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
                        <img src={ require('../img/Nutshell_logo.png') }/>
                            {/* <h2>NutShell</h2> */}
                            <h3 className="welcome_greeting">Welcome, {username.username}!</h3>
                            <Button outline color="secondary" size="sm" className="sign_out" onClick={this.logout}>Logout</Button>
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