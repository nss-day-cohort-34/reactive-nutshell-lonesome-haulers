import React, { Component } from "react"
import ReactModal from 'react-modal'
import UserManager from '../modules/UserManager'
import { Button } from 'reactstrap';
import { SketchPicker } from 'react-color';


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

class ColorEditorModal extends Component {
    
    state = {
        modalIsOpen: false,
        color: ""
    }
    
    constructor() {
        super();
        this.openModal = this.openModal.bind(this);
        this.closeModal = this.closeModal.bind(this);
    }

    
    updateExistingUser = event => {
        event.preventDefault()
        const currentUser = JSON.parse(sessionStorage.getItem("credentials"))
        const editedUser = {
            username: currentUser.username,
            color: this.state.color,
            id: parseInt(currentUser.id),
            password: currentUser.password,
            backgroundColor: currentUser.backgroundColor
        };
        sessionStorage.setItem(
            "credentials",
        JSON.stringify({
            username: currentUser.username,
            color: this.state.color,
            id: parseInt(currentUser.id),
            password: currentUser.password,
            backgroundColor: currentUser.backgroundColor
        })
    )
        
        UserManager.update(editedUser)
        .then(() => {
            this.props.updateUsers()
            this.closeModal()
        })
    }
    
    
    
    openModal() {
        this.setState({ modalIsOpen: true });
    }
    
    
    closeModal() {
        this.setState({ modalIsOpen: false });
    }
    
    handleChangeComplete = (color) => {
        this.state.color =  color.hex 
      };
    
    render() {
            return (
                <>
                    <ReactModal
                        isOpen={this.state.modalIsOpen}
                        onRequestClose={this.closeModal}
                        style={customStyles}
                        contentLabel="Modal"
                    >
                        <h2>Choose Your Color</h2>
                        <SketchPicker 
                        onChangeComplete={ this.handleChangeComplete }
                        />
                        <button
                            type="button"
                            onClick={this.updateExistingUser}
                            className="btn btn-primary"
                        >Submit</button>
                        <button
                            type="button"
                            onClick={this.closeModal}
                            className="btn btn-primary"
                        >Cancel</button>

                    </ReactModal>

                    <Button outline color="dark" size="sm" className="color_change_btn" onClick={this.openModal}>User Color</Button>
                </>
            )
        
    }
}

export default ColorEditorModal;