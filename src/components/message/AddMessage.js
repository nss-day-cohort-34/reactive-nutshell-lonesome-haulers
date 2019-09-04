import React, { Component } from 'react';
import MessageManager from "../../modules/MessageManager"
import { Button } from 'reactstrap';

class AddMessage extends Component {
    state = {
        message: "",
    }



    handleFieldChange = event => {
        const stateToChange = {}
        stateToChange[event.target.id] = event.target.value
        this.setState(stateToChange)
    }


    constructNewMessage = event => {
        const username = (JSON.parse(sessionStorage.getItem("credentials")))
        if (this.state.message === "") {
            window.alert("Please input a message");
        } else {
            const message = {
                message: this.state.message,
                userId: parseInt(username.id)
            };

            MessageManager.post(message)
                .then(() => {
                    console.log("post")
                    this.props.updateDom()
                    document.querySelector("#message").value = ""
                    this.setState({message: ""})
                })
        }
    };
    render() {
        return (
            <>
                <div>
                    <input
                        type="text"
                        required
                        className="form-control"
                        onChange={this.handleFieldChange}
                        id="message"
                        placeholder="Enter a Message"
                    />
                </div>
                <Button outline color="dark" size="sm" onClick={this.constructNewMessage}>Submit</Button>
            </>
        )
    }
}

export default AddMessage;