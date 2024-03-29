import React from "react";
import '../styles/RoomList.css';
import { Link } from 'react-router-dom';
import { Redirect } from "react-router-dom";




class GamesPage extends React.Component {

    
    // Constructor 
    constructor(props) {
        super(props);

        this.state = {
            items: {},
            DataisLoaded: false,
            error: ""
        };
    }

    // ComponentDidMount is used to
    // execute the code 
    componentDidMount() {
        fetch(
            "https://game-seekers-backend.herokuapp.com/v1/game/", {
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
        const  items  = this.state.items;
        if (!DataisLoaded) {return <div>
            <h1> Pleses wait some time.... </h1> </div>;}
        // if (this.state.error === true) {
        //     return <p>do login</p>;}
        try {
            items.results.map((item) => (
                <div className="gamesListItem">
                    <li>Nazwa: {item.game_name}</li>
                    <li>Właściciel: {item.publisher_name}</li>
                    <li>Miejsca: {item.min_players}/{item.max_players}</li>
                    
                </div>
            ))
        } catch (error) {
            return <Redirect to='/login'/>;
        }
        if (this.state.error==true) {
        return (
            <div className="App">
                <h1> Games List </h1>  {
                    items.results.map((item) => (
                        <div className="gamesListItem">
                            <li>Nazwa gry: {item.game_name}</li>
                            <li>Wydawca: {item.publisher_name}</li>
                            <li>Ilość graczy: {item.min_players}-{item.max_players}</li>
                            
                        </div>
                    ))}

                
            </div>
        );
    }}
}

export default GamesPage;