import React from "react";
import "./ChatHeader.css";

//? Importing Header Icons
import NotificationsNoneIcon from "@material-ui/icons/NotificationsNone";
import EditLocationRoundedIcon from "@material-ui/icons/EditLocationRounded";
import PeopleAltRoundedIcon from "@material-ui/icons/PeopleAltRounded";
import SearchRoundedIcon from "@material-ui/icons/SearchRounded";
import SendRoundedIcon from "@material-ui/icons/SendRounded";
import HelpRoundedIcon from "@material-ui/icons/HelpRounded";

function ChatHeader({ channelName }) {
  return (
    <div className="chatHeader">
      <div className="chatHeader__left">
        <h3>
          <span className="classHeader__hash">#</span>
          {channelName}
        </h3>
      </div>

      <div className="chatHeader__right">
        <NotificationsNoneIcon />
        <EditLocationRoundedIcon />
        <PeopleAltRoundedIcon />
      </div>

      <div className="chatHeader__search">
        <input placeholder="Search" />
        <SearchRoundedIcon />
      </div>

      <SendRoundedIcon />
      <HelpRoundedIcon />
    </div>
  );
}

export default ChatHeader;
