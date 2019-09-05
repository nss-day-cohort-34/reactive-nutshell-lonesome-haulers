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
                    console.log("friendarray", friends)
                    const usersFriendships = friends.filter(friend => (friend.userId === user.id || friend.otherFriendId === user.id) && friend.areFriends === true)
                    console.log("userFriendships", usersFriendships)
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
        console.log(this.props.friends)
        if (this.state.popularUsername !== "") {
            return (
            <div className="card">
                <div className="card-content">
                    <h2 className="home_h3">Most Popular User</h2>
                    <h4 id={"invisibleButton--" + this.state.userId}>{this.state.popularUsername}</h4>
                    <p>{this.state.numberOfFriends} Friends</p>
                </div>
            </div>
            )
        } else {
            return (
            <h3 className="home_h3" no_h3>There are no friendships in Nutshell</h3>
            )
        }
    }
}

export default HomeEventCard