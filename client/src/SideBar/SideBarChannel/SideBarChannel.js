import React from "react";
import { useDispatch } from "react-redux";
import "./SideBarChannel.css";
import { setChannelInfo } from "../../features/appSlice";

function SideBarChannel({ id, channelName }) {
  const dispatch = useDispatch();

  return (
    <div
      className="sidebarChannel"
      onClick={() =>
        dispatch(
          setChannelInfo({
            channelId: id,
            channelName: channelName,
          })
        )
      }
    >
      <h4>
        <span className="sidebarChannel__hash">#</span> {channelName}
      </h4>
    </div>
  );
}

export default SideBarChannel;
