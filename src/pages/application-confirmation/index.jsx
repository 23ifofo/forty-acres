import React, { useEffect } from 'react';
import { Helmet } from 'react-helmet';
import Header from '../../components/ui/Header';
import useSelectedUniversity from '../../hooks/useSelectedUniversity';
import ConfirmationHeader from './components/ConfirmationHeader';
import ApplicationSummary from './components/ApplicationSummary';
import EmailConfirmation from './components/EmailConfirmation';
import NextStepsPanel from './components/NextStepsPanel';
import ReviewTimeline from './components/ReviewTimeline';
import ContactInformation from './components/ContactInformation';
import ActionButtons from './components/ActionButtons';
import ImportantNotices from './components/ImportantNotices';

const ApplicationConfirmation = () => {
  const [summaryData, setSummaryData] = React.useState({
    personal: [],
    academic: [],
    financial: [],
    essays: [],
    documents: []
  });
  const selectedUniversity = useSelectedUniversity();

  useEffect(() => {
    window.scrollTo(0, 0);
    
    // Retrieve form data from localStorage
    const storedFormData = localStorage.getItem('applicationFormData');
    const applicationIdStored = localStorage.getItem('applicationId');
    
    if (storedFormData) {
      try {
        const formData = JSON.parse(storedFormData);
        
        // Helper to mask SSN (show last 4 digits only)
        const maskSSN = (ssn) => {
          if (!ssn) return 'Not provided';
          const cleaned = ssn.replace(/\D/g, '');
          if (cleaned.length >= 4) {
            return `***-**-${cleaned.slice(-4)}`;
          }
          return '***-**-****';
        };
        
        // Helper to count words
        const countWords = (text) => {
          if (!text) return 0;
          return text.trim().split(/\s+/).filter(w => w.length > 0).length;
        };

        // Build personal section
        const personalData = [
          { label: "Full Name", value: formData?.firstName && formData?.lastName ? `${formData?.firstName} ${formData?.lastName}` : 'Not provided' },
          { label: "Email Address", value: formData?.email || 'Not provided' },
          { label: "Phone Number", value: formData?.phone || 'Not provided' },
          { label: "Date of Birth", value: formData?.dateOfBirth || 'Not provided' },
          { label: "Citizenship Status", value: formData?.citizenship || 'Not provided' },
          { label: "Social Security Number", value: maskSSN(formData?.ssn) }
        ];

        // Build academic section
        const academicData = [
          { label: "Current Institution", value: formData?.institution || 'Not provided' },
          { label: "Academic Level", value: formData?.academicLevel || 'Not provided' },
          { label: "Major", value: formData?.major || 'Not provided' },
          { label: "Minor", value: formData?.minor || 'Not provided' },
          { label: "Current GPA", value: formData?.gpa ? `${formData?.gpa} / 4.00` : 'Not provided' },
          { label: "Expected Graduation", value: formData?.graduationDate || 'Not provided' }
        ];

        // Build financial section
        const financialData = [
          { label: "FAFSA Status", value: formData?.fafsaStatus || 'Not provided' },
          { label: "Expected Family Contribution", value: formData?.efc ? `$${formData?.efc}` : 'Not provided' },
          { label: "Current Financial Aid", value: formData?.currentAid || 'Not provided' },
          { label: "Additional Scholarships", value: formData?.scholarships || 'Not provided' },
          { label: "Work Study Participation", value: formData?.workStudy || 'Not provided' }
        ];

        // Build essays section
        const essaysData = [
          { 
            label: "Essay 1: Academic Goals & Aspirations", 
            value: formData?.essay1 ? `${countWords(formData?.essay1)} words` : 'Not submitted' 
          },
          { 
            label: "Essay 2: Community Impact & Leadership", 
            value: formData?.essay2 ? `${countWords(formData?.essay2)} words` : 'Not submitted' 
          }
        ];

        // Build documents section
        const documentsData = formData?.documents && Array.isArray(formData?.documents) && formData?.documents?.length > 0
          ? formData?.documents?.map((doc, idx) => ({
              label: doc?.name || `Document ${idx + 1}`,
              value: doc?.uploadedAt ? `Uploaded: ${new Date(doc?.uploadedAt).toLocaleDateString()}` : 'Pending'
            }))
          : [{ label: "No documents uploaded", value: "None" }];

        setSummaryData({
          personal: personalData,
          academic: academicData,
          financial: financialData,
          essays: essaysData,
          documents: documentsData
        });
      } catch (e) {
        console.error('Error parsing form data:', e);
      }
    }
  }, []);

  const applicationId = localStorage.getItem('applicationId') || "LSP-2025-847392";
  const submissionDate = new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }) + ' at ' + new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
  const recipientEmail = localStorage.getItem('applicationFormData') 
    ? JSON.parse(localStorage.getItem('applicationFormData'))?.email || 'student@example.edu'
    : 'student@example.edu';

  const nextSteps = [
    {
      title: "Application Review Period",
      description: "Your application will undergo a preliminary review to verify completeness and eligibility. This review typically takes 1-2 weeks. During this time we may contact you by phone or email for clarification — an interview is not required for all applicants.",
      deadline: null
    },
    {
      title: "Interview Scheduling (If Selected)",
      description: "If additional clarification is needed or you are selected as a finalist, you may be contacted to schedule an interview — or, in many cases, a phone call or email will suffice. Please monitor your email and phone regularly.",
      deadline: "Varies"
    },
    {
      title: "Additional Documentation",
      description: "If additional documents are required, you will receive an email notification with specific instructions and deadlines for submission.",
      deadline: "As Requested"
    },
    {
      title: "Final Decision Notification",
      description: "Decisions are typically made within 3-5 weeks of submission, though exact timing can vary by intake. Notifications will be sent via email and posted in the application portal.",
      deadline: "Typically 3-5 weeks"
    }
  ];

  const timeline = [
    {
      title: "Application Submitted",
      date: submissionDate,
      description: "Your application has been successfully received and is now in our system.",
      status: "completed"
    },
    {
      title: "Initial Review",
      date: "1-2 weeks",
      description: "Committee members will conduct a preliminary review to verify completeness and eligibility. During this stage some applicants may receive a phone call or email for clarification.",
      status: "current"
    },
    {
      title: "Detailed Evaluation",
      date: "3-5 weeks",
      description: "In-depth assessment of academic achievements, essays, recommendations, and financial need. This is when finalists are chosen for any additional review steps.",
      status: "pending"
    },
    {
      title: "Finalist Selection",
      date: "Following evaluation",
      description: "Top candidates may be selected for interviews or further clarification; note that phone/email contact is frequently used instead of formal interviews.",
      status: "pending"
    },
    {
      title: "Final Decision",
      date: "Typically within 3-5 weeks",
      description: "Scholarship awards will be determined and applicants notified. Timing can vary across different intakes in the year.",
      status: "pending"
    }
  ];

  // List of intakes available in the scholarship cycle (informational)
  const intakes = [
    { key: 'spring', label: 'Spring Intake (e.g., Jan-Mar)' },
    { key: 'summer', label: 'Summer Intake (e.g., May-Jul)' },
    { key: 'fall', label: 'Fall Intake (e.g., Aug-Oct)' }
  ];

  const contactDetails = selectedUniversity ? {
    phone: selectedUniversity?.phone || "(000) 000-0000",
    email: selectedUniversity?.email || "support@youruniversity.edu",
    location: selectedUniversity?.location || "Check with your institution",
    hours: "Monday-Friday, 9:00 AM - 5:00 PM CST"
  } : {
    phone: "(000) 000-0000",
    email: "support@youruniversity.edu",
    location: "Your campus office",
    hours: "Monday-Friday, 9:00 AM - 5:00 PM CST"
  };
  const supportEmail = selectedUniversity?.email || 'support@youruniversity.edu';
  const supportPhone = selectedUniversity?.phone || '(000) 000-0000';

  const notices = [
    {
      icon: "FileEdit",
      title: "Application Modification Policy",
      description: `Once submitted, applications cannot be modified. If you need to update information or submit additional documents, please contact the scholarship office immediately at ${supportEmail}.`
    },
    {
      icon: "Bell",
      title: "Communication Preferences",
      description: `All official communications will be sent to the email address provided in your application. Please ensure your email is checked regularly and add ${supportEmail} to your safe sender list to avoid missing important notifications.`
    },
    {
      icon: "Shield",
      title: "Privacy and Data Security",
      description: "Your application information is protected under FERPA regulations and university privacy policies. Data is encrypted and accessible only to authorized scholarship committee members and administrative staff."
    },
    {
      icon: "HelpCircle",
      title: "Emergency Contact Procedures",
      description: `For urgent matters or technical issues with your application, contact the scholarship office during business hours at ${supportPhone}. For after-hours emergencies, email ${supportEmail} with 'URGENT' in the subject line.`
    }
  ];

  return (
    <>
      <Helmet>
        <title>Application Confirmation - {selectedUniversity?.name || "Scholarship"} Portal</title>
        <meta name="description" content={`Your scholarship application has been successfully submitted to ${selectedUniversity?.name || "the university"}. View confirmation details and next steps.`} />
      </Helmet>
      <div className="min-h-screen bg-background">
        <Header />
        
        <main className="mx-4 lg:mx-8 py-6 md:py-8 lg:py-12">
          <div className="max-w-6xl mx-auto space-y-6 md:space-y-8">
            <ConfirmationHeader 
              applicationId={applicationId}
              submissionDate={submissionDate}
            />

            <EmailConfirmation 
              emailStatus="sent"
              recipientEmail={recipientEmail}
            />

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8">
              <div className="lg:col-span-2 space-y-6 md:space-y-8">
                <ApplicationSummary summaryData={summaryData} />
                <ReviewTimeline timeline={timeline} />
                <ImportantNotices notices={notices} />
              </div>

              <div className="space-y-6 md:space-y-8">
                <NextStepsPanel nextSteps={nextSteps} />
                <ContactInformation contactDetails={contactDetails} />
                <div className="bg-card border border-border rounded-lg p-4 md:p-6">
                  <h4 className="text-sm md:text-base font-semibold text-foreground mb-2">Application Intakes</h4>
                  <p className="text-xs md:text-sm text-muted-foreground mb-2">This scholarship accepts applicants across multiple intake windows throughout the year. Typical intakes include:</p>
                  <ul className="text-xs md:text-sm text-muted-foreground list-disc list-inside space-y-1">
                    {intakes.map(i => (
                      <li key={i.key}>{i.label}</li>
                    ))}
                  </ul>
                  <p className="text-xs md:text-sm text-muted-foreground mt-3">For intake-specific deadlines and availability, please contact the scholarship office at {supportEmail}.</p>
                </div>
                <ActionButtons applicationId={applicationId} />
              </div>
            </div>

            <div className="bg-primary/5 border border-primary/20 rounded-lg p-4 md:p-6 text-center">
              <p className="text-sm md:text-base text-foreground leading-relaxed">
                Thank you for your interest in {selectedUniversity?.name || 'our university'} scholarships. We appreciate the time and effort you invested in your application. Good luck with your academic journey!
              </p>
            </div>
          </div>
        </main>

        <footer className="bg-card border-t border-border mt-12 md:mt-16 lg:mt-20">
          <div className="mx-4 lg:mx-8 py-6 md:py-8">
            <div className="max-w-6xl mx-auto text-center space-y-3 md:space-y-4">
              <p className="text-sm md:text-base text-muted-foreground">
                &copy; {new Date()?.getFullYear()} {selectedUniversity?.name || 'Your Institution'}. All rights reserved.
              </p>
              <div className="flex flex-wrap justify-center gap-4 md:gap-6 text-xs md:text-sm text-muted-foreground">
                <a href="#" className="hover:text-primary smooth-transition">Privacy Policy</a>
                <span>|</span>
                <a href="#" className="hover:text-primary smooth-transition">Terms of Service</a>
                <span>|</span>
                <a href="#" className="hover:text-primary smooth-transition">FERPA Compliance</a>
                <span>|</span>
                <a href="#" className="hover:text-primary smooth-transition">Accessibility</a>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
};

export default ApplicationConfirmation;