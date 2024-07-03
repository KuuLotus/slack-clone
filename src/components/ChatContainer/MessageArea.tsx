import { TextareaAutosize } from "@mui/base/TextareaAutosize";
import SendIcon from "@mui/icons-material/Send";
import { ChangeEvent, KeyboardEvent, useEffect, useState } from "react";
import { MessageRef } from "../../type/Message";
import { useAppSelector } from "../../app/hooks";
import {
  createMessage,
  postMessage,
  subscribeMessages,
} from "../../features/message/messageAPI";
import MessageTile from "./MessageTile";

const MessageArea = () => {
  const [messageRefs, setMessageRefs] = useState<MessageRef[]>([]);
  const userId = useAppSelector((state) => state.user.userId);
  const channelId: string = useAppSelector(
    (state) => state.channel.currentChannelId
  );

  const [message, setMessage] = useState("");
  const handleInputChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setMessage(e.target.value);
  };

  const sendMessage = async () => {
    if (userId) {
      try {
        await postMessage(createMessage(userId, channelId, message));
        setMessage("");
      } catch (e) {
        console.error("Error sending message: ", e);
      }
    }
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if ((e.metaKey || e.ctrlKey) && e.code === "Enter") {
      sendMessage();
    }
  };

  useEffect(() => {
    const unsubscribe = subscribeMessages(channelId, (messageRefs) => {
      setMessageRefs(messageRefs);
    });
    return () => unsubscribe();
  }, [channelId]);

  return (
    <div className="flex-1 flex flex-col bg-gray-500 text-white">
      <div className="p-4 m-3 overflow-y-auto">
        {messageRefs.map((messageRef) => (
          <MessageTile message={messageRef.message} key={messageRef.id} />
        ))}
      </div>
      <div className="mt-auto px-4 py-2 bottom-0 bg-gray-900">
        <div className="flex items-center">
          <TextareaAutosize
            placeholder=" # randomへメッセージを入力"
            className="bg-gray-700 flex-1 text-white p-2 mx-2 rounded-lg focus:outline-none"
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
            value={message}
          />
          <button
            className="text-gray-400 hover:text-white"
            onClick={sendMessage}
          >
            <SendIcon />
          </button>
        </div>
      </div>
    </div>
  );
};

export default MessageArea;
