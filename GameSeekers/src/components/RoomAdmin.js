import React from "react";
import { Link } from 'react-router-dom';

class RoomAdmin extends React.Component {

    constructor(props) {
        super(props)

        this.state = props
    }

    componentDidMount() {
        try {
            fetch(
                "https://game-seekers-backend.herokuapp.com/v1/room/?room_name=" + this.state.room_name, {
                method: 'get',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + localStorage.getItem('access_token')
                },
            }).then((res) => res.json())
                .then((json) => {
                    json.results.map((item) => (this.setState(item)))
                })

        } catch (err) {
            console.log(err.message)
        }
    }

    render() {
        return (

            <div>
                <p> Jesteś administratorem tego pokoju </p>

                <p> {this.state.room_name}</p>
                <p>Gra: {this.state.game}</p>
                <p> Admin: {this.state.admin}</p>
                <p> Wolnych miejsc: {this.state.available}</p>
                <p> Maksymalna liczba graczy: {this.state.maxsize}</p>{
                    this.state.members.map((item) => (
                        <p> {item.username}</p>))}

                <Link to={{ pathname: "/editroom/:" + this.state.room_name, state: { room_name: this.state.room_name, admin: this.state.admin, members: this.state.members, maxsize: this.state.maxsize, game: this.state.game } }}>Edycja</Link>
            </div>
        )
    }
}

export default RoomAdmin;