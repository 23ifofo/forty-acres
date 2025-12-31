import React from 'react';
import Icon from '../../../components/AppIcon';

const ReviewTimeline = ({ timeline }) => {
  return (
    <div className="bg-card border border-border rounded-lg overflow-hidden">
      <div className="bg-primary/5 border-b border-border p-4 md:p-6">
        <div className="flex items-center gap-3">
          <Icon name="Clock" size={24} color="var(--color-primary)" className="md:w-7 md:h-7" />
          <h2 className="text-xl md:text-2xl lg:text-3xl font-heading font-semibold text-foreground">
            Review Timeline
          </h2>
        </div>
      </div>
      <div className="p-4 md:p-6">
        <div className="relative">
          <div className="absolute left-4 md:left-5 top-0 bottom-0 w-0.5 bg-border"></div>
          
          <div className="space-y-6 md:space-y-8">
            {timeline?.map((phase, index) => (
              <div key={index} className="relative flex gap-4 md:gap-6">
                <div className={`flex-shrink-0 w-8 h-8 md:w-10 md:h-10 rounded-full flex items-center justify-center z-10 ${
                  phase?.status === 'completed' 
                    ? 'bg-success text-success-foreground' 
                    : phase?.status === 'current' ?'bg-primary text-primary-foreground' :'bg-muted text-muted-foreground'
                }`}>
                  {phase?.status === 'completed' ? (
                    <Icon name="Check" size={16} className="md:w-5 md:h-5" />
                  ) : (
                    <span className="font-heading font-bold text-sm md:text-base">{index + 1}</span>
                  )}
                </div>
                
                <div className="flex-1 pb-6 md:pb-8">
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2 mb-2">
                    <h3 className="text-base md:text-lg lg:text-xl font-heading font-semibold text-foreground">
                      {phase?.title}
                    </h3>
                    <span className="text-sm md:text-base font-medium text-muted-foreground">
                      {phase?.date}
                    </span>
                  </div>
                  <p className="text-sm md:text-base text-muted-foreground leading-relaxed">
                    {phase?.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReviewTimeline;