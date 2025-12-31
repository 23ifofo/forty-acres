import React from 'react';
import Icon from '../../../components/AppIcon';

const SecurityBadges = () => {
  const securityFeatures = [
    {
      icon: 'Shield',
      label: 'SSL Encrypted',
      description: '256-bit encryption'
    },
    {
      icon: 'Lock',
      label: 'FERPA Compliant',
      description: 'Privacy protected'
    },
    {
      icon: 'CheckCircle',
      label: 'Verified Secure',
      description: 'University certified'
    }
  ];

  return (
    <div className="mt-8 pt-6 border-t border-border">
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {securityFeatures?.map((feature, index) => (
          <div
            key={index}
            className="flex flex-col items-center text-center p-3 bg-muted/50 rounded-md"
          >
            <div className="w-10 h-10 bg-success/10 rounded-full flex items-center justify-center mb-2">
              <Icon name={feature?.icon} size={20} color="var(--color-success)" />
            </div>
            <p className="text-xs font-semibold text-foreground mb-1">
              {feature?.label}
            </p>
            <p className="text-xs text-muted-foreground font-caption">
              {feature?.description}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SecurityBadges;