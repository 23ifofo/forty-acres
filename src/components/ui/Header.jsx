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
  const isLanding = pathname === '/' || pathname.startsWith('/forty-acres');
  const portalName = isLanding
    ? 'Forty Acres Scholars Portal'
    : (selectedUniversity ? `${selectedUniversity.name} Scholarship Portal` : 'Scholarship Portal');

  return (
    <header className="sticky top-0 z-100 bg-gradient-to-r from-blue-600 to-blue-700 shadow-xl">
      <div className="mx-4 lg:mx-8">
        <div className="flex items-center justify-between h-[70px]">
          <div className="flex items-center gap-6">
            <Link to={isLanding ? '/' : '/application-dashboard'} className="flex items-center gap-3 group">
              <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center smooth-transition hover:bg-white/30 group-hover:scale-110 border border-white/30">
                <Icon name="Award" size={28} color="white" />
              </div>
              <div className="hidden sm:block">
                <p className="text-xs font-medium text-white/80 tracking-widest">FORTY ACRES</p>
                <span className="text-lg font-heading font-bold text-white">
                  Forty Acres Scholars
                </span>
              </div>
            </Link>

            <nav className="hidden lg:flex items-center gap-1">
              {navigationItems?.map((item) => (
                <Link
                  key={item?.path}
                  to={item?.path}
                  className={`flex items-center gap-2 px-4 py-2 rounded-md smooth-transition hover-lift ${
                    isActive(item?.path)
                      ? 'bg-white/20 text-white'
                      : 'text-white/80 hover:bg-white/10 hover:text-white'
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
        <div className="lg:hidden bg-blue-700 border-t border-blue-600">
          <nav className="flex flex-col p-4 gap-2">
            {navigationItems?.map((item) => (
              <Link
                key={item?.path}
                to={item?.path}
                onClick={() => setMobileMenuOpen(false)}
                className={`flex items-center gap-3 px-4 py-3 rounded-md smooth-transition ${
                  isActive(item?.path)
                    ? 'bg-white/20 text-white'
                    : 'text-white/80 hover:bg-white/10 hover:text-white'
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