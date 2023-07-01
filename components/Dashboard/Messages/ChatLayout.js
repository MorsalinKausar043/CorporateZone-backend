import React, { useEffect, useState } from "react";
import Chats from "./Chats";
import { useSelector } from "react-redux";
import SingleChat from "./SingleChat";
import { getSender } from "../../../config/ChatLogics";

const ChatLayout = () => {
  const loggedInUser = useSelector((state) => state.user.loggedInUser);
  const [users, setUsers] = useState([]);
  const [selectedChat, setSelectedChat] = useState(null);

  useEffect(() => {
    const fetchUsers = async () => {
      const response = await fetch(
        "https://corporate-zone-backend-main.vercel.app/users"
      );
      const data = await response.json();
      const allUsers = data.filter((user) => user._id !== loggedInUser?._id);
      setUsers(allUsers);
    };

    fetchUsers();
  }, []);

  return (
    <section
      className="w-full chats sm:grid grid-cols-12 gap-3 overflow-y-scroll"
      style={{ height: "86vh" }}
    >
      {/* // chats names */}
      <div className=" chats xl:col-span-3 md:col-span-4 w-full  h-full overflow-y-scroll ">
        <Chats
          setSelectedChat={setSelectedChat}
          loggedInUser={loggedInUser}
          users={users}
        />
      </div>
      {/* chat message */}
      <div className="xl:col-span-9 md:col-span-8 w-full bg-white h-full py-5 px-5">
        <SingleChat loggedInUser={loggedInUser} selectedChat={selectedChat} />
      </div>
    </section>
  );
};

export default ChatLayout;
