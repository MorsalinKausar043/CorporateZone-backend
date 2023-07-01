import React, { useEffect, useState } from "react";
import cogoToast from "cogo-toast";
import { getSender } from "../../../config/ChatLogics";
import axios from "axios";
import ScrollableChat from "./ScrollableChat";
import io from "socket.io-client";

const ENDPOINT = "https://murmuring-spire-15534.herokuapp.com";
var socket, selectedChatCompare;

const SingleChat = ({ loggedInUser, selectedChat }) => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [newMessage, setNewMessage] = useState("");
  const [socketConnection, setSocketConnection] = useState(false);

  const fetchMessages = async () => {
    if (!selectedChat) return;

    try {
      setLoading(true);

      const { data } = await axios.get(
        `https://corporate-zone-backend-main.vercel.app/messages/${selectedChat?._id}`
      );

      setMessages(data);
      setLoading(false);

      socket.emit("join chat", selectedChat?._id);
    } catch (err) {
      cogoToast.error(err.message);
    }
  };
  useEffect(() => {
    fetchMessages();
    selectedChatCompare = selectedChat;
  }, [selectedChat]);

  useEffect(() => {
    socket = io(ENDPOINT);
    socket.emit("setup", loggedInUser);
    socket.on("connection", () => {
      setSocketConnection(true);
    });
  }, []);

  useEffect(() => {
    socket.on("message received", (newMessageReceived) => {
      if (
        !selectedChatCompare ||
        selectedChatCompare._id !== newMessageReceived.chat._id
      ) {
        // gice notification
      } else {
        setMessages([...messages, newMessageReceived]);
      }
    });
  });

  // send message handler
  const sendMessage = async (event) => {
    if (event.key === "Enter" && newMessage) {
      try {
        event.preventDefault();

        const config = {
          headers: {
            "Content-Type": "application/json",
          },
        };
        setNewMessage("");
        const { data } = await axios.post(
          " https://corporate-zone-backend-main.vercel.app/messages",
          {
            senderId: loggedInUser?._id,
            content: newMessage,
            chatId: selectedChat?._id,
          },
          config
        );
        console.log(data);
        socket.emit("newMessage", data);
        setMessages([...messages, data]);
      } catch (err) {
        cogoToast.error(err.message);
      }
    }
  };

  return (
    <div className="w-full h-full bg-slate-200">
      {selectedChat ? (
        <div className="relative h-full flex flex-col">
          <div className="flex-grow">
            <div>
              <h1 className="text-2xl py-2 text-center capitalize bg-white">
                {selectedChat ? (
                  <>{getSender(loggedInUser, selectedChat?.users)}</>
                ) : (
                  "Anonymous"
                )}
              </h1>
            </div>
            {loading ? (
              <div className="flex h-full items-center justify-center">
                <h6 className="text-center text-red-500">Loading....</h6>
              </div>
            ) : (
              <div className="messages">
                <ScrollableChat messages={messages} />
              </div>
            )}
          </div>
          {/* // chat input */}
          <div className="relative bottom-0">
            <form onKeyDown={sendMessage}>
              <input
                className="w-full px-3 py-2 bg-transparent  border border-slate-400 focus:outline-blue-500"
                placeholder="Enter a message.."
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                type="text"
              />
            </form>
          </div>
        </div>
      ) : (
        <div className="w-full h-full flex items-center justify-center ">
          <h1 className="text-center text-2xl font-thin">
            Please Select Someone You Want to Chat
          </h1>
        </div>
      )}
    </div>
  );
};

export default SingleChat;
