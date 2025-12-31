import React from 'react';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';
import { Checkbox } from '../../../components/ui/Checkbox';
import Icon from '../../../components/AppIcon';

const FinancialSection = ({ formData, errors, handleInputChange, handleSelectChange }) => {
  const householdSizeOptions = [
    { value: '1', label: '1 person' },
    { value: '2', label: '2 people' },
    { value: '3', label: '3 people' },
    { value: '4', label: '4 people' },
    { value: '5', label: '5 people' },
    { value: '6', label: '6 people' },
    { value: '7', label: '7+ people' }
  ];

  const incomeRangeOptions = [
    { value: 'under_25k', label: 'Under $25,000' },
    { value: '25k_50k', label: '$25,000 - $50,000' },
    { value: '50k_75k', label: '$50,000 - $75,000' },
    { value: '75k_100k', label: '$75,000 - $100,000' },
    { value: '100k_150k', label: '$100,000 - $150,000' },
    { value: 'over_150k', label: 'Over $150,000' }
  ];

  const maskSSN = (value) => {
    if (!value) return '';
    const cleaned = value?.replace(/\D/g, '');
    if (cleaned?.length <= 5) return cleaned;
    return 'XXX-XX-' + cleaned?.slice(-4);
  };

  return (
    <div className="space-y-6 md:space-y-8">
      <div>
        <h3 className="text-xl md:text-2xl font-heading font-semibold text-foreground mb-4 md:mb-6">
          Financial Information
        </h3>
        <p className="text-sm md:text-base text-muted-foreground mb-6 md:mb-8">
          This information helps us determine your financial need and scholarship eligibility. All data is kept confidential.
        </p>
      </div>
      <div className="bg-primary/5 border border-primary/20 rounded-lg p-4 md:p-6">
        <div className="flex items-start gap-3">
          <Icon name="Lock" size={20} color="var(--color-primary)" className="flex-shrink-0 mt-1" />
          <div>
            <p className="text-sm md:text-base font-medium text-foreground mb-1">
              Secure & Confidential
            </p>
            <p className="text-xs md:text-sm text-muted-foreground">
              Your financial information is encrypted and only accessible to authorized scholarship committee members.
            </p>
          </div>
        </div>
      </div>
      <div className="border-t border-border pt-6 md:pt-8">
        <h4 className="text-lg md:text-xl font-heading font-semibold text-foreground mb-4 md:mb-6">
          FAFSA Information
        </h4>

        <div className="bg-accent/10 border border-accent rounded-lg p-4 md:p-6 mb-6">
          <div className="flex items-start gap-3">
            <Icon name="AlertCircle" size={20} color="var(--color-accent)" className="flex-shrink-0 mt-1" />
            <div>
              <p className="text-sm md:text-base font-semibold text-foreground mb-2">
                ℹ️ Important: Wait for Your Scholarship Decision
              </p>
              <p className="text-xs md:text-sm text-muted-foreground mb-3">
                If you haven't applied for FAFSA yet, <strong>we recommend waiting</strong> until you receive your scholarship confirmation letter from the university. Here's why:
              </p>
              <ul className="text-xs md:text-sm text-muted-foreground space-y-1 list-disc list-inside">
                <li>Your scholarship award amount will be included in the confirmation email</li>
                <li>You can use this information when filling out FAFSA</li>
                <li>This helps ensure your financial aid package is optimized</li>
                <li>The confirmation will contain all details needed for FAFSA</li>
              </ul>
              <p className="text-xs md:text-sm text-muted-foreground mt-3">
                Once you receive your scholarship confirmation email, use the school's information and your award details to complete your FAFSA application.
              </p>
            </div>
          </div>
        </div>

        <div className="space-y-4 md:space-y-6">
          <Checkbox
            label="I have completed the FAFSA"
            description="Free Application for Federal Student Aid"
            checked={formData?.fafsaCompleted}
            onChange={(e) => handleSelectChange('fafsaCompleted', e?.target?.checked)}
          />

          {formData?.fafsaCompleted && (
            <>
              <Input
                label="FAFSA Confirmation Number"
                type="text"
                name="fafsaConfirmation"
                placeholder="Enter confirmation number from FAFSA receipt"
                value={formData?.fafsaConfirmation}
                onChange={handleInputChange}
                error={errors?.fafsaConfirmation}
                required
              />

              <Input
                label="Expected Family Contribution (EFC)"
                type="number"
                name="efc"
                placeholder="5000"
                description="Amount in USD from your FAFSA results"
                value={formData?.efc}
                onChange={handleInputChange}
                error={errors?.efc}
                required
              />

              <div className="bg-success/5 border border-success/20 rounded-lg p-3 md:p-4">
                <p className="text-xs md:text-sm text-muted-foreground">
                  <Icon name="CheckCircle" size={16} color="var(--color-success)" className="inline mr-2" />
                  Thank you for completing your FAFSA. This information helps us determine your financial need and finalize your scholarship award.
                </p>
              </div>
            </>
          )}

          {!formData?.fafsaCompleted && (
            <div className="bg-warning/5 border border-warning/20 rounded-lg p-3 md:p-4">
              <p className="text-xs md:text-sm text-muted-foreground">
                <Icon name="Clock" size={16} color="var(--color-warning)" className="inline mr-2" />
                Not required to submit this application, but you can complete it after receiving your scholarship decision email.
              </p>
            </div>
          )}
        </div>
      </div>
      <div className="border-t border-border pt-6 md:pt-8">
        <h4 className="text-lg md:text-xl font-heading font-semibold text-foreground mb-4 md:mb-6">
          Household Information
        </h4>

        <div className="space-y-4 md:space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
            <Select
              label="Household Size"
              options={householdSizeOptions}
              value={formData?.householdSize}
              onChange={(value) => handleSelectChange('householdSize', value)}
              error={errors?.householdSize}
              required
            />

            <Input
              label="Number in College"
              type="number"
              name="numberInCollege"
              placeholder="1"
              description="Including yourself"
              value={formData?.numberInCollege}
              onChange={handleInputChange}
              error={errors?.numberInCollege}
              min="1"
              required
            />
          </div>

          <Select
            label="Annual Household Income"
            options={incomeRangeOptions}
            value={formData?.householdIncome}
            onChange={(value) => handleSelectChange('householdIncome', value)}
            error={errors?.householdIncome}
            required
          />
        </div>
      </div>
      <div className="border-t border-border pt-6 md:pt-8">
        <h4 className="text-lg md:text-xl font-heading font-semibold text-foreground mb-4 md:mb-6">
          Current Financial Aid
        </h4>

        <div className="space-y-4 md:space-y-6">
          <Checkbox
            label="I am currently receiving financial aid"
            checked={formData?.receivingAid}
            onChange={(e) => handleSelectChange('receivingAid', e?.target?.checked)}
          />

          {formData?.receivingAid && (
            <div className="space-y-4 md:space-y-6 pl-0 md:pl-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                <Input
                  label="Federal Grants"
                  type="number"
                  name="federalGrants"
                  placeholder="0"
                  description="Annual amount in USD"
                  value={formData?.federalGrants}
                  onChange={handleInputChange}
                  min="0"
                />

                <Input
                  label="State Grants"
                  type="number"
                  name="stateGrants"
                  placeholder="0"
                  description="Annual amount in USD"
                  value={formData?.stateGrants}
                  onChange={handleInputChange}
                  min="0"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                <Input
                  label="Institutional Scholarships"
                  type="number"
                  name="institutionalScholarships"
                  placeholder="0"
                  description="Annual amount in USD"
                  value={formData?.institutionalScholarships}
                  onChange={handleInputChange}
                  min="0"
                />

                <Input
                  label="Private Scholarships"
                  type="number"
                  name="privateScholarships"
                  placeholder="0"
                  description="Annual amount in USD"
                  value={formData?.privateScholarships}
                  onChange={handleInputChange}
                  min="0"
                />
              </div>

              <Input
                label="Student Loans"
                type="number"
                name="studentLoans"
                placeholder="0"
                description="Annual amount in USD"
                value={formData?.studentLoans}
                onChange={handleInputChange}
                min="0"
              />
            </div>
          )}
        </div>
      </div>
      <div className="border-t border-border pt-6 md:pt-8">
        <h4 className="text-lg md:text-xl font-heading font-semibold text-foreground mb-4 md:mb-6">
          Special Circumstances
        </h4>

        <Input
          label="Describe Any Special Financial Circumstances"
          type="text"
          name="specialCircumstances"
          placeholder="Recent job loss, medical expenses, family hardship, etc. (optional)"
          description="This information may be considered in scholarship decisions"
          value={formData?.specialCircumstances}
          onChange={handleInputChange}
        />
      </div>
      <div className="bg-warning/10 border border-warning rounded-lg p-4 md:p-6">
        <div className="flex items-start gap-3">
          <Icon name="AlertCircle" size={20} color="var(--color-warning)" className="flex-shrink-0 mt-1" />
          <div>
            <p className="text-sm md:text-base font-medium text-foreground mb-1">
              Verification Required
            </p>
            <p className="text-xs md:text-sm text-muted-foreground">
              You may be asked to provide documentation to verify the financial information provided in this application.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FinancialSection;