import React from "react";
import Chat from "./chat/Chat";


const RoomNormal = (props) => {
    return (
        <div>
        <p> { props.room_name }</p>
        <p> { props.maxsize }</p>
        <p> { props.admin }</p>
        <p> { props.available }</p>
        <p> "udało się"</p>
        
        </div>
    );
  }
  
  export default RoomNormal;