import React, { Component } from 'react';
import MessageList from './message/MessageList';
import FeatureViews from './FeatureViews';
import NavBar from './nav/NavBar';
import "./Dashboard.css"
import FriendManager from "../modules/FriendManager"
import EventManager from "../modules/EventManager"
import ArticleManager from "../modules/ArticleManager"

class Dashboard extends Component {
    state = {
        friends: [],
        events: [],
        articles: []
    }



    updateFriends = () => {
        FriendManager.getAll()
        .then(friends => {
                this.setState({
                    friends: friends,
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
                            updateEvents={this.updateEvents}
                            updateArticles={this.updateArticles}
                            friends={this.state.friends}
                            events={this.state.events}
                            articles={this.state.articles}
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