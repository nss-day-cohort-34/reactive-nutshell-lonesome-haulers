import React, { Component } from 'react';
import EditMessageModal from "./EditMessageModal";

class MessageCard extends Component {

    render() {
        return (
            <div className="card">
                <div className="card-content">
                    <p>{this.props.message.user.username}: {this.props.message.message}</p>
                    <EditMessageModal key={this.props.message.id} {...this.props}/>
                </div>
            </div>
        );
    }
}

export default MessageCard;