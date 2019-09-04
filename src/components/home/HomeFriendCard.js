import React, { Component } from "react"
import UserManager from "../../modules/UserManager"
import FriendManager from "../../modules/FriendManager"



class HomeEventCard extends Component {

    state = {
        popularUsername: "",
        userId: 0,
        numberOfFriends: 0
    }

    findPopularUser = () => {
        FriendManager.getAll().then(friends => {
            let popularFriendArray = []
            UserManager.getAll().then(users => {
                users.forEach(user => {
                    const usersFriendships = friends.filter(friend => (friend.userId === user.id || friend.otherFriendId === user.id) && friend.areFriends === true)
                    if (usersFriendships.length > popularFriendArray.length) {
                        popularFriendArray = usersFriendships
                        this.setState({ popularUsername: user.username, userId: user.id, numberOfFriends: popularFriendArray.length })
                    }
                });
            })

        })
    }

    componentDidMount() {
        this.findPopularUser()
    }

    render() {
        if (this.state.popularUsername !== "" || this.state.userId !== 0) {
            const foundUser = this.props.users.find(user => user.id === this.state.userId)
            const userColor = {
                color: foundUser.color
            }
            return (
                <div className="card">
                    <div className="card-content">
                        <h2>Most Popular User</h2>
                        <h3 style={userColor}>{this.state.popularUsername}</h3>
                        <p>{this.state.numberOfFriends} Friends</p>
                    </div>
                </div>
            )
        } else {
            return (
                <h3>There are no friendships in Nutshell</h3>
            )
        }
    }
}

export default HomeEventCard