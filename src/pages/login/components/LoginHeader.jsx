import React from 'react';
import { Link } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import useSelectedUniversity from '../../../hooks/useSelectedUniversity';


const LoginHeader = () => {
  const selectedUniversity = useSelectedUniversity();
  const name = selectedUniversity?.name || 'Your Institution';

  return (
    <header className="bg-card border-b border-border shadow-sm">
      <div className="mx-4 md:mx-6 lg:mx-8 py-4 md:py-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <Link to="/login" className="flex items-center gap-3">
            <div className="w-12 h-12 md:w-14 md:h-14 bg-primary/10 rounded-md flex items-center justify-center smooth-transition hover:bg-primary/20">
              <Icon name="GraduationCap" size={28} color="var(--color-primary)" />
            </div>
            <div className="text-center md:text-left">
              <h1 className="text-xl md:text-2xl font-heading font-bold text-primary">
                {name}
              </h1>
              <p className="text-xs md:text-sm font-caption text-muted-foreground">
                Scholarship Portal
              </p>
            </div>
          </Link>

          <div className="flex items-center gap-3 md:gap-4">
            <div className="flex items-center gap-2 px-3 py-2 bg-accent/10 rounded-md">
              <Icon name="Award" size={18} color="var(--color-accent)" />
              <span className="text-xs md:text-sm font-medium text-accent-foreground">
                2025-26 Applications Open
              </span>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default LoginHeader;