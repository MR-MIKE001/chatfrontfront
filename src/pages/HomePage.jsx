import ChatContainer from "../component/ChatContainer";
import NoChatSelected from "../component/NoChatSelected";
import Sidebar from "../component/Sidebar";
import { useChat } from "../store/useChat";

function HomePage() {
  const { selectedUser } = useChat();

  return (
    <div className='h-screen bg-base-200 '>
      <div className='flex items-center justify-center pt-20 px-4 '>
        <div className='bg-base-100 rounded-lg shadow-xl w-full max-w-6xl h-[calc(100hv-8rem)]'>
          <div className='flex h-full rounded-lg overflow-hidden '>
            <Sidebar className='' />
            {!selectedUser ? <NoChatSelected /> : <ChatContainer />}
          </div>
        </div>
      </div>
    </div>
  );
}

export default HomePage;
