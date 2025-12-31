import React from 'react';
import Icon from '../../../components/AppIcon';

const TimelineCard = ({ milestones = [] }) => {
  const defaultMilestones = [
    {
      id: 1,
      title: 'Application Started',
      description: 'You began your scholarship application',
      date: '2025-12-15T10:00:00',
      status: 'completed',
      icon: 'PlayCircle'
    },
    {
      id: 2,
      title: 'Personal Information Completed',
      description: 'Basic details and contact information submitted',
      date: '2025-12-15T14:30:00',
      status: 'completed',
      icon: 'User'
    },
    {
      id: 3,
      title: 'Academic Section Completed',
      description: 'Educational background and achievements documented',
      date: '2025-12-18T09:15:00',
      status: 'completed',
      icon: 'BookOpen'
    },
    {
      id: 4,
      title: 'Financial Information Pending',
      description: 'Complete FAFSA details and family income information',
      date: null,
      status: 'pending',
      icon: 'DollarSign'
    },
    {
      id: 5,
      title: 'Document Upload',
      description: 'Upload transcripts, resume, and supporting documents',
      date: null,
      status: 'upcoming',
      icon: 'Upload'
    },
    {
      id: 6,
      title: 'Application Submission',
      description: 'Final review and submission of complete application',
      date: null,
      status: 'upcoming',
      icon: 'Send'
    },
    {
      id: 7,
      title: 'Committee Review',
      description: 'Scholarship committee evaluates your application (1-2 weeks for initial review; may include phone/email contact)',
      date: null,
      status: 'upcoming',
      icon: 'Eye'
    },
    {
      id: 8,
      title: 'Decision Notification',
      description: 'Receive notification about scholarship award decision (typically within 3-5 weeks)',
      date: null,
      status: 'upcoming',
      icon: 'Bell'
    }
  ];

  const timelineData = milestones?.length > 0 ? milestones : defaultMilestones;

  const statusConfig = {
    completed: {
      color: 'text-success',
      bgColor: 'bg-success',
      borderColor: 'border-success',
      lineColor: 'bg-success'
    },
    pending: {
      color: 'text-warning',
      bgColor: 'bg-warning',
      borderColor: 'border-warning',
      lineColor: 'bg-warning'
    },
    upcoming: {
      color: 'text-muted-foreground',
      bgColor: 'bg-muted',
      borderColor: 'border-muted',
      lineColor: 'bg-muted'
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'Pending';
    const date = new Date(dateString);
    return date?.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="bg-card border border-border rounded-lg shadow-md p-4 md:p-6 lg:p-8">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-12 h-12 md:w-14 md:h-14 bg-primary/10 rounded-lg flex items-center justify-center">
          <Icon name="GitBranch" size={24} color="var(--color-primary)" />
        </div>
        <div>
          <h3 className="text-lg md:text-xl lg:text-2xl font-heading font-bold text-foreground">
            Application Timeline
          </h3>
          <p className="text-sm md:text-base text-muted-foreground">
            Track your progress through the application process
          </p>
        </div>
      </div>
      <div className="relative">
        {timelineData?.map((milestone, index) => {
          const config = statusConfig?.[milestone?.status];
          const isLast = index === timelineData?.length - 1;

          return (
            <div key={milestone?.id} className="relative pb-8 last:pb-0">
              {!isLast && (
                <div className={`absolute left-[15px] md:left-[19px] top-[40px] md:top-[44px] w-0.5 h-[calc(100%-40px)] md:h-[calc(100%-44px)] ${config?.lineColor}`} />
              )}
              <div className="flex items-start gap-4">
                <div className={`w-8 h-8 md:w-10 md:h-10 ${config?.bgColor} rounded-full flex items-center justify-center flex-shrink-0 border-2 ${config?.borderColor}`}>
                  <Icon
                    name={milestone?.icon}
                    size={16}
                    color={milestone?.status === 'completed' ? 'var(--color-success-foreground)' : milestone?.status === 'pending' ? 'var(--color-warning-foreground)' : 'var(--color-muted-foreground)'}
                  />
                </div>

                <div className="flex-1 min-w-0 pt-1">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1 sm:gap-4 mb-1">
                    <h4 className={`text-sm md:text-base font-semibold ${config?.color}`}>
                      {milestone?.title}
                    </h4>
                    <span className="text-xs md:text-sm text-muted-foreground whitespace-nowrap">
                      {formatDate(milestone?.date)}
                    </span>
                  </div>
                  <p className="text-xs md:text-sm text-muted-foreground">
                    {milestone?.description}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default TimelineCard;