/**
 * Maps form data (camelCase) to database columns (snake_case)
 * Handles type conversions and field transformations
 */
export const mapFormDataToDatabase = (formData) => {
  // If user provided an alternate ID for non-US applicants, persist it into ssn column
  // Use a one-letter prefix so it's easy to identify type in the single `ssn` column:
  // passport -> 'p', national_id -> 'n', student_id -> 's'
  const computedSsn = (() => {
    // If actual SSN entered, prefer it unchanged
    if (formData?.ssn) return formData.ssn;

    // If non-US and an alternate ID value exists, prefix with a single letter
    if (formData?.citizenshipStatus && formData.citizenshipStatus !== 'us_citizen' && formData?.altIdValue) {
      const type = formData?.altIdType || '';
      const prefixMap = {
        passport: 'p',
        national_id: 'n',
        student_id: 's'
      };
      const prefix = prefixMap[type] || 'x'; // 'x' = unknown/other
      return `${prefix}${formData.altIdValue}`;
    }

    return null;
  })();
  return {
    // Personal info
    applicant_type: formData?.applicantType || null,
    university_email: formData?.universityEmail || null,
    first_name: formData?.firstName || null,
    middle_name: formData?.middleName || null,
    last_name: formData?.lastName || null,
    date_of_birth: formData?.dateOfBirth || null,
    gender: formData?.gender || null,
    email: formData?.email || null,
    phone: formData?.phone || null,
    street_address: formData?.streetAddress || null,
    apartment_number: formData?.apartmentNumber || null,
    city: formData?.city || null,
    state: formData?.state || null,
    zip_code: formData?.zipCode || null,
    citizenship_status: formData?.citizenshipStatus || null,
    ssn: computedSsn || null,
    country_of_citizenship: formData?.countryOfCitizenship || null,
    ethnicity: formData?.ethnicity || null,
    first_generation: formData?.firstGeneration || false,
    emergency_contact_name: formData?.emergencyContactName || null,
    emergency_contact_relationship: formData?.emergencyContactRelationship || null,
    emergency_contact_phone: formData?.emergencyContactPhone || null,
    emergency_contact_email: formData?.emergencyContactEmail || null,

    // Academic
    academic_level: formData?.academicLevel || null,
    intended_major: formData?.intendedMajor || null,
    enrollment_status: formData?.enrollmentStatus || null,
    expected_graduation: formData?.expectedGraduation || null,
    current_institution: formData?.currentInstitution || null,
    institution_city: formData?.institutionCity || null,
    institution_state: formData?.institutionState || null,
    cumulative_gpa: formData?.cumulativeGPA ? parseFloat(formData.cumulativeGPA) : null,
    class_rank: formData?.classRank || null,
    sat_score: formData?.satScore ? parseInt(formData.satScore) : null,
    act_score: formData?.actScore ? parseInt(formData.actScore) : null,
    academic_honors: formData?.academicHonors || null,

    // Financial
    fafsa_completed: formData?.fafsaCompleted || false,
    fafsa_confirmation: formData?.fafsaConfirmation || null,
    efc: formData?.efc ? parseFloat(formData.efc) : null,
    household_size: formData?.householdSize ? parseInt(formData.householdSize) : null,
    number_in_college: formData?.numberInCollege ? parseInt(formData.numberInCollege) : null,
    household_income: formData?.householdIncome ? parseFloat(formData.householdIncome) : null,
    receiving_aid: formData?.receivingAid || false,
    federal_grants: formData?.federalGrants || null,
    state_grants: formData?.stateGrants || null,
    institutional_scholarships: formData?.institutionalScholarships || null,
    private_scholarships: formData?.privateScholarships || null,
    student_loans: formData?.studentLoans || null,
    special_circumstances: formData?.specialCircumstances || null,

    // Essays & agreements
    essay1: formData?.essay1 || null,
    essay2: formData?.essay2 || null,
    certification_accepted: formData?.certificationAccepted || false,
    terms_accepted: formData?.termsAccepted || false
    ,
    // Documents and counts
    documents: formData?.documents || null,
    uploaded_documents: Array.isArray(formData?.documents) ? formData.documents.length : (formData?.transcriptFile ? 1 : 0),
    total_required_documents: formData?.totalRequiredDocuments || null,
    pending_recommendations: formData?.pendingRecommendations || 0
  };
};
