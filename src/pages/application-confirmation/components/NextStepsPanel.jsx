import React from 'react';
import Icon from '../../../components/AppIcon';

const NextStepsPanel = ({ nextSteps }) => {
  return (
    <div className="bg-card border border-border rounded-lg overflow-hidden">
      <div className="bg-accent/10 border-b border-border p-4 md:p-6">
        <div className="flex items-center gap-3">
          <Icon name="ListChecks" size={24} color="var(--color-accent)" className="md:w-7 md:h-7" />
          <h2 className="text-xl md:text-2xl lg:text-3xl font-heading font-semibold text-foreground">
            Next Steps
          </h2>
        </div>
      </div>
      <div className="p-4 md:p-6 space-y-4 md:space-y-6">
        {nextSteps?.map((step, index) => (
          <div key={index} className="flex gap-3 md:gap-4">
            <div className="flex-shrink-0 w-8 h-8 md:w-10 md:h-10 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-heading font-bold text-sm md:text-base">
              {index + 1}
            </div>
            <div className="flex-1 space-y-1 md:space-y-2">
              <h3 className="text-base md:text-lg lg:text-xl font-heading font-semibold text-foreground">
                {step?.title}
              </h3>
              <p className="text-sm md:text-base text-muted-foreground leading-relaxed">
                {step?.description}
              </p>
              {step?.deadline && (
                <div className="flex items-center gap-2 mt-2 text-sm md:text-base text-warning">
                  <Icon name="Clock" size={16} className="md:w-5 md:h-5" />
                  <span className="font-medium">Deadline: {step?.deadline}</span>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default NextStepsPanel;