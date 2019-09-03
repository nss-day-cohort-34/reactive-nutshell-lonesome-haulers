import React, { Component } from 'react';
import EditMessageModal from "./EditMessageModal";
import "./Messages.css"
import FriendManager from "../../modules/FriendManager"
import ReactModal from 'react-modal'

const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)'
    }
};
ReactModal.setAppElement('#root')

class MessageCard extends Component {

    state = {
        modalIsOpen: false
    }

    constructNewFriendship = event => {
        const username = (JSON.parse(sessionStorage.getItem("credentials")))
        const friend = {
            otherFriendId: this.props.message.userId,
            userId: parseInt(username.id),
            areFriends: false
        };

        FriendManager.post(friend)
            .then(() => {
                this.props.updateFriends()
                this.closeModal()
            })
    };

    constructor() {
        super();
        this.openModal = this.openModal.bind(this);
        this.closeModal = this.closeModal.bind(this);
    }

    openModal() {
        const username = (JSON.parse(sessionStorage.getItem("credentials")))
        const filteredData = this.props.friends.filter(friend => (friend.userId === username.id || friend.otherFriendId === username.id) && (friend.userId === this.props.message.userId || friend.otherFriendId === this.props.message.userId) && username.id !== this.props.message.userId)
        if ((filteredData.length < 1 && username.id !== this.props.message.userId) && (this.props.message.id !== username.userId)) {
            this.setState({ modalIsOpen: true });
        }
    }


    closeModal() {
        this.setState({ modalIsOpen: false });
    }


    render() {
        return (
            <>
                <ReactModal
                    isOpen={this.state.modalIsOpen}
                    onRequestClose={this.closeModal}
                    style={customStyles}
                    contentLabel="Modal"
                >
                    <h2>Would you like to be friends with {this.props.message.user.username}?</h2>
                    <button
                        type="button"
                        onClick={() => { this.constructNewFriendship() }}
                        className="btn btn-primary"
                    >Yes</button>
                    <button
                        type="button"
                        onClick={this.closeModal}
                        className="btn btn-primary"
                    >No</button>

                </ReactModal>
                <div className="card">
                    <div className="card-content">
                        <p><button onClick={this.openModal} id={"invisibleButton--" + this.props.message.userId} className="invisibleButton">{this.props.message.user.username}</button>: {this.props.message.message}</p>
                        <EditMessageModal key={this.props.message.id} {...this.props} />
                    </div>
                </div>
            </>
        )
    }
}

export default MessageCard;