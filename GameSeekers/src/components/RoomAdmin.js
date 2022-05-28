import React from "react";
import { Link } from 'react-router-dom';


const RoomAdmin = (props) => {
    return (
        <div>
            <p> Jesteś administratorem tego pokoju </p>

            <p> {props.room_name}</p>
            <p> {props.maxsize}</p>
            <p> {props.admin}</p>
            <p> {props.available}</p>

            <Link  to={{pathname: "/editroom",state: {room_name: props.room_name,admin: props.admin,members: props.members,maxsize: props.maxsize}}}>Edycja</Link>
        </div>
    );
}


export default RoomAdmin;