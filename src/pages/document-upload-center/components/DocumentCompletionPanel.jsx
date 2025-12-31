import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const DocumentCompletionPanel = ({ 
  totalRequired, 
  totalUploaded, 
  missingDocuments,
  onNavigateToApplication 
}) => {
  const completionPercentage = (totalUploaded / totalRequired) * 100;
  const isComplete = totalUploaded === totalRequired;

  return (
    <div className="bg-card border border-border rounded-lg p-4 md:p-6 sticky top-[136px]">
      <div className="flex items-center gap-3 mb-4">
        <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
          isComplete ? 'bg-success/10' : 'bg-warning/10'
        }`}>
          <Icon
            name={isComplete ? 'CheckCircle' : 'FileText'}
            size={28}
            color={isComplete ? 'var(--color-success)' : 'var(--color-warning)'}
          />
        </div>
        <div>
          <h3 className="text-lg md:text-xl font-heading font-semibold text-foreground">
            Document Status
          </h3>
          <p className="text-xs md:text-sm text-muted-foreground">
            {totalUploaded} of {totalRequired} uploaded
          </p>
        </div>
      </div>
      <div className="mb-4">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium text-foreground">Completion</span>
          <span className="text-sm font-semibold text-foreground">
            {Math.round(completionPercentage)}%
          </span>
        </div>
        <div className="h-3 bg-muted rounded-full overflow-hidden">
          <div
            className={`h-full smooth-transition ${
              isComplete ? 'bg-success' : 'bg-warning'
            }`}
            style={{ width: `${completionPercentage}%` }}
          />
        </div>
      </div>
      {!isComplete && missingDocuments?.length > 0 && (
        <div className="mb-4">
          <h4 className="text-sm font-heading font-semibold text-foreground mb-3">
            Missing Documents
          </h4>
          <div className="space-y-2">
            {missingDocuments?.map((doc, index) => (
              <div
                key={index}
                className="flex items-center gap-2 p-2 bg-error/5 border border-error/20 rounded-md"
              >
                <Icon name="AlertCircle" size={16} color="var(--color-error)" />
                <span className="text-xs md:text-sm text-foreground">{doc}</span>
              </div>
            ))}
          </div>
        </div>
      )}
      {isComplete ? (
        <div className="space-y-3">
          <div className="flex items-center gap-2 p-3 bg-success/10 rounded-md">
            <Icon name="CheckCircle" size={20} color="var(--color-success)" />
            <p className="text-sm font-medium text-success">
              All documents uploaded!
            </p>
          </div>
          <Button
            variant="default"
            fullWidth
            iconName="ArrowRight"
            iconPosition="right"
            onClick={onNavigateToApplication}
          >
            Continue Application
          </Button>
        </div>
      ) : (
        <div className="flex items-start gap-2 p-3 bg-warning/10 rounded-md">
          <Icon name="Info" size={20} color="var(--color-warning)" />
          <p className="text-xs md:text-sm text-muted-foreground">
            Upload all required documents to proceed with your application
          </p>
        </div>
      )}
    </div>
  );
};

export default DocumentCompletionPanel;