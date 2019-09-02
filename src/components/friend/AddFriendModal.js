import React, { Component } from "react"
import FriendManager from "../../modules/FriendManager"




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
                    document.querySelector("#search").value = ""
                })
    };


    render() {
        const username = (JSON.parse(sessionStorage.getItem("credentials")))
        const filteredData = this.props.friends.filter(friend => (friend.userId === username.id || friend.otherFriendId === username.id) && (friend.userId === this.props.friend.id || friend.otherFriendId === this.props.friend.id) && username.id !== this.props.friend.id)
        if (filteredData.length < 1 && username.id !== this.props.friend.id) {
            return (
                <>
                    <p>{this.props.friend.username} <button onClick={() => this.constructNewFriendship()}>AddFriend</button></p>
                </>
            )
        } else if (this.props.friend.id === username.id) {
            return <></>

        } else {
            return (
                <>
                    <p>{this.props.friend.username}</p>
                </>
            )
        }
    }
}

export default AddFriendModal;