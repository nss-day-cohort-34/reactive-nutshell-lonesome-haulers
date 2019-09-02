import React, { Component } from "react"
import ReactModal from 'react-modal'
import MessageManager from "../../modules/MessageManager"
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
class EditMessageModal extends Component {
    
    state = {
        modalIsOpen: false,
        message: "",
        userId: 0,
        id: 0,
    }
    
    
    componentDidMount() {
        this.props.updateDom()
        MessageManager.get(this.props.message.id)
        .then(message => {
            this.setState({
                message: message.message,
                userId: message.userId,
                id: message.id,
            });
        });
    }
    constructor() {
        super();
        this.openModal = this.openModal.bind(this);
        this.closeModal = this.closeModal.bind(this);
    }
    handleFieldChange = evt => {
        const stateToChange = {}
        stateToChange[evt.target.id] = evt.target.value
        this.setState(stateToChange)
    }
    
    updateExistingMessage = event => {
        event.preventDefault()
        const editedMessage = {
            message: this.state.message,
            userId: this.state.userId,
            id: parseInt(this.state.id)
        };
        
        MessageManager.update(editedMessage)
        .then(() => {
            this.props.updateDom()
            this.closeModal()
        })
    }
    
    
    
    openModal() {
        this.setState({ modalIsOpen: true });
    }
    
    
    closeModal() {
        this.setState({ modalIsOpen: false });
    }
    
    
    render() {
        const username = (JSON.parse(sessionStorage.getItem("credentials")))
        if (username.id !== this.props.message.userId) {
            return <>
            </>
        } else {
            return (
                <>
                    <ReactModal
                        isOpen={this.state.modalIsOpen}
                        onRequestClose={this.closeModal}
                        style={customStyles}
                        contentLabel="Modal"
                    >
                        <input
                            type="text"
                            required
                            className="form-control"
                            onChange={this.handleFieldChange}
                            id="message"
                            value={this.state.message}
                        />
                        <button
                            type="button"
                            onClick={this.updateExistingMessage}
                            className="btn btn-primary"
                        >Submit</button>
                        <button
                            type="button"
                            onClick={this.closeModal}
                            className="btn btn-primary"
                        >Cancel</button>

                    </ReactModal>

                    <button onClick={this.openModal}>Edit</button>
                </>
            )
        }
    }
}

export default EditMessageModal;