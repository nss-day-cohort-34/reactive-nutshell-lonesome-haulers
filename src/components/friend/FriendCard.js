import React, { Component } from 'react';
import UserManager from "../../modules/UserManager"
import FriendManager from "../../modules/FriendManager"
import { Button } from 'reactstrap';

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
        if (this.state.users.length === 0) {
            return (<></>)
        } else {
            const username = (JSON.parse(sessionStorage.getItem("credentials")))
            if (username.id === this.props.friend.userId) {
                if (this.props.friend.areFriends === true) {
                    const foundUser = this.state.users.find(user => user.id === this.state.friend.otherFriendId)
                    const userColor = {
                        color: foundUser.color
                    }
                    return (
                        <div className="card">
                            <div className="card-content">
                                <p style={userColor}>{this.state.usernameOfOtherFriendId} <Button outline color="danger" onClick={() => this.props.deleteFriend(this.props.friend.id)}>Delete</Button></p>
                            </div>
                        </div>
                    );
                } else {
                    const foundUser = this.state.users.find(user => user.id === this.state.friend.otherFriendId)
                    const userColor = {
                        color: foundUser.color
                    }
                    return (
                        <div className="card">
                            <div className="card-content">
                                <p style={userColor}>{this.state.usernameOfOtherFriendId} <i>Pending</i><Button outline color="danger" size="sm" onClick={() => this.props.deleteFriend(this.props.friend.id)}>Delete</Button></p>
                            </div>
                        </div>
                    );
                }

            } else {
                if (this.props.friend.areFriends === true) {
                    const foundUser = this.state.users.find(user => user.id === this.state.friend.userId)
                    const userColor = {
                        color: foundUser.color
                    }
                    return (
                        <div className="card">
                            <div className="card-content">
                                <p style={userColor}>{this.state.usernameOfUserId} <Button outline color="danger" size="sm" onClick={() => this.props.deleteFriend(this.props.friend.id)}>Delete</Button></p>
                            </div>
                        </div>
                    );
                } else {
                    const foundUser = this.state.users.find(user => user.id === this.state.friend.userId)
                    const userColor = {
                        color: foundUser.color
                    }
                    return (
                        <div className="card">
                            <div className="card-content">
                                <p style={userColor}>{this.state.usernameOfUserId} <i>Pending</i> <Button outline color="dark" size="sm" onClick={() => this.updateExistingFriendship()}>Accept</Button><Button outline color="danger" size="sm" onClick={() => this.props.deleteFriend(this.props.friend.id)}>Deny</Button></p>
                            </div>
                        </div>
                    );
                }
            }
        }
    }
}

export default FriendCard;