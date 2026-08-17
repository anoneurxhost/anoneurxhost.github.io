import { useEffect, useState } from "react";
import DashboardLayout from "@/layouts/DashboardLayout";
import ChatList from "@/components/chat/ChatList";
import ChatWindow from "@/components/chat/ChatWindow";

// Message type
interface Message {
  id: string;
  senderId: string;
  senderName: string;
  message: string;
  timestamp: string;
  type: "text" | "file" | "image";
}

interface ChatUser {
  id: string;
  name: string;
  avatar: string;
  lastMessage: string;
  timestamp: string;
  unreadCount: number;
  isOnline: boolean;
  userType: "client" | "student" | "employee";
}

const DashboardChat = () => {
  const [selectedUserId, setSelectedUserId] = useState<string>("1");
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      senderId: "1",
      senderName: "John Client",
      message: "Hello, I need help with my project requirements.",
      timestamp: new Date().toISOString(),
      type: "text",
    },
    {
      id: "2",
      senderId: "current-user",
      senderName: "You",
      message: "Hi John! I'd be happy to help. What specific requirements are you looking for?",
      timestamp: new Date().toISOString(),
      type: "text",
    },
  ]);

  const chatUsers: ChatUser[] = [
    {
      id: "1",
      name: "John Client",
      avatar: "",
      lastMessage: "Hello, I need help with my project requirements.",
      timestamp: "2 min ago",
      unreadCount: 1,
      isOnline: true,
      userType: "client",
    },
    {
      id: "2",
      name: "Sarah Student",
      avatar: "",
      lastMessage: "When is the next submission deadline?",
      timestamp: "1 hour ago",
      unreadCount: 0,
      isOnline: false,
      userType: "student",
    },
    {
      id: "3",
      name: "Mike Johnson",
      avatar: "",
      lastMessage: "Project update completed",
      timestamp: "3 hours ago",
      unreadCount: 2,
      isOnline: true,
      userType: "employee",
    },
  ];

  // Simulate WebSocket new message event
  useEffect(() => {
    const timer = setInterval(() => {
      if (selectedUserId === "1") {
        const incomingMsg: Message = {
          id: Date.now().toString(),
          senderId: "1",
          senderName: "John Client",
          message: "Any updates on my project? 🙂",
          timestamp: new Date().toISOString(),
          type: "text",
        };
        setMessages((prev) => [...prev, incomingMsg]);
      }
    }, 15000); // every 15s

    return () => clearInterval(timer);
  }, [selectedUserId]);

  const handleSendMessage = (message: string) => {
    const newMessage: Message = {
      id: Date.now().toString(),
      senderId: "current-user",
      senderName: "You",
      message,
      timestamp: new Date().toISOString(),
      type: "text",
    };
    setMessages((prev) => [...prev, newMessage]);
  };

  const selectedUser = chatUsers.find((user) => user.id === selectedUserId);

  return (
    <DashboardLayout title="Chat & Messages">
      <div className="h-[calc(100vh-200px)] grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Chat list */}
        <div className="lg:col-span-1">
          <ChatList
            users={chatUsers}
            selectedUserId={selectedUserId}
            onSelectUser={setSelectedUserId}
          />
        </div>

        {/* Chat window */}
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

export default DashboardChat;
