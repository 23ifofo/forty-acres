import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const DocumentCategoryCard = ({ 
  category, 
  onUploadClick, 
  onViewClick 
}) => {
  const getStatusColor = () => {
    if (category?.uploadedCount === category?.requiredCount) return 'success';
    if (category?.uploadedCount > 0) return 'warning';
    return 'muted';
  };

  const getStatusIcon = () => {
    if (category?.uploadedCount === category?.requiredCount) return 'CheckCircle';
    if (category?.uploadedCount > 0) return 'Clock';
    return 'AlertCircle';
  };

  const statusColor = getStatusColor();
  const statusIcon = getStatusIcon();
  const completionPercentage = (category?.uploadedCount / category?.requiredCount) * 100;

  return (
    <div className="bg-card border border-border rounded-lg p-4 md:p-6 smooth-transition hover:shadow-lg">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className={`w-10 h-10 md:w-12 md:h-12 rounded-md flex items-center justify-center ${
            statusColor === 'success' ? 'bg-success/10' : 
            statusColor === 'warning' ? 'bg-warning/10' : 'bg-muted'
          }`}>
            <Icon 
              name={category?.icon} 
              size={24} 
              color={
                statusColor === 'success' ? 'var(--color-success)' : 
                statusColor === 'warning' ? 'var(--color-warning)' : 'var(--color-muted-foreground)'
              } 
            />
          </div>
          <div>
            <h3 className="text-base md:text-lg font-heading font-semibold text-foreground">
              {category?.name}
            </h3>
            <p className="text-xs md:text-sm text-muted-foreground">
              {category?.uploadedCount} of {category?.requiredCount} uploaded
            </p>
          </div>
        </div>
        <Icon 
          name={statusIcon} 
          size={20} 
          color={
            statusColor === 'success' ? 'var(--color-success)' : 
            statusColor === 'warning' ? 'var(--color-warning)' : 'var(--color-error)'
          } 
        />
      </div>
      <div className="mb-4">
        <div className="h-2 bg-muted rounded-full overflow-hidden">
          <div
            className={`h-full smooth-transition ${
              statusColor === 'success' ? 'bg-success' : 
              statusColor === 'warning' ? 'bg-warning' : 'bg-muted-foreground'
            }`}
            style={{ width: `${completionPercentage}%` }}
          />
        </div>
      </div>
      <div className="space-y-2 mb-4">
        <div className="flex items-center gap-2 text-xs md:text-sm text-muted-foreground">
          <Icon name="FileType" size={16} />
          <span>{category?.acceptedFormats}</span>
        </div>
        <div className="flex items-center gap-2 text-xs md:text-sm text-muted-foreground">
          <Icon name="HardDrive" size={16} />
          <span>Max {category?.maxSize}</span>
        </div>
        {category?.deadline && (
          <div className="flex items-center gap-2 text-xs md:text-sm text-warning">
            <Icon name="Calendar" size={16} />
            <span>Due: {category?.deadline}</span>
          </div>
        )}
      </div>
      <div className="flex flex-col sm:flex-row gap-2">
        <Button
          variant="default"
          size="sm"
          fullWidth
          iconName="Upload"
          iconPosition="left"
          onClick={() => onUploadClick(category)}
        >
          Upload
        </Button>
        {category?.uploadedCount > 0 && (
          <Button
            variant="outline"
            size="sm"
            fullWidth
            iconName="Eye"
            iconPosition="left"
            onClick={() => onViewClick(category)}
          >
            View
          </Button>
        )}
      </div>
    </div>
  );
};

export default DocumentCategoryCard;