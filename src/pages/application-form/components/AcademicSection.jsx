import React from 'react';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const AcademicSection = ({ formData, errors, handleInputChange, handleSelectChange, handleFileUpload }) => {
  const academicLevelOptions = [
    { value: 'high_school_senior', label: 'High School Senior' },
    { value: 'undergraduate_freshman', label: 'Undergraduate - Freshman' },
    { value: 'undergraduate_sophomore', label: 'Undergraduate - Sophomore' },
    { value: 'undergraduate_junior', label: 'Undergraduate - Junior' },
    { value: 'undergraduate_senior', label: 'Undergraduate - Senior' },
    { value: 'graduate_masters', label: 'Graduate - Master\'s Program' },
    { value: 'graduate_doctoral', label: 'Graduate - Doctoral Program' }
  ];

  const majorOptions = [
    { value: 'business', label: 'Business Administration' },
    { value: 'biology', label: 'Biology' },
    { value: 'chemistry', label: 'Chemistry' },
    { value: 'computer_science', label: 'Computer Science' },
    { value: 'english', label: 'English' },
    { value: 'history', label: 'History' },
    { value: 'music', label: 'Music' },
    { value: 'nursing', label: 'Nursing' },
    { value: 'psychology', label: 'Psychology' },
    { value: 'theology', label: 'Theology' },
    { value: 'undecided', label: 'Undecided' }
  ];

  const enrollmentStatusOptions = [
    { value: 'full_time', label: 'Full-Time (12+ credits)' },
    { value: 'part_time', label: 'Part-Time (6-11 credits)' }
  ];

  const calculateGPA = () => {
    const gpa = parseFloat(formData?.cumulativeGPA);
    if (isNaN(gpa) || gpa < 0 || gpa > 4.0) return null;
    return gpa?.toFixed(2);
  };

  return (
    <div className="space-y-6 md:space-y-8">
      <div>
        <h3 className="text-xl md:text-2xl font-heading font-semibold text-foreground mb-4 md:mb-6">
          Academic Background
        </h3>
        <p className="text-sm md:text-base text-muted-foreground mb-6 md:mb-8">
          Provide details about your current academic standing and educational history.
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
        <Select
          label="Current Academic Level"
          options={academicLevelOptions}
          value={formData?.academicLevel}
          onChange={(value) => handleSelectChange('academicLevel', value)}
          error={errors?.academicLevel}
          required
        />

        <Select
          label="Intended Major"
          options={majorOptions}
          value={formData?.intendedMajor}
          onChange={(value) => handleSelectChange('intendedMajor', value)}
          error={errors?.intendedMajor}
          searchable
          required
        />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
        <Select
          label="Enrollment Status"
          options={enrollmentStatusOptions}
          value={formData?.enrollmentStatus}
          onChange={(value) => handleSelectChange('enrollmentStatus', value)}
          error={errors?.enrollmentStatus}
          required
        />

        <Input
          label="Expected Graduation Date"
          type="date"
          name="expectedGraduation"
          value={formData?.expectedGraduation}
          onChange={handleInputChange}
          error={errors?.expectedGraduation}
          required
        />
      </div>
      <div className="border-t border-border pt-6 md:pt-8">
        <h4 className="text-lg md:text-xl font-heading font-semibold text-foreground mb-4 md:mb-6">
          Current Institution
        </h4>

        <div className="space-y-4 md:space-y-6">
          <Input
            label="High School / College Name"
            type="text"
            name="currentInstitution"
            placeholder="Enter institution name"
            value={formData?.currentInstitution}
            onChange={handleInputChange}
            error={errors?.currentInstitution}
            required
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
            <Input
              label="Institution City"
              type="text"
              name="institutionCity"
              placeholder="City name"
              value={formData?.institutionCity}
              onChange={handleInputChange}
              error={errors?.institutionCity}
              required
            />

            <Input
              label="Institution State"
              type="text"
              name="institutionState"
              placeholder="State"
              value={formData?.institutionState}
              onChange={handleInputChange}
              error={errors?.institutionState}
              required
            />
          </div>
        </div>
      </div>
      <div className="border-t border-border pt-6 md:pt-8">
        <h4 className="text-lg md:text-xl font-heading font-semibold text-foreground mb-4 md:mb-6">
          Academic Performance
        </h4>

        <div className="space-y-4 md:space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
            <Input
              label="Cumulative GPA"
              type="number"
              name="cumulativeGPA"
              placeholder="3.75"
              description="On a 4.0 scale"
              value={formData?.cumulativeGPA}
              onChange={handleInputChange}
              error={errors?.cumulativeGPA}
              min="0"
              max="4.0"
              step="0.01"
              required
            />

            <Input
              label="Class Rank"
              type="text"
              name="classRank"
              placeholder="15 of 250 (optional)"
              description="If available"
              value={formData?.classRank}
              onChange={handleInputChange}
            />
          </div>

          {calculateGPA() && (
            <div className="bg-success/10 border border-success rounded-lg p-4 md:p-6">
              <div className="flex items-center gap-3">
                <Icon name="CheckCircle" size={24} color="var(--color-success)" />
                <div>
                  <p className="text-sm font-caption text-muted-foreground">
                    Calculated GPA
                  </p>
                  <p className="text-2xl md:text-3xl font-heading font-bold text-success">
                    {calculateGPA()}
                  </p>
                </div>
              </div>
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
            <Input
              label="SAT Score"
              type="number"
              name="satScore"
              placeholder="1450 (optional)"
              description="Total score out of 1600"
              value={formData?.satScore}
              onChange={handleInputChange}
              min="400"
              max="1600"
            />

            <Input
              label="ACT Score"
              type="number"
              name="actScore"
              placeholder="32 (optional)"
              description="Composite score out of 36"
              value={formData?.actScore}
              onChange={handleInputChange}
              min="1"
              max="36"
            />
          </div>
        </div>
      </div>
      <div className="border-t border-border pt-6 md:pt-8">
        <h4 className="text-lg md:text-xl font-heading font-semibold text-foreground mb-4 md:mb-6">
          Academic Honors & Awards
        </h4>

        <Input
          label="List Academic Honors"
          type="text"
          name="academicHonors"
          placeholder="Dean's List, Honor Roll, National Merit Scholar, etc."
          description="Separate multiple honors with commas"
          value={formData?.academicHonors}
          onChange={handleInputChange}
        />
      </div>
      <div className="border-t border-border pt-6 md:pt-8">
        <h4 className="text-lg md:text-xl font-heading font-semibold text-foreground mb-4 md:mb-6">
          Official Transcript Upload
        </h4>

        <div className="bg-muted border-2 border-dashed border-border rounded-lg p-6 md:p-8">
          <div className="flex flex-col items-center text-center space-y-4">
            <div className="w-16 h-16 md:w-20 md:h-20 bg-primary/10 rounded-full flex items-center justify-center">
              <Icon name="Upload" size={32} color="var(--color-primary)" />
            </div>
            <div>
              <p className="text-base md:text-lg font-medium text-foreground mb-2">
                Upload Official Transcript
              </p>
              <p className="text-sm md:text-base text-muted-foreground mb-4">
                PDF format only, maximum 10MB — optional. If you don't have your transcript available now you may present it during admission or when reporting — you may continue to the next section without uploading.
              </p>
            </div>
            <input
              type="file"
              id="transcript"
              name="transcript"
              accept=".pdf"
              onChange={(e) => handleFileUpload('transcript', e?.target?.files?.[0])}
              className="hidden"
            />
            <Button
              variant="outline"
              onClick={() => document.getElementById('transcript')?.click()}
              iconName="FileText"
              iconPosition="left"
            >
              Select File
            </Button>
            {formData?.transcriptFile && (
              <div className="flex items-center gap-2 bg-success/10 text-success px-4 py-2 rounded-md">
                <Icon name="CheckCircle" size={16} />
                <span className="text-sm font-medium">{formData?.transcriptFile?.name}</span>
              </div>
            )}
            {errors?.transcript && (
              <p className="text-sm text-error">{errors?.transcript}</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AcademicSection;