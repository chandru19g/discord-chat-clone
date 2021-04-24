import React from "react";
import { Avatar } from "@material-ui/core";
import "./Message.css";

function messages({ currUser, message, user, timestamp }) {
  return currUser === user.displayName ? (
    <div className="message">
      <Avatar src={user.photo} />
      <div className="message__info">
        <h4>
          {user.displayName}
          <span className="message__timestamp">
            {new Date(parseInt(timestamp)).toString()}
          </span>
        </h4>
        <p>{message}</p>
      </div>
    </div>
  ) : (
    <div className="message2">
      <Avatar src={user.photo} />
      <div className="message__info">
        <h4>
          {user.displayName}
          <span className="message__timestamp">
            {new Date(parseInt(timestamp)).toString()}
          </span>
        </h4>
        <p>{message}</p>
      </div>
    </div>
  );
}

export default messages;
