import React, { Component } from 'react';
import MessageList from './message/MessageList';
import FeatureViews from './FeatureViews';
import NavBar from './nav/NavBar';
import "./Dashboard.css"

class Dashboard extends Component {
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
                        <FeatureViews />
                    </div>
                    <div className="rightContainer">
                        <MessageList />
                    </div>
                </div>
            </>
        )
    }
}

export default Dashboard;