import React, { Component } from 'react';
import UserManager from "../../modules/UserManager"
import FriendManager from "../../modules/FriendManager"

class FriendCard extends Component {

    state = {
        friend: {},
        userId: 0,
        users: [],
        usernameOfUserId: '',
        usernameOfOtherFriendId: ''
    }

    getUsernames = () => {
        const otherFriendObject = this.state.users.find(user => user.id === this.state.friend.otherFriendId)
        const userFriendObject = this.state.users.find(user => user.id === this.state.friend.userId)
        this.setState({
            usernameOfUserId: userFriendObject.username,
            usernameOfOtherFriendId: otherFriendObject.username
        })
    }

    updateExistingFriendship = () => {
        const editedFriend = {
            otherFriendId: this.state.friend.otherFriendId,
            userId: this.state.friend.userId,
            id: parseInt(this.state.friend.id),
            areFriends: true
        };
        
        FriendManager.update(editedFriend)
        .then(() => {
            this.props.updateFriendList()
        })
    }

    componentDidMount() {
        const username = (JSON.parse(sessionStorage.getItem("credentials")))
        UserManager.getAll()
            .then(users => {
                this.setState({
                    users: users,
                    userId: username.id,
                    friend: this.props.friend,
                });
                this.getUsernames()
            });
    }

    render() {
        const username = (JSON.parse(sessionStorage.getItem("credentials")))
        if (username.id === this.props.friend.userId) {
            if (this.props.friend.areFriends === true) {
                return (
                    <div className="card">
                        <div className="card-content">
                            <p>{this.state.usernameOfOtherFriendId} <button onClick={() => this.props.deleteFriend(this.props.friend.id)}>Delete</button></p>
                        </div>
                    </div>
                );
            } else {
                return (
                    <div className="card">
                        <div className="card-content">
                            <p>{this.state.usernameOfOtherFriendId} <i>Pending</i><button onClick={() => this.props.deleteFriend(this.props.friend.id)}>Delete</button></p>
                        </div>
                    </div>
                );
            }

        } else {
            if (this.props.friend.areFriends === true) {
                return (
                    <div className="card">
                        <div className="card-content">
                            <p>{this.state.usernameOfUserId} <button onClick={() => this.props.deleteFriend(this.props.friend.id)}>Delete</button></p>
                        </div>
                    </div>
                );
            } else {
                return (
                    <div className="card">
                        <div className="card-content">
                            <p>{this.state.usernameOfUserId} <i>Pending</i> <button onClick={() => this.updateExistingFriendship()}>Accept</button><button onClick={() => this.props.deleteFriend(this.props.friend.id)}>Deny</button></p>
                        </div>
                    </div>
                );
            }
        }
    }
}

export default FriendCard;