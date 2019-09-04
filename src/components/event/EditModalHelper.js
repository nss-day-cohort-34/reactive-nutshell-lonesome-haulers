import React, { Component } from "react"
import ReactModal from 'react-modal'
import EditEventModal from "./EditEventModal";


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
class EditModalHelper extends Component {
    constructor() {
        super();

        this.state = {
            modalIsOpen: false
        };

        this.openModal = this.openModal.bind(this);
        this.closeModal = this.closeModal.bind(this);
    }

    openModal() {
        this.setState({ modalIsOpen: true });
    }

    closeModal() {
        this.setState({ modalIsOpen: false });
    }

    render() {
        return (
            <>
            <ReactModal
                style={customStyles}
                isOpen={this.state.modalIsOpen}
                onRequestClose={this.closeModal}
                contentLabel="Event Modal"
            >
                <EditEventModal
                    closeModal={this.closeModal}
                    openModal={this.openModal}
                    {...this.props}
                />
    
    
        </ReactModal>
        <button onClick={this.openModal}>Edit</button>

            </>
        )
    }
}

export default EditModalHelper