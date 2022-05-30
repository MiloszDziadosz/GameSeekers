import React from 'react';

const ErrorRegisterForm = (props) => {

    return (
        <div className='error-register'>
                <p>{ props.message }</p>
                <input
                    name="username"
                    type="text"
                    value={this.state.username}
                    onChange={this.changeValue}
                    placeholder = "username"
                /> 
                <input
                    name="email"
                    type="text"
                    value={this.state.email}
                    onChange={this.changeValue}
                    placeholder = "email"
                />
                <input
                    name="password1"
                    type="password"
                    value={this.state.password1}
                    onChange={this.changeValue}
                    placeholder = "Password"
                />
                <input
                    name="password2"
                    type="password"
                    value={this.state.password2}
                    onChange={this.changeValue}
                    placeholder = "repeat"
                />
                <button onClick={this.submit}>login</button> 
            </div>
    );
}

export default ErrorRegisterForm