import React, { Component } from 'react';
import EditMessageModal from "./EditMessageModal";
import "./Messages.css"
import FriendManager from "../../modules/FriendManager"

class MessageCard extends Component {



    constructNewFriendship = event => {
        const username = (JSON.parse(sessionStorage.getItem("credentials")))
            const friend = {
                otherFriendId: this.props.message.userId,
                userId: parseInt(username.id),
                areFriends: false
            };

            FriendManager.post(friend)
                .then(() => {
                    console.log("post friend")
                    this.props.tryThis()
                })
    };
    render() {
        return (
            <div className="card">
                <div className="card-content">
                    <p><button onClick={() => {this.constructNewFriendship()}} id={"invisibleButton--" + this.props.message.userId} className="invisibleButton">{this.props.message.user.username}</button>: {this.props.message.message}</p>
                    <EditMessageModal key={this.props.message.id} {...this.props}/>
                </div>
            </div>
        );
    }
}

export default MessageCard;