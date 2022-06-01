import React from "react";
import '../styles/RoomList.css';
import { Link } from 'react-router-dom';
import { Redirect } from "react-router-dom";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


class RoomList extends React.Component {


    // Constructor 
    constructor(props) {
        super(props);

        this.state = {
            items: {},
            DataisLoaded: false,
        };

    }

    // ComponentDidMount is used to
    // execute the code 
    componentDidMount() {
        fetch(
            "https://game-seekers-backend.herokuapp.com/v1/room/", {
            method: 'get',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('access_token')
            }
        })
            .then((res) => res.json())
            .then((json) => {
                this.setState({
                    items: json,
                    DataisLoaded: true,
                    error: true
                })
            }).catch((error) => {
                console.log(error)
            });



    }
    render() {
        const DataisLoaded = this.state.DataisLoaded;
        const items = this.state.items;

        if (!DataisLoaded) {
            return <div>
                <h1> Pleses wait some time.... </h1> </div>;
        }
        // if (this.state.error === true) {
        //     return <p>do login</p>;}
        try {
            items.results.map((item) => (
                <div className="roomListItem">
                    <li>Nazwa: {item.room_name}</li>
                    <li>Właściciel: {item.admin}</li>
                    <li>Miejsca: {item.available}/{item.maxsize}</li>
                    <Link to={{ pathname: "/room/:" + item.room_name, state: { rm: item.room_name, ad: item.admin, mm: item.members, av: item.available, ms: item.maxsize } }}>Wejdz</Link>
                </div>
            ))
        } catch (error) {
            localStorage.removeItem('access_token')
            localStorage.removeItem('refresh_token')
            localStorage.removeItem('currentUser')
            return <Redirect to='/login' />;
        }
        if (this.state.error == true) {
            return (
                <div className="App">
                    <h1> Room List </h1>  {
                        items.results.map((item) => (
                            <div className="roomListItem">
                                <li key="room_name">Nazwa: {item.room_name}</li>
                                <li key="game_name">Gra: {item.game_name} </li>
                                <li key="city">Miasto: {item.city} </li>
                                <li key="admin">Właściciel: {item.admin}</li>
                                <li key="available">Miejsca: {item.available}/{item.maxsize}</li>
                                <Link to={{ pathname: "/room/:" + item.room_name, state: { rm: item.room_name, ad: item.admin, mm: item.members, av: item.available, ms: item.maxsize } }}>{(item.members.map(({ username }) => username)).includes(localStorage.getItem("currentUser")) ? "Wejdź" : "Dołącz"}</Link>
                            </div>
                        ))}


                </div>
            );
        }
    }
}

export default RoomList;