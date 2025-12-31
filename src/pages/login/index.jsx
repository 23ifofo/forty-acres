import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../../components/AppIcon';
import useSelectedUniversity from '../../hooks/useSelectedUniversity';

import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';
import { Checkbox } from '../../components/ui/Checkbox';
import LoginHeader from './components/LoginHeader';
import SecurityBadges from './components/SecurityBadges';
import ScholarshipHighlights from './components/ScholarshipHighlights';

const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    rememberMe: false
  });
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [loginAttempts, setLoginAttempts] = useState(0);

  const selectedUniversity = useSelectedUniversity();

  const mockCredentials = {
    email: selectedUniversity?.emailPattern || 'student@youruniversity.edu',
    password: selectedUniversity?.demoPassword || 'Password123!'
  };

  const handleInputChange = (e) => {
    const { name, value } = e?.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    if (errors?.[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handleCheckboxChange = (e) => {
    setFormData(prev => ({
      ...prev,
      rememberMe: e?.target?.checked
    }));
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData?.email) {
      newErrors.email = 'Email address is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/?.test(formData?.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!formData?.password) {
      newErrors.password = 'Password is required';
    } else if (formData?.password?.length < 8) {
      newErrors.password = 'Password must be at least 8 characters';
    }

    setErrors(newErrors);
    return Object.keys(newErrors)?.length === 0;
  };

  const handleSubmit = async (e) => {
    e?.preventDefault();
    
    if (!validateForm()) return;

    if (loginAttempts >= 3) {
      setErrors({
        general: 'Account temporarily locked due to multiple failed attempts. Please try again in 15 minutes or contact support.'
      });
      return;
    }

    setIsLoading(true);

    setTimeout(() => {
      if (formData?.email === mockCredentials?.email && formData?.password === mockCredentials?.password) {
        localStorage.setItem('isAuthenticated', 'true');
        localStorage.setItem('userEmail', formData?.email);
        if (formData?.rememberMe) {
          localStorage.setItem('rememberMe', 'true');
        }
        navigate('/application-dashboard');
      } else {
        setLoginAttempts(prev => prev + 1);
        setErrors({
          general: `Invalid email or password. ${3 - (loginAttempts + 1)} attempts remaining. Use: ${mockCredentials?.email} / ${mockCredentials?.password}`
        });
      }
      setIsLoading(false);
    }, 1500);
  };

  const handleForgotPassword = () => {
    navigate('/forgot-password');
  };

  const handleCreateAccount = () => {
    navigate('/register');
  };

  return (
    <div className="min-h-screen bg-background">
      <LoginHeader />
      <main className="section-spacing">
        <div className="mx-4 md:mx-6 lg:mx-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-12 max-w-7xl mx-auto">
            <div className="order-2 lg:order-1">
              <div className="bg-card rounded-lg border border-border p-6 md:p-8 lg:p-10 card-shadow-lg">
                <div className="mb-6 md:mb-8">
                  <h1 className="text-2xl md:text-3xl lg:text-4xl font-heading font-semibold text-foreground mb-2">
                    Welcome Back
                  </h1>
                  <p className="text-sm md:text-base text-muted-foreground">
                    Sign in to continue your scholarship application
                  </p>
                </div>

                {errors?.general && (
                  <div className="mb-6 p-4 bg-error/10 border border-error rounded-md flex items-start gap-3">
                    <Icon name="AlertCircle" size={20} color="var(--color-error)" className="flex-shrink-0 mt-0.5" />
                    <p className="text-sm text-error">{errors?.general}</p>
                  </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-4 md:space-y-6">
                  <Input
                    type="email"
                    name="email"
                    label="University Email Address"
                    placeholder={selectedUniversity?.emailPattern || 'student@youruniversity.edu'}
                    value={formData?.email}
                    onChange={handleInputChange}
                    error={errors?.email}
                    required
                    disabled={isLoading}
                  />

                  <div className="relative">
                    <Input
                      type={showPassword ? 'text' : 'password'}
                      name="password"
                      label="Password"
                      placeholder="Enter your password"
                      value={formData?.password}
                      onChange={handleInputChange}
                      error={errors?.password}
                      required
                      disabled={isLoading}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-[38px] text-muted-foreground hover:text-foreground smooth-transition"
                      aria-label={showPassword ? 'Hide password' : 'Show password'}
                    >
                      <Icon name={showPassword ? 'EyeOff' : 'Eye'} size={20} />
                    </button>
                  </div>

                  <div className="flex items-center justify-between flex-wrap gap-3">
                    <Checkbox
                      label="Remember me"
                      checked={formData?.rememberMe}
                      onChange={handleCheckboxChange}
                      disabled={isLoading}
                    />
                    <button
                      type="button"
                      onClick={handleForgotPassword}
                      className="text-sm font-medium text-primary hover:text-primary/80 smooth-transition"
                    >
                      Forgot Password?
                    </button>
                  </div>

                  <Button
                    type="submit"
                    variant="default"
                    size="lg"
                    fullWidth
                    loading={isLoading}
                    disabled={isLoading || loginAttempts >= 3}
                    iconName="LogIn"
                    iconPosition="right"
                  >
                    Sign In
                  </Button>

                  <div className="relative my-6">
                    <div className="absolute inset-0 flex items-center">
                      <div className="w-full border-t border-border"></div>
                    </div>
                    <div className="relative flex justify-center text-xs md:text-sm">
                      <span className="bg-card px-4 text-muted-foreground font-caption">
                        OR
                      </span>
                    </div>
                  </div>

                  <Button
                    type="button"
                    variant="outline"
                    size="lg"
                    fullWidth
                    iconName="Building2"
                    iconPosition="left"
                    disabled={isLoading}
                  >
                    Sign in with University SSO
                  </Button>

                  <div className="pt-4 text-center">
                    <p className="text-sm text-muted-foreground">
                      Don't have an account?{' '}
                      <button
                        type="button"
                        onClick={handleCreateAccount}
                        className="font-medium text-primary hover:text-primary/80 smooth-transition"
                      >
                        Create Account
                      </button>
                    </p>
                  </div>
                </form>

                <SecurityBadges />
              </div>

              <div className="mt-6 text-center">
                <p className="text-sm text-muted-foreground mb-2">
                  Need help?
                </p>
                <div className="flex items-center justify-center gap-4 flex-wrap">
                  <a
                    href={`mailto:${selectedUniversity?.email || 'support@youruniversity.edu'}`}
                    className="text-sm font-medium text-primary hover:text-primary/80 smooth-transition flex items-center gap-2"
                  >
                    <Icon name="Mail" size={16} />
                    {selectedUniversity?.email || 'support@youruniversity.edu'}
                  </a>
                  <a
                    href={`tel:${selectedUniversity?.phone || '+10000000000'}`}
                    className="text-sm font-medium text-primary hover:text-primary/80 smooth-transition flex items-center gap-2"
                  >
                    <Icon name="Phone" size={16} />
                    {selectedUniversity?.phone || '(000) 000-0000'}
                  </a>
                </div>
              </div>
            </div>

            <div className="order-1 lg:order-2">
              <ScholarshipHighlights />
            </div>
          </div>
        </div>
      </main>
      <footer className="py-6 md:py-8 border-t border-border bg-card">
        <div className="mx-4 md:mx-6 lg:mx-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
              <p className="text-center md:text-left">
              &copy; {new Date()?.getFullYear()} {selectedUniversity?.name || 'Your Institution'}. All rights reserved.
            </p>
            <div className="flex items-center gap-4 flex-wrap justify-center">
              <a href="#" className="hover:text-foreground smooth-transition">
                Privacy Policy
              </a>
              <span className="hidden md:inline">•</span>
              <a href="#" className="hover:text-foreground smooth-transition">
                Terms of Service
              </a>
              <span className="hidden md:inline">•</span>
              <a href="#" className="hover:text-foreground smooth-transition">
                FERPA Compliance
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Login;