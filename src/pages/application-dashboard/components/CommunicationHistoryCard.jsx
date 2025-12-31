import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import useSelectedUniversity from '../../../hooks/useSelectedUniversity';
import Button from '../../../components/ui/Button';

const CommunicationHistoryCard = () => {
  const selectedUniversity = useSelectedUniversity();
  const welcomeSubject = `Welcome to ${selectedUniversity?.name || 'the'} Scholarship Portal`;

  const [messages] = useState([
    {
      id: 1,
      from: 'Scholarship Committee',
      subject: welcomeSubject,
      preview: 'Thank you for starting your scholarship application. We are excited to review your submission and learn more about your academic achievements...',
      timestamp: '2025-12-15T10:00:00',
      read: true,
      type: 'system'
    },
    {
      id: 2,
      from: 'Financial Aid Office',
      subject: 'FAFSA Verification Required',
      preview: 'We noticed that your FAFSA information needs verification. Please ensure all financial documents are accurate and up to date before...',
      timestamp: '2025-12-17T14:30:00',
      read: true,
      type: 'admin'
    },
    {
      id: 3,
      from: 'Application System',
      subject: 'Document Upload Reminder',
      preview: 'This is a friendly reminder that you still need to upload your official transcript and recommendation letters. The deadline is approaching...',
      timestamp: '2025-12-19T09:00:00',
      read: false,
      type: 'system'
    },
    {
      id: 4,
      from: 'Dr. Sarah Martinez',
      subject: 'Recommendation Letter Submitted',
      preview: 'Your recommendation letter has been successfully submitted by Dr. Sarah Martinez. You can view the confirmation in your document center...',
      timestamp: '2025-12-20T11:45:00',
      read: false,
      type: 'notification'
    }
  ]);

  const [expandedMessage, setExpandedMessage] = useState(null);

  const typeConfig = {
    system: {
      icon: 'Settings',
      color: 'text-primary',
      bgColor: 'bg-primary/10'
    },
    admin: {
      icon: 'User',
      color: 'text-accent',
      bgColor: 'bg-accent/10'
    },
    notification: {
      icon: 'Bell',
      color: 'text-success',
      bgColor: 'bg-success/10'
    }
  };

  const formatTimestamp = (dateString) => {
    const date = new Date(dateString);
    return date?.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const unreadCount = messages?.filter(m => !m?.read)?.length;

  return (
    <div className="bg-card border border-border rounded-lg shadow-md p-4 md:p-6 lg:p-8">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 md:w-14 md:h-14 bg-primary/10 rounded-lg flex items-center justify-center relative">
            <Icon name="MessageSquare" size={24} color="var(--color-primary)" />
            {unreadCount > 0 && (
              <span className="absolute -top-1 -right-1 w-5 h-5 bg-error text-error-foreground text-xs font-bold rounded-full flex items-center justify-center">
                {unreadCount}
              </span>
            )}
          </div>
          <div>
            <h3 className="text-lg md:text-xl lg:text-2xl font-heading font-bold text-foreground">
              Communication History
            </h3>
            <p className="text-sm md:text-base text-muted-foreground">
              {messages?.length} messages ({unreadCount} unread)
            </p>
          </div>
        </div>

        <Button
          variant="outline"
          size="sm"
          iconName="Mail"
          iconPosition="left"
        >
          Compose
        </Button>
      </div>
      <div className="space-y-2 md:space-y-3">
        {messages?.map((message) => {
          const config = typeConfig?.[message?.type];
          const isExpanded = expandedMessage === message?.id;
          
          return (
            <div
              key={message?.id}
              className={`border rounded-lg smooth-transition ${
                message?.read
                  ? 'border-border bg-background' :'border-primary/30 bg-primary/5'
              }`}
            >
              <button
                onClick={() => setExpandedMessage(isExpanded ? null : message?.id)}
                className="w-full p-4 text-left"
              >
                <div className="flex items-start gap-3">
                  <div className={`w-10 h-10 ${config?.bgColor} rounded-lg flex items-center justify-center flex-shrink-0`}>
                    <Icon name={config?.icon} size={18} color={`var(--color-${config?.color?.replace('text-', '')})`} />
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2 mb-1">
                      <div className="flex-1 min-w-0">
                        <h4 className={`text-sm md:text-base font-semibold truncate ${
                          message?.read ? 'text-foreground' : 'text-primary'
                        }`}>
                          {message?.subject}
                        </h4>
                        <p className="text-xs md:text-sm text-muted-foreground">
                          From: {message?.from}
                        </p>
                      </div>
                      {!message?.read && (
                        <span className="w-2 h-2 bg-primary rounded-full flex-shrink-0 mt-2" />
                      )}
                    </div>

                    {!isExpanded && (
                      <p className="text-xs md:text-sm text-muted-foreground line-clamp-2 mb-2">
                        {message?.preview}
                      </p>
                    )}

                    <div className="flex items-center justify-between gap-2">
                      <span className="text-xs text-muted-foreground">
                        {formatTimestamp(message?.timestamp)}
                      </span>
                      <Icon
                        name={isExpanded ? 'ChevronUp' : 'ChevronDown'}
                        size={16}
                        className="text-muted-foreground"
                      />
                    </div>
                  </div>
                </div>
              </button>
              {isExpanded && (
                <div className="px-4 pb-4 border-t border-border mt-2 pt-4">
                  <p className="text-sm md:text-base text-foreground mb-4">
                    {message?.preview}
                  </p>
                  <div className="flex items-center gap-2">
                    <Button variant="outline" size="sm" iconName="Reply" iconPosition="left">
                      Reply
                    </Button>
                    <Button variant="ghost" size="sm" iconName="Archive">
                      Archive
                    </Button>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default CommunicationHistoryCard;