import React from 'react';
import { login, logout } from '../actions/auth';


class LoginPage extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            username: "",
            password: "",
        };
    }

    changeValue = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        });
    }

    login_user = (e) => {
        e.preventDefault();
        login(this.state.username, this.state.password)
    }

    logout_user = (e) => {
        e.preventDefault();
        logout()
    }

    render() {
        return (
            <div>
                <form onSubmit={this.login_user} hidden={localStorage.getItem("currentUser")!=null}>
                    <input
                        name="username"
                        type="text"
                        value={this.state.username}
                        onChange={this.changeValue}
                        placeholder="username"
                    />
                    <input
                        name="password"
                        type="password"
                        value={this.state.password}
                        onChange={this.changeValue}
                        placeholder="password"
                    />
                    <button type="submit">Login</button>
                </form>

                <form onSubmit={this.logout_user} hidden={localStorage.getItem("currentUser")==null}>
                    <button type="submit">Logout</button>
                </form>
            </div>
        );
    }
}

export default LoginPage;
