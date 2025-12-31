import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const NotificationsCard = () => {
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      type: 'deadline',
      title: 'Application Deadline Approaching',
      message: 'Your scholarship application is due in 25 days. Complete all sections before January 15, 2025.',
      timestamp: '2025-12-20T09:00:00',
      read: false,
      dismissible: true,
      priority: 'high'
    },
    {
      id: 2,
      type: 'document',
      title: 'Missing Documents',
      message: 'You still need to upload your official transcript and two recommendation letters.',
      timestamp: '2025-12-19T14:30:00',
      read: false,
      dismissible: true,
      priority: 'high'
    },
    {
      id: 3,
      type: 'update',
      title: 'Application Saved',
      message: 'Your progress has been automatically saved. You can continue your application anytime.',
      timestamp: '2025-12-18T16:45:00',
      read: true,
      dismissible: true,
      priority: 'low'
    },
    {
      id: 4,
      type: 'info',
      title: 'Financial Aid Workshop',
      message: 'Join our virtual workshop on December 28th to learn about maximizing your scholarship opportunities.',
      timestamp: '2025-12-17T10:00:00',
      read: true,
      dismissible: true,
      priority: 'medium'
    }
  ]);

  const typeConfig = {
    deadline: {
      icon: 'Clock',
      color: 'text-error',
      bgColor: 'bg-error/10'
    },
    document: {
      icon: 'FileText',
      color: 'text-warning',
      bgColor: 'bg-warning/10'
    },
    update: {
      icon: 'CheckCircle',
      color: 'text-success',
      bgColor: 'bg-success/10'
    },
    info: {
      icon: 'Info',
      color: 'text-primary',
      bgColor: 'bg-primary/10'
    }
  };

  const handleDismiss = (id) => {
    setNotifications(notifications?.filter(notif => notif?.id !== id));
  };

  const handleMarkAsRead = (id) => {
    setNotifications(notifications?.map(notif =>
      notif?.id === id ? { ...notif, read: true } : notif
    ));
  };

  const formatTimestamp = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInHours = Math.floor((now - date) / (1000 * 60 * 60));
    
    if (diffInHours < 1) return 'Just now';
    if (diffInHours < 24) return `${diffInHours} hours ago`;
    if (diffInHours < 48) return 'Yesterday';
    return date?.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  };

  const unreadCount = notifications?.filter(n => !n?.read)?.length;

  return (
    <div className="bg-card border border-border rounded-lg shadow-md p-4 md:p-6 lg:p-8">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 md:w-14 md:h-14 bg-primary/10 rounded-lg flex items-center justify-center relative">
            <Icon name="Bell" size={24} color="var(--color-primary)" />
            {unreadCount > 0 && (
              <span className="absolute -top-1 -right-1 w-5 h-5 bg-error text-error-foreground text-xs font-bold rounded-full flex items-center justify-center">
                {unreadCount}
              </span>
            )}
          </div>
          <div>
            <h3 className="text-lg md:text-xl lg:text-2xl font-heading font-bold text-foreground">
              Notifications
            </h3>
            <p className="text-sm md:text-base text-muted-foreground">
              {unreadCount > 0 ? `${unreadCount} unread messages` : 'All caught up!'}
            </p>
          </div>
        </div>
      </div>
      <div className="space-y-3 md:space-y-4">
        {notifications?.length === 0 ? (
          <div className="text-center py-8">
            <Icon name="Inbox" size={48} className="mx-auto mb-3 text-muted-foreground" />
            <p className="text-sm md:text-base text-muted-foreground">
              No notifications at this time
            </p>
          </div>
        ) : (
          notifications?.map((notification) => {
            const config = typeConfig?.[notification?.type];
            
            return (
              <div
                key={notification?.id}
                className={`border rounded-lg p-4 smooth-transition ${
                  notification?.read
                    ? 'border-border bg-background' :'border-primary/30 bg-primary/5'
                }`}
              >
                <div className="flex items-start gap-3">
                  <div className={`w-10 h-10 md:w-12 md:h-12 ${config?.bgColor} rounded-lg flex items-center justify-center flex-shrink-0`}>
                    <Icon name={config?.icon} size={20} color={`var(--color-${config?.color?.replace('text-', '')})`} />
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2 mb-1">
                      <h4 className={`text-sm md:text-base font-semibold ${
                        notification?.read ? 'text-foreground' : 'text-primary'
                      }`}>
                        {notification?.title}
                      </h4>
                      {!notification?.read && (
                        <span className="w-2 h-2 bg-primary rounded-full flex-shrink-0 mt-2" />
                      )}
                    </div>

                    <p className="text-xs md:text-sm text-muted-foreground mb-2">
                      {notification?.message}
                    </p>

                    <div className="flex items-center justify-between gap-2">
                      <span className="text-xs text-muted-foreground">
                        {formatTimestamp(notification?.timestamp)}
                      </span>

                      <div className="flex items-center gap-2">
                        {!notification?.read && (
                          <Button
                            variant="ghost"
                            size="xs"
                            onClick={() => handleMarkAsRead(notification?.id)}
                          >
                            Mark as read
                          </Button>
                        )}
                        {notification?.dismissible && (
                          <Button
                            variant="ghost"
                            size="xs"
                            onClick={() => handleDismiss(notification?.id)}
                            iconName="X"
                          />
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};

export default NotificationsCard;