import React, { Component } from "react"
import FriendManager from "../../modules/FriendManager"
import { Button } from 'reactstrap';
import { readSync } from "fs";




class AddFriendModal extends Component {

    constructNewFriendship = event => {
        const username = (JSON.parse(sessionStorage.getItem("credentials")))
        const friend = {
            otherFriendId: this.props.friend.id,
            userId: parseInt(username.id),
            areFriends: false
        };

        FriendManager.post(friend)
            .then(() => {
                this.props.updateFriendList()
            })
    };


    render() {
        if (this.props.users.length === 0) {
            return <></>
        } else {
            const username = (JSON.parse(sessionStorage.getItem("credentials")))
            const foundUser = this.props.users.find(user => user.id === this.props.friend.id)
            const userColor = {
                color: foundUser.color
            }
            const filteredData = this.props.friends.filter(friend => (friend.userId === username.id || friend.otherFriendId === username.id) && (friend.userId === this.props.friend.id || friend.otherFriendId === this.props.friend.id) && username.id !== this.props.friend.id)
            if (filteredData.length < 1 && username.id !== this.props.friend.id) {
                return (
                    <>
                        <p style={userColor}>{this.props.friend.username} <Button outline color="dark" size="sm" onClick={() => this.constructNewFriendship()}>AddFriend</Button></p>
                    </>
                )
            } else if (this.props.friend.id === username.id) {
                return <></>

            } else {
                return (
                    <>
                        <p style={userColor}>{this.props.friend.username}</p>
                    </>
                )
            }
        }
    }
}

export default AddFriendModal;