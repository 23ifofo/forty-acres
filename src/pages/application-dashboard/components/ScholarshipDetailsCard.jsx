import React from 'react';
import Icon from '../../../components/AppIcon';
import useSelectedUniversity from '../../../hooks/useSelectedUniversity';

const ScholarshipDetailsCard = () => {
  const selectedUniversity = useSelectedUniversity();
  const institutionName = selectedUniversity?.name || 'Your Institution';

  const scholarshipInfo = {
    name: `${institutionName} Academic Excellence Scholarship`,
    amount: '$15,000',
    duration: 'Per Academic Year',
    renewable: true,
    deadline: '2025-01-15',
    eligibility: [
      'Minimum 3.5 GPA required',
      'Full-time enrollment (12+ credit hours)',
      'U.S. citizen or permanent resident',
      'Demonstrated financial need',
      'Active community service involvement'
    ],
    benefits: [
      'Full tuition coverage for qualifying students',
      'Priority registration for classes',
      'Access to exclusive academic workshops',
      'Mentorship program with faculty',
      'Professional development opportunities'
    ]
  };

  const formatDeadline = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const daysRemaining = Math.ceil((date - now) / (1000 * 60 * 60 * 24));
    
    return {
      formatted: date?.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }),
      daysRemaining,
      isUrgent: daysRemaining <= 7
    };
  };

  const deadline = formatDeadline(scholarshipInfo?.deadline);

  return (
    <div className="bg-card border border-border rounded-lg shadow-md p-4 md:p-6 lg:p-8">
      <div className="flex items-start gap-4 mb-6">
        <div className="w-12 h-12 md:w-14 md:h-14 bg-accent/10 rounded-lg flex items-center justify-center flex-shrink-0">
          <Icon name="Award" size={24} color="var(--color-accent)" />
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="text-lg md:text-xl lg:text-2xl font-heading font-bold text-foreground mb-1">
            {scholarshipInfo?.name}
          </h3>
          <div className="flex flex-wrap items-center gap-2 md:gap-3">
            <span className="text-xl md:text-2xl lg:text-3xl font-bold text-accent">
              {scholarshipInfo?.amount}
            </span>
            <span className="text-sm md:text-base text-muted-foreground">
              {scholarshipInfo?.duration}
            </span>
            {scholarshipInfo?.renewable && (
              <span className="inline-flex items-center gap-1 px-2 py-1 bg-success/10 text-success text-xs md:text-sm font-medium rounded-md">
                <Icon name="RefreshCw" size={12} />
                Renewable
              </span>
            )}
          </div>
        </div>
      </div>
      <div className={`p-4 rounded-lg mb-6 ${
        deadline?.isUrgent ? 'bg-error/10 border border-error' : 'bg-warning/10 border border-warning'
      }`}>
        <div className="flex items-center gap-3">
          <Icon
            name={deadline?.isUrgent ? 'AlertCircle' : 'Calendar'}
            size={20}
            color={deadline?.isUrgent ? 'var(--color-error)' : 'var(--color-warning)'}
          />
          <div className="flex-1 min-w-0">
            <p className="text-xs md:text-sm font-caption text-muted-foreground">
              Application Deadline
            </p>
            <p className={`text-sm md:text-base font-semibold ${
              deadline?.isUrgent ? 'text-error' : 'text-warning'
            }`}>
              {deadline?.formatted}
            </p>
            <p className={`text-xs md:text-sm ${
              deadline?.isUrgent ? 'text-error' : 'text-warning'
            }`}>
              {deadline?.daysRemaining} days remaining
            </p>
          </div>
        </div>
      </div>
      <div className="space-y-6">
        <div>
          <h4 className="text-base md:text-lg font-heading font-semibold text-foreground mb-3 flex items-center gap-2">
            <Icon name="CheckCircle" size={18} color="var(--color-primary)" />
            Eligibility Requirements
          </h4>
          <ul className="space-y-2">
            {scholarshipInfo?.eligibility?.map((item, index) => (
              <li key={index} className="flex items-start gap-2 text-sm md:text-base text-foreground">
                <Icon name="Dot" size={20} className="flex-shrink-0 text-primary" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="text-base md:text-lg font-heading font-semibold text-foreground mb-3 flex items-center gap-2">
            <Icon name="Gift" size={18} color="var(--color-success)" />
            Scholarship Benefits
          </h4>
          <ul className="space-y-2">
            {scholarshipInfo?.benefits?.map((item, index) => (
              <li key={index} className="flex items-start gap-2 text-sm md:text-base text-foreground">
                <Icon name="Dot" size={20} className="flex-shrink-0 text-success" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default ScholarshipDetailsCard;