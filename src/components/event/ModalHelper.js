import React, { Component } from "react"
import ReactModal from 'react-modal'
import AddEventModal from "./AddEventModal";
import { Button } from 'reactstrap';

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
class ModalHelper extends Component {
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
                <AddEventModal
                    closeModal={this.closeModal}
                    openModal={this.openModal}
                    didMountFunction={this.props.didMountFunction}
                />
    
    
        </ReactModal>
            <h1 className="feature__name">Events</h1>
            <hr></hr>
            <Button outline color="secondary" size="sm" onClick={this.openModal}>Add Event</Button>
            </>
        )
    }
}

export default ModalHelper