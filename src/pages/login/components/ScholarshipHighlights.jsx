import React from 'react';
import Icon from '../../../components/AppIcon';
import useSelectedUniversity from '../../../hooks/useSelectedUniversity';


const ScholarshipHighlights = () => {
  const selectedUniversity = useSelectedUniversity();
  const emailDomain = selectedUniversity?.email?.split('@')?.[1] || 'youruniversity.edu';

  const highlights = [
    {
      icon: 'DollarSign',
      title: 'Merit-Based Awards',
      description: 'Up to $25,000 per year for exceptional academic achievement',
      color: 'var(--color-accent)'
    },
    {
      icon: 'Users',
      title: 'Need-Based Support',
      description: 'Financial assistance based on demonstrated need and FAFSA results',
      color: 'var(--color-primary)'
    },
    {
      icon: 'BookOpen',
      title: 'Specialized Programs',
      description: 'Discipline-specific scholarships for music, arts, business, and STEM',
      color: 'var(--color-success)'
    },
    {
      icon: 'Globe',
      title: 'International Students',
      description: 'Dedicated funding opportunities for global scholars',
      color: 'var(--color-warning)'
    }
  ];

  const deadlines = [
    {
      date: 'January 15, 2026',
      label: 'Priority Deadline',
      description: 'Early consideration for maximum funding'
    },
    {
      date: 'March 1, 2026',
      label: 'Regular Deadline',
      description: 'Standard application review period'
    },
    {
      date: 'May 1, 2026',
      label: 'Final Deadline',
      description: 'Last opportunity for Fall 2026 admission'
    }
  ];

  const requirements = [
    `Valid university email address (@${emailDomain})`,
    'Completed FAFSA application',
    'Official high school or college transcripts',
    'Two letters of recommendation',
    'Personal essay (below 100 words)',
    'Resume or CV (optional but recommended)'
  ];

  return (
    <div className="space-y-6 md:space-y-8">
      <div className="bg-card rounded-lg border border-border p-6 md:p-8 card-shadow">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-12 h-12 bg-accent/10 rounded-md flex items-center justify-center">
            <Icon name="Award" size={24} color="var(--color-accent)" />
          </div>
          <div>
            <h2 className="text-xl md:text-2xl font-heading font-semibold text-foreground">
              Scholarship Opportunities
            </h2>
            <p className="text-sm text-muted-foreground">
              2025-26 Academic Year
            </p>
          </div>
        </div>

        <div className="space-y-4">
          {highlights?.map((highlight, index) => (
            <div
              key={index}
              className="flex items-start gap-4 p-4 bg-muted/30 rounded-md hover:bg-muted/50 smooth-transition"
            >
              <div className="w-10 h-10 flex-shrink-0 rounded-full flex items-center justify-center" style={{ backgroundColor: `${highlight?.color}15` }}>
                <Icon name={highlight?.icon} size={20} color={highlight?.color} />
              </div>
              <div className="flex-1">
                <h3 className="text-base md:text-lg font-heading font-semibold text-foreground mb-1">
                  {highlight?.title}
                </h3>
                <p className="text-sm text-muted-foreground">
                  {highlight?.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="bg-card rounded-lg border border-border p-6 md:p-8 card-shadow">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-12 h-12 bg-warning/10 rounded-md flex items-center justify-center">
            <Icon name="Calendar" size={24} color="var(--color-warning)" />
          </div>
          <h2 className="text-xl md:text-2xl font-heading font-semibold text-foreground">
            Important Deadlines
          </h2>
        </div>

        <div className="space-y-4">
          {deadlines?.map((deadline, index) => (
            <div
              key={index}
              className="flex items-start gap-4 p-4 border border-border rounded-md"
            >
              <div className="flex-shrink-0">
                <div className="w-12 h-12 bg-primary/10 rounded-md flex flex-col items-center justify-center">
                  <span className="text-xs font-caption text-primary">
                    {deadline?.date?.split(' ')?.[0]}
                  </span>
                  <span className="text-lg font-heading font-bold text-primary">
                    {deadline?.date?.split(' ')?.[1]?.replace(',', '')}
                  </span>
                </div>
              </div>
              <div className="flex-1">
                <h3 className="text-base font-heading font-semibold text-foreground mb-1">
                  {deadline?.label}
                </h3>
                <p className="text-sm text-muted-foreground">
                  {deadline?.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="bg-card rounded-lg border border-border p-6 md:p-8 card-shadow">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-12 h-12 bg-success/10 rounded-md flex items-center justify-center">
            <Icon name="CheckCircle" size={24} color="var(--color-success)" />
          </div>
          <h2 className="text-xl md:text-2xl font-heading font-semibold text-foreground">
            Application Requirements
          </h2>
        </div>

        <ul className="space-y-3">
          {requirements?.map((requirement, index) => (
            <li key={index} className="flex items-start gap-3">
              <Icon name="Check" size={18} color="var(--color-success)" className="flex-shrink-0 mt-0.5" />
              <span className="text-sm text-foreground">{requirement}</span>
            </li>
          ))}
        </ul>

        <div className="mt-6 p-4 bg-accent/10 border border-accent rounded-md">
          <div className="flex items-start gap-3">
            <Icon name="Info" size={20} color="var(--color-accent)" className="flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-sm font-semibold text-accent-foreground mb-1">
                Pro Tip
              </p>
              <p className="text-sm text-muted-foreground">
                Complete your application early to maximize your scholarship opportunities. Applications are reviewed on a rolling basis.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ScholarshipHighlights;