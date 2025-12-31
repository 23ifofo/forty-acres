import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Icon from '../AppIcon';
import Button from './Button';
import useSelectedUniversity from '../../hooks/useSelectedUniversity';

const Header = () => {
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const selectedUniversity = useSelectedUniversity();

  const navigationItems = [
    { label: 'Dashboard', path: '/application-dashboard', icon: 'LayoutDashboard' },
    { label: 'Application', path: '/application-form', icon: 'FileText' },
    { label: 'Documents', path: '/document-upload-center', icon: 'Upload' },
    { label: 'Confirmation', path: '/application-confirmation', icon: 'CheckCircle' }
  ];

  const isActive = (path) => location?.pathname === path;

  const pathname = location?.pathname || '/';
  const isLosfaLanding = pathname === '/' || pathname.startsWith('/losfa');
  const portalName = isLosfaLanding
    ? 'LOSFA Scholarship Portal'
    : (selectedUniversity ? `${selectedUniversity.name} Scholarship Portal` : 'Scholarship Portal');

  return (
    <header className="sticky top-0 z-100 bg-card shadow-md">
      <div className="mx-4 lg:mx-8">
        <div className="flex items-center justify-between h-[60px]">
          <div className="flex items-center gap-8">
            <Link to={isLosfaLanding ? '/' : '/application-dashboard'} className="flex items-center gap-3">
              <div className="w-10 h-10 bg-primary/10 rounded-md flex items-center justify-center smooth-transition hover:bg-primary/20">
                <Icon name="GraduationCap" size={24} color="var(--color-primary)" />
              </div>
              <span className="text-xl font-heading font-semibold text-primary hidden sm:block">
                {portalName}
              </span>
            </Link>

            <nav className="hidden lg:flex items-center gap-1">
              {navigationItems?.map((item) => (
                <Link
                  key={item?.path}
                  to={item?.path}
                  className={`flex items-center gap-2 px-4 py-2 rounded-md smooth-transition hover-lift ${
                    isActive(item?.path)
                      ? 'bg-primary text-primary-foreground'
                      : 'text-foreground hover:bg-muted'
                  }`}
                >
                  <Icon name={item?.icon} size={18} />
                  <span className="font-medium">{item?.label}</span>
                </Link>
              ))}
            </nav>
          </div>

          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="icon"
              className="lg:hidden"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle mobile menu"
            >
              <Icon name={mobileMenuOpen ? 'X' : 'Menu'} size={24} />
            </Button>
          </div>
        </div>
      </div>
      {mobileMenuOpen && (
        <div className="lg:hidden bg-card border-t border-border">
          <nav className="flex flex-col p-4 gap-2">
            {navigationItems?.map((item) => (
              <Link
                key={item?.path}
                to={item?.path}
                onClick={() => setMobileMenuOpen(false)}
                className={`flex items-center gap-3 px-4 py-3 rounded-md smooth-transition ${
                  isActive(item?.path)
                    ? 'bg-primary text-primary-foreground'
                    : 'text-foreground hover:bg-muted'
                }`}
              >
                <Icon name={item?.icon} size={20} />
                <span className="font-medium">{item?.label}</span>
              </Link>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;