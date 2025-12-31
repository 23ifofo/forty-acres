import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';

const ApplicationSummary = ({ summaryData }) => {
  const [expandedSections, setExpandedSections] = useState({
    personal: true,
    academic: false,
    financial: false,
    essays: false,
    documents: false
  });

  const toggleSection = (section) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev?.[section]
    }));
  };

  const sections = [
    {
      id: 'personal',
      title: 'Personal Information',
      icon: 'User',
      items: summaryData?.personal
    },
    {
      id: 'academic',
      title: 'Academic Background',
      icon: 'BookOpen',
      items: summaryData?.academic
    },
    {
      id: 'financial',
      title: 'Financial Information',
      icon: 'DollarSign',
      items: summaryData?.financial
    },
    {
      id: 'essays',
      title: 'Essay Submissions',
      icon: 'FileText',
      items: summaryData?.essays
    },
    {
      id: 'documents',
      title: 'Uploaded Documents',
      icon: 'Upload',
      items: summaryData?.documents
    }
  ];

  return (
    <div className="bg-card border border-border rounded-lg overflow-hidden">
      <div className="bg-primary/5 border-b border-border p-4 md:p-6">
        <h2 className="text-xl md:text-2xl lg:text-3xl font-heading font-semibold text-foreground">
          Application Summary
        </h2>
      </div>
      <div className="divide-y divide-border">
        {sections?.map((section) => (
          <div key={section?.id} className="smooth-transition">
            <button
              onClick={() => toggleSection(section?.id)}
              className="w-full flex items-center justify-between p-4 md:p-6 hover:bg-muted/50 smooth-transition"
            >
              <div className="flex items-center gap-3 md:gap-4">
                <div className="w-10 h-10 md:w-12 md:h-12 bg-primary/10 rounded-md flex items-center justify-center">
                  <Icon name={section?.icon} size={20} color="var(--color-primary)" className="md:w-6 md:h-6" />
                </div>
                <h3 className="text-base md:text-lg lg:text-xl font-heading font-semibold text-foreground">
                  {section?.title}
                </h3>
              </div>
              <Icon 
                name={expandedSections?.[section?.id] ? 'ChevronUp' : 'ChevronDown'} 
                size={20} 
                color="var(--color-muted-foreground)"
                className="md:w-6 md:h-6"
              />
            </button>

            {expandedSections?.[section?.id] && (
              <div className="px-4 md:px-6 pb-4 md:pb-6 space-y-3 md:space-y-4">
                {section?.items?.map((item, index) => (
                  <div key={index} className="flex flex-col md:flex-row md:items-start gap-2 md:gap-4 p-3 md:p-4 bg-muted/30 rounded-md">
                    <p className="text-sm md:text-base font-caption text-muted-foreground min-w-[140px] md:min-w-[180px]">
                      {item?.label}:
                    </p>
                    <p className="text-sm md:text-base font-medium text-foreground flex-1">
                      {item?.value}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ApplicationSummary;