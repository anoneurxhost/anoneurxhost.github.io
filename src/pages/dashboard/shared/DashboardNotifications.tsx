import { useState } from "react";
import DashboardLayout from "@/layouts/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Bell, Check, X, AlertCircle, Info, MessageSquare, Calendar, Users } from "lucide-react";

interface Notification {
  id: string;
  type: 'info' | 'warning' | 'success' | 'error';
  title: string;
  message: string;
  timestamp: string;
  read: boolean;
  category: string;
}

const DashboardNotifications = () => {
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: '1',
      type: 'info',
      title: 'New Project Assignment',
      message: 'You have been assigned to the AI Development project for client XYZ.',
      timestamp: '2 hours ago',
      read: false,
      category: 'Projects'
    },
    {
      id: '2',
      type: 'warning',
      title: 'Budget Alert',
      message: 'Project Alpha is approaching 80% of allocated budget.',
      timestamp: '4 hours ago',
      read: false,
      category: 'Finance'
    },
    {
      id: '3',
      type: 'success',
      title: 'Employee Onboarded',
      message: 'John Doe has successfully completed onboarding process.',
      timestamp: '1 day ago',
      read: true,
      category: 'HR'
    },
    {
      id: '4',
      type: 'error',
      title: 'System Alert',
      message: 'Server maintenance required for blockchain infrastructure.',
      timestamp: '2 days ago',
      read: false,
      category: 'IT'
    }
  ]);

  const markAsRead = (id: string) => {
    setNotifications(prev => 
      prev.map(notif => 
        notif.id === id ? { ...notif, read: true } : notif
      )
    );
  };

  const markAllAsRead = () => {
    setNotifications(prev => 
      prev.map(notif => ({ ...notif, read: true }))
    );
  };

  const deleteNotification = (id: string) => {
    setNotifications(prev => prev.filter(notif => notif.id !== id));
  };

  const getIcon = (type: string) => {
    switch (type) {
      case 'warning': return <AlertCircle className="w-5 h-5 text-yellow-500" />;
      case 'success': return <Check className="w-5 h-5 text-green-500" />;
      case 'error': return <X className="w-5 h-5 text-red-500" />;
      default: return <Info className="w-5 h-5 text-blue-500" />;
    }
  };

  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <>
      <DashboardLayout title="Notifications">
        <div className="space-y-6">
          {/* Header */}
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Bell className="w-6 h-6 text-white" />
              <h2 className="text-2xl font-bold text-white">Notifications</h2>
              {unreadCount > 0 && (
                <Badge variant="destructive">{unreadCount} unread</Badge>
              )}
            </div>
            <Button onClick={markAllAsRead} variant="outline">
              Mark All as Read
            </Button>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <Card className="bg-white/10 border-gray-700">
              <CardContent className="p-4">
                <div className="flex items-center space-x-2">
                  <MessageSquare className="w-5 h-5 text-blue-400" />
                  <div>
                    <p className="text-white font-semibold">{notifications.length}</p>
                    <p className="text-gray-300 text-sm">Total</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card className="bg-white/10 border-gray-700">
              <CardContent className="p-4">
                <div className="flex items-center space-x-2">
                  <Bell className="w-5 h-5 text-red-400" />
                  <div>
                    <p className="text-white font-semibold">{unreadCount}</p>
                    <p className="text-gray-300 text-sm">Unread</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white/10 border-gray-700">
              <CardContent className="p-4">
                <div className="flex items-center space-x-2">
                  <Calendar className="w-5 h-5 text-green-400" />
                  <div>
                    <p className="text-white font-semibold">5</p>
                    <p className="text-gray-300 text-sm">Today</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white/10 border-gray-700">
              <CardContent className="p-4">
                <div className="flex items-center space-x-2">
                  <Users className="w-5 h-5 text-purple-400" />
                  <div>
                    <p className="text-white font-semibold">3</p>
                    <p className="text-gray-300 text-sm">High Priority</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Notifications List */}
          <Card className="bg-white/10 border-gray-700">
            <CardHeader>
              <CardTitle className="text-white">Recent Notifications</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {notifications.map((notification) => (
                <div
                  key={notification.id}
                  className={`p-4 rounded-lg border ${
                    notification.read 
                      ? 'bg-gray-800/50 border-gray-600' 
                      : 'bg-blue-900/20 border-blue-500/30'
                  } transition-all duration-200`}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex items-start space-x-3 flex-1">
                      {getIcon(notification.type)}
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-1">
                          <h4 className="text-white font-semibold">{notification.title}</h4>
                          <Badge variant="outline" className="text-xs">
                            {notification.category}
                          </Badge>
                        </div>
                        <p className="text-gray-300 text-sm mb-2">{notification.message}</p>
                        <p className="text-gray-400 text-xs">{notification.timestamp}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      {!notification.read && (
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => markAsRead(notification.id)}
                        >
                          <Check className="w-4 h-4" />
                        </Button>
                      )}
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => deleteNotification(notification.id)}
                      >
                        <X className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </DashboardLayout>
    </>
  );
};

export default DashboardNotifications;
