import React from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../../../components/ui/Button';
import useSelectedUniversity from '../../../hooks/useSelectedUniversity';

const ActionButtons = ({ applicationId }) => {
  const navigate = useNavigate();
  const selectedUniversity = useSelectedUniversity();
  const supportEmail = selectedUniversity?.email || 'support@youruniversity.edu';
  const supportPhone = selectedUniversity?.phone || '(000) 000-0000';
  const instName = selectedUniversity?.name || 'Your Institution';

  const handlePrint = () => {
    window.print();
  };

  const handleDownload = () => {
    const confirmationText = `
${instName.toUpperCase()} SCHOLARSHIP APPLICATION CONFIRMATION

Application ID: ${applicationId}
Submission Date: ${new Date().toLocaleDateString()}

Your scholarship application has been successfully submitted and is under review.
You will receive email notifications at key stages of the review process.

For questions, contact: ${supportEmail} | ${supportPhone}

Thank you for applying to ${instName}.
    `;
    
    const blob = new Blob([confirmationText], { type: 'text/plain' });
    const url = window.URL?.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${instName.replace(/\s+/g, '-')}-Scholarship-Confirmation-${applicationId}.txt`;
    document.body?.appendChild(link);
    link?.click();
    document.body?.removeChild(link);
    window.URL?.revokeObjectURL(url);
  };

  const handleDashboard = () => {
    navigate('/application-dashboard');
  };

  const handleLogout = () => {
    navigate('/login');
  };

  return (
    <div className="bg-card border border-border rounded-lg p-4 md:p-6">
      <h3 className="text-lg md:text-xl lg:text-2xl font-heading font-semibold text-foreground mb-4 md:mb-6">
        Quick Actions
      </h3>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-4">
        <Button 
          variant="default" 
          fullWidth 
          onClick={handlePrint}
          iconName="Printer"
          iconPosition="left"
        >
          Print Confirmation
        </Button>
        
        <Button 
          variant="outline" 
          fullWidth 
          onClick={handleDownload}
          iconName="Download"
          iconPosition="left"
        >
          Download Details
        </Button>
        
        <Button 
          variant="secondary" 
          fullWidth 
          onClick={handleDashboard}
          iconName="LayoutDashboard"
          iconPosition="left"
        >
          View Dashboard
        </Button>
        
        <Button 
          variant="ghost" 
          fullWidth 
          onClick={handleLogout}
          iconName="LogOut"
          iconPosition="left"
        >
          Logout
        </Button>
      </div>
    </div>
  );
};

export default ActionButtons;