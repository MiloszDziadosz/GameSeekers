import React from 'react';
import '../styles/ContactPage.css';
import { Prompt } from 'react-router-dom';


class CreateRoomPage extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            room_name: "",
            gamename: "",
            maxsize: "",
            // isEmpty: true,
        }
    }
  

    handleSubmit = (e) => {
        e.preventDefault();
        console.log(JSON.stringify({
            "room_name": this.state.room_name,
            "maxsize": this.state.maxsize,
            "members": [{ username: localStorage.getItem('currentUser') }]
        }))
        try {
            let res = fetch(
                "https://game-seekers-backend.herokuapp.com/v1/room/", {
                method: 'post',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + localStorage.getItem('access_token')
                },
                body:
                    JSON.stringify({
                        "room_name": this.state.room_name,
                        "maxsize": this.state.maxsize,
                        "members": [{ username: localStorage.getItem('currentUser') }]
                    })

            })
                // .then((res) => res.json())
            if (res.status === 200) {
                console.log(res)
            } else {
                console.log(res)
            }
        } catch (err) {
            console.log(err.message)
        }
    }


    handleChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        });
    }



    render() {
        return (
            <div className="contact">
                <form onSubmit={this.handleSubmit}>
                    <h3>Tworzenie pokoju</h3>
                    <input name="room_name" type="text" value={this.state.value} onChange={this.handleChange} placeholder="Nazwa pokoju"></input>
                    <input name="game" type="text" value={this.state.value} onChange={this.handleChange} placeholder="Gra"></input>
                    <input name="maxsize" type="number" value={this.state.value} onChange={this.handleChange} placeholder="Maksymalna liczba graczy"></input>
                    <button onClick={this.handleSubmit}>Utwórz</button>
                </form>
                <Prompt
                    when={!this.state.isEmpty}
                    message="Masz niewypełniony formularz. Czy na pewno chcesz opuścić tę stronę"
                />
            </div>

        );
    }
}

export default CreateRoomPage;
