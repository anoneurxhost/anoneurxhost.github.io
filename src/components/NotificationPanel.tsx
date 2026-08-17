import React, { useState, useMemo } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Skeleton } from "@/components/ui/skeleton";
import { 
  Bell, 
  Check, 
  X, 
  AlertCircle, 
  Info, 
  CheckCircle2, 
  XCircle,
  Volume2,
  VolumeX,
  RefreshCw,
  Trash2,
  Clock
} from "lucide-react";
import { useNotifications } from "@/contexts/NotificationContext";
import { cn } from "@/lib/utils";

interface NotificationPanelProps {
  isOpen: boolean;
  onClose: () => void;
}

const NotificationPanel: React.FC<NotificationPanelProps> = ({ isOpen, onClose }) => {
  const { 
    notifications, 
    unreadCount, 
    loading,
    markAsRead, 
    markAllAsRead, 
    deleteNotification,
    refreshNotifications,
    soundEnabled,
    toggleSound
  } = useNotifications();
  
  const [activeCategory, setActiveCategory] = useState('All');

  const categories = ['All', 'Projects', 'Finance', 'HR', 'System'];

  // Filter notifications by category
  const filteredNotifications = useMemo(() => {
    if (activeCategory === 'All') {
      return notifications;
    }
    return notifications.filter(n => n.category === activeCategory);
  }, [notifications, activeCategory]);

  // Group notifications by time
  const groupedNotifications = useMemo(() => {
    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const yesterday = new Date(today.getTime() - 24 * 60 * 60 * 1000);
    const thisWeek = new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000);

    const groups: { [key: string]: typeof notifications } = {
      'Today': [],
      'Yesterday': [],
      'This Week': [],
      'Earlier': []
    };

    filteredNotifications.forEach(notification => {
      const date = new Date(notification.timestamp);
      if (date >= today) {
        groups['Today'].push(notification);
      } else if (date >= yesterday) {
        groups['Yesterday'].push(notification);
      } else if (date >= thisWeek) {
        groups['This Week'].push(notification);
      } else {
        groups['Earlier'].push(notification);
      }
    });

    return groups;
  }, [filteredNotifications]);

  const getIcon = (type: string) => {
    switch (type) {
      case 'warning': 
        return <AlertCircle className="w-4 h-4 text-yellow-500" />;
      case 'success': 
        return <CheckCircle2 className="w-4 h-4 text-green-500" />;
      case 'error': 
        return <XCircle className="w-4 h-4 text-red-500" />;
      default: 
        return <Info className="w-4 h-4 text-blue-500" />;
    }
  };

  const getPriorityColor = (priority?: string) => {
    switch (priority) {
      case 'high': return 'border-l-red-500';
      case 'medium': return 'border-l-yellow-500';
      case 'low': return 'border-l-green-500';
      default: return 'border-l-blue-500';
    }
  };

  const formatTime = (timestamp: string) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffInMinutes = Math.floor((now.getTime() - date.getTime()) / (1000 * 60));
    
    if (diffInMinutes < 1) return 'Just now';
    if (diffInMinutes < 60) return `${diffInMinutes}m ago`;
    if (diffInMinutes < 1440) return `${Math.floor(diffInMinutes / 60)}h ago`;
    return `${Math.floor(diffInMinutes / 1440)}d ago`;
  };

  // Loading skeleton
  const NotificationSkeleton = () => (
    <div className="space-y-3 p-4">
      {[1, 2, 3].map((i) => (
        <div key={i} className="flex items-start space-x-3 p-3 bg-gray-800/50 rounded-lg">
          <Skeleton className="w-8 h-8 rounded-full" />
          <div className="flex-1 space-y-2">
            <Skeleton className="h-4 w-3/4" />
            <Skeleton className="h-3 w-full" />
            <Skeleton className="h-3 w-1/4" />
          </div>
        </div>
      ))}
    </div>
  );

  return (
    <>
      {/* Backdrop */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40"
          onClick={onClose}
        />
      )}
      
      {/* Sliding Panel */}
      <div className={cn(
        "fixed top-0 right-0 h-full w-full sm:w-96 bg-black/90 backdrop-blur-xl border-l border-gray-700/50 z-50",
        "transform transition-transform duration-300 ease-in-out",
        isOpen ? 'translate-x-0' : 'translate-x-full'
      )}>
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="p-4 border-b border-gray-700">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center space-x-2">
                <Bell className="w-5 h-5 text-white" />
                <h2 className="text-lg font-semibold text-white">Notifications</h2>
                {unreadCount > 0 && (
                  <Badge className="bg-red-600 text-white text-xs px-2">
                    {unreadCount}
                  </Badge>
                )}
              </div>
              <div className="flex items-center space-x-2">
                <Button 
                  variant="ghost" 
                  size="icon"
                  onClick={toggleSound}
                  className="text-gray-400 hover:text-white"
                  title={soundEnabled ? "Mute notifications" : "Unmute notifications"}
                >
                  {soundEnabled ? (
                    <Volume2 className="w-4 h-4" />
                  ) : (
                    <VolumeX className="w-4 h-4" />
                  )}
                </Button>
                <Button 
                  variant="ghost" 
                  size="icon"
                  onClick={() => refreshNotifications()}
                  className="text-gray-400 hover:text-white"
                  title="Refresh notifications"
                >
                  <RefreshCw className={cn("w-4 h-4", loading && "animate-spin")} />
                </Button>
                <Button variant="ghost" size="icon" onClick={onClose}>
                  <X className="w-4 h-4" />
                </Button>
              </div>
            </div>

            {/* Category Tabs */}
            <Tabs value={activeCategory} onValueChange={setActiveCategory} className="w-full">
              <TabsList className="w-full bg-gray-800/50 p-1">
                {categories.map((category) => (
                  <TabsTrigger 
                    key={category} 
                    value={category}
                    className="flex-1 text-xs data-[state=active]:bg-blue-600 data-[state=active]:text-white"
                  >
                    {category}
                  </TabsTrigger>
                ))}
              </TabsList>
            </Tabs>
            
            {unreadCount > 0 && (
              <Button 
                variant="outline" 
                size="sm" 
                onClick={() => markAllAsRead()}
                className="mt-3 w-full text-xs border-gray-600 text-gray-300 hover:bg-gray-800"
              >
                <Check className="w-3 h-3 mr-2" />
                Mark All as Read
              </Button>
            )}
          </div>
          
          {/* Notifications List */}
          <div className="flex-1 overflow-y-auto">
            {loading ? (
              <NotificationSkeleton />
            ) : filteredNotifications.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-full text-gray-400 p-8">
                <Bell className="w-16 h-16 mb-4 opacity-30" />
                <p className="text-center">No notifications</p>
                <p className="text-xs text-gray-500 mt-1">
                  {activeCategory !== 'All' ? `in ${activeCategory}` : 'You\'re all caught up!'}
                </p>
              </div>
            ) : (
              <div className="p-4 space-y-4">
                {Object.entries(groupedNotifications).map(([group, items]) => {
                  if (items.length === 0) return null;
                  
                  return (
                    <div key={group}>
                      <div className="flex items-center gap-2 mb-2">
                        <Clock className="w-3 h-3 text-gray-500" />
                        <span className="text-xs font-medium text-gray-500 uppercase tracking-wider">
                          {group}
                        </span>
                        <div className="flex-1 h-px bg-gray-800" />
                      </div>
                      
                      <div className="space-y-2">
                        {items.map((notification) => (
                          <Card 
                            key={notification.id}
                            className={cn(
                              "bg-gray-800/50 border-gray-700 transition-all duration-200 hover:bg-gray-800 border-l-2",
                              getPriorityColor(notification.priority),
                              !notification.read && "ring-1 ring-blue-500/30 bg-blue-500/5"
                            )}
                          >
                            <CardContent className="p-3">
                              <div className="flex items-start justify-between gap-2">
                                <div className="flex items-start space-x-3 flex-1 min-w-0">
                                  <div className={cn(
                                    "w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0",
                                    notification.type === 'warning' && "bg-yellow-500/20",
                                    notification.type === 'success' && "bg-green-500/20",
                                    notification.type === 'error' && "bg-red-500/20",
                                    notification.type === 'info' && "bg-blue-500/20"
                                  )}>
                                    {getIcon(notification.type)}
                                  </div>
                                  <div className="flex-1 min-w-0">
                                    <div className="flex items-center gap-2 mb-1 flex-wrap">
                                      <h4 className={cn(
                                        "font-medium text-sm truncate",
                                        notification.read ? "text-gray-300" : "text-white"
                                      )}>
                                        {notification.title}
                                      </h4>
                                      <Badge 
                                        variant="outline" 
                                        className="text-[10px] px-1.5 py-0 h-4 border-gray-600 text-gray-400"
                                      >
                                        {notification.category}
                                      </Badge>
                                    </div>
                                    <p className="text-gray-400 text-xs mb-2 line-clamp-2">
                                      {notification.message}
                                    </p>
                                    <p className="text-gray-500 text-[10px]">
                                      {formatTime(notification.timestamp)}
                                    </p>
                                  </div>
                                </div>
                                
                                <div className="flex flex-col gap-1">
                                  {!notification.read && (
                                    <Button
                                      size="icon"
                                      variant="ghost"
                                      onClick={() => markAsRead(notification.id)}
                                      className="h-6 w-6 text-gray-400 hover:text-green-400 hover:bg-green-500/10"
                                      title="Mark as read"
                                    >
                                      <Check className="w-3 h-3" />
                                    </Button>
                                  )}
                                  <Button
                                    size="icon"
                                    variant="ghost"
                                    onClick={() => deleteNotification(notification.id)}
                                    className="h-6 w-6 text-gray-400 hover:text-red-400 hover:bg-red-500/10"
                                    title="Delete"
                                  >
                                    <Trash2 className="w-3 h-3" />
                                  </Button>
                                </div>
                              </div>
                            </CardContent>
                          </Card>
                        ))}
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          {/* Footer */}
          <div className="p-4 border-t border-gray-700">
            <p className="text-xs text-gray-500 text-center">
              Notifications auto-refresh every 30 seconds
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default NotificationPanel;
