import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import Header from '../../components/ui/Header';
import { supabase } from '../../lib/supabaseClient';
import { mapFormDataToDatabase } from '../../utils/formToDatabase';
import ProgressNavigationBar from '../../components/ui/ProgressNavigationBar';
import ApplicationStatusWidget from '../../components/ui/ApplicationStatusWidget';
import DocumentStatusIndicator from '../../components/ui/DocumentStatusIndicator';
import CountdownTimer from '../../components/ui/CountdownTimer';
import PersonalInfoSection from './components/PersonalInfoSection';
import AcademicSection from './components/AcademicSection';
import FinancialSection from './components/FinancialSection';
import EssaySection from './components/EssaySection';
import ReviewSection from './components/ReviewSection';
import Button from '../../components/ui/Button';
import Icon from '../../components/AppIcon';
import universities from '../../config/universities.json';

const ApplicationForm = () => {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const [currentSection, setCurrentSection] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSaveNotification, setShowSaveNotification] = useState(false);
  const [selectedUniversity, setSelectedUniversity] = useState(null);

  const [formData, setFormData] = useState({
    applicantType: '',
    universityEmail: '',
    firstName: '',
    middleName: '',
    lastName: '',
    dateOfBirth: '',
    gender: '',
    email: '',
    phone: '',
    streetAddress: '',
    apartmentNumber: '',
    city: '',
    state: '',
    zipCode: '',
    citizenshipStatus: '',
    ssn: '',
    countryOfCitizenship: '',
    ethnicity: '',
    firstGeneration: false,
    emergencyContactName: '',
    emergencyContactRelationship: '',
    emergencyContactPhone: '',
    emergencyContactEmail: '',
    academicLevel: '',
    intendedMajor: '',
    enrollmentStatus: '',
    expectedGraduation: '',
    currentInstitution: '',
    institutionCity: '',
    institutionState: '',
    cumulativeGPA: '',
    classRank: '',
    satScore: '',
    actScore: '',
    academicHonors: '',
    transcriptFile: null,
    documents: [],
    totalRequiredDocuments: 5,
    pendingRecommendations: 0,
    fafsaCompleted: false,
    fafsaConfirmation: '',
    efc: '',
    householdSize: '',
    numberInCollege: '',
    householdIncome: '',
    receivingAid: false,
    federalGrants: '',
    stateGrants: '',
    institutionalScholarships: '',
    privateScholarships: '',
    studentLoans: '',
    specialCircumstances: '',
    essay1: '',
    essay2: '',
    certificationAccepted: false,
    termsAccepted: false
  });

  const [errors, setErrors] = useState({});

  const sections = [
    { id: 0, title: 'Personal Information', component: PersonalInfoSection },
    { id: 1, title: 'Academic Background', component: AcademicSection },
    { id: 2, title: 'Financial Information', component: FinancialSection },
    { id: 3, title: 'Essays', component: EssaySection },
    { id: 4, title: 'Review & Submit', component: ReviewSection }
  ];

  useEffect(() => {
    const sectionParam = searchParams?.get('section');
    if (sectionParam !== null) {
      const sectionId = parseInt(sectionParam);
      if (sectionId >= 0 && sectionId < sections?.length) {
        setCurrentSection(sectionId);
      }
    }
  }, [searchParams]);

  // Load university from query params
  useEffect(() => {
    const universitySlug = searchParams?.get('university');
    if (universitySlug) {
      const universityData = universities?.universities?.[universitySlug];
      if (universityData) {
        setSelectedUniversity({ slug: universitySlug, ...universityData });
        localStorage.setItem('selectedUniversity', JSON.stringify({ slug: universitySlug, ...universityData }));
      }
    } else {
      // Check if there's a previously selected university in localStorage
      const stored = localStorage.getItem('selectedUniversity');
      if (stored) {
        setSelectedUniversity(JSON.parse(stored));
      }
    }
  }, []);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentSection]);

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

  const handleSelectChange = (name, value) => {
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

  const handleFileUpload = (fieldName, file) => {
    if (file) {
      if (file?.size > 10 * 1024 * 1024) {
        setErrors(prev => ({
          ...prev,
          [fieldName]: 'File size must be less than 10MB'
        }));
        return;
      }
      if (!file?.type?.includes('pdf')) {
        setErrors(prev => ({
          ...prev,
          [fieldName]: 'Only PDF files are allowed'
        }));
        return;
      }
      setFormData(prev => {
        // update named file field (e.g., transcriptFile)
        const updated = {
          ...prev,
          [`${fieldName}File`]: file
        };

        // maintain documents array for dashboard counts
        const docs = Array.isArray(prev.documents) ? [...prev.documents] : [];
        const existingIndex = docs.findIndex(d => d?.name === `${fieldName}File` || d?.field === fieldName);
        const docEntry = { id: Date.now(), field: fieldName, name: file?.name, size: file?.size, uploadedAt: new Date().toISOString(), status: 'pending' };
        if (existingIndex >= 0) {
          docs[existingIndex] = docEntry;
        } else {
          docs.push(docEntry);
        }
        updated.documents = docs;
        return updated;
      });
      setErrors(prev => ({
        ...prev,
        [fieldName]: ''
      }));
    }
  };

  const validateSection = (sectionId) => {
    const newErrors = {};

    if (sectionId === 0) {
      if (!formData?.applicantType) newErrors.applicantType = 'Please select your applicant type';
      if (formData?.applicantType === 'continuing' && !formData?.universityEmail) {
        newErrors.universityEmail = 'University email is required for continuing students';
      }
      if (!formData?.firstName) newErrors.firstName = 'First name is required';
      if (!formData?.lastName) newErrors.lastName = 'Last name is required';
      if (!formData?.dateOfBirth) newErrors.dateOfBirth = 'Date of birth is required';
      if (!formData?.gender) newErrors.gender = 'Gender is required';
      if (!formData?.email) newErrors.email = 'Email is required';
      if (!formData?.phone) newErrors.phone = 'Phone number is required';
      if (!formData?.streetAddress) newErrors.streetAddress = 'Street address is required';
      if (!formData?.city) newErrors.city = 'City is required';
      if (!formData?.state) newErrors.state = 'State is required';
      if (!formData?.zipCode) newErrors.zipCode = 'ZIP code is required';
      if (!formData?.citizenshipStatus) newErrors.citizenshipStatus = 'Citizenship status is required';
      if (!formData?.ethnicity) newErrors.ethnicity = 'Ethnicity is required';
      if (!formData?.emergencyContactName) newErrors.emergencyContactName = 'Emergency contact name is required';
      if (!formData?.emergencyContactRelationship) newErrors.emergencyContactRelationship = 'Relationship is required';
      if (!formData?.emergencyContactPhone) newErrors.emergencyContactPhone = 'Emergency contact phone is required';
      if (!formData?.emergencyContactEmail) newErrors.emergencyContactEmail = 'Emergency contact email is required';
    }

    if (sectionId === 1) {
      if (!formData?.academicLevel) newErrors.academicLevel = 'Academic level is required';
      if (!formData?.intendedMajor) newErrors.intendedMajor = 'Intended major is required';
      if (!formData?.enrollmentStatus) newErrors.enrollmentStatus = 'Enrollment status is required';
      if (!formData?.expectedGraduation) newErrors.expectedGraduation = 'Expected graduation date is required';
      if (!formData?.currentInstitution) newErrors.currentInstitution = 'Current institution is required';
      if (!formData?.institutionCity) newErrors.institutionCity = 'Institution city is required';
      if (!formData?.institutionState) newErrors.institutionState = 'Institution state is required';
      if (!formData?.cumulativeGPA) newErrors.cumulativeGPA = 'GPA is required';
      // Transcript is optional now; do not require it here
    }

    if (sectionId === 2) {
      if (!formData?.householdSize) newErrors.householdSize = 'Household size is required';
      if (!formData?.numberInCollege) newErrors.numberInCollege = 'Number in college is required';
      if (!formData?.householdIncome) newErrors.householdIncome = 'Household income is required';
      if (formData?.fafsaCompleted) {
        if (!formData?.fafsaConfirmation) newErrors.fafsaConfirmation = 'FAFSA confirmation number is required';
        if (!formData?.efc) newErrors.efc = 'EFC is required';
      }
    }

    if (sectionId === 3) {
      const essay1WordCount = formData?.essay1?.trim()?.split(/\s+/)?.filter(w => w?.length > 0)?.length || 0;
      const essay2WordCount = formData?.essay2?.trim()?.split(/\s+/)?.filter(w => w?.length > 0)?.length || 0;

      // Requirement updated: essays should be short responses (under 100 words)
      if (essay1WordCount < 1) newErrors.essay1 = 'Essay 1 must contain at least one word';
      if (essay1WordCount > 100) newErrors.essay1 = 'Essay 1 must be fewer than 100 words';
      if (essay2WordCount < 1) newErrors.essay2 = 'Essay 2 must contain at least one word';
      if (essay2WordCount > 100) newErrors.essay2 = 'Essay 2 must be fewer than 100 words';
    }

    if (sectionId === 4) {
      if (!formData?.certificationAccepted) newErrors.certificationAccepted = 'You must certify the accuracy of your information';
      if (!formData?.termsAccepted) newErrors.termsAccepted = 'You must accept the terms and conditions';
    }

    setErrors(newErrors);
    return Object.keys(newErrors)?.length === 0;
  };

  const handleNext = () => {
    // Clear any leftover transcript-related errors so users can proceed without uploading
    setErrors(prev => {
      const { transcript, ...rest } = prev || {};
      return rest;
    });

    if (validateSection(currentSection)) {
      if (currentSection < sections?.length - 1) {
        const nextSection = currentSection + 1;
        setCurrentSection(nextSection);
        setSearchParams({ section: nextSection?.toString() });
        handleAutoSave();
      }
    }
  };

  const handlePrevious = () => {
    if (currentSection > 0) {
      const prevSection = currentSection - 1;
      setCurrentSection(prevSection);
      setSearchParams({ section: prevSection?.toString() });
    }
  };

  const handleAutoSave = () => {
    localStorage.setItem('scholarshipApplicationDraft', JSON.stringify(formData));
    setShowSaveNotification(true);
    setTimeout(() => setShowSaveNotification(false), 3000);
  };

  const handleSubmit = async () => {
    if (!validateSection(4)) return;

    setIsSubmitting(true);

    try {
      const applicationId = `LSP-${Date.now()}-${Math.random()?.toString(36)?.substr(2, 9)?.toUpperCase()}`;

      // If there's a transcript file, upload to Supabase Storage (bucket: 'transcripts')
      let transcriptUrl = null;
      const transcriptFile = formData?.transcriptFile;
      if (transcriptFile) {
        const fileExt = transcriptFile.name?.split('.')?.pop() || 'pdf';
        const filePath = `transcripts/${applicationId}/transcript.${fileExt}`;
        const { error: uploadError } = await supabase.storage
          .from('transcripts')
          .upload(filePath, transcriptFile, { upsert: true });

        if (uploadError) {
          console.warn('Transcript upload failed:', uploadError.message || uploadError);
        } else {
          // Get public URL (make sure bucket is configured for public access or use signed URL)
          const { data: publicData } = supabase.storage.from('transcripts').getPublicUrl(filePath);
          transcriptUrl = publicData?.publicUrl || null;
        }
      }

      // If transcript was uploaded, update documents array to include URL/status
      const formDataWithDocs = { ...formData };
      const docs = Array.isArray(formDataWithDocs.documents) ? [...formDataWithDocs.documents] : [];
      if (transcriptUrl) {
        const idx = docs.findIndex(d => d?.field === 'transcript');
        const transcriptEntry = { id: Date.now(), field: 'transcript', name: transcriptFile?.name || 'transcript.pdf', size: transcriptFile?.size || null, uploadedAt: new Date().toISOString(), status: 'uploaded', url: transcriptUrl };
        if (idx >= 0) docs[idx] = { ...docs[idx], ...transcriptEntry };
        else docs.push(transcriptEntry);
      }
      formDataWithDocs.documents = docs;

      // Ensure alternate ID (for non-US applicants) is persisted into the ssn field
      // so both the mapped columns and the JSON `data` backup contain the prefixed value.
      if ((!formDataWithDocs?.ssn || formDataWithDocs?.ssn === '') && formDataWithDocs?.citizenshipStatus && formDataWithDocs?.citizenshipStatus !== 'us_citizen' && formDataWithDocs?.altIdValue) {
        const type = formDataWithDocs?.altIdType || '';
        const prefixMap = { passport: 'p', national_id: 'n', student_id: 's' };
        const prefix = prefixMap[type] || 'x';
        // write back into the form payload so the JSON backup and any downstream code see the same value
        formDataWithDocs.ssn = `${prefix}${formDataWithDocs.altIdValue}`;
        // also log for debugging (can be removed later)
        console.debug('Computed prefixed SSN for non-US applicant:', formDataWithDocs.ssn);
      }

      // Map form data (camelCase) to database columns (snake_case)
      const dbRecord = mapFormDataToDatabase(formDataWithDocs);

      // Prepare record for insertion with mapped fields and metadata
      const record = {
        application_id: applicationId,
        transcript_url: transcriptUrl,
        status: 'submitted',
        ...dbRecord,
        data: formDataWithDocs  // also store full payload as JSON backup
      };

      const { data: insertData, error: insertError } = await supabase
        .from('applications')
        .insert([record]);

      if (insertError) {
        console.error('Failed to save application to Supabase:', insertError.message || insertError);
        // fallback: save draft locally
        localStorage.setItem('scholarshipApplicationDraft', JSON.stringify(formData));
        setIsSubmitting(false);
        alert('There was an error saving your application. Your draft was saved locally.');
        return;
      }

      // success: clear draft and navigate
      localStorage.setItem('applicationId', applicationId);
      localStorage.setItem('applicationFormData', JSON.stringify(formDataWithDocs));
      localStorage.removeItem('scholarshipApplicationDraft');
      setIsSubmitting(false);
      navigate('/application-confirmation');
    } catch (err) {
      console.error('Unexpected error during submit:', err);
      setIsSubmitting(false);
      alert('Unexpected error occurred. Your draft was saved locally.');
      localStorage.setItem('scholarshipApplicationDraft', JSON.stringify(formData));
    }
  };

  const CurrentSectionComponent = sections?.[currentSection]?.component;

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <ProgressNavigationBar currentSection={currentSection} totalSections={sections?.length} />
      <ApplicationStatusWidget 
        completionPercentage={Math.round(((currentSection + 1) / sections?.length) * 100)}
        nextDeadline="2025-02-15"
        criticalNotifications={0}
      />
      <DocumentStatusIndicator 
        totalDocuments={formData?.totalRequiredDocuments || 5}
        uploadedDocuments={(formData?.documents || []).length}
        pendingRecommendations={formData?.pendingRecommendations || 0}
        uploadProgress={0}
      />
      <main className="mx-4 lg:mx-8 py-6 md:py-8 lg:py-12">
        <div className="max-w-5xl mx-auto">
          {/* Info banner displayed only on the first page (Personal Information) */}
          {currentSection === 0 && (
            <div className="mb-6 md:mb-8 space-y-4">
              {/* LOSFA & Safety Notice */}
              <div className="bg-accent/10 border border-accent rounded-lg p-4 md:p-6">
                <p className="text-sm md:text-base font-semibold text-foreground mb-2">✓ LOSFA Scholarship — Free Application (No Fees)</p>
                <p className="text-xs md:text-sm text-muted-foreground mb-3">
                  This is a legitimate LOSFA (Louisiana Student Financial Assistance) scholarship application. LOSFA awards scholarships to approximately <strong>46,000 students annually</strong> based on the number of qualified applicants. This application is <strong>completely free</strong> — LOSFA never charges application fees.
                </p>
                <div className="bg-error/10 border border-error rounded p-3 mb-3">
                  <p className="text-xs md:text-sm text-error font-semibold mb-1">⚠️ WARNING: Scholarship Scams</p>
                  <p className="text-xs md:text-sm text-muted-foreground">
                    If anyone asks you for money to apply for a scholarship, it is a scam. Report suspicious activity to the Louisiana Attorney General: <strong>custserv@la.gov</strong> or call <strong>1-800-351-4889</strong>.
                  </p>
                </div>
              </div>

              {/* Guardian/One-App Notice */}
              <div className="bg-primary/5 border border-primary/20 rounded-lg p-4 md:p-6">
                <p className="text-sm md:text-base font-semibold text-foreground mb-2">Applying on behalf / Application Rules</p>
                <p className="text-xs md:text-sm text-muted-foreground mb-2">
                  If you are completing this application on behalf of a learner (parent, guardian, or authorized representative), please proceed. Fill in the learner's information in the application fields and use your contact information in the emergency contact section where appropriate.
                </p>
                <div className="mt-4">
                  <CountdownTimer primaryTarget="2026-03-23T00:00:00Z" fallbackTarget="2027-08-27T00:00:00Z" />
                </div>
                <ul className="text-xs md:text-sm text-muted-foreground list-disc list-inside space-y-1">
                  <li>Only one application is allowed per learner; duplicate applications may be rejected.</li>
                  <li><strong>Only the learner</strong> is required to attend the reporting date/interview if awarded (date will be in the confirmation email).</li>
                  <li>Only information that appears inconsistent or suspicious will be reviewed during the reporting date.</li>
                  <li>You can fill in your own information in appropriate fields (e.g., emergency contact, phone number) where applicable.</li>
                </ul>
              </div>
            </div>
          )}
          <div className="mb-6 md:mb-8">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 md:w-16 md:h-16 bg-primary/10 rounded-lg flex items-center justify-center">
                <Icon name="FileText" size={32} color="var(--color-primary)" />
              </div>
              <div>
                <h1 className="text-2xl md:text-3xl lg:text-4xl font-heading font-bold text-foreground">
                  Scholarship Application
                </h1>
                <p className="text-sm md:text-base text-muted-foreground">
                  {sections?.[currentSection]?.title}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-card border border-border rounded-lg shadow-md p-6 md:p-8 lg:p-12 mb-6 md:mb-8">
            <CurrentSectionComponent
              formData={formData}
              errors={errors}
              handleInputChange={handleInputChange}
              handleSelectChange={handleSelectChange}
              handleFileUpload={handleFileUpload}
              handleSubmit={handleSubmit}
              isSubmitting={isSubmitting}
            />
          </div>

          {currentSection < 4 && (
            <div className="flex flex-col sm:flex-row gap-3 md:gap-4 sticky bottom-4 bg-card border border-border rounded-lg shadow-lg p-4 md:p-6">
              <Button
                variant="outline"
                onClick={handlePrevious}
                disabled={currentSection === 0}
                iconName="ChevronLeft"
                iconPosition="left"
                fullWidth
              >
                Previous
              </Button>
              <Button
                variant="default"
                onClick={handleNext}
                iconName="ChevronRight"
                iconPosition="right"
                fullWidth
              >
                {currentSection === sections?.length - 2 ? 'Review Application' : 'Next Section'}
              </Button>
            </div>
          )}

          {showSaveNotification && (
            <div className="fixed bottom-20 right-4 bg-success text-success-foreground px-4 py-3 rounded-lg shadow-lg flex items-center gap-2 animate-fade-in z-100">
              <Icon name="CheckCircle" size={20} />
              <span className="text-sm font-medium">Progress saved automatically</span>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default ApplicationForm;