import React from 'react';

import { Redirect } from 'react-router-dom';
import axios from 'axios';
import { Link } from 'react-router-dom';

class LoginPage extends React.Component {
    
    constructor(props){
        super(props)
        this.state={
            username: "",
            password: "",
            redirect: "",
        };
        
    }

    

    changeValue = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        });
    }

    submit = () => {
        axios.post("https://game-seekers-backend.herokuapp.com/v1/accounts/login/", {
            "username": this.state.username,
            "password": this.state.password
        }).then((response) => {
            localStorage.setItem('access_token', response.data.access);
            localStorage.setItem('refresh_token', response.data.refresh);
            localStorage.setItem('currentUser', 'test123')
            this.setState({redirect: response.status})
        }).catch((error) => {

        });        
    }
   
    render(){  

        if (this.state.redirect === 200) {
            return <Redirect to='/roomlist'/>;
        }
        else{
            return (
            
            <div>
                <h1>{this.state.redirect}</h1>
                <input
                    name="username"
                    type="text"
                    value={this.state.username}
                    onChange={this.changeValue}
                    placeholder = "username"
                /> 
                <input
                    name="password"
                    type="password"
                    value={this.state.password}
                    onChange={this.changeValue}
                    placeholder = "password"
                />
                <button onClick={this.submit}>login</button>
                <p>If you don't have account -{'>'} <Link to={{ pathname: "/register" }}>Register</Link></p> 
            </div>
        );
    }
}}

export default LoginPage;
