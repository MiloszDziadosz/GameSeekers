import React from "react";
import "../styles/RoomPage.css"
import { toast } from 'react-toastify';
import MeetingInfo from "./MeetingInfo";
import ChatList from '../components/chat/ChatList';
import { Redirect } from 'react-router-dom';

class RoomNormal extends React.Component {

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
                    json.results.map((item) => {
                        Object.keys(item).map((key) => {
                            this.setState({[key]: item[key]})
                        })})
                })

        } catch (err) {
            console.log(err.message)
        }
    }

    handleLeave = (e) => {
        e.preventDefault();
        try{
            fetch("https://game-seekers-backend.herokuapp.com/v1/room/" + this.state.room_name+ "/leave", {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + localStorage.getItem('access_token')
                }
            }).then(response => {
                if(response.status===200) {
                    response.json().then(json => {
                        toast.success('🦄 ' + json.detail, {
                            position: "top-center",
                            autoClose: 2000,
                            hideProgressBar: false,
                            closeOnClick: true,
                            pauseOnHover: true,
                            draggable: true,
                            progress: undefined,
                        });
                        this.setState({leave: true})
                    })
                    
                }
            })
        } catch(err) {
            console.log(err.message)
        }
        
    }

    render() {
        if (this.state.leave === true) {
            return <Redirect to='/roomlist'/>;
        }
        return (
            <div className="room-container">
                <ChatList room={this.state.room_name} />
                <div className="room-title">
                <div className="room-name">
                <p> {this.state.room_name}</p></div>
                </div>
                <div className="room-page-info">
                <p>Gra: <span>{this.state.game_name}</span></p>
                <p> Admin: <span>{this.state.admin}</span></p>
                <p> Miejsca: <span>{this.state.maxsize - this.state.available}/{this.state.maxsize}</span></p>
                </div>
                <div className="member-list">
                    <div className="member-list-title"><p>Członkowie:</p></div>
                    <div className="member-list-items">
                        {this.state.members.map((item) => (
                            <p key={item.username}> {item.username}</p>))}
                    </div>
                </div>

                <MeetingInfo room_name={this.state.room_name} ifAdmin={0} />
                <div className="buttons">
                    <form onSubmit={this.handleLeave}>
                        <button className="btn" type="submit">Opuść pokój</button>
                    </form>
                </div>

            </div>
        );
    }
}

export default RoomNormal;