import React, { Component } from "react"
import ReactModal from 'react-modal'
import UserManager from '../modules/UserManager'
import { Button } from 'reactstrap';
import { SketchPicker } from 'react-color';
import tinycolor from 'tinycolor2'

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
        backgroundColor: ""
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
            color: currentUser.color,
            id: parseInt(currentUser.id),
            password: currentUser.password,
            backgroundColor: this.state.backgroundColor
        };
        sessionStorage.setItem(
            "credentials",
        JSON.stringify({
            username: currentUser.username,
            color: currentUser.color,
            id: parseInt(currentUser.id),
            password: currentUser.password,
            backgroundColor: this.state.backgroundColor
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
        const newBackgroundColor = tinycolor(color.hex)
        this.state.backgroundColor =  color.hex
        const backgroundBrightness = newBackgroundColor.getBrightness()
        if (backgroundBrightness < 100) {
            console.log("make text white")
        }
        console.log(newBackgroundColor.getBrightness())
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
                        <h2>Choose Your Background Color</h2>
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

                    <Button outline color="dark" size="sm" onClick={this.openModal}>Edit Background Color</Button>
                </>
            )
        
    }
}

export default ColorEditorModal;