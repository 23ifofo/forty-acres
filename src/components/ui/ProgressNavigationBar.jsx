import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Icon from '../AppIcon';

const ProgressNavigationBar = ({ currentSection = 0, totalSections = 5 }) => {
  const location = useLocation();
  const navigate = useNavigate();

  const sections = [
    { id: 0, label: 'Personal Info', icon: 'User', path: '/application-form?section=0' },
    { id: 1, label: 'Academic', icon: 'BookOpen', path: '/application-form?section=1' },
    { id: 2, label: 'Financial', icon: 'DollarSign', path: '/application-form?section=2' },
    { id: 3, label: 'Essays', icon: 'FileText', path: '/application-form?section=3' },
    { id: 4, label: 'Review', icon: 'CheckCircle', path: '/application-form?section=4' }
  ];

  const isApplicationForm = location?.pathname === '/application-form';
  const completionPercentage = ((currentSection + 1) / totalSections) * 100;

  if (!isApplicationForm) return null;

  const handleSectionClick = (sectionId) => {
    if (sectionId <= currentSection) {
      navigate(`/application-form?section=${sectionId}`);
    }
  };

  return (
    <div className="sticky top-[60px] z-75 bg-card border-b border-border shadow-sm">
      <div className="mx-4 lg:mx-8 py-4">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-sm font-heading font-semibold text-foreground">
            Application Progress
          </h3>
          <span className="text-sm font-medium text-muted-foreground">
            {Math.round(completionPercentage)}% Complete
          </span>
        </div>

        <div className="relative h-2 bg-muted rounded-full overflow-hidden mb-4">
          <div
            className="absolute top-0 left-0 h-full bg-success smooth-transition"
            style={{ width: `${completionPercentage}%` }}
          />
        </div>

        <div className="hidden md:flex items-center justify-between gap-2">
          {sections?.map((section, index) => {
            const isCompleted = section?.id < currentSection;
            const isCurrent = section?.id === currentSection;
            const isAccessible = section?.id <= currentSection;

            return (
              <button
                key={section?.id}
                onClick={() => handleSectionClick(section?.id)}
                disabled={!isAccessible}
                className={`flex-1 flex flex-col items-center gap-2 p-3 rounded-md smooth-transition ${
                  isCurrent
                    ? 'bg-primary text-primary-foreground'
                    : isCompleted
                    ? 'bg-success/10 text-success hover:bg-success/20'
                    : isAccessible
                    ? 'bg-muted text-muted-foreground hover:bg-muted/80'
                    : 'bg-muted/50 text-muted-foreground/50 cursor-not-allowed'
                }`}
              >
                <div className="flex items-center gap-2">
                  <Icon
                    name={isCompleted ? 'CheckCircle' : section?.icon}
                    size={20}
                  />
                  <span className="text-sm font-medium">{section?.label}</span>
                </div>
              </button>
            );
          })}
        </div>

        <div className="flex md:hidden items-center justify-center gap-2">
          {sections?.map((section) => (
            <button
              key={section?.id}
              onClick={() => handleSectionClick(section?.id)}
              disabled={section?.id > currentSection}
              className={`w-3 h-3 rounded-full smooth-transition ${
                section?.id === currentSection
                  ? 'bg-primary scale-125'
                  : section?.id < currentSection
                  ? 'bg-success' :'bg-muted'
              }`}
              aria-label={`Section ${section?.id + 1}: ${section?.label}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProgressNavigationBar;