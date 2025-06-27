import { useEffect } from "react";
import { useChat } from "../store/useChat";
import ChatHeader from "./ChatHeader";
import MessageInput from "./MessageInput";
import MessageSkaleton from "./skeleton/MessageSkaleton";
import { useAuthStore } from "../store/useAuthStore";
import { formatMessage } from "../lib/utils.js";
import { useRef } from "react";
export default function ChatContainer() {
  const {
    OnListenToMessages,
    ListenToMessages,
    messages,
    getMessages,
    isMessagesLoading,
    selectedUser,
  } = useChat();
  const { authUser } = useAuthStore();
  const messagesEndRef = useRef(null);
  useEffect(() => {
    getMessages(selectedUser._id);
    ListenToMessages();

    return () => OnListenToMessages();
  }, [selectedUser._id, getMessages, OnListenToMessages, ListenToMessages]);
  useEffect(() => {
    if (messagesEndRef.current && messages) {
      setTimeout(() => {
        messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
      }, 500);
    }
  }, [messages]);

  if (isMessagesLoading) {
    return (
      <div className='flex-1 flex flex-col overflow-auto  '>
        <ChatHeader />
        <MessageSkaleton />
        <MessageInput />
      </div>
    );
  }

  return (
    <div className='flex-1 flex flex-col overflow-auto '>
      <ChatHeader />
      <div className='flex-1 overflow-y-auto p-4 space-y-4 '>
        {messages.map((message) => {
          return (
            <div
              key={message._id}
              className={`chat ${
                message.senderID === authUser._id ? "chat-end" : "chat-start"
              }`}
              ref={messagesEndRef}>
              <div className='chat-image avatar'>
                <div className='size-10 rounded-full border'>
                  <div>
                    <img
                      src={
                        message.senderID === authUser._id
                          ? authUser.profilePic || "/avatar"
                          : selectedUser.profilePic || "/avatar"
                      }
                      alt='profile-pic'
                    />
                  </div>
                </div>
              </div>
              <div className='chat-header mb-1 '>
                <time className='text-sm opacity-50 mt-1 '>
                  {formatMessage(message.createdAt)}
                </time>
              </div>
              <div className='chat-bubble flex flex-col'>
                {message.image && (
                  <img
                    src={message.image}
                    alt='attachment'
                    className='sm:max-w-[200px] rounded-md mb-2'
                  />
                )}
                {message.text && <p>{message.text}</p>}
              </div>
            </div>
          );
        })}
      </div>
      <MessageInput />
    </div>
  );
}
