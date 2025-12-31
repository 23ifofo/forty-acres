import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/ui/Header';
import Button from '../../components/ui/Button';
import Icon from '../../components/AppIcon';
import universities from '../../config/universities.json';

const LOSFAInfo = () => {
  const navigate = useNavigate();
  const [selectedUniversity, setSelectedUniversity] = useState(null);

  const publicUniversities = Object.entries(universities.universities)
    .filter(([, config]) => config.type === 'public')
    .map(([slug, config]) => ({ slug, ...config }));

  const privateUniversities = Object.entries(universities.universities)
    .filter(([, config]) => config.type === 'private')
    .map(([slug, config]) => ({ slug, ...config }));

  const handleUniversitySelect = (slug) => {
    setSelectedUniversity(slug);
    setTimeout(() => {
      navigate(`/application-form?university=${slug}&section=0`);
    }, 300);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-background">
      <Header />
      
      <main className="mx-4 lg:mx-8 py-6 md:py-8 lg:py-12">
        <div className="max-w-6xl mx-auto space-y-8 md:space-y-12">
          {/* LOSFA Header with Logo */}
          <div className="text-center space-y-6">
            <div className="flex justify-center mb-4">
              <img src="/assets/images/lofsalogo.png" alt="LOSFA Logo" className="h-20 md:h-28 w-auto" />
            </div>
            <div>
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold text-blue-900 mb-2">
                LOSFA Scholarship Application
              </h1>
              <p className="text-base md:text-lg text-blue-700 font-semibold">
                Louisiana Student Financial Assistance Program
              </p>
            </div>
            <div className="w-24 h-1 bg-gradient-to-r from-blue-600 via-yellow-500 to-blue-600 mx-auto rounded-full"></div>
          </div>

          {/* About LOSFA */}
          <div className="bg-white border-2 border-blue-600 rounded-lg p-6 md:p-8 shadow-lg">
            <div className="flex items-start gap-4 mb-6">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-blue-700 rounded-lg flex items-center justify-center flex-shrink-0">
                <Icon name="Award" size={24} color="white" />
              </div>
              <div>
                <h2 className="text-2xl md:text-3xl font-heading font-bold text-blue-900 mb-2">
                  About LOSFA
                </h2>
                <p className="text-sm md:text-base text-blue-700">
                  The Louisiana Student Financial Assistance Program (LOSFA) is dedicated to making higher education accessible and affordable to all Louisiana residents.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="bg-blue-50 border-l-4 border-yellow-500 pl-4 py-3 rounded-r">
                  <h3 className="text-lg font-semibold text-blue-900 mb-2 flex items-center gap-2">
                    <Icon name="Users" size={20} color="#1e40af" />
                    Award Coverage
                  </h3>
                  <p className="text-sm text-blue-800">
                    LOSFA awards scholarships to approximately <strong>46,000 students</strong> annually, based on the number of qualified applicants and available funding. Your eligibility depends on meeting the established criteria and attending a qualifying institution.
                  </p>
                </div>

                <div className="bg-green-50 border-l-4 border-yellow-500 pl-4 py-3 rounded-r">
                  <h3 className="text-lg font-semibold text-green-900 mb-2 flex items-center gap-2">
                    <Icon name="DollarSign" size={20} color="#15803d" />
                    No Application Fees
                  </h3>
                  <p className="text-sm text-green-800">
                    LOSFA never charges an application fee. This scholarship application is completely free. <strong>If anyone asks you for money to apply, it is a scam.</strong>
                  </p>
                </div>

                <div className="bg-red-50 border-l-4 border-yellow-500 pl-4 py-3 rounded-r">
                  <h3 className="text-lg font-semibold text-red-900 mb-2 flex items-center gap-2">
                    <Icon name="AlertCircle" size={20} color="#b91c1c" />
                    Report Scams
                  </h3>
                  <p className="text-sm text-red-800">
                    Suspicious activity? Report scams or fraudulent scholarship claims to the Louisiana Attorney General's office at <strong>custserv@la.gov</strong> or call 1-800-351-4889.
                  </p>
                </div>
              </div>

              <div className="space-y-4">
                <div className="bg-blue-50 border-l-4 border-blue-600 pl-4 py-3 rounded-r">
                  <h3 className="text-lg font-semibold text-blue-900 mb-2 flex items-center gap-2">
                    <Icon name="CheckCircle" size={20} color="#1e40af" />
                    Eligibility Criteria
                  </h3>
                  <ul className="text-sm text-blue-800 space-y-2 list-disc list-inside">
                    <li>U.S. citizen or permanent resident</li>
                    <li>Louisiana resident</li>
                    <li>High school graduate or GED holder</li>
                    <li>Planning to enroll or already enrolled at a qualifying institution — applicants may apply based on the university they intend to attend. If your institution changes after award, contact LOSFA headquarters to coordinate any necessary transfers.</li>
                    <li>Demonstrate financial need</li>
                    <li>Maintain satisfactory academic progress</li>
                    <li>Complete FAFSA application (after scholarship decision)</li>
                  </ul>
                </div>

                <div className="bg-blue-50 border-l-4 border-blue-600 pl-4 py-3 rounded-r">
                  <h3 className="text-lg font-semibold text-blue-900 mb-2 flex items-center gap-2">
                    <Icon name="Clock" size={20} color="#1e40af" />
                    Application Timeline
                  </h3>
                  <ul className="text-sm text-blue-800 space-y-1">
                    <li><strong>Submit:</strong> By application deadline</li>
                    <li><strong>Review:</strong> 1-2 weeks (may include phone or email contact for clarification)</li>
                    <li><strong>Interview:</strong> If selected; many clarifications are handled via phone or email</li>
                    <li><strong>Decision:</strong> Typically within 3-5 weeks (varies by intake)</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* Representative/Guardian Notice */}
          <div className="bg-gradient-to-r from-yellow-50 to-amber-50 border-2 border-yellow-500 rounded-lg p-6 md:p-8 shadow-md">
            <div className="flex items-start gap-4">
              <Icon name="Info" size={24} color="#f59e0b" className="flex-shrink-0 mt-1" />
              <div>
                <h3 className="text-lg font-semibold text-amber-900 mb-2">Applying on Behalf of a Learner?</h3>
                <p className="text-sm text-amber-800 mb-2">
                  Parents, guardians, or authorized representatives can complete this application using the learner's information. Fill in the learner's details in the application fields, and use your own contact information in the emergency contact section where appropriate.
                </p>
                <ul className="text-sm text-amber-800 list-disc list-inside space-y-1">
                  <li>Only one application per learner is allowed</li>
                  <li><strong>Only the learner</strong> is required to attend the reporting date/interview if awarded (date will be in the confirmation email)</li>
                  <li>Only information that appears inconsistent or suspicious will be reviewed during the reporting date</li>
                  <li>You can fill in your own information in appropriate fields (e.g., emergency contact, phone number)</li>
                </ul>
              </div>
            </div>
          </div>

          {/* University Selection */}
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl md:text-3xl font-heading font-bold text-blue-900 mb-2">
                Select Your University
              </h2>
              <p className="text-base text-blue-700">
                Choose the university you plan to attend or are currently attending. Click to begin your scholarship application.
              </p>
            </div>

            {/* Public Universities */}
            <div className="space-y-4">
              <h3 className="text-xl font-semibold text-blue-900 flex items-center gap-2">
                <Icon name="Building2" size={20} color="#1e40af" />
                Public Universities
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {publicUniversities.map((uni) => (
                  <button
                    key={uni.slug}
                    onClick={() => handleUniversitySelect(uni.slug)}
                    disabled={selectedUniversity === uni.slug}
                    className={`p-4 rounded-lg border-2 text-left smooth-transition ${
                      selectedUniversity === uni.slug
                        ? 'border-blue-600 bg-blue-50 shadow-md'
                        : 'border-blue-200 bg-white hover:border-blue-400 hover:shadow-md'
                    }`}
                  >
                    <p className="font-semibold text-blue-900 text-sm md:text-base">
                      {uni.name}
                    </p>
                    <p className="text-xs text-blue-700 mt-1">
                      {uni.location}
                    </p>
                    {selectedUniversity === uni.slug && (
                      <div className="flex items-center gap-2 mt-3 text-blue-600 font-semibold">
                        <Icon name="Check" size={16} />
                        <span className="text-xs">Selected</span>
                      </div>
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* Private Universities (LAICU) */}
            <div className="space-y-4">
              <h3 className="text-xl font-semibold text-blue-900 flex items-center gap-2">
                <Icon name="Building" size={20} color="#1e40af" />
                Qualifying Private Universities (LAICU)
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {privateUniversities.map((uni) => (
                  <button
                    key={uni.slug}
                    onClick={() => handleUniversitySelect(uni.slug)}
                    disabled={selectedUniversity === uni.slug}
                    className={`p-4 rounded-lg border-2 text-left smooth-transition ${
                      selectedUniversity === uni.slug
                        ? 'border-blue-600 bg-blue-50 shadow-md'
                        : 'border-blue-200 bg-white hover:border-blue-400 hover:shadow-md'
                    }`}
                  >
                    <p className="font-semibold text-blue-900 text-sm md:text-base">
                      {uni.name}
                    </p>
                    <p className="text-xs text-blue-700 mt-1">
                      {uni.location}
                    </p>
                    {selectedUniversity === uni.slug && (
                      <div className="flex items-center gap-2 mt-3 text-blue-600 font-semibold">
                        <Icon name="Check" size={16} />
                        <span className="text-xs">Selected</span>
                      </div>
                    )}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Help Section */}
          <div className="bg-gradient-to-r from-blue-50 to-blue-100 border-2 border-blue-300 rounded-lg p-6 md:p-8">
            <h3 className="text-lg font-semibold text-blue-900 mb-4 flex items-center gap-2">
              <Icon name="HelpCircle" size={20} color="#1e40af" />
              Need Help?
            </h3>
            <p className="text-sm text-blue-800 mb-4">
              If you have questions about LOSFA, your eligibility, or need to report suspicious activity:
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white rounded p-4 border-l-4 border-yellow-500">
                <p className="text-sm font-semibold text-blue-900 mb-1">LOSFA Support</p>
                <p className="text-sm text-blue-700">
                  Contact your university's financial aid office for assistance with your application.
                </p>
              </div>
              <div className="bg-white rounded p-4 border-l-4 border-yellow-500">
                <p className="text-sm font-semibold text-blue-900 mb-1">Report Scams</p>
                <p className="text-sm text-blue-700">
                  Email: <strong>custserv@la.gov</strong> or call <strong>1-800-351-4889</strong>
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default LOSFAInfo;
