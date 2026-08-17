
import { useState } from "react";
import DashboardLayout from "@/layouts/DashboardLayout";
import ChatList from "@/components/chat/ChatList";
import ChatWindow from "@/components/chat/ChatWindow";

const DashboardMessages = () => {
  const [selectedUserId, setSelectedUserId] = useState<string>("1");
  const [messages, setMessages] = useState([
    {
      id: "1",
      senderId: "1",
      senderName: "John Doe",
      message: "Project update is ready for review",
      timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
      type: 'text' as const
    },
    {
      id: "2",
      senderId: "current-user",
      senderName: "You",
      message: "Great! I'll review it shortly.",
      timestamp: new Date(Date.now() - 1 * 60 * 60 * 1000).toISOString(),
      type: 'text' as const
    },
    {
      id: "3",
      senderId: "1",
      senderName: "John Doe",
      message: "Thank you! Let me know if you need any clarifications.",
      timestamp: new Date().toISOString(),
      type: 'text' as const
    }
  ]);

  const chatUsers = [
    {
      id: "1",
      name: "John Doe",
      avatar: "",
      lastMessage: "Thank you! Let me know if you need any clarifications.",
      timestamp: "2 min ago",
      unreadCount: 1,
      isOnline: true,
      userType: 'employee' as const
    },
    {
      id: "2",
      name: "Jane Smith",
      avatar: "",
      lastMessage: "Can we schedule a meeting for tomorrow?",
      timestamp: "4 hours ago",
      unreadCount: 0,
      isOnline: false,
      userType: 'client' as const
    },
    {
      id: "3",
      name: "Mike Johnson",
      avatar: "",
      lastMessage: "Research paper has been submitted",
      timestamp: "1 day ago",
      unreadCount: 2,
      isOnline: true,
      userType: 'student' as const
    }
  ];

  const handleSendMessage = (message: string) => {
    const newMessage = {
      id: Date.now().toString(),
      senderId: "current-user",
      senderName: "You",
      message,
      timestamp: new Date().toISOString(),
      type: 'text' as const
    };
    setMessages(prev => [...prev, newMessage]);
  };

  const selectedUser = chatUsers.find(user => user.id === selectedUserId);

  return (
    <DashboardLayout title="Messages & Communication">
      <div className="h-[calc(100vh-200px)] grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1">
          <ChatList
            users={chatUsers}
            selectedUserId={selectedUserId}
            onSelectUser={setSelectedUserId}
          />
        </div>
        <div className="lg:col-span-2">
          {selectedUser ? (
            <ChatWindow
              recipientName={selectedUser.name}
              recipientAvatar={selectedUser.avatar}
              messages={messages}
              currentUserId="current-user"
              onSendMessage={handleSendMessage}
              isOnline={selectedUser.isOnline}
            />
          ) : (
            <div className="h-full flex items-center justify-center bg-white/10 backdrop-blur-sm border-white/20 rounded-lg">
              <p className="text-white">Select a conversation to start chatting</p>
            </div>
          )}
        </div>
      </div>
    </DashboardLayout>
  );
};

export default DashboardMessages;
