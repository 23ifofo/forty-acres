import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/ui/Header';
import Button from '../../components/ui/Button';
import Icon from '../../components/AppIcon';
import universities from '../../config/universities.json';

const FortyAcresInfo = () => {
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
    <div className="min-h-screen">
      <Header />

      <main className="mx-4 lg:mx-8 py-8 md:py-12 lg:py-16">
        <div className="max-w-6xl mx-auto">
          {/* Enhanced Forty Acres Hero Header */}
          <div className="relative mb-16">
            <div className="absolute -top-20 right-0 w-80 h-80 bg-gradient-to-br from-orange-100 to-amber-50 rounded-full blur-3xl opacity-30 -z-10" />
            <div className="absolute top-40 -left-40 w-72 h-72 bg-gradient-to-tr from-gray-100 to-transparent rounded-full blur-3xl opacity-20 -z-10" />
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
              <div className="lg:col-span-1 flex flex-col items-center lg:items-start space-y-6">
                <div className="relative w-full max-w-xs">
                  <div className="absolute inset-0 bg-gradient-to-br from-orange-400 to-amber-300 rounded-3xl blur-2xl opacity-15" />
                  <div className="relative bg-gradient-to-br from-white to-gray-50 rounded-3xl p-8 shadow-2xl border border-gray-100">
                    <img src="/assets/images/fortyacres-logo.svg" alt="Forty Acres Logo" className="w-full h-auto" />
                  </div>
                </div>

                  <div className="w-full space-y-2 hidden lg:block">
                  <div className="glass-card rounded-xl p-4 bg-white/60 border border-gray-100">
                    <div className="text-2xl font-bold text-gray-900">Full Ride</div>
                    <div className="text-xs text-gray-600 font-medium">Merit-Based Award</div>
                  </div>
                  <div className="glass-card rounded-xl p-4 bg-white/60 border border-gray-100">
                    <div className="text-2xl font-bold text-gray-900">$530K+</div>
                    <div className="text-xs text-gray-600 font-medium">Alumni Network</div>
                  </div>
                </div>
              </div>

              <div className="lg:col-span-2 space-y-8">
                <div className="space-y-4">
                  <h1 className="heading-font text-5xl md:text-6xl font-extrabold text-orange-900 leading-tight">
                    Forty Acres Scholars Program
                  </h1>
                  <div className="flex items-center gap-3">
                    <div className="flex-1 h-1 bg-gradient-to-r from-orange-600 to-amber-500 rounded-full" />
                    <Icon name="Award" size={28} color="#b45309" />
                    <div className="flex-1 h-1 bg-gradient-to-l from-orange-600 to-amber-500 rounded-full" />
                  </div>
                  <p className="text-xl text-gray-700 font-medium">
                    The Premier Full-Ride Merit-Based Scholarship at The University of Texas at Austin
                  </p>
                  <p className="text-base text-gray-600 leading-relaxed max-w-2xl">
                    Administered by the Texas Exes, the Forty Acres Scholars Program provides the best of Texas for the best of Texas. Experience a transformative four-year journey with world-class education, life-changing research, and an unparalleled alumni network of 530,000+ Longhorns.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 py-6">
                  <div className="glass-card border border-gray-200 rounded-xl p-5 bg-gradient-to-br from-white to-gray-50 hover:shadow-lg transition">
                    <div className="flex items-start gap-3 mb-2">
                      <Icon name="CheckCircle" size={24} color="#b45309" className="flex-shrink-0 mt-1" />
                      <h3 className="font-bold text-gray-900 text-sm">Full Tuition & Living</h3>
                    </div>
                    <p className="text-xs text-gray-600">Complete coverage for your four-year journey</p>
                  </div>

                  <div className="glass-card border border-gray-200 rounded-xl p-5 bg-gradient-to-br from-white to-gray-50 hover:shadow-lg transition">
                    <div className="flex items-start gap-3 mb-2">
                      <Icon name="Users" size={24} color="#b45309" className="flex-shrink-0 mt-1" />
                      <h3 className="font-bold text-gray-900 text-sm">Vibrant Cohort</h3>
                    </div>
                    <p className="text-xs text-gray-600">Connect with gifted peers and lifelong mentors</p>
                  </div>

                  <div className="glass-card border border-gray-200 rounded-xl p-5 bg-gradient-to-br from-white to-gray-50 hover:shadow-lg transition">
                    <div className="flex items-start gap-3 mb-2">
                      <Icon name="Globe" size={24} color="#b45309" className="flex-shrink-0 mt-1" />
                      <h3 className="font-bold text-gray-900 text-sm">Global Network</h3>
                    </div>
                    <p className="text-xs text-gray-600">Access to 530,000+ alumni (Texas Exes)</p>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-3 pt-4">
                  <button onClick={() => document.querySelector('#universities-section')?.scrollIntoView({ behavior: 'smooth' })} className="flex-1 bg-gradient-to-r from-orange-600 to-orange-700 hover:from-orange-700 hover:to-orange-800 text-white font-bold py-3 px-6 rounded-xl transition shadow-lg">
                    Browse Universities
                  </button>
                  <button onClick={() => document.querySelector('#about-forty-acres')?.scrollIntoView({ behavior: 'smooth' })} className="flex-1 bg-white hover:bg-gray-50 text-blue-700 font-bold py-3 px-6 rounded-xl border-2 border-gray-300 transition">
                    Learn More
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-10 md:space-y-16">
              <div className="mt-8 max-w-4xl mx-auto">
              <div className="glass-card border border-gray-200 rounded-2xl p-6 md:p-8 bg-gradient-to-br from-white/90 to-gray-50/90 shadow-xl">
                <h2 className="text-3xl md:text-4xl font-bold text-orange-900 mb-6">About the Forty Acres Scholars Program</h2>
                <p className="text-lg text-gray-700 mb-6 leading-relaxed">
                  The Forty Acres Scholars Program is the <strong>premier full-ride, merit-based scholarship</strong> for The University of Texas at Austin. Administered by the Texas Exes, this scholarship program offers a rich college experience that provides academic, leadership, professional, and cultural opportunities within an intimate cohort of fellow scholars.
                </p>
                
                {/* Image Section */}
                <div className="my-8 rounded-xl overflow-hidden shadow-lg">
                  <img src="/assets/images/forty.jpg" alt="Forty Acres at UT Austin" className="w-full h-auto object-cover" />
                </div>

                <h3 className="text-2xl font-bold text-gray-900 mb-4">A Transformative Journey</h3>
                <p className="text-gray-700 mb-4 leading-relaxed">
                  For four years, Scholars receive the tools and resources to unlock their full potential. From a world-class education and life-changing research to enrichment opportunities and dedicated advisers, the Forty Acres Scholars Program brings the best to Texas for the best of Texas. And, once here, Scholars thrive within their close cohort community and a renowned global network of alumni (known as the Texas Exes to those closest to us). With Austin, Texas as home base, Scholars experience the rich, artistic culture that only America's No. 1 city to live in can provide.
                </p>

                <h3 className="text-2xl font-bold text-gray-900 mb-4">An Unparalleled Alumni Network</h3>
                <p className="text-gray-700 mb-4 leading-relaxed">
                  It wouldn't be Texas without the Exes. As the only program of its kind administered by an alumni association, the Forty Acres Scholars Program is woven into the fabric of what makes UT exemplary—its proud and accomplished alumni network. Comprised of more than 530,000 alumni, our renowned alumni network spans the globe, industries, and experiences. Scholars cultivate game-changing connections with alumni through customized opportunities that range from casual conversations and gameday activities to VIP access to red carpet university events. By graduation, Scholars have gained inspiring mentors and built their own personal network of alumni.
                </p>

                <div className="border-t border-gray-200 pt-6 mt-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-3">
                    <div className="w-8 h-8 bg-orange-500 text-white rounded-full flex items-center justify-center font-bold">✓</div>
                    Parents & Guardians Can Apply Too
                  </h3>
                  <p className="text-base text-gray-700 mb-4 leading-relaxed">
                    Parents or guardians can complete this application on behalf of a learner. Simply enter the student's details in the required fields and your contact information where indicated. During the final verification stage (if the application is selected for award), <strong>only the learner needs to attend to verify their details and confirm the scholarship award</strong>.
                  </p>
                  <p className="text-sm text-gray-700 bg-gray-50 rounded-lg p-4 border-l-4 border-gray-300">
                    💬 <strong>We'll contact you via email or phone</strong> with any information we need to confirm. This quick verification ensures the scholarship is awarded to the right person.
                  </p>
                </div>
              </div>
            </div>

              <div className="mt-8 text-center">
              <p className="text-lg text-gray-700 font-semibold mb-2">👇 Choose your university below to get started 👇</p>
            </div>
          </div>

          <div className="glass-card border border-gray-100 rounded-lg p-6 md:p-8 shadow-xl" id="about-forty-acres">
            <div className="flex items-start gap-4 mb-6">
              <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-orange-600 rounded-lg flex items-center justify-center flex-shrink-0">
                <Icon name="Award" size={24} color="white" />
              </div>
              <div>
                <h2 className="text-2xl md:text-3xl font-heading font-bold text-orange-900 mb-2">
                  The Foundation: Community, Connection & Discovery
                </h2>
                <p className="text-sm md:text-base text-orange-700">
                  The Forty Acres Scholars Program is dedicated to making higher education accessible and affordable to students attending participating universities.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="bg-white/60 border-l-4 border-gray-300 pl-4 py-3 rounded-r">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2 flex items-center gap-2">
                    <Icon name="Users" size={20} color="#b45309" />
                    Community
                  </h3>
                  <p className="text-sm text-gray-700">
                    Join a vibrant community that will be a lifelong support system. Scholar cohorts are made up of gifted and passionate students with diverse backgrounds, interests, and majors. Over the years, this group forms a tight bond outside of the classroom through retreats, dinners, and events.
                  </p>
                </div>

                <div className="bg-white/60 border-l-4 border-gray-300 pl-4 py-3 rounded-r">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2 flex items-center gap-2">
                    <Icon name="Handshake" size={20} color="#b45309" />
                    Connection
                  </h3>
                  <p className="text-sm text-gray-700">
                    Tap into a global network of Longhorns—for life. Forty Acres Scholars develop a unique connection with their alma mater and its leaders through luncheons, dinners, discussions, and internships with thought leaders, researchers, and alumni.
                  </p>
                </div>

                <div className="bg-white/60 border-l-4 border-gray-300 pl-4 py-3 rounded-r">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2 flex items-center gap-2">
                    <Icon name="Globe" size={20} color="#b45309" />
                    Discovery
                  </h3>
                  <p className="text-sm text-gray-700">
                    Discover the world—then make the change you want to see. A generous enrichment stipend means scholars have the freedom to pursue interests outside the classroom: studying abroad, philanthropic service, cutting-edge research, and real-world experiences.
                  </p>
                </div>
              </div>

              <div className="space-y-4">
                <div className="bg-white/60 border-l-4 border-gray-300 pl-4 py-3 rounded-r">
                  <h3 className="text-lg font-semibold text-orange-900 mb-2 flex items-center gap-2">
                    <Icon name="CheckCircle" size={20} color="#b45309" />
                    Full Tuition Coverage
                  </h3>
                  <p className="text-sm text-gray-700">
                    Complete tuition at a world-class university with no out-of-pocket costs for tuition and fees.
                  </p>
                </div>

                <div className="bg-white/60 border-l-4 border-gray-300 pl-4 py-3 rounded-r">
                  <h3 className="text-lg font-semibold text-orange-900 mb-2 flex items-center gap-2">
                    <Icon name="DollarSign" size={20} color="#b45309" />
                    Living Stipend & Enrichment Funds
                  </h3>
                  <p className="text-sm text-gray-700">
                    Living stipend, book and supply stipend, and enrichment funds for interests and opportunities outside the classroom.
                  </p>
                </div>

                <div className="bg-white/60 border-l-4 border-gray-300 pl-4 py-3 rounded-r">
                  <h3 className="text-lg font-semibold text-orange-900 mb-2 flex items-center gap-2">
                    <Icon name="Zap" size={20} color="#b45309" />
                    Dedicated Support & Networking
                  </h3>
                  <p className="text-sm text-gray-700">
                    Customized programming, cultivated connections with UT alumni and faculty, and steadfast support of dedicated program staff.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="glass-card border border-gray-100 rounded-lg p-6 md:p-8 shadow-md bg-gradient-to-br from-white to-gray-50">
            <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
              <Icon name="MessageSquare" size={20} color="#b45309" />
              Scholars Say...
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white rounded-lg p-6 border-l-4 border-gray-300">
                <p className="text-gray-700 italic mb-3">
                  "I've realized that we all have different backgrounds, dreams, and passions, but we share a vision of a better tomorrow—one that we are enthusiastically starting to work toward today."
                </p>
                <p className="text-sm font-semibold text-gray-900">Abby Criswell, Class of 2022</p>
              </div>
              <div className="bg-white rounded-lg p-6 border-l-4 border-gray-300">
                <p className="text-gray-700 italic mb-3">
                  "The Program has been life-changing. The alumni and events have given me the opportunity to pursue my professional goals. The enrichment stipend enabled me to explore interests outside my major. And my cohort has served as my family away from home."
                </p>
                <p className="text-sm font-semibold text-gray-900">John McDonald, Class of 2021</p>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div>
              <h2 className="heading-font text-2xl md:text-3xl font-bold text-gray-900 mb-2">
                Program Benefits
              </h2>
              <p className="text-base text-gray-700">
                Everything you need to unlock your full potential during your four years at UT Austin.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="glass-card border border-gray-200 rounded-lg p-6 md:p-8 shadow-lg bg-gradient-to-br from-white to-gray-50">
                <div className="flex items-start gap-4 mb-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-orange-600 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Icon name="DollarSign" size={24} color="white" />
                  </div>
                  <div>
                    <h3 className="text-xl md:text-2xl font-semibold text-gray-900">Financial Support</h3>
                  </div>
                </div>
                <div className="space-y-3 text-sm text-gray-700">
                  <div>
                    <p className="font-semibold mb-1">✓ Full Tuition Coverage</p>
                    <p>Complete tuition at a world-class university</p>
                  </div>
                  <div>
                    <p className="font-semibold mb-1">✓ Living Stipend</p>
                    <p>Support for housing and meals</p>
                  </div>
                  <div>
                    <p className="font-semibold mb-1">✓ Book & Supply Funds</p>
                    <p>All academic materials covered</p>
                  </div>
                  <div>
                    <p className="font-semibold mb-1">✓ Enrichment Stipend</p>
                    <p>Pursue interests and opportunities beyond the classroom</p>
                  </div>
                </div>
              </div>

              <div className="glass-card border border-gray-200 rounded-lg p-6 md:p-8 shadow-lg bg-gradient-to-br from-white to-gray-50">
                <div className="flex items-start gap-4 mb-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-orange-600 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Icon name="Zap" size={24} color="white" />
                  </div>
                  <div>
                    <h3 className="text-xl md:text-2xl font-semibold text-gray-900">Programming & Support</h3>
                  </div>
                </div>
                <div className="space-y-3 text-sm text-gray-700">
                  <div>
                    <p className="font-semibold mb-1">✓ Customized Programming</p>
                    <p>Tailored experiences for scholar development</p>
                  </div>
                  <div>
                    <p className="font-semibold mb-1">✓ Alumni Connections</p>
                    <p>Access to 530,000+ Longhorns for networking</p>
                  </div>
                  <div>
                    <p className="font-semibold mb-1">✓ Dedicated Advisers</p>
                    <p>Steadfast support of specialized program staff</p>
                  </div>
                  <div>
                    <p className="font-semibold mb-1">✓ Cohort Community</p>
                    <p>Lifelong bonds with fellow scholars</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div>
              <h2 className="heading-font text-2xl md:text-3xl font-bold text-orange-900 mb-2">
                Dynamic Programming Throughout Your Four Years
              </h2>
              <p className="text-base text-orange-700">
                Scholars participate in enriching experiences designed to foster growth and community.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-white border-l-4 border-gray-300 rounded-lg p-5">
                <p className="font-semibold text-gray-900 mb-2">🎨 Cultural Events</p>
                <p className="text-sm text-gray-700">Explore Austin's vibrant arts and culture scene</p>
              </div>
              <div className="bg-white border-l-4 border-gray-300 rounded-lg p-5">
                <p className="font-semibold text-gray-900 mb-2">🤝 Service Learning</p>
                <p className="text-sm text-gray-700">Give back to community and build leadership</p>
              </div>
              <div className="bg-white border-l-4 border-gray-300 rounded-lg p-5">
                <p className="font-semibold text-gray-900 mb-2">💼 Networking & Industry Events</p>
                <p className="text-sm text-gray-700">Connect with professionals and thought leaders</p>
              </div>
              <div className="bg-white border-l-4 border-gray-300 rounded-lg p-5">
                <p className="font-semibold text-gray-900 mb-2">🏕️ Cohort Retreats</p>
                <p className="text-sm text-gray-700">Bond with fellow scholars in meaningful ways</p>
              </div>
              <div className="bg-white border-l-4 border-gray-300 rounded-lg p-5">
                <p className="font-semibold text-gray-900 mb-2">🎉 Community Building Events</p>
                <p className="text-sm text-gray-700">Celebrate together as a vibrant community</p>
              </div>
              <div className="bg-white border-l-4 border-gray-300 rounded-lg p-5">
                <p className="font-semibold text-gray-900 mb-2">🎓 Alumni Dinner Series</p>
                <p className="text-sm text-gray-700">Special dinners for freshmen and seniors</p>
              </div>
            </div>
          </div>

          <div className="glass-card border border-yellow-200 rounded-lg p-6 md:p-8 shadow-md">
            <div className="flex items-start gap-4">
              <Icon name="Info" size={24} color="#f59e0b" className="flex-shrink-0 mt-1" />
              <div>
                <h3 className="text-lg font-semibold text-amber-900 mb-2">Applying on Behalf of a Learner?</h3>
                <p className="text-sm text-amber-800 mb-2">
                  Parents, guardians, or authorized representatives can complete this application using the learner's information. Fill in the learner's details in the application fields, and use your own contact information in the emergency contact section where appropriate.
                </p>
                <ul className="text-sm text-amber-800 list-disc list-inside space-y-1">
                  <li>Only one application per learner is allowed</li>
                  <li><strong>Only the learner</strong> is required to attend verification if awarded</li>
                  <li>Only information that appears inconsistent or suspicious will be reviewed during verification</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="space-y-6" id="universities-section">
              <div>
                <h2 className="heading-font text-2xl md:text-3xl font-bold text-orange-900 mb-2">
                  Select Your University
                </h2>
                <p className="text-base text-orange-700">
                  Choose the university you plan to attend or are currently attending. Click to begin your scholarship application. This portal supports applications for the Forty Acres Scholars Program at participating institutions.
                </p>
                <p className="text-sm text-orange-600 mt-3">
                  <strong>Not applying for a scholarship?</strong> Learn more at <a href="https://www.texasexes.org/scholarships/forty-acres-scholars-program" target="_blank" rel="noopener noreferrer" className="underline hover:text-orange-800 font-semibold">Texas Exes - Forty Acres Scholars Program</a>
                </p>
              </div>

            <div className="space-y-4">
              <h3 className="text-xl font-semibold text-orange-900 flex items-center gap-2">
                <Icon name="Building2" size={20} color="#b45309" />
                Public Universities
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {publicUniversities.map((uni) => (
                  <button
                    key={uni.slug}
                    onClick={() => handleUniversitySelect(uni.slug)}
                    disabled={selectedUniversity === uni.slug}
                    className={`p-5 rounded-xl border text-left smooth-transition transform hover:-translate-y-1 hover:shadow-lg focus:ring-2 focus:ring-orange-300 ${
                      selectedUniversity === uni.slug
                        ? 'border-orange-600 bg-white/80 shadow-md'
                        : 'border-gray-200 bg-white'
                    }`}>
                    <p className="font-semibold text-blue-700 text-sm md:text-base">
                      {uni.name}
                    </p>
                    <p className="text-xs text-blue-500 mt-1">
                      {uni.location}
                    </p>
                    {selectedUniversity === uni.slug && (
                      <div className="flex items-center gap-2 mt-3 text-orange-600 font-semibold">
                        <Icon name="Check" size={16} />
                        <span className="text-xs">Selected</span>
                      </div>
                    )}
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="text-xl font-semibold text-orange-900 flex items-center gap-2">
                <Icon name="Building" size={20} color="#b45309" />
                Qualifying Private Universities
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {privateUniversities.map((uni) => (
                  <button
                    key={uni.slug}
                    onClick={() => handleUniversitySelect(uni.slug)}
                    disabled={selectedUniversity === uni.slug}
                    className={`p-5 rounded-xl border text-left smooth-transition transform hover:-translate-y-1 hover:shadow-lg focus:ring-2 focus:ring-orange-300 ${
                      selectedUniversity === uni.slug
                        ? 'border-orange-600 bg-white/80 shadow-md'
                        : 'border-gray-200 bg-white'
                    }`}>
                    <p className="font-semibold text-blue-700 text-sm md:text-base">
                      {uni.name}
                    </p>
                    <p className="text-xs text-blue-500 mt-1">
                      {uni.location}
                    </p>
                    {selectedUniversity === uni.slug && (
                      <div className="flex items-center gap-2 mt-3 text-orange-600 font-semibold">
                        <Icon name="Check" size={16} />
                        <span className="text-xs">Selected</span>
                      </div>
                    )}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="glass-card border border-orange-100 rounded-lg p-6 md:p-8">
            <h3 className="text-lg font-semibold text-orange-900 mb-4 flex items-center gap-2">
              <Icon name="HelpCircle" size={20} color="#b45309" />
              Need Help?
            </h3>
            <p className="text-sm text-orange-800 mb-4">
              If you have questions about the Forty Acres Scholars Program, your eligibility, or need to report suspicious activity:
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white rounded p-4 border-l-4 border-orange-500">
                <p className="text-sm font-semibold text-orange-900 mb-1">Program Information</p>
                <p className="text-sm text-orange-700">
                  Visit <a href="https://www.texasexes.org/scholarships/forty-acres-scholars-program" target="_blank" rel="noopener noreferrer" className="underline hover:text-orange-900 font-semibold">Texas Exes Forty Acres Scholars</a> for detailed program information and renewal details.
                </p>
              </div>
              <div className="bg-white rounded p-4 border-l-4 border-orange-500">
                <p className="text-sm font-semibold text-orange-900 mb-1">Report Scams & Support</p>
                <p className="text-sm text-orange-700">
                  Email: <strong>support@fortyacres.org</strong> for technical support or to report suspicious activity.
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default FortyAcresInfo;
