import React from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const ApplicationStatusCard = ({ 
  status = 'in_progress',
  completionPercentage = 45,
  lastUpdated = '2025-12-18T14:30:00',
  applicationId = 'LSP-2025-001234'
}) => {
  const navigate = useNavigate();

  const statusConfig = {
    draft: {
      label: 'Draft',
      icon: 'FileEdit',
      color: 'text-muted-foreground',
      bgColor: 'bg-muted',
      description: 'Your application has been saved as a draft'
    },
    in_progress: {
      label: 'In Progress',
      icon: 'Clock',
      color: 'text-warning',
      bgColor: 'bg-warning/10',
      description: 'Continue working on your application'
    },
    submitted: {
      label: 'Submitted',
      icon: 'CheckCircle',
      color: 'text-success',
      bgColor: 'bg-success/10',
      description: 'Your application has been submitted successfully'
    },
    under_review: {
      label: 'Under Review',
      icon: 'Eye',
      color: 'text-primary',
      bgColor: 'bg-primary/10',
      description: 'The scholarship committee is reviewing your application'
    },
    approved: {
      label: 'Approved',
      icon: 'Award',
      color: 'text-success',
      bgColor: 'bg-success/10',
      description: 'Congratulations! Your application has been approved'
    },
    rejected: {
      label: 'Not Selected',
      icon: 'XCircle',
      color: 'text-error',
      bgColor: 'bg-error/10',
      description: 'Unfortunately, your application was not selected this time'
    }
  };

  const currentStatus = statusConfig?.[status];
  const formattedDate = new Date(lastUpdated)?.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });

  return (
    <div className="bg-card border border-border rounded-lg shadow-md p-4 md:p-6 lg:p-8">
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 lg:gap-6 mb-6">
        <div className="flex items-start gap-4">
          <div className={`w-12 h-12 md:w-14 md:h-14 lg:w-16 lg:h-16 ${currentStatus?.bgColor} rounded-lg flex items-center justify-center flex-shrink-0`}>
            <Icon name={currentStatus?.icon} size={24} color={`var(--color-${status === 'in_progress' ? 'warning' : status === 'approved' || status === 'submitted' ? 'success' : status === 'rejected' ? 'error' : 'primary'})`} />
          </div>
          <div className="flex-1 min-w-0">
            <h2 className="text-xl md:text-2xl lg:text-3xl font-heading font-bold text-foreground mb-1">
              Application Status
            </h2>
            <p className={`text-base md:text-lg lg:text-xl font-semibold ${currentStatus?.color} mb-1`}>
              {currentStatus?.label}
            </p>
            <p className="text-sm md:text-base text-muted-foreground">
              {currentStatus?.description}
            </p>
          </div>
        </div>

        <div className="flex flex-col items-start lg:items-end gap-2">
          <div className="flex items-center gap-2 text-sm md:text-base text-muted-foreground">
            <Icon name="Hash" size={16} />
            <span className="font-mono">{applicationId}</span>
          </div>
          <div className="flex items-center gap-2 text-xs md:text-sm text-muted-foreground">
            <Icon name="Clock" size={14} />
            <span>Last updated: {formattedDate}</span>
          </div>
        </div>
      </div>
      {status === 'in_progress' && (
        <div className="mb-6">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm md:text-base font-medium text-foreground">
              Application Progress
            </span>
            <span className="text-base md:text-lg lg:text-xl font-bold text-primary">
              {completionPercentage}%
            </span>
          </div>
          <div className="h-3 md:h-4 bg-muted rounded-full overflow-hidden">
            <div
              className="h-full bg-success smooth-transition"
              style={{ width: `${completionPercentage}%` }}
            />
          </div>
          <p className="text-xs md:text-sm text-muted-foreground mt-2">
            {completionPercentage < 100 ? `${100 - completionPercentage}% remaining to complete your application` : 'Application ready for submission'}
          </p>
        </div>
      )}
      <div className="flex flex-col sm:flex-row gap-3">
        {status === 'in_progress' && (
          <Button
            variant="default"
            fullWidth
            onClick={() => navigate('/application-form')}
            iconName="ArrowRight"
            iconPosition="right"
          >
            Continue Application
          </Button>
        )}
        {status === 'submitted' || status === 'under_review' && (
          <Button
            variant="outline"
            fullWidth
            onClick={() => navigate('/application-confirmation')}
            iconName="FileText"
            iconPosition="left"
          >
            View Submitted Application
          </Button>
        )}
        <Button
          variant="outline"
          fullWidth
          iconName="Download"
          iconPosition="left"
        >
          Download Summary
        </Button>
      </div>
    </div>
  );
};

export default ApplicationStatusCard;