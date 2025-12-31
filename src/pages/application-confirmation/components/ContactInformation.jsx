import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const ContactInformation = ({ contactDetails }) => {
  return (
    <div className="bg-card border border-border rounded-lg overflow-hidden">
      <div className="bg-secondary/5 border-b border-border p-4 md:p-6">
        <div className="flex items-center gap-3">
          <Icon name="Phone" size={24} color="var(--color-secondary)" className="md:w-7 md:h-7" />
          <h2 className="text-xl md:text-2xl lg:text-3xl font-heading font-semibold text-foreground">
            Contact Information
          </h2>
        </div>
      </div>
      <div className="p-4 md:p-6 space-y-4 md:space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
          <div className="flex items-start gap-3 md:gap-4 p-4 bg-muted/30 rounded-md">
            <div className="w-10 h-10 md:w-12 md:h-12 bg-primary/10 rounded-md flex items-center justify-center flex-shrink-0">
              <Icon name="Phone" size={20} color="var(--color-primary)" className="md:w-6 md:h-6" />
            </div>
            <div>
              <p className="text-xs md:text-sm font-caption text-muted-foreground mb-1">Phone</p>
              <p className="text-base md:text-lg font-medium text-foreground">{contactDetails?.phone}</p>
            </div>
          </div>

          <div className="flex items-start gap-3 md:gap-4 p-4 bg-muted/30 rounded-md">
            <div className="w-10 h-10 md:w-12 md:h-12 bg-primary/10 rounded-md flex items-center justify-center flex-shrink-0">
              <Icon name="Mail" size={20} color="var(--color-primary)" className="md:w-6 md:h-6" />
            </div>
            <div>
              <p className="text-xs md:text-sm font-caption text-muted-foreground mb-1">Email</p>
              <p className="text-base md:text-lg font-medium text-foreground break-all">{contactDetails?.email}</p>
            </div>
          </div>

          <div className="flex items-start gap-3 md:gap-4 p-4 bg-muted/30 rounded-md">
            <div className="w-10 h-10 md:w-12 md:h-12 bg-primary/10 rounded-md flex items-center justify-center flex-shrink-0">
              <Icon name="MapPin" size={20} color="var(--color-primary)" className="md:w-6 md:h-6" />
            </div>
            <div>
              <p className="text-xs md:text-sm font-caption text-muted-foreground mb-1">Office Location</p>
              <p className="text-base md:text-lg font-medium text-foreground">{contactDetails?.location}</p>
            </div>
          </div>

          <div className="flex items-start gap-3 md:gap-4 p-4 bg-muted/30 rounded-md">
            <div className="w-10 h-10 md:w-12 md:h-12 bg-primary/10 rounded-md flex items-center justify-center flex-shrink-0">
              <Icon name="Clock" size={20} color="var(--color-primary)" className="md:w-6 md:h-6" />
            </div>
            <div>
              <p className="text-xs md:text-sm font-caption text-muted-foreground mb-1">Office Hours</p>
              <p className="text-base md:text-lg font-medium text-foreground">{contactDetails?.hours}</p>
            </div>
          </div>
        </div>

        <div className="bg-accent/10 border border-accent/30 rounded-md p-4 md:p-6">
          <div className="flex items-start gap-3 md:gap-4">
            <Icon name="Info" size={20} color="var(--color-accent)" className="flex-shrink-0 mt-1 md:w-6 md:h-6" />
            <div className="flex-1">
              <p className="text-sm md:text-base text-foreground leading-relaxed">
                For urgent inquiries or questions about your application, please contact our scholarship office during business hours. We typically respond to emails within 1-2 business days.
              </p>
            </div>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 md:gap-4">
          <Button 
            variant="outline" 
            fullWidth 
            iconName="Phone"
            iconPosition="left"
            className="sm:flex-1"
          >
            Call Office
          </Button>
          <Button 
            variant="outline" 
            fullWidth 
            iconName="Mail"
            iconPosition="left"
            className="sm:flex-1"
          >
            Send Email
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ContactInformation;