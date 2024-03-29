import React from 'react';

import { Redirect } from 'react-router-dom';
import axios from 'axios';
import { Link } from 'react-router-dom';
import "../styles/LoginPage.css";


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
            
            <div className="login-page-container">
                <h1>Logowanie</h1>
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
                <div className='btn-container'>
                <button className='btn' onClick={this.submit}>login</button>
                </div>
                <p>If you don't have account -{'>'} <Link to={{ pathname: "/register" }}>Register</Link></p> 
            </div>
        );
    }
}}

export default LoginPage;
