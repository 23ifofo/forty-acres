import React from 'react';
import Icon from '../../../components/AppIcon';

const ImportantNotices = ({ notices }) => {
  return (
    <div className="bg-card border border-border rounded-lg overflow-hidden">
      <div className="bg-warning/10 border-b border-border p-4 md:p-6">
        <div className="flex items-center gap-3">
          <Icon name="AlertTriangle" size={24} color="var(--color-warning)" className="md:w-7 md:h-7" />
          <h2 className="text-xl md:text-2xl lg:text-3xl font-heading font-semibold text-foreground">
            Important Information
          </h2>
        </div>
      </div>
      <div className="p-4 md:p-6 space-y-4 md:space-y-6">
        {notices?.map((notice, index) => (
          <div key={index} className="flex gap-3 md:gap-4 p-4 bg-muted/30 rounded-md">
            <Icon 
              name={notice?.icon} 
              size={20} 
              color="var(--color-foreground)" 
              className="flex-shrink-0 mt-1 md:w-6 md:h-6"
            />
            <div className="flex-1">
              <h3 className="text-base md:text-lg font-heading font-semibold text-foreground mb-2">
                {notice?.title}
              </h3>
              <p className="text-sm md:text-base text-muted-foreground leading-relaxed">
                {notice?.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ImportantNotices;