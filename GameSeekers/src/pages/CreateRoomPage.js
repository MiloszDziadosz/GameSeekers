import React from 'react';
import '../styles/ContactPage.css';
import { Prompt } from 'react-router-dom';
import RoomAdmin from '../components/RoomAdmin';


class CreateRoomPage extends React.Component {
    constructor(props) {
        super(props)
        console.log(props)
        this.state = {
            room_name: "",
            maxsize: "",
            game: "",
            currentUser: localStorage.getItem('currentUser'),
            // history: props.history,
            isEmpty: true,
        }
    }


    handleSubmit = (e) => {
        e.preventDefault();
        try {
            fetch(
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

            }).then(response => {

                if (response.status === 200) {
                    // TODO: notification for user
                    this.props.history.push({ pathname: "/room/:" + this.state.room_name, state: { rm: this.state.room_name, ad: this.state.currentUser, mm: [{ username: this.state.currentUser }], av: this.state.maxsize - 1, ms: this.state.maxsize } })
                } else {
                    // TODO: notification for user
                }
            })
        } catch (err) {
            console.log(err.message)
            // TODO: notification for user
        }
    }


    handleChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value,
            isEmpty: false
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
                    when={this.state.isEmpty}
                    message="Masz niewypełniony formularz. Czy na pewno chcesz opuścić tę stronę"
                />
            </div>

        );
    }
}

export default CreateRoomPage;
