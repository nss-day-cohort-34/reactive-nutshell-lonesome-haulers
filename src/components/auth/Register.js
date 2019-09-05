import React, { Component } from "react"
import UserManager from "../../modules/UserManager"
import { Button } from 'reactstrap';

class Register extends Component {

    // Set initial state
    state = {
        username: "",
        password: "",
        id: 0,
        color: '#000'
    }

    // Update state whenever an input field is edited
    handleFieldChange = (event) => {
        const stateToChange = {}
        stateToChange[event.target.id] = event.target.value
        this.setState(stateToChange)
    }

    handleRegister = (event) => {
        event.preventDefault()
        UserManager.getUsername(this.state.username).then(user => {
            if (user.length !== 0) {
                window.alert("Account already exists")
                document.querySelector("#username").value = ""
                document.querySelector("#password").value = ""
            } else if (this.state.username.length === 0 || this.state.password.length === 0) {
                window.alert("Please fill out all fields")
            } else {
            UserManager.post(this.state).then((object) => {
                sessionStorage.setItem(
                    "credentials",
                JSON.stringify({
                    username: this.state.username,
                    password: this.state.password,
                    id: object.id,
                    color: this.state.color
                })
            )
                this.props.history.push("/");
            })
        }
    })
    }

    handleCancel = (event) => {
        event.preventDefault()
        this.props.history.push("/login");
    }

    render() {
        return (
            <div className="login_container">
                <form onSubmit={this.handleRegister}>
                <h2 className="welcome">Welcome To</h2>
                <img src={ require('./Nutshell_logo.png') } alt="Nutshell logo"/>
                <fieldset>
                    <h3>Register</h3>
                    <div className="formgrid">
                        <label htmlFor="inputUsername">Username</label>
                        <input onChange={this.handleFieldChange} type="username"
                            id="username"
                            placeholder="Enter username"
                            required="" autoFocus="" />
                        <label htmlFor="inputPassword">Password</label>
                        <input onChange={this.handleFieldChange} type="password"
                            id="password"
                            placeholder="Password"
                            required="" />
                    </div>
                    <Button outline color="dark" size="sm" type="submit">
                        Submit
            </Button>
            <Button outline color="dark" size="sm" type="cancel" onClick={this.handleCancel}>
                        Cancel
            </Button>
                </fieldset>
            </form>
            </div>
        )
    }

}

export default Register