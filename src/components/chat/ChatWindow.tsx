
import { useState, useRef, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Send, Phone, Video, MoreVertical, Paperclip } from "lucide-react";

interface Message {
  id: string;
  senderId: string;
  senderName: string;
  message: string;
  timestamp: string;
  type: 'text' | 'file' | 'image';
}

interface ChatWindowProps {
  recipientName: string;
  recipientAvatar?: string;
  messages: Message[];
  currentUserId: string;
  onSendMessage: (message: string) => void;
  isOnline?: boolean;
}

const ChatWindow = ({ 
  recipientName, 
  recipientAvatar, 
  messages, 
  currentUserId, 
  onSendMessage,
  isOnline = false 
}: ChatWindowProps) => {
  const [newMessage, setNewMessage] = useState("");
  const scrollAreaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTop = scrollAreaRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      onSendMessage(newMessage);
      setNewMessage("");
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <Card className="h-full flex flex-col bg-white/10 backdrop-blur-sm border-white/20">
      {/* Chat Header */}
      <CardHeader className="flex flex-row items-center justify-between p-4 border-b border-white/10">
        <div className="flex items-center space-x-3">
          <Avatar className="w-10 h-10">
            <AvatarImage src={recipientAvatar} />
            <AvatarFallback>{recipientName.charAt(0)}</AvatarFallback>
          </Avatar>
          <div>
            <CardTitle className="text-white text-sm">{recipientName}</CardTitle>
            <p className="text-xs text-gray-400">
              {isOnline ? "Online" : "Last seen recently"}
            </p>
          </div>
        </div>
        <div className="flex space-x-2">
          <Button size="sm" variant="ghost" className="text-white hover:bg-white/20">
            <Phone className="w-4 h-4" />
          </Button>
          <Button size="sm" variant="ghost" className="text-white hover:bg-white/20">
            <Video className="w-4 h-4" />
          </Button>
          <Button size="sm" variant="ghost" className="text-white hover:bg-white/20">
            <MoreVertical className="w-4 h-4" />
          </Button>
        </div>
      </CardHeader>

      {/* Messages Area */}
      <CardContent className="flex-1 p-0">
        <ScrollArea className="h-full p-4" ref={scrollAreaRef}>
          <div className="space-y-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${
                  message.senderId === currentUserId ? 'justify-end' : 'justify-start'
                }`}
              >
                <div
                  className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                    message.senderId === currentUserId
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-700 text-white'
                  }`}
                >
                  <p className="text-sm">{message.message}</p>
                  <p className="text-xs opacity-70 mt-1">
                    {new Date(message.timestamp).toLocaleTimeString()}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>
      </CardContent>

      {/* Message Input */}
      <div className="p-4 border-t border-white/10">
        <div className="flex space-x-2">
          <Button size="sm" variant="ghost" className="text-white hover:bg-white/20">
            <Paperclip className="w-4 h-4" />
          </Button>
          <Input
            placeholder="Type a message..."
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            onKeyPress={handleKeyPress}
            className="flex-1 bg-gray-800 border-gray-600 text-white"
          />
          <Button 
            onClick={handleSendMessage}
            className="bg-blue-600 hover:bg-blue-700"
          >
            <Send className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </Card>
  );
};

export default ChatWindow;
