import React, { Component } from 'react';
import MessageList from './message/MessageList';
import FeatureViews from './FeatureViews';
import NavBar from './nav/NavBar';
import "./Dashboard.css"
import FriendManager from "../modules/FriendManager"
import { Button } from 'reactstrap';
import EventManager from "../modules/EventManager"
import ArticleManager from "../modules/ArticleManager"
import UserManager from "../modules/UserManager"
import ColorEditorModal from "../colorEditor/ColorEditorModal"
import BackgroundColorEditorModal from "../colorEditor/BackgroundColorEditorModal"
import { Link } from "react-router-dom";
import tinycolor from 'tinycolor2'


class Dashboard extends Component {
    state = {
        friends: [],
        events: [],
        articles: [],
        users: []
    }

    updateFriends = () => {
        FriendManager.getAll()
        .then(friends => {
                this.setState({
                    friends: friends,
                })
            })
    }
    updateUsers = () => {
        UserManager.getAll()
        .then(users => {
                this.setState({
                    users: users,
                })
            })
    }
    updateEvents = () => {
        const currentUser = JSON.parse(sessionStorage.getItem("credentials"))
        EventManager.getAll()
        .then(events => {
            const finalArray = []
            events.forEach(event => {
                if (event.userId === currentUser.id) {
                    finalArray.push(event)
                }
            });
            this.state.friends.forEach(friendship => {
                if (friendship.userId === currentUser.id && friendship.areFriends === true) {
                    const friendsEvents = events.filter(event => event.userId === friendship.otherFriendId)
                    friendsEvents.forEach(event => {
                        finalArray.push(event)
                    })
                } else if (friendship.otherFriendId === currentUser.id && friendship.areFriends === true) {
                    const friendsEvents = events.filter(event => event.userId === friendship.userId)
                    friendsEvents.forEach(event => {
                        finalArray.push(event)
                    })
                }
            })
            const sortedEvents = finalArray.sort((a, b) => (a.date > b.date) ? 1 : -1)
                this.setState({
                    events: sortedEvents
                })
    })
}
    updateArticles = () => {
        const currentUser = JSON.parse(sessionStorage.getItem("credentials"))
        ArticleManager.getAll()
        .then(articles => {
            const finalArray = []
            articles.forEach(article => {
                if (article.userId === currentUser.id) {
                    finalArray.push(article)
                }
            });
            this.state.friends.forEach(friendship => {
                if (friendship.userId === currentUser.id && friendship.areFriends === true) {
                    const friendsArticles = articles.filter(article => article.userId === friendship.otherFriendId)
                    friendsArticles.forEach(article => {
                        finalArray.push(article)
                    })
                } else if (friendship.otherFriendId === currentUser.id && friendship.areFriends === true) {
                    const friendsArticles = articles.filter(article => article.userId === friendship.userId)
                    friendsArticles.forEach(article => {
                        finalArray.push(article)
                    })
                }
            })
                const sortedArticles = finalArray.sort((a, b) => (a.timestamp < b.timestamp) ? 1 : -1)
                this.setState({
                    articles: sortedArticles
                })
            })
    }

    componentDidMount() {
        this.updateFriends()
        this.updateEvents()
        this.updateArticles()
        this.updateUsers()
    }

    logout = () => {
        sessionStorage.clear()
        this.props.history.push("/")
    }
    render() {
        const username = (JSON.parse(sessionStorage.getItem("credentials")))
        const backgroundColor = tinycolor(username.backgroundColor)
        const backgroundBrightness = backgroundColor.getBrightness()
        let changeToWhite = {
            "color": "#000"
        }
        if (this.state.users.length !== 0) {
            const foundUser = this.state.users.find(user => user.id === username.id)
            const userBackgroundColor = {
                "backgroundColor": foundUser.backgroundColor
            } 
            console.log("backgroundColor", userBackgroundColor)
        if (backgroundBrightness < 100) {
            changeToWhite = {
                "color": "#fff"
            }
        }
        return (
            <>
                <div className="masterContainer">
                    <div className="leftContainer" style={userBackgroundColor}>
                        <div className="headerContainer" style={changeToWhite}>
                        <Link to={"/"}><img src={ require('../img/Nutshell_logo.png') }/></Link>
                            {/* <h2>NutShell</h2> */}
                            <h3 className="welcome_greeting" style={userBackgroundColor}>Welcome, {username.username}!</h3>
                            <ColorEditorModal 
                                updateUsers={this.updateUsers}
                                users={this.state.users}
                                {...this.props}
                            />
                            <BackgroundColorEditorModal 
                                updateUsers={this.updateUsers}
                                users={this.state.users}
                                {...this.props}
                            />
                            <Button outline color="secondary" size="sm" className="sign_out" onClick={this.logout}>Logout</Button>
                        </div>
                        <NavBar />
                        <FeatureViews
                            style={changeToWhite}
                            updateFriends={this.updateFriends}
                            updateEvents={this.updateEvents}
                            updateArticles={this.updateArticles}
                            updateUsers={this.updateUsers}
                            friends={this.state.friends}
                            events={this.state.events}
                            articles={this.state.articles}
                            users={this.state.users}
                            {...this.props} />
                    </div>
                    <div className="rightContainer">
                        <div className="messageListContainer">
                            <MessageList
                                updateFriends={this.updateFriends}
                                friends={this.state.friends}
                                users={this.state.users}
                                {...this.props} />
                        </div>
                    </div>
                </div>
            </>
        )
            } else {
                return <></>
            }
    }
}

export default Dashboard;