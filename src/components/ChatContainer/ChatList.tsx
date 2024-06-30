import { useEffect, useState } from "react";
import { ChannelRef } from "../../type/Channel";
import { subscribeChannels } from "../../features/channel/channelAPI";
import ChannelCell from "./ChannelCell";

const ChatList = () => {
  const [channelRefs, setChannelRefs] = useState<ChannelRef[]>([]);

  useEffect(() => {
    const unsubscribe = subscribeChannels((channelRefs) => {
      setChannelRefs(channelRefs);
    });
    return () => unsubscribe();
  }, []);

  return (
    <div className="w-64 bg-gray-800">
      <div className="px-4 py-3 mb-4 border-b border-gray-700">
        <span className="text-gray-300 font-bold">チャンネル</span>
      </div>
      <div className="overflow-y-auto">
        {channelRefs.map(({ channel, id }) => (
          <ChannelCell channel={channel} id={id} />
        ))}
      </div>
      <div className="px-4 py-2">
        <button className="text-gray-300 hover:text-">
          + チャンネルを追加する
        </button>
      </div>
    </div>
  );
};

export default ChatList;
