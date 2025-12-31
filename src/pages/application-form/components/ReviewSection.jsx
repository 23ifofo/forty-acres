import React from 'react';
import Icon from '../../../components/AppIcon';
import useSelectedUniversity from '../../../hooks/useSelectedUniversity';
import Button from '../../../components/ui/Button';
import { Checkbox } from '../../../components/ui/Checkbox';

const ReviewSection = ({ formData, errors, handleSelectChange, handleSubmit, isSubmitting }) => {
  const sections = [
    {
      title: 'Personal Information',
      icon: 'User',
      fields: [
        { label: 'Name', value: `${formData?.firstName} ${formData?.middleName} ${formData?.lastName}`?.trim() },
        { label: 'Date of Birth', value: formData?.dateOfBirth },
        { label: 'Email', value: formData?.email },
        { label: 'Phone', value: formData?.phone },
        { label: 'Address', value: `${formData?.streetAddress}, ${formData?.city}, ${formData?.state} ${formData?.zipCode}` },
        { label: 'Citizenship', value: formData?.citizenshipStatus }
      ]
    },
    {
      title: 'Academic Background',
      icon: 'BookOpen',
      fields: [
        { label: 'Academic Level', value: formData?.academicLevel },
        { label: 'Intended Major', value: formData?.intendedMajor },
        { label: 'Current Institution', value: formData?.currentInstitution },
        { label: 'GPA', value: formData?.cumulativeGPA },
        { label: 'Expected Graduation', value: formData?.expectedGraduation },
        { label: 'Transcript', value: formData?.transcriptFile ? formData?.transcriptFile?.name : 'Not uploaded' }
      ]
    },
    {
      title: 'Financial Information',
      icon: 'DollarSign',
      fields: [
        { label: 'FAFSA Completed', value: formData?.fafsaCompleted ? 'Yes' : 'No' },
        { label: 'Household Size', value: formData?.householdSize },
        { label: 'Household Income', value: formData?.householdIncome },
        { label: 'Receiving Aid', value: formData?.receivingAid ? 'Yes' : 'No' }
      ]
    },
    {
      title: 'Essays',
      icon: 'FileText',
      fields: [
        { label: 'Essay 1 Word Count', value: `${formData?.essay1?.trim()?.split(/\s+/)?.filter(w => w?.length > 0)?.length || 0} words` },
        { label: 'Essay 2 Word Count', value: `${formData?.essay2?.trim()?.split(/\s+/)?.filter(w => w?.length > 0)?.length || 0} words` }
      ]
    }
  ];

  const selectedUniversity = useSelectedUniversity();
  const institutionName = selectedUniversity?.name || 'the university';

  const isComplete = () => {
    return formData?.firstName && 
           formData?.lastName && 
           formData?.email && 
           formData?.cumulativeGPA && 
           formData?.essay1 && 
           formData?.essay2 &&
           formData?.termsAccepted &&
           formData?.certificationAccepted;
  };

  return (
    <div className="space-y-6 md:space-y-8">
      <div>
        <h3 className="text-xl md:text-2xl font-heading font-semibold text-foreground mb-4 md:mb-6">
          Review & Submit
        </h3>
        <p className="text-sm md:text-base text-muted-foreground mb-6 md:mb-8">
          Please review all information carefully before submitting your application. You can go back to any section to make changes.
        </p>
      </div>
      <div className="space-y-4 md:space-y-6">
        {sections?.map((section, index) => (
          <div key={index} className="bg-card border border-border rounded-lg p-4 md:p-6">
            <div className="flex items-center gap-3 mb-4 md:mb-6">
              <div className="w-10 h-10 md:w-12 md:h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                <Icon name={section?.icon} size={24} color="var(--color-primary)" />
              </div>
              <h4 className="text-lg md:text-xl font-heading font-semibold text-foreground">
                {section?.title}
              </h4>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4">
              {section?.fields?.map((field, fieldIndex) => (
                <div key={fieldIndex} className="space-y-1">
                  <p className="text-xs md:text-sm font-caption text-muted-foreground">
                    {field?.label}
                  </p>
                  <p className="text-sm md:text-base font-medium text-foreground">
                    {field?.value || 'Not provided'}
                  </p>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
      <div className="border-t border-border pt-6 md:pt-8">
        <h4 className="text-lg md:text-xl font-heading font-semibold text-foreground mb-4 md:mb-6">
          Certification & Agreement
        </h4>

        <div className="space-y-4 md:space-y-6">
          <div className="bg-muted rounded-lg p-4 md:p-6">
            <p className="text-sm md:text-base text-foreground mb-4">
              By submitting this application, I certify that:
            </p>
            <ul className="text-xs md:text-sm text-muted-foreground space-y-2 list-disc list-inside">
              <li>All information provided is true, complete, and accurate to the best of my knowledge</li>
              <li>I understand that false or misleading information may result in denial or revocation of scholarship</li>
              <li>I authorize {institutionName} to verify the information provided</li>
              <li>I have read and agree to the scholarship terms and conditions</li>
              <li>I consent to the use of my information for scholarship evaluation purposes</li>
            </ul>
          </div>

          <Checkbox
            label="I certify that all information provided is accurate and complete"
            description="Required to submit application"
            checked={formData?.certificationAccepted}
            onChange={(e) => handleSelectChange('certificationAccepted', e?.target?.checked)}
            error={errors?.certificationAccepted}
            required
          />

          <Checkbox
            label="I agree to the Terms and Conditions and Privacy Policy"
            description="Required to submit application"
            checked={formData?.termsAccepted}
            onChange={(e) => handleSelectChange('termsAccepted', e?.target?.checked)}
            error={errors?.termsAccepted}
            required
          />
        </div>
      </div>
      {!isComplete() && (
        <div className="bg-warning/10 border border-warning rounded-lg p-4 md:p-6">
          <div className="flex items-start gap-3">
            <Icon name="AlertCircle" size={20} color="var(--color-warning)" className="flex-shrink-0 mt-1" />
            <div>
              <p className="text-sm md:text-base font-medium text-foreground mb-1">
                Application Incomplete
              </p>
              <p className="text-xs md:text-sm text-muted-foreground">
                Please complete all required sections and accept the terms before submitting.
              </p>
            </div>
          </div>
        </div>
      )}
      <div className="flex flex-col sm:flex-row gap-3 md:gap-4 pt-4 md:pt-6">
        <Button
          variant="outline"
          fullWidth
          iconName="Save"
          iconPosition="left"
          disabled={isSubmitting}
        >
          Save Draft
        </Button>
        <Button
          variant="default"
          fullWidth
          onClick={handleSubmit}
          loading={isSubmitting}
          disabled={!isComplete() || isSubmitting}
          iconName="Send"
          iconPosition="right"
        >
          Submit Application
        </Button>
      </div>
      <div className="bg-success/10 border border-success rounded-lg p-4 md:p-6">
        <div className="flex items-start gap-3">
          <Icon name="Info" size={20} color="var(--color-success)" className="flex-shrink-0 mt-1" />
          <div>
            <p className="text-sm md:text-base font-medium text-foreground mb-1">
              What Happens Next?
            </p>
            <ul className="text-xs md:text-sm text-muted-foreground space-y-1">
              <li>• You'll receive an email confirmation with your application ID</li>
              <li>• Applications are reviewed on a rolling basis</li>
              <li>• You'll be notified of the decision within 4-6 weeks</li>
              <li>• You can track your application status in the dashboard</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReviewSection;