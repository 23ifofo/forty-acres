import React, { useEffect, useState } from 'react';
import { supabase } from '../../lib/supabaseClient';
import Header from '../../components/ui/Header';
import ProgressNavigationBar from '../../components/ui/ProgressNavigationBar';
import ApplicationStatusWidget from '../../components/ui/ApplicationStatusWidget';
import DocumentStatusIndicator from '../../components/ui/DocumentStatusIndicator';
import ApplicationStatusCard from './components/ApplicationStatusCard';
import TaskChecklistCard from './components/TaskChecklistCard';
import TimelineCard from './components/TimelineCard';
import QuickActionsCard from './components/QuickActionsCard';
import ScholarshipDetailsCard from './components/ScholarshipDetailsCard';
import NotificationsCard from './components/NotificationsCard';
import CommunicationHistoryCard from './components/CommunicationHistoryCard';
import Icon from '../../components/AppIcon';
import useSelectedUniversity from '../../hooks/useSelectedUniversity';

const ApplicationDashboard = () => {
  const [uploadedDocs, setUploadedDocs] = useState(0);
  const [totalDocs, setTotalDocs] = useState(5);
  const [pendingRecs, setPendingRecs] = useState(0);

  useEffect(() => {
    const fetchApplicationCounts = async () => {
      try {
        const applicationId = localStorage.getItem('applicationId');
        if (!applicationId) return;
        const { data, error } = await supabase
          .from('applications')
          .select('uploaded_documents,total_required_documents,pending_recommendations')
          .eq('application_id', applicationId)
          .single();
        if (error) {
          console.warn('Could not load application counts:', error.message || error);
          return;
        }
        setUploadedDocs(data?.uploaded_documents ?? 0);
        setTotalDocs(data?.total_required_documents ?? 5);
        setPendingRecs(data?.pending_recommendations ?? 0);
      } catch (err) {
        console.error('Error fetching application counts:', err);
      }
    };

    fetchApplicationCounts();
  }, []);
  const selectedUniversity = useSelectedUniversity();
  const supportEmail = selectedUniversity?.email || 'support@youruniversity.edu';
  const supportPhone = selectedUniversity?.phone || '(000) 000-0000';
  const institutionName = selectedUniversity?.name || 'Your Institution';
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <ProgressNavigationBar currentSection={0} totalSections={5} />
      <ApplicationStatusWidget 
        completionPercentage={45}
        nextDeadline="2025-01-15"
        criticalNotifications={2}
      />
      <DocumentStatusIndicator
        totalDocuments={totalDocs}
        uploadedDocuments={uploadedDocs}
        pendingRecommendations={pendingRecs}
        uploadProgress={0}
      />
      <main className="mx-4 lg:mx-8 py-6 md:py-8 lg:py-12">
        <div className="mb-6 md:mb-8">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 md:w-12 md:h-12 bg-primary/10 rounded-lg flex items-center justify-center">
              <Icon name="LayoutDashboard" size={24} color="var(--color-primary)" />
            </div>
            <h1 className="text-2xl md:text-3xl lg:text-4xl font-heading font-bold text-foreground">
              Application Dashboard
            </h1>
          </div>
          <p className="text-sm md:text-base lg:text-lg text-muted-foreground ml-0 md:ml-[52px] lg:ml-[60px]">
            Track your scholarship application progress and manage all requirements in one place
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-6 lg:gap-8">
          <div className="lg:col-span-2 space-y-4 md:space-y-6 lg:space-y-8">
            <ApplicationStatusCard
              status="in_progress"
              completionPercentage={45}
              lastUpdated="2025-12-18T14:30:00"
              applicationId={localStorage.getItem('applicationId') || `APP-${Date.now()}`}
            />

            <TaskChecklistCard />

            <TimelineCard />

            <QuickActionsCard />
          </div>

          <div className="space-y-4 md:space-y-6 lg:space-y-8">
            <ScholarshipDetailsCard />

            <NotificationsCard />

            <CommunicationHistoryCard />
          </div>
        </div>

        <div className="mt-6 md:mt-8 lg:mt-12 p-4 md:p-6 bg-primary/5 border border-primary/20 rounded-lg">
          <div className="flex items-start gap-3 md:gap-4">
            <Icon name="Info" size={20} className="text-primary flex-shrink-0 mt-1" />
            <div>
              <h4 className="text-sm md:text-base font-semibold text-foreground mb-1">
                Need Help?
              </h4>
              <p className="text-xs md:text-sm text-muted-foreground mb-3">
                Our support team is available Monday through Friday, 9:00 AM - 5:00 PM CST. Contact us at {supportEmail} or call {supportPhone}.
              </p>
              <div className="flex flex-col sm:flex-row gap-2">
                <a
                  href={`mailto:${supportEmail}`}
                  className="inline-flex items-center gap-2 text-xs md:text-sm font-medium text-primary hover:underline"
                >
                  <Icon name="Mail" size={16} />
                  Email Support
                </a>
                <a
                  href="tel:+15048653240"
                  className="inline-flex items-center gap-2 text-xs md:text-sm font-medium text-primary hover:underline"
                >
                  <Icon name="Phone" size={16} />
                  Call Us
                </a>
              </div>
            </div>
          </div>
        </div>
      </main>
      <footer className="bg-card border-t border-border mt-12 md:mt-16 lg:mt-20">
        <div className="mx-4 lg:mx-8 py-6 md:py-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-primary/10 rounded-md flex items-center justify-center">
                <Icon name="GraduationCap" size={20} color="var(--color-primary)" />
              </div>
              <div className="text-center md:text-left">
                <p className="text-sm font-semibold text-foreground">
                  {institutionName}
                </p>
                <p className="text-xs text-muted-foreground">
                  Scholarship Portal
                </p>
              </div>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-4 md:gap-6 text-xs md:text-sm text-muted-foreground">
              <a href="#" className="hover:text-primary smooth-transition">
                Privacy Policy
              </a>
              <a href="#" className="hover:text-primary smooth-transition">
                Terms of Service
              </a>
              <a href="#" className="hover:text-primary smooth-transition">
                FERPA Compliance
              </a>
              <a href="#" className="hover:text-primary smooth-transition">
                Contact Us
              </a>
            </div>
          </div>

          <div className="mt-6 pt-6 border-t border-border text-center">
            <p className="text-xs text-muted-foreground">
              &copy; {new Date()?.getFullYear()} {institutionName}. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default ApplicationDashboard;