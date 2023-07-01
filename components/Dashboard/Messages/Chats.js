import React from "react";

import axios from "axios";
import { BiMessageDetail } from "react-icons/bi";
import { FcVideoCall } from "react-icons/fc";

const Chats = ({ selectedChat, setSelectedChat, loggedInUser, users }) => {
  const createChat = async (id) => {
    const doc = {
      senderId: loggedInUser._id,
      receiverId: id,
    };

    const { data } = await axios.post(
      "https://corporate-zone-backend-main.vercel.app/chats",
      doc
    );
    setSelectedChat(data);
  };

  const startVideoChat = (id, username) => {
    createChat(id);
    const notify = `${loggedInUser?.username} join your chat, please join , https://meet.jit.si/${username}`;
  };
  return (
    <div>
      <h1 className="text-center py-2 text-3xl"> Chats</h1>
      <div className="py-5">
        {users?.map((user) => (
          <div key={user._id}>
            <div className="flex px-3 py-2 bg-white items-center justify-between my-2 rounded  transition duration-300">
              {user?.photoURL ? (
                <img
                  className="w-12 h-12 "
                  style={{ borderRadius: "50%" }}
                  src={user?.photoURL}
                  alt=""
                />
              ) : (
                <img
                  className="w-12 h-12 "
                  style={{ borderRadius: "50%" }}
                  src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTbYJVcYGSoZSxYfXFGYVQwaCpLQRKqpmf5Zp77UeZXZXVWgiw-jNwENx_C4GfglwZTR38&usqp=CAU"
                  alt=""
                />
              )}

              <div>
                <h1 className=" capitalize py-2">{user?.username}</h1>
                <div className="flex justify-end items-center">
                  <span>
                    <BiMessageDetail
                      onClick={() => createChat(user._id)}
                      className="text-xl mr-5 hover:text-cyan-500 cursor-pointer "
                    />
                  </span>
                  <span>
                    <a
                      href={`https://meet.jit.si/${user?.username}`}
                      rel="noreferrer"
                      target="_blank"
                    >
                      <FcVideoCall
                        onClick={() => startVideoChat(user._id, user?.username)}
                        className="text-2xl cursor-pointer "
                      />
                    </a>
                  </span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Chats;
