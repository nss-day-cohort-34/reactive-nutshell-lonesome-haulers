import React, { Component } from "react"
import { Link } from "react-router-dom"
class Login extends Component {

    // Set initial state
    state = {
        username: "",
        password: ""
    }

    // Update state whenever an input field is edited
    handleFieldChange = (event) => {
        const stateToChange = {}
        stateToChange[event.target.id] = event.target.value
        this.setState(stateToChange)
    }

    handleLogin = (event) => {
        event.preventDefault()
        sessionStorage.setItem(
            "credentials",
            JSON.stringify({
                username: this.state.username,
                password: this.state.password
            })
        )
        this.props.history.push("/home");

    }

    render() {
        return (
            <form onSubmit={this.handleLogin}>
                <h2>Welcome To Nutshell</h2>
                <fieldset>
                    <h3>Login</h3>
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
                    <button type="submit">
                        Submit
            </button>
                    <Link className="nav-link" to="/register">Don't have an account?</Link>
                </fieldset>
            </form>
        )
    }

}

export default Login