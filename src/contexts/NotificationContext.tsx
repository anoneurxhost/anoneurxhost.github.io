import React, { createContext, useContext, useState, useEffect, useCallback, useRef } from 'react';
import { useAuth } from './AuthContext';
import { toast } from '@/hooks/use-toast';
import { playNotificationSound } from '@/utils/notificationSound';

interface Notification {
  id: string;
  type: 'info' | 'warning' | 'success' | 'error';
  title: string;
  message: string;
  timestamp: string;
  read: boolean;
  category: string;
  actionUrl?: string;
  priority?: 'low' | 'medium' | 'high';
}

interface NotificationContextType {
  notifications: Notification[];
  unreadCount: number;
  loading: boolean;
  error: string | null;
  markAsRead: (id: string) => Promise<void>;
  markAllAsRead: () => Promise<void>;
  deleteNotification: (id: string) => Promise<void>;
  addNotification: (notification: Omit<Notification, 'id' | 'timestamp' | 'read'>) => void;
  refreshNotifications: () => Promise<void>;
  soundEnabled: boolean;
  toggleSound: () => void;
  clearAll: () => void;
}

const NotificationContext = createContext<NotificationContextType | null>(null);

export const useNotifications = () => {
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error('useNotifications must be used within a NotificationProvider');
  }
  return context;
};

// Default notifications for demo purposes
const defaultNotifications: Notification[] = [
  {
    id: '1',
    type: 'info',
    title: 'New Project Assignment',
    message: 'You have been assigned to the AI Development project for client XYZ.',
    timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
    read: false,
    category: 'Projects',
    priority: 'medium'
  },
  {
    id: '2',
    type: 'warning',
    title: 'Budget Alert',
    message: 'Project Alpha is approaching 80% of allocated budget.',
    timestamp: new Date(Date.now() - 4 * 60 * 60 * 1000).toISOString(),
    read: false,
    category: 'Finance',
    priority: 'high'
  },
  {
    id: '3',
    type: 'success',
    title: 'Employee Onboarded',
    message: 'John Doe has successfully completed onboarding process.',
    timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
    read: true,
    category: 'HR',
    priority: 'low'
  },
  {
    id: '4',
    type: 'info',
    title: 'System Update',
    message: 'The system will undergo scheduled maintenance tonight at 2 AM.',
    timestamp: new Date(Date.now() - 48 * 60 * 60 * 1000).toISOString(),
    read: true,
    category: 'System',
    priority: 'medium'
  }
];

const API_BASE_URL = import.meta.env.VITE_API_URL || '';

export const NotificationProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user } = useAuth();
  const [notifications, setNotifications] = useState<Notification[]>(defaultNotifications);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [soundEnabled, setSoundEnabled] = useState(() => {
    const stored = localStorage.getItem('notificationSoundEnabled');
    return stored !== null ? stored === 'true' : true;
  });
  
  const previousNotificationsRef = useRef<string[]>([]);
  const isInitialFetchRef = useRef(true);

  const unreadCount = notifications.filter(n => !n.read).length;

  // Fetch notifications from backend
  const fetchNotifications = useCallback(async () => {
    if (!user?._id) return;
    
    try {
      setLoading(true);
      setError(null);
      
      const token = localStorage.getItem('authToken');
      const response = await fetch(`${API_BASE_URL}/api/notifications/user/${user._id}`, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      if (!response.ok) {
        // If API not available, use default notifications
        if (response.status === 404) {
          setNotifications(defaultNotifications);
          return;
        }
        throw new Error('Failed to fetch notifications');
      }

      const data = await response.json();
      
      if (data.success && Array.isArray(data.data)) {
        const formattedNotifications: Notification[] = data.data.map((n: any) => ({
          id: n._id || n.id,
          type: mapNotificationType(n.type),
          title: n.title,
          message: n.message,
          timestamp: n.createdAt || n.timestamp,
          read: n.isRead || n.read || false,
          category: mapCategory(n.type),
          priority: n.priority || 'medium'
        }));

        // Check for new notifications (not on initial fetch)
        if (!isInitialFetchRef.current) {
          const newNotifications = formattedNotifications.filter(
            n => !previousNotificationsRef.current.includes(n.id) && !n.read
          );
          
          // Show toast and play sound for new notifications
          newNotifications.forEach(notification => {
            toast({
              title: notification.title,
              description: notification.message,
              variant: notification.type === 'error' ? 'destructive' : 'default'
            });
            
            if (soundEnabled) {
              playNotificationSound();
            }
          });
        }

        previousNotificationsRef.current = formattedNotifications.map(n => n.id);
        isInitialFetchRef.current = false;
        setNotifications(formattedNotifications);
      }
    } catch (err) {
      console.error('Error fetching notifications:', err);
      // Use default notifications on error
      setNotifications(defaultNotifications);
    } finally {
      setLoading(false);
    }
  }, [user?._id, soundEnabled]);

  // Map backend notification types to frontend types
  const mapNotificationType = (type: string): 'info' | 'warning' | 'success' | 'error' => {
    switch (type) {
      case 'application_accepted':
      case 'payment_received':
        return 'success';
      case 'application_rejected':
      case 'payment_failed':
        return 'error';
      case 'deadline_reminder':
        return 'warning';
      default:
        return 'info';
    }
  };

  // Map notification type to category
  const mapCategory = (type: string): string => {
    if (type.includes('application')) return 'Applications';
    if (type.includes('payment')) return 'Finance';
    if (type.includes('deadline')) return 'Tasks';
    if (type.includes('system')) return 'System';
    return 'General';
  };

  // Initial fetch and polling
  useEffect(() => {
    if (user?._id) {
      fetchNotifications();
      
      // Poll every 30 seconds for new notifications
      const interval = setInterval(fetchNotifications, 30000);
      
      return () => clearInterval(interval);
    }
  }, [user?._id, fetchNotifications]);

  // Mark single notification as read
  const markAsRead = async (id: string) => {
    try {
      const token = localStorage.getItem('authToken');
      
      // Optimistic update
      setNotifications(prev => 
        prev.map(notif => 
          notif.id === id ? { ...notif, read: true } : notif
        )
      );

      // Call API if available
      if (user?._id) {
        await fetch(`${API_BASE_URL}/api/notifications/${id}/read`, {
          method: 'PATCH',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        });
      }
    } catch (err) {
      console.error('Error marking notification as read:', err);
    }
  };

  // Mark all notifications as read
  const markAllAsRead = async () => {
    try {
      const token = localStorage.getItem('authToken');
      
      // Optimistic update
      setNotifications(prev => 
        prev.map(notif => ({ ...notif, read: true }))
      );

      // Call API if available
      if (user?._id) {
        await fetch(`${API_BASE_URL}/api/notifications/user/${user._id}/read-all`, {
          method: 'PATCH',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        });
      }
    } catch (err) {
      console.error('Error marking all notifications as read:', err);
    }
  };

  // Delete notification
  const deleteNotification = async (id: string) => {
    try {
      const token = localStorage.getItem('authToken');
      
      // Optimistic update
      setNotifications(prev => prev.filter(notif => notif.id !== id));

      // Call API if available
      if (user?._id) {
        await fetch(`${API_BASE_URL}/api/notifications/${id}`, {
          method: 'DELETE',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        });
      }
    } catch (err) {
      console.error('Error deleting notification:', err);
    }
  };

  // Add local notification (for real-time updates from other components)
  const addNotification = (notification: Omit<Notification, 'id' | 'timestamp' | 'read'>) => {
    const newNotification: Notification = {
      ...notification,
      id: Date.now().toString(),
      timestamp: new Date().toISOString(),
      read: false
    };
    
    setNotifications(prev => [newNotification, ...prev]);
    
    // Show toast
    toast({
      title: notification.title,
      description: notification.message,
      variant: notification.type === 'error' ? 'destructive' : 'default'
    });
    
    // Play sound if enabled
    if (soundEnabled) {
      playNotificationSound();
    }
  };

  // Refresh notifications manually
  const refreshNotifications = async () => {
    await fetchNotifications();
  };

  // Toggle sound
  const toggleSound = () => {
    setSoundEnabled(prev => {
      const newValue = !prev;
      localStorage.setItem('notificationSoundEnabled', String(newValue));
      return newValue;
    });
  };

  // Clear all notifications
  const clearAll = () => {
    setNotifications([]);
  };

  return (
    <NotificationContext.Provider value={{
      notifications,
      unreadCount,
      loading,
      error,
      markAsRead,
      markAllAsRead,
      deleteNotification,
      addNotification,
      refreshNotifications,
      soundEnabled,
      toggleSound,
      clearAll
    }}>
      {children}
    </NotificationContext.Provider>
  );
};
