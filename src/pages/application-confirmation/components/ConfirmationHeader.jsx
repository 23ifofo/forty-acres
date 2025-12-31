import React from 'react';
import Icon from '../../../components/AppIcon';
import useSelectedUniversity from '../../../hooks/useSelectedUniversity';

const ConfirmationHeader = ({ applicationId, submissionDate }) => {
  const selectedUniversity = useSelectedUniversity();
  const institutionName = selectedUniversity?.name || 'the Scholarship Program';

  return (
    <div className="bg-success/10 border-2 border-success rounded-lg p-6 md:p-8 lg:p-10 mb-6 md:mb-8">
      <div className="flex flex-col items-center text-center gap-4 md:gap-6">
        <div className="w-16 h-16 md:w-20 md:h-20 lg:w-24 lg:h-24 bg-success rounded-full flex items-center justify-center">
          <Icon name="CheckCircle" size={40} color="var(--color-success-foreground)" className="md:w-12 md:h-12 lg:w-14 lg:h-14" />
        </div>
        
        <div className="space-y-2 md:space-y-3">
          <h1 className="text-2xl md:text-3xl lg:text-4xl font-heading font-bold text-success">
            Application Successfully Submitted!
          </h1>
          <p className="text-base md:text-lg lg:text-xl text-foreground">
            Thank you for applying to the {institutionName} Scholarship Program
          </p>
        </div>

        <div className="bg-card border border-border rounded-md p-4 md:p-6 w-full max-w-2xl">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
            <div className="flex items-center gap-3">
              <Icon name="Hash" size={20} color="var(--color-primary)" />
              <div>
                <p className="text-xs md:text-sm font-caption text-muted-foreground">Application ID</p>
                <p className="text-lg md:text-xl lg:text-2xl font-heading font-bold text-primary">{applicationId}</p>
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              <Icon name="Calendar" size={20} color="var(--color-primary)" />
              <div>
                <p className="text-xs md:text-sm font-caption text-muted-foreground">Submitted On</p>
                <p className="text-base md:text-lg lg:text-xl font-medium text-foreground">{submissionDate}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationHeader;