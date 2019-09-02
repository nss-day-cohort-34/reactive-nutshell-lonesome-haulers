import React, { Component } from "react"
import FriendCard from "./FriendCard"
import FriendManager from "../../modules/FriendManager"
import ReactModal from 'react-modal'
import UserManager from "../../modules/UserManager"
import AddFriendModal from "./AddFriendModal"
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
        friends: [],
        userId: 0,
        search: "",
        users: []
    }


    componentDidMount() {
        const username = (JSON.parse(sessionStorage.getItem("credentials")))
        FriendManager.getAll()
            .then(friends => {
                this.setState({
                    friends: friends,
                    userId: username.id,
                    search: "",
                    modalIsOpen: false
                });
            });
        UserManager.getAll()
            .then(users => {
                this.setState({
                    users: users,
                });
            })
    }

    updateFriendList = () => {
        this.componentDidMount()
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
                this.componentDidMount()
            })
    }

    searchForFriend = (friend) => {
        const searchedUsers = this.state.users.filter(user => user.username.includes(friend))
        return searchedUsers
    }

    render() {
        console.log("render friends")
        const friendships = this.state.friends.filter(friend => friend.userId === this.state.userId || friend.otherFriendId === this.state.userId)
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
                                friends={this.state.friends}
                                updateFriendList={this.updateFriendList}
                                {...this.props} />
                        )}
                    </div>
                    <button
                        type="button"
                        onClick={this.closeModal}
                        className="btn btn-primary"
                    >Cancel</button>

                </ReactModal>
                <h1>friends</h1>
                <button onClick={this.openModal}>Add Friend</button>
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