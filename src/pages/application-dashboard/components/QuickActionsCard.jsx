import React from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../../../components/AppIcon';

const QuickActionsCard = () => {
  const navigate = useNavigate();

  const actions = [
    {
      id: 1,
      title: 'Resume Application',
      description: 'Continue where you left off',
      icon: 'PlayCircle',
      color: 'text-primary',
      bgColor: 'bg-primary/10',
      route: '/application-form',
      badge: null
    },
    {
      id: 2,
      title: 'View Documents',
      description: 'Manage uploaded files',
      icon: 'FileText',
      color: 'text-accent',
      bgColor: 'bg-accent/10',
      route: '/document-upload-center',
      badge: '3 pending'
    },
    {
      id: 3,
      title: 'Check Messages',
      description: 'View notifications and updates',
      icon: 'Mail',
      color: 'text-success',
      bgColor: 'bg-success/10',
      route: '/application-dashboard',
      badge: '2 new'
    },
    {
      id: 4,
      title: 'Contact Support',
      description: 'Get help with your application',
      icon: 'HelpCircle',
      color: 'text-secondary',
      bgColor: 'bg-secondary/10',
      route: '/application-dashboard',
      badge: null
    }
  ];

  return (
    <div className="bg-card border border-border rounded-lg shadow-md p-4 md:p-6 lg:p-8">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-12 h-12 md:w-14 md:h-14 bg-primary/10 rounded-lg flex items-center justify-center">
          <Icon name="Zap" size={24} color="var(--color-primary)" />
        </div>
        <div>
          <h3 className="text-lg md:text-xl lg:text-2xl font-heading font-bold text-foreground">
            Quick Actions
          </h3>
          <p className="text-sm md:text-base text-muted-foreground">
            Access frequently used features
          </p>
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-4">
        {actions?.map((action) => (
          <button
            key={action?.id}
            onClick={() => navigate(action?.route)}
            className="relative bg-background border border-border rounded-lg p-4 md:p-5 smooth-transition hover:border-primary hover:shadow-md hover:-translate-y-1 text-left group"
          >
            {action?.badge && (
              <span className="absolute top-3 right-3 px-2 py-1 bg-error text-error-foreground text-xs font-bold rounded-full">
                {action?.badge}
              </span>
            )}

            <div className={`w-10 h-10 md:w-12 md:h-12 ${action?.bgColor} rounded-lg flex items-center justify-center mb-3 smooth-transition group-hover:scale-110`}>
              <Icon name={action?.icon} size={20} color={`var(--color-${action?.color?.replace('text-', '')})`} />
            </div>

            <h4 className="text-sm md:text-base font-semibold text-foreground mb-1">
              {action?.title}
            </h4>
            <p className="text-xs md:text-sm text-muted-foreground">
              {action?.description}
            </p>

            <div className="flex items-center gap-2 mt-3 text-primary opacity-0 group-hover:opacity-100 smooth-transition">
              <span className="text-xs md:text-sm font-medium">Go</span>
              <Icon name="ArrowRight" size={14} />
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};

export default QuickActionsCard;