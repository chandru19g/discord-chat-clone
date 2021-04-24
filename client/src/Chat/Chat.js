import React, { useEffect, useRef, useState } from "react";
import "./Chat.css";
import ChatHeader from "./Components/ChatHeader";
import AddCircleIcon from "@material-ui/icons/AddCircle";
import CardGiftcardIcon from "@material-ui/icons/CardGiftcard";
import GifIcon from "@material-ui/icons/Gif";
import EmojiEmotionsIcon from "@material-ui/icons/EmojiEmotions";
import Messages from "./Messages/Messages";
import { useSelector } from "react-redux";
import { selectUser } from "../features/userSlice";
import { selectChannelId, selectChannelName } from "../features/appSlice";
import axios from "../axios";
import Pusher from "pusher-js";

const pusher = new Pusher("63295604a7aed1028e21", {
  cluster: "ap2",
});

function Chat() {
  const messagebtm = useRef(null);
  const user = useSelector(selectUser);
  const channelId = useSelector(selectChannelId);
  const channelName = useSelector(selectChannelName);
  const [input, setInput] = useState("");
  const currUser = user.displayName;
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    if (messagebtm) {
      messagebtm.current.addEventListener("DOMNodeInserted", (event) => {
        const { currentTarget: target } = event;
        target.scroll({ top: target.scrollHeight, behavior: "smooth" });
      });
    }
  });

  const getConversation = (channelId) => {
    if (channelId) {
      axios.get(`/new/conversation?id=${channelId}`).then((res) => {
        setMessages(res.data[0].conversation);
      });
    }
  };

  useEffect(() => {
    getConversation(channelId);

    const channel = pusher.subscribe("conversation");
    channel.bind("newMessage", function (data) {
      getConversation(channelId);
    });
  }, [channelId]);

  const sendMessage = (e) => {
    e.preventDefault();

    axios.post(`/new/messages?id=${channelId}`, {
      message: input,
      timestamp: Date.now(),
      user: user,
    });
    setInput("");
  };

  return (
    <div className="chat">
      <ChatHeader channelName={channelName} />

      <div className="chat__messages" ref={messagebtm}>
        {messages.map((message) => (
          <Messages
            key={message._id}
            message={message.message}
            timestamp={message.timestamp}
            user={message.user}
            currUser={currUser}
          />
        ))}
      </div>

      <div className="chat__input">
        <AddCircleIcon fontSize="large" />
        <form>
          <input
            value={input}
            disabled={!channelId}
            onChange={(e) => setInput(e.target.value)}
            placeholder={`Message #${channelName}`}
          />
          <button
            onClick={sendMessage}
            className="chat__inputButton"
            type="submit"
          >
            Send Message
          </button>
        </form>

        <div className="chat__inputIcons">
          <CardGiftcardIcon fontSize="large" />
          <GifIcon fontSize="large" />
          <EmojiEmotionsIcon fontSize="large" />
        </div>
      </div>
    </div>
  );
}

export default Chat;
