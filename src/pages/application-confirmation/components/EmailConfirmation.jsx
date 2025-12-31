import React from 'react';
import Icon from '../../../components/AppIcon';

const EmailConfirmation = ({ emailStatus, recipientEmail }) => {
  return (
    <div className={`border-2 rounded-lg p-4 md:p-6 ${
      emailStatus === 'sent' ?'bg-success/10 border-success' :'bg-warning/10 border-warning'
    }`}>
      <div className="flex items-start gap-3 md:gap-4">
        <div className={`w-10 h-10 md:w-12 md:h-12 rounded-full flex items-center justify-center flex-shrink-0 ${
          emailStatus === 'sent' ?'bg-success text-success-foreground' :'bg-warning text-warning-foreground'
        }`}>
          <Icon 
            name={emailStatus === 'sent' ? 'Mail' : 'AlertCircle'} 
            size={20} 
            className="md:w-6 md:h-6"
          />
        </div>
        
        <div className="flex-1">
          <h3 className={`text-base md:text-lg lg:text-xl font-heading font-semibold mb-2 ${
            emailStatus === 'sent' ? 'text-success' : 'text-warning'
          }`}>
            {emailStatus === 'sent' ?'Confirmation Email Sent' :'Email Pending'}
          </h3>
          
          <p className="text-sm md:text-base text-foreground leading-relaxed mb-2">
            {emailStatus === 'sent' 
              ? `A confirmation email has been sent to ${recipientEmail}. Please check your inbox and spam folder.`
              : `Your confirmation email is being processed and will be sent to ${recipientEmail} shortly.`}
          </p>
          
          <div className="flex items-center gap-2 text-xs md:text-sm text-muted-foreground">
            <Icon name="Info" size={14} className="md:w-4 md:h-4" />
            <span>Keep this email for your records</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmailConfirmation;