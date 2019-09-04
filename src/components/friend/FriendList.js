import React, { Component } from "react"
import FriendCard from "./FriendCard"
import FriendManager from "../../modules/FriendManager"
import ReactModal from 'react-modal'
import UserManager from "../../modules/UserManager"
import AddFriendModal from "./AddFriendModal"
import { Button } from 'reactstrap';

import "./Friend.css"

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

class FriendList extends Component {

    state = {
        userId: 0,
        search: "",
        users: []
    }


    updateFriendList = () => {
        const username = (JSON.parse(sessionStorage.getItem("credentials")))
        this.setState({
            userId: username.id,
            search: "",
            modalIsOpen: false
        });
        UserManager.getAll()
            .then(users => {
                this.setState({
                    users: users,
                });
            })
            this.props.updateFriends()
    }

    componentDidMount() {
        this.updateFriendList()
    }



    constructor() {
        super();
        this.openModal = this.openModal.bind(this);
        this.closeModal = this.closeModal.bind(this);
    }

    openModal() {
        this.setState({ modalIsOpen: true });
    }


    closeModal() {
        this.setState({ modalIsOpen: false });
    }



    handleFieldChange = event => {
        const stateToChange = {}
        stateToChange[event.target.id] = event.target.value
        this.setState(stateToChange)
    }

    deleteFriend = id => {
        FriendManager.delete(id)
            .then(() => {
                this.updateFriendList()
            })
    }

    searchForFriend = (friend) => {
        const searchedUsers = this.state.users.filter(user => user.username.includes(friend))
        return searchedUsers
    }

    render() {
        const friendships = this.props.friends.filter(friend => friend.userId === this.state.userId || friend.otherFriendId === this.state.userId)
        return (
            <>
                <ReactModal
                    isOpen={this.state.modalIsOpen}
                    onRequestClose={this.closeModal}
                    style={customStyles}
                    contentLabel="Modal"
                >
                    <h2>Add Friend</h2>
                    <input
                        type="text"
                        required
                        className="form-control"
                        onChange={this.handleFieldChange}
                        onKeyUp={this.searchForFriend}
                        id="search"
                    />
                    <div className="addFriendModal">
                        {this.searchForFriend(this.state.search).map(friend =>
                            <AddFriendModal
                                key={friend.id}
                                friend={friend}
                                friends={this.props.friends}
                                updateFriendList={this.updateFriendList}
                                {...this.props} />
                        )}
                    </div>
                    <Button outline color="danger" size="sm"
                        type="button"
                        onClick={this.closeModal}
                        className=""
                    >Cancel</Button>

                </ReactModal>
                <h1 className="feature__name">Friends</h1>
                <hr></hr>
                <Button outline color="secondary" size="sm" onClick={this.openModal}>Add Friend</Button>
                {friendships.map(friend =>
                    <FriendCard
                        key={friend.id}
                        friend={friend}
                        deleteFriend={this.deleteFriend}
                        updateFriendList={this.updateFriendList}
                        {...this.props}
                    />
                )}
            </>
        )
    }
}

export default FriendList;