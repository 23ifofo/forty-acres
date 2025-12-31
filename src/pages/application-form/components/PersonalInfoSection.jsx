import React, { useState, useEffect } from 'react';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';
import { Checkbox } from '../../../components/ui/Checkbox';
import useSelectedUniversity from '../../../hooks/useSelectedUniversity';

const PersonalInfoSection = ({ formData, errors, handleInputChange, handleSelectChange }) => {
  const selectedUniversity = useSelectedUniversity();
  const uniName = selectedUniversity?.name || 'your university';
  const uniEmailDomain = selectedUniversity?.email?.split('@')?.[1] || 'example.edu';

  const applicantTypeOptions = [
    { value: 'new_first_year', label: 'New Student - Joining First Year' },
    { value: 'transfer', label: 'Transfer Student - From Another University' },
    { value: 'continuing', label: `Continuing Student - Already at ${uniName}` }
  ];

  const citizenshipOptions = [
    { value: 'us_citizen', label: 'U.S. Citizen' },
    { value: 'permanent_resident', label: 'Permanent Resident' },
    { value: 'international', label: 'International Student' },
    { value: 'daca', label: 'DACA Recipient' }
  ];

  const genderOptions = [
    { value: 'male', label: 'Male' },
    { value: 'female', label: 'Female' },
    { value: 'non_binary', label: 'Non-Binary' },
    { value: 'prefer_not_to_say', label: 'Prefer Not to Say' }
  ];

  const ethnicityOptions = [
    { value: 'hispanic', label: 'Hispanic or Latino' },
    { value: 'white', label: 'White' },
    { value: 'black', label: 'Black or African American' },
    { value: 'asian', label: 'Asian' },
    { value: 'native_american', label: 'Native American or Alaska Native' },
    { value: 'pacific_islander', label: 'Native Hawaiian or Pacific Islander' },
    { value: 'two_or_more', label: 'Two or More Races' }
  ];

  const stateOptions = [
    { value: 'AL', label: 'Alabama' },
    { value: 'AK', label: 'Alaska' },
    { value: 'AZ', label: 'Arizona' },
    { value: 'AR', label: 'Arkansas' },
    { value: 'CA', label: 'California' },
    { value: 'CO', label: 'Colorado' },
    { value: 'CT', label: 'Connecticut' },
    { value: 'DE', label: 'Delaware' },
    { value: 'FL', label: 'Florida' },
    { value: 'GA', label: 'Georgia' },
    { value: 'LA', label: 'Louisiana' },
    { value: 'NY', label: 'New York' },
    { value: 'TX', label: 'Texas' }
  ];

  return (
    <div className="space-y-6 md:space-y-8">
      <div>
        <h3 className="text-xl md:text-2xl font-heading font-semibold text-foreground mb-4 md:mb-6">
          Personal Information
        </h3>
        <p className="text-sm md:text-base text-muted-foreground mb-6 md:mb-8">
          Please provide your complete legal name as it appears on official documents.
        </p>
      </div>

      <div className="bg-primary/5 border border-primary/20 rounded-lg p-4 md:p-6 mb-6">
        <h4 className="text-base md:text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
          <span className="text-primary">📋</span> Applicant Type
        </h4>
        <Select
          label="I am applying as"
          options={applicantTypeOptions}
          value={formData?.applicantType}
          onChange={(value) => handleSelectChange('applicantType', value)}
          error={errors?.applicantType}
          required
        />
        
        {formData?.applicantType === 'continuing' && (
          <div className="mt-4">
            <Input
              label={`${uniName} Email`}
              type="email"
              name="universityEmail"
              placeholder={`student@${uniEmailDomain}`}
              description={`Use your official ${uniName} email address`}
              value={formData?.universityEmail}
              onChange={handleInputChange}
              error={errors?.universityEmail}
              required
            />
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
        <Input
          label="Legal First Name"
          type="text"
          name="firstName"
          placeholder="Enter first name"
          value={formData?.firstName}
          onChange={handleInputChange}
          error={errors?.firstName}
          required
        />

        <Input
          label="Middle Name"
          type="text"
          name="middleName"
          placeholder="Enter middle name (optional)"
          value={formData?.middleName}
          onChange={handleInputChange}
        />

        <Input
          label="Legal Last Name"
          type="text"
          name="lastName"
          placeholder="Enter last name"
          value={formData?.lastName}
          onChange={handleInputChange}
          error={errors?.lastName}
          required
        />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
        <Input
          label="Date of Birth"
          type="date"
          name="dateOfBirth"
          value={formData?.dateOfBirth}
          onChange={handleInputChange}
          error={errors?.dateOfBirth}
          required
        />

        <Select
          label="Gender"
          options={genderOptions}
          value={formData?.gender}
          onChange={(value) => handleSelectChange('gender', value)}
          error={errors?.gender}
          required
        />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
        <Input
          label="Email Address"
          type="email"
          name="email"
          placeholder="student@example.com"
          description="We'll send your application confirmation here"
          value={formData?.email}
          onChange={handleInputChange}
          error={errors?.email}
          required
        />

        <Input
          label="Phone Number"
          type="tel"
          name="phone"
          placeholder="(504) 555-0123"
          value={formData?.phone}
          onChange={handleInputChange}
          error={errors?.phone}
          required
        />
      </div>
      <div className="border-t border-border pt-6 md:pt-8">
        <h4 className="text-lg md:text-xl font-heading font-semibold text-foreground mb-4 md:mb-6">
          Mailing Address
        </h4>

        <div className="space-y-4 md:space-y-6">
          <Input
            label="Street Address"
            type="text"
            name="streetAddress"
            placeholder="123 Main Street"
            value={formData?.streetAddress}
            onChange={handleInputChange}
            error={errors?.streetAddress}
            required
          />

          <Input
            label="Apartment/Unit Number"
            type="text"
            name="apartmentNumber"
            placeholder="Apt 4B (optional)"
            value={formData?.apartmentNumber}
            onChange={handleInputChange}
          />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
            <Input
              label="City"
              type="text"
              name="city"
              placeholder="New Orleans"
              value={formData?.city}
              onChange={handleInputChange}
              error={errors?.city}
              required
            />

            <Select
              label="State"
              options={stateOptions}
              value={formData?.state}
              onChange={(value) => handleSelectChange('state', value)}
              error={errors?.state}
              required
            />

            <Input
              label="ZIP Code"
              type="text"
              name="zipCode"
              placeholder="70118"
              value={formData?.zipCode}
              onChange={handleInputChange}
              error={errors?.zipCode}
              required
            />
          </div>
        </div>
      </div>
      <div className="border-t border-border pt-6 md:pt-8">
        <h4 className="text-lg md:text-xl font-heading font-semibold text-foreground mb-4 md:mb-6">
          Demographics & Citizenship
        </h4>

        <div className="space-y-4 md:space-y-6">
          <Select
            label="Citizenship Status"
            options={citizenshipOptions}
            value={formData?.citizenshipStatus}
            onChange={(value) => handleSelectChange('citizenshipStatus', value)}
            error={errors?.citizenshipStatus}
            required
          />

          {formData?.citizenshipStatus === 'us_citizen' && (
            <SSNInput
              value={formData?.ssn}
              onChange={(raw) => handleInputChange({ target: { name: 'ssn', value: raw } })}
              error={errors?.ssn}
            />
          )}

          {formData?.citizenshipStatus && formData?.citizenshipStatus !== 'us_citizen' && (
            <div className="space-y-2">
              <Select
                label="Alternate ID Type"
                options={[
                  { value: 'passport', label: 'Passport Number' },
                  { value: 'national_id', label: 'National ID / National Insurance' },
                  { value: 'student_id', label: 'Intended University Student ID' },
                  { value: 'na', label: 'Not applicable' }
                ]}
                value={formData?.altIdType}
                onChange={(v) => handleSelectChange('altIdType', v)}
              />

              {formData?.altIdType && formData?.altIdType !== 'na' && (
                <Input
                  label="Alternate ID Number"
                  type="text"
                  name="altIdValue"
                  placeholder={formData?.altIdType === 'passport' ? 'Passport number' : formData?.altIdType === 'student_id' ? 'Student ID' : 'National ID'}
                  value={formData?.altIdValue}
                  onChange={handleInputChange}
                />
              )}

              {formData?.altIdType === 'na' && (
                <p className="text-xs text-muted-foreground">You selected Not applicable; no ID is required.</p>
              )}
            </div>
          )}

          {formData?.citizenshipStatus === 'international' && (
            <Input
              label="Country of Citizenship"
              type="text"
              name="countryOfCitizenship"
              placeholder="Enter country name"
              value={formData?.countryOfCitizenship}
              onChange={handleInputChange}
              error={errors?.countryOfCitizenship}
              required
            />
          )}

          <Select
            label="Ethnicity"
            options={ethnicityOptions}
            value={formData?.ethnicity}
            onChange={(value) => handleSelectChange('ethnicity', value)}
            error={errors?.ethnicity}
            required
          />

          <Checkbox
            label="I am a first-generation college student"
            description="Neither parent/guardian completed a four-year college degree"
            checked={formData?.firstGeneration}
            onChange={(e) => handleSelectChange('firstGeneration', e?.target?.checked)}
          />
        </div>
      </div>
      <div className="border-t border-border pt-6 md:pt-8">
        <h4 className="text-lg md:text-xl font-heading font-semibold text-foreground mb-4 md:mb-6">
          Emergency Contact
        </h4>

        <div className="space-y-4 md:space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
            <Input
              label="Contact Name"
              type="text"
              name="emergencyContactName"
              placeholder="Full name"
              value={formData?.emergencyContactName}
              onChange={handleInputChange}
              error={errors?.emergencyContactName}
              required
            />

            <Input
              label="Relationship"
              type="text"
              name="emergencyContactRelationship"
              placeholder="Parent, Guardian, Spouse, etc."
              value={formData?.emergencyContactRelationship}
              onChange={handleInputChange}
              error={errors?.emergencyContactRelationship}
              required
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
            <Input
              label="Contact Phone"
              type="tel"
              name="emergencyContactPhone"
              placeholder="(504) 555-0123"
              value={formData?.emergencyContactPhone}
              onChange={handleInputChange}
              error={errors?.emergencyContactPhone}
              required
            />

            <Input
              label="Contact Email"
              type="email"
              name="emergencyContactEmail"
              placeholder="contact@example.com"
              value={formData?.emergencyContactEmail}
              onChange={handleInputChange}
              error={errors?.emergencyContactEmail}
              required
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PersonalInfoSection;

// SSNInput component: store raw SSN but mask digits immediately as user types
function SSNInput({ value, onChange, error }) {
  function onlyDigits(str) {
    return (str || '').toString().replace(/\D/g, '');
  }

  // Build a masked display that replaces entered digits with '*' but preserves dashes
  function formatMasked(raw) {
    const d = onlyDigits(raw);
    if (!d) return '';
    const parts = [];
    // first 3
    const p1 = d.slice(0, 3);
    if (p1.length) parts.push('*'.repeat(p1.length));
    // next 2
    const p2 = d.slice(3, 5);
    if (p2.length) parts.push('*'.repeat(p2.length));
    // last 4
    const p3 = d.slice(5, 9);
    if (p3.length) parts.push('*'.repeat(p3.length));

    // join with dashes where appropriate depending on how much was entered
    if (d.length <= 3) return parts.join('');
    if (d.length <= 5) return parts.slice(0,2).join('-');
    return parts.slice(0,3).join('-');
  }

  const handleInput = (e) => {
    const typed = e?.target?.value || '';
    const digits = onlyDigits(typed);
    // limit to 9 digits for SSN
    const limited = digits.slice(0, 9);
    // update raw value to parent (keep full digits)
    onChange(limited);
  };
  // use password input so browser masks while user types; value prop contains raw digits
  return (
    <div>
      <label className="block text-sm font-medium text-foreground mb-1">Social Security Number</label>
      <input
        type="password"
        inputMode="numeric"
        name="ssn"
        placeholder="XXX-XX-XXXX"
        value={value || ''}
        onChange={handleInput}
        className="input-base w-full"
        aria-invalid={!!error}
        maxLength={11}
      />
      <p className="text-xs text-muted-foreground mt-1">Enter your full SSN; it will be masked for privacy.</p>
      {error && <p className="text-sm text-error mt-1">{error}</p>}
    </div>
  );
}