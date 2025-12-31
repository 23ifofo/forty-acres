import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Icon from '../AppIcon';
import Button from './Button';

const ApplicationStatusWidget = ({ 
  completionPercentage = 45, 
  nextDeadline = '2025-01-15',
  criticalNotifications = 2 
}) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isExpanded, setIsExpanded] = useState(false);

  const isDashboard = location?.pathname === '/application-dashboard';
  
  if (isDashboard) return null;

  const formatDeadline = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const daysRemaining = Math.ceil((date - now) / (1000 * 60 * 60 * 24));
    
    return {
      formatted: date?.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
      daysRemaining,
      isUrgent: daysRemaining <= 7
    };
  };

  const deadline = formatDeadline(nextDeadline);

  const handleNavigateToDashboard = () => {
    navigate('/application-dashboard');
  };

  return (
    <>
      <div className="hidden lg:flex fixed top-[76px] right-8 z-75 bg-card border border-border rounded-lg shadow-lg p-4 w-80">
        <div className="w-full">
          <div className="flex items-center justify-between mb-3">
            <h4 className="text-sm font-heading font-semibold text-foreground">
              Application Status
            </h4>
            <Button
              variant="ghost"
              size="xs"
              onClick={handleNavigateToDashboard}
              iconName="ExternalLink"
              iconSize={14}
            >
              View
            </Button>
          </div>

          <div className="space-y-3">
            <div>
              <div className="flex items-center justify-between mb-1">
                <span className="text-xs font-caption text-muted-foreground">
                  Completion
                </span>
                <span className="text-xs font-medium text-foreground">
                  {completionPercentage}%
                </span>
              </div>
              <div className="h-2 bg-muted rounded-full overflow-hidden">
                <div
                  className="h-full bg-success smooth-transition"
                  style={{ width: `${completionPercentage}%` }}
                />
              </div>
            </div>

            <div className={`flex items-center gap-2 p-2 rounded-md ${
              deadline?.isUrgent ? 'bg-warning/10' : 'bg-muted'
            }`}>
              <Icon
                name={deadline?.isUrgent ? 'AlertCircle' : 'Calendar'}
                size={16}
                color={deadline?.isUrgent ? 'var(--color-warning)' : 'var(--color-foreground)'}
              />
              <div className="flex-1">
                <p className="text-xs font-caption text-muted-foreground">
                  Next Deadline
                </p>
                <p className="text-sm font-medium text-foreground">
                  {deadline?.formatted}
                </p>
                <p className={`text-xs ${
                  deadline?.isUrgent ? 'text-warning' : 'text-muted-foreground'
                }`}>
                  {deadline?.daysRemaining} days remaining
                </p>
              </div>
            </div>

            {criticalNotifications > 0 && (
              <div className="flex items-center gap-2 p-2 bg-error/10 rounded-md">
                <Icon name="Bell" size={16} color="var(--color-error)" />
                <div className="flex-1">
                  <p className="text-sm font-medium text-error">
                    {criticalNotifications} Critical {criticalNotifications === 1 ? 'Item' : 'Items'}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    Requires immediate attention
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="lg:hidden fixed bottom-4 right-4 z-75 bg-primary text-primary-foreground rounded-full p-4 shadow-lg smooth-transition hover-lift press-scale"
        aria-label="Toggle status widget"
      >
        <div className="relative">
          <Icon name="BarChart3" size={24} />
          {criticalNotifications > 0 && (
            <span className="absolute -top-2 -right-2 bg-error text-error-foreground text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
              {criticalNotifications}
            </span>
          )}
        </div>
      </button>
      {isExpanded && (
        <div className="lg:hidden fixed inset-0 z-200 bg-background">
          <div className="h-full flex flex-col">
            <div className="flex items-center justify-between p-4 border-b border-border">
              <h3 className="text-lg font-heading font-semibold text-foreground">
                Application Status
              </h3>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsExpanded(false)}
              >
                <Icon name="X" size={24} />
              </Button>
            </div>

            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-caption text-muted-foreground">
                    Completion Progress
                  </span>
                  <span className="text-lg font-semibold text-foreground">
                    {completionPercentage}%
                  </span>
                </div>
                <div className="h-3 bg-muted rounded-full overflow-hidden">
                  <div
                    className="h-full bg-success smooth-transition"
                    style={{ width: `${completionPercentage}%` }}
                  />
                </div>
              </div>

              <div className={`p-4 rounded-lg ${
                deadline?.isUrgent ? 'bg-warning/10 border border-warning' : 'bg-card border border-border'
              }`}>
                <div className="flex items-center gap-3 mb-2">
                  <Icon
                    name={deadline?.isUrgent ? 'AlertCircle' : 'Calendar'}
                    size={24}
                    color={deadline?.isUrgent ? 'var(--color-warning)' : 'var(--color-primary)'}
                  />
                  <div className="flex-1">
                    <p className="text-sm font-caption text-muted-foreground">
                      Next Deadline
                    </p>
                    <p className="text-xl font-heading font-semibold text-foreground">
                      {deadline?.formatted}
                    </p>
                  </div>
                </div>
                <p className={`text-base font-medium ${
                  deadline?.isUrgent ? 'text-warning' : 'text-muted-foreground'
                }`}>
                  {deadline?.daysRemaining} days remaining
                </p>
              </div>

              {criticalNotifications > 0 && (
                <div className="p-4 bg-error/10 border border-error rounded-lg">
                  <div className="flex items-center gap-3 mb-2">
                    <Icon name="Bell" size={24} color="var(--color-error)" />
                    <div className="flex-1">
                      <p className="text-lg font-semibold text-error">
                        {criticalNotifications} Critical {criticalNotifications === 1 ? 'Item' : 'Items'}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        Requires immediate attention
                      </p>
                    </div>
                  </div>
                </div>
              )}

              <Button
                variant="default"
                fullWidth
                onClick={handleNavigateToDashboard}
                iconName="ExternalLink"
                iconPosition="right"
              >
                View Full Dashboard
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ApplicationStatusWidget;