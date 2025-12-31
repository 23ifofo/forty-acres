import React from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const TaskChecklistCard = ({ tasks = [] }) => {
  const navigate = useNavigate();

  const defaultTasks = [
    {
      id: 1,
      title: 'Complete Personal Information',
      description: 'Fill out your basic details, contact information, and demographics',
      completed: true,
      priority: 'high',
      route: '/application-form?section=0',
      icon: 'User'
    },
    {
      id: 2,
      title: 'Academic Background',
      description: 'Provide your educational history, GPA, and academic achievements',
      completed: true,
      priority: 'high',
      route: '/application-form?section=1',
      icon: 'BookOpen'
    },
    {
      id: 3,
      title: 'Financial Information',
      description: 'Submit FAFSA details and family financial information',
      completed: false,
      priority: 'high',
      route: '/application-form?section=2',
      icon: 'DollarSign'
    },
    {
      id: 4,
      title: 'Essay Submissions',
      description: 'Write and submit required essays (under 100 words each)',
      completed: false,
      priority: 'medium',
      route: '/application-form?section=3',
      icon: 'FileText'
    },
    {
      id: 5,
      title: 'Upload Documents',
      description: 'Upload transcripts, resume, and supporting documents',
      completed: false,
      priority: 'high',
      route: '/document-upload-center',
      icon: 'Upload'
    },
    {
      id: 6,
      title: 'Request Recommendations',
      description: 'Send recommendation requests to your references',
      completed: false,
      priority: 'medium',
      route: '/document-upload-center',
      icon: 'Mail'
    }
  ];

  const taskList = tasks?.length > 0 ? tasks : defaultTasks;
  const completedCount = taskList?.filter(task => task?.completed)?.length;
  const totalCount = taskList?.length;
  const completionPercentage = Math.round((completedCount / totalCount) * 100);

  const priorityConfig = {
    high: {
      label: 'High Priority',
      color: 'text-error',
      bgColor: 'bg-error/10',
      icon: 'AlertCircle'
    },
    medium: {
      label: 'Medium Priority',
      color: 'text-warning',
      bgColor: 'bg-warning/10',
      icon: 'AlertTriangle'
    },
    low: {
      label: 'Low Priority',
      color: 'text-muted-foreground',
      bgColor: 'bg-muted',
      icon: 'Info'
    }
  };

  return (
    <div className="bg-card border border-border rounded-lg shadow-md p-4 md:p-6 lg:p-8">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg md:text-xl lg:text-2xl font-heading font-bold text-foreground mb-1">
            Task Checklist
          </h3>
          <p className="text-sm md:text-base text-muted-foreground">
            {completedCount} of {totalCount} tasks completed ({completionPercentage}%)
          </p>
        </div>
        <div className="w-12 h-12 md:w-14 md:h-14 bg-primary/10 rounded-lg flex items-center justify-center">
          <Icon name="CheckSquare" size={24} color="var(--color-primary)" />
        </div>
      </div>
      <div className="space-y-3 md:space-y-4">
        {taskList?.map((task) => {
          const priority = priorityConfig?.[task?.priority];
          
          return (
            <div
              key={task?.id}
              className={`border rounded-lg p-4 smooth-transition ${
                task?.completed
                  ? 'border-success/30 bg-success/5' :'border-border bg-background hover:border-primary/30'
              }`}
            >
              <div className="flex items-start gap-3 md:gap-4">
                <div className={`w-6 h-6 md:w-7 md:h-7 rounded-md flex items-center justify-center flex-shrink-0 ${
                  task?.completed ? 'bg-success' : 'bg-muted'
                }`}>
                  <Icon
                    name={task?.completed ? 'Check' : task?.icon}
                    size={16}
                    color={task?.completed ? 'var(--color-success-foreground)' : 'var(--color-muted-foreground)'}
                  />
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-2">
                    <h4 className={`text-sm md:text-base font-semibold ${
                      task?.completed ? 'text-success line-through' : 'text-foreground'
                    }`}>
                      {task?.title}
                    </h4>
                    {!task?.completed && (
                      <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-md text-xs font-medium ${priority?.color} ${priority?.bgColor} whitespace-nowrap`}>
                        <Icon name={priority?.icon} size={12} />
                        {priority?.label}
                      </span>
                    )}
                  </div>

                  <p className="text-xs md:text-sm text-muted-foreground mb-3">
                    {task?.description}
                  </p>

                  {!task?.completed && (
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => navigate(task?.route)}
                      iconName="ArrowRight"
                      iconPosition="right"
                    >
                      Complete Task
                    </Button>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default TaskChecklistCard;