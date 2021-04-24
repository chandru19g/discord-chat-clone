import React, { useEffect, useState } from "react";
import "./SideBar.css";
import SideBarChannel from "./SideBarChannel/SideBarChannel";

// ?importing export more icon from materiaui
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";

// ?importing Add icon from materialui
import AddIcon from "@material-ui/icons/Add";

// ?importing signalcellular icon from materialui
import SignalCellularAltIcon from "@material-ui/icons/SignalCellularAlt";

// ?importing InfoOutlinedIcon icon from materialui
import InfoOutlinedIcon from "@material-ui/icons/InfoOutlined";

// ?importing CallIcon icon from materialui
import CallIcon from "@material-ui/icons/Call";

// ?importing Avatar icon from materialcore
import { Avatar } from "@material-ui/core";

// ?importing Mic Headset and Settings icon from materialcore
import MicIcon from "@material-ui/icons/Mic";
import HeadsetIcon from "@material-ui/icons/Headset";
import SettingsIcon from "@material-ui/icons/Settings";
import { useSelector } from "react-redux";
import { selectUser } from "../features/userSlice";
import { auth } from "../firebase";

import axios from "../axios";
import Pusher from "pusher-js";

const pusher = new Pusher("63295604a7aed1028e21", {
  cluster: "ap2",
});

function SideBar() {
  const user = useSelector(selectUser);
  const [channels, setChannels] = useState([]);

  const getChannels = () => {
    axios.get("/get/channelList").then((res) => {
      setChannels(res.data);
    });
  };

  useEffect(() => {
    getChannels();

    const channel = pusher.subscribe("channels");
    channel.bind("newChannel", function (data) {
      getChannels();
    });
  }, []);

  const handleAddChannel = () => {
    const channelName = prompt("Enter the Channel Name");

    if (channelName) {
      axios.post("/new/channel", {
        channelName: channelName,
      });
    }
  };

  return (
    <div className="sidebar">
      {/* //?Top Section of the sidebar */}
      <div className="sidebar__top">
        <h3>Discord Clone</h3>
        <ExpandMoreIcon />
      </div>

      {/* //?Body of Channel Section of the Sidebar */}
      <div className="sidebar__channels">
        <div className="sidebar__channelsHeader">
          <div className="sidebar__header">
            <ExpandMoreIcon />
            {/* //?Channels Header */}
            <h4>Text Channels</h4>
          </div>
          <AddIcon onClick={handleAddChannel} className="sidebar__addChannel" />
        </div>
        {/*  //?ChannelsLit of the Sidebar */}
        <div className="sidebar__channelsList">
          {channels.map((channel) => (
            <SideBarChannel
              key={channel.id}
              id={channel.id}
              channelName={channel.name}
            />
          ))}
        </div>
      </div>

      {/* //? SignalCellular UI design */}
      <div className="sidebar__voice">
        <SignalCellularAltIcon
          className="sidebar__voiceIcon"
          fontSize="large"
        />
        <div className="sidebar__voiceInfo">
          <h3>Voice Connected</h3>
          <p>Stream</p>
        </div>
        <div className="sidebar__voiceIcons">
          <InfoOutlinedIcon />
          <CallIcon />
        </div>
      </div>
      {/*  //?Profile Screen sidebar */}
      <div className="sidebar__profile">
        <Avatar onClick={() => auth.signOut()} src={user.photo} />
        <div className="sidebar__profileInfo">
          <h3>{user.displayName}</h3>
          <p>#{user.uid.substring(0, 5)}</p>
        </div>

        <div className="sidebar__profileIcons">
          <MicIcon />
          <HeadsetIcon />
          <SettingsIcon />
        </div>
      </div>
    </div>
  );
}

export default SideBar;
