
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

interface ChatUser {
  id: string;
  name: string;
  avatar?: string;
  lastMessage: string;
  timestamp: string;
  unreadCount: number;
  isOnline: boolean;
  userType: 'client' | 'student' | 'employee' | 'hr' | 'hod' | 'ceo';
}

interface ChatListProps {
  users: ChatUser[];
  selectedUserId?: string;
  onSelectUser: (userId: string) => void;
}

const ChatList = ({ users, selectedUserId, onSelectUser }: ChatListProps) => {
  const getUserTypeColor = (userType: string) => {
    switch (userType) {
      case 'client': return 'bg-green-600';
      case 'student': return 'bg-blue-600';
      case 'employee': return 'bg-purple-600';
      case 'hr': return 'bg-orange-600';
      case 'hod': return 'bg-red-600';
      case 'ceo': return 'bg-yellow-600';
      default: return 'bg-gray-600';
    }
  };

  return (
    <Card className="h-full bg-white/10 backdrop-blur-sm border-white/20">
      <CardHeader className="p-4">
        <CardTitle className="text-white">Messages</CardTitle>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <Input
            placeholder="Search conversations..."
            className="pl-10 bg-gray-800 border-gray-600 text-white"
          />
        </div>
      </CardHeader>
      <CardContent className="p-0">
        <div className="space-y-1">
          {users.map((user) => (
            <div
              key={user.id}
              onClick={() => onSelectUser(user.id)}
              className={`p-4 cursor-pointer transition-colors hover:bg-white/10 ${
                selectedUserId === user.id ? 'bg-blue-600/20 border-r-2 border-blue-600' : ''
              }`}
            >
              <div className="flex items-center space-x-3">
                <div className="relative">
                  <Avatar className="w-12 h-12">
                    <AvatarImage src={user.avatar} />
                    <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  {user.isOnline && (
                    <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-gray-800"></div>
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <p className="text-white font-medium text-sm truncate">{user.name}</p>
                      <Badge className={`${getUserTypeColor(user.userType)} text-xs`}>
                        {user.userType}
                      </Badge>
                    </div>
                    <div className="flex items-center space-x-2">
                      <p className="text-gray-400 text-xs">{user.timestamp}</p>
                      {user.unreadCount > 0 && (
                        <Badge className="bg-red-600 text-xs">
                          {user.unreadCount}
                        </Badge>
                      )}
                    </div>
                  </div>
                  <p className="text-gray-400 text-xs truncate mt-1">{user.lastMessage}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default ChatList;
