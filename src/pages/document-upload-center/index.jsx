import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/ui/Header';
import { supabase } from '../../lib/supabaseClient';
import ProgressNavigationBar from '../../components/ui/ProgressNavigationBar';
import ApplicationStatusWidget from '../../components/ui/ApplicationStatusWidget';
import DocumentStatusIndicator from '../../components/ui/DocumentStatusIndicator';
import DocumentCategoryCard from './components/DocumentCategoryCard';
import UploadedDocumentItem from './components/UploadedDocumentItem';
import DragDropUploadZone from './components/DragDropUploadZone';
import RecommendationLetterManager from './components/RecommendationLetterManager';
import UploadProgressModal from './components/UploadProgressModal';
import DocumentCompletionPanel from './components/DocumentCompletionPanel';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';

const DocumentUploadCenter = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('all');
  const [uploadQueue, setUploadQueue] = useState([]);
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [documentCategories, setDocumentCategories] = useState([]);
  const [uploadedDocuments, setUploadedDocuments] = useState([]);
  const [recommendations, setRecommendations] = useState([]);
  const [loading, setLoading] = useState(true);

  // Load data from localStorage and Supabase
  useEffect(() => {
    const loadData = async () => {
      try {
        // Load from localStorage first
        const storedFormData = localStorage.getItem('applicationFormData');
        const applicationId = localStorage.getItem('applicationId');
        const formData = storedFormData ? JSON.parse(storedFormData) : {};

        // Default category templates
        const categoryTemplates = [
          { id: 1, name: 'Academic Transcripts', icon: 'GraduationCap', requiredCount: 2, acceptedFormats: 'PDF, JPG', maxSize: '10MB', deadline: 'January 15, 2025' },
          { id: 2, name: 'Resume/CV', icon: 'FileText', requiredCount: 1, acceptedFormats: 'PDF, DOC, DOCX', maxSize: '5MB', deadline: 'January 15, 2025' },
          { id: 3, name: 'Portfolio Samples', icon: 'Image', requiredCount: 3, acceptedFormats: 'PDF, JPG, PNG', maxSize: '10MB', deadline: 'January 20, 2025' },
          { id: 4, name: 'Research Proposals', icon: 'BookOpen', requiredCount: 1, acceptedFormats: 'PDF, DOC, DOCX', maxSize: '10MB', deadline: 'January 20, 2025' },
          { id: 5, name: 'Awards & Honors', icon: 'Award', requiredCount: 1, acceptedFormats: 'PDF, JPG', maxSize: '5MB', deadline: 'January 25, 2025' }
        ];

        // Get documents from stored form data
        const savedDocuments = Array.isArray(formData?.documents) ? formData.documents : [];

        // Build categories with upload counts
        const builtCategories = categoryTemplates.map((t) => {
          const uploadedCount = savedDocuments.filter(d => d?.category === t.name && d?.status !== 'deleted').length;
          return { ...t, uploadedCount };
        });

        setDocumentCategories(builtCategories);
        setUploadedDocuments(savedDocuments.length > 0 ? savedDocuments : []);

        // Get recommendations from form data (if any were invited)
        const savedRecommendations = Array.isArray(formData?.recommendations) ? formData.recommendations : [];
        setRecommendations(savedRecommendations);

        // Try to fetch from Supabase if applicationId exists
        if (applicationId && supabase) {
          try {
            const { data, error } = await supabase
              .from('applications')
              .select('documents, recommendations')
              .eq('application_id', applicationId)
              .single();

            if (data && !error) {
              // Merge Supabase data with local data
              const supabaseDocuments = Array.isArray(data?.documents) ? data.documents : [];
              if (supabaseDocuments.length > 0) {
                setUploadedDocuments(supabaseDocuments);
              }
              const supabaseRecs = Array.isArray(data?.recommendations) ? data.recommendations : [];
              if (supabaseRecs.length > 0) {
                setRecommendations(supabaseRecs);
              }
            }
          } catch (err) {
            console.warn('Could not fetch from Supabase:', err);
          }
        }

        setLoading(false);
      } catch (err) {
        console.error('Error loading document data:', err);
        setLoading(false);
      }
    };

    loadData();
  }, []);

  const handleFilesSelected = async (files, category = 'General') => {
    if (!files || files.length === 0) return;
    const applicationId = localStorage.getItem('applicationId') || `APP-${Date.now()}`;
    if (!localStorage.getItem('applicationId')) localStorage.setItem('applicationId', applicationId);

    const uploads = Array.from(files).map((file, idx) => ({
      id: `${Date.now()}-${idx}`,
      file,
      name: file.name,
      size: file.size,
      progress: 0,
      error: null,
      category
    }));

    setUploadQueue((prev) => [...uploads, ...(prev || [])]);
    setShowUploadModal(true);

    // perform uploads sequentially to avoid overwhelming the client
    for (const u of uploads) {
      await uploadFile(u, applicationId);
    }
  };

  const uploadFile = async (uploadItem, applicationId) => {
    const bucket = 'documents';
    const file = uploadItem.file;
    const fileExt = file.name?.split('.')?.pop() || 'pdf';
    const storagePath = `${applicationId}/${uploadItem.category}/${Date.now()}-${file.name}`;

    // set in-queue
    setUploadQueue((prev) => prev?.map(u => u.id === uploadItem.id ? { ...u, progress: 5 } : u));

    try {
      const { error: uploadError } = await supabase.storage.from(bucket).upload(storagePath, file, { upsert: true });
      if (uploadError) throw uploadError;

      // get public URL (note: bucket must allow public access or use signed URLs)
      const { data: publicData } = supabase.storage.from(bucket).getPublicUrl(storagePath);
      const publicUrl = publicData?.publicUrl || null;

      const docMeta = {
        id: `${Date.now()}-${Math.random().toString(36).slice(2,8)}`,
        name: file.name,
        size: file.size,
        category: uploadItem.category,
        storagePath,
        url: publicUrl,
        uploadedAt: new Date().toISOString(),
        status: 'uploaded'
      };

      // update local state
      setUploadedDocuments((prev) => [docMeta, ...(prev || [])]);

      // persist to Supabase applications.documents if application exists
      try {
        const { data: existing, error: fetchErr } = await supabase
          .from('applications')
          .select('documents')
          .eq('application_id', applicationId)
          .single();

        const existingDocs = (existing && Array.isArray(existing.documents)) ? existing.documents : [];
        const newDocs = [docMeta, ...existingDocs];

        if (fetchErr) {
          // no existing record; save docs to localStorage applicationFormData as fallback
          const storedFormData = localStorage.getItem('applicationFormData');
          const formData = storedFormData ? JSON.parse(storedFormData) : {};
          formData.documents = newDocs;
          localStorage.setItem('applicationFormData', JSON.stringify(formData));
        } else {
          const { error: updateErr } = await supabase
            .from('applications')
            .update({ documents: newDocs })
            .eq('application_id', applicationId);
          if (updateErr) {
            console.warn('Failed to update application documents:', updateErr.message || updateErr);
          }
        }
      } catch (err) {
        console.warn('Could not persist document metadata to Supabase:', err);
      }

      // mark progress complete
      setUploadQueue((prev) => prev?.map(u => u.id === uploadItem.id ? { ...u, progress: 100 } : u));
    } catch (err) {
      console.error('Upload failed', err);
      setUploadQueue((prev) => prev?.map(u => u.id === uploadItem.id ? { ...u, progress: 0, error: err?.message || String(err) } : u));
    }
  };

  const handleCancelUpload = (uploadId) => {
    // note: cannot cancel Supabase upload mid-flight without AbortController; just remove from UI
    setUploadQueue((prev) => prev?.filter((upload) => upload?.id !== uploadId));
  };

  const handleCloseUploadModal = () => {
    setShowUploadModal(false);
    setUploadQueue([]);
  };

  const handleDeleteDocument = async (docId) => {
    try {
      const applicationId = localStorage.getItem('applicationId');
      // remove from state
      setUploadedDocuments((prev) => prev?.filter(d => d?.id !== docId));

      // update DB record if exists
      if (applicationId) {
        const { data: existing } = await supabase.from('applications').select('documents').eq('application_id', applicationId).single();
        const existingDocs = (existing && Array.isArray(existing.documents)) ? existing.documents : [];
        const newDocs = existingDocs.filter(d => d?.id !== docId);
        await supabase.from('applications').update({ documents: newDocs }).eq('application_id', applicationId);
      } else {
        const storedFormData = localStorage.getItem('applicationFormData');
        const formData = storedFormData ? JSON.parse(storedFormData) : {};
        formData.documents = (formData.documents || []).filter(d => d?.id !== docId);
        localStorage.setItem('applicationFormData', JSON.stringify(formData));
      }
    } catch (err) {
      console.error('Error deleting document metadata:', err);
    }
  };

  const handlePreviewDocument = (document) => {
    if (document?.url) {
      window.open(document.url, '_blank');
      return;
    }
    console.log('Preview document (no URL):', document);
  };

  const handleUploadClick = (category) => {
    // open file picker for that category
    const input = document.createElement('input');
    input.type = 'file';
    input.multiple = true;
    input.accept = '.pdf,.doc,.docx,.jpg,.jpeg,.png';
    input.onchange = (e) => {
      const files = Array.from(e.target.files || []);
      handleFilesSelected(files, category?.name || 'General');
    };
    input.click();
  };

  const handleViewClick = (category) => {
    console.log('View category:', category);
  };

  const handleSendInvitation = async (inviteData) => {
    try {
      const applicationId = localStorage.getItem('applicationId') || `APP-${Date.now()}`;
      if (!localStorage.getItem('applicationId')) localStorage.setItem('applicationId', applicationId);

      const rec = {
        id: `${Date.now()}-${Math.random().toString(36).slice(2,8)}`,
        name: inviteData?.name,
        email: inviteData?.email,
        relationship: inviteData?.relationship || null,
        status: 'invited',
        invitedAt: new Date().toISOString(),
        remindersSent: 0
      };

      setRecommendations((prev) => [rec, ...(prev || [])]);

      // persist to Supabase applications.recommendations
      try {
        const { data: existing, error: fetchErr } = await supabase
          .from('applications')
          .select('recommendations')
          .eq('application_id', applicationId)
          .single();

        const existingRecs = (existing && Array.isArray(existing.recommendations)) ? existing.recommendations : [];
        const newRecs = [rec, ...existingRecs];

        if (fetchErr) {
          const storedFormData = localStorage.getItem('applicationFormData');
          const formData = storedFormData ? JSON.parse(storedFormData) : {};
          formData.recommendations = newRecs;
          localStorage.setItem('applicationFormData', JSON.stringify(formData));
        } else {
          const { error: updateErr } = await supabase
            .from('applications')
            .update({ recommendations: newRecs })
            .eq('application_id', applicationId);
          if (updateErr) console.warn('Failed to persist recommendation invite:', updateErr.message || updateErr);
        }
      } catch (err) {
        console.warn('Could not persist recommendation invite to Supabase:', err);
      }

      // Note: actual email sending should be handled by a backend worker or Supabase function.
    } catch (err) {
      console.error('Failed to send invitation:', err);
    }
  };

  const handleResendReminder = async (recId) => {
    try {
      setRecommendations((prev) => prev?.map(r => r?.id === recId ? { ...r, remindersSent: (r?.remindersSent || 0) + 1, lastReminderAt: new Date().toISOString() } : r));
      const applicationId = localStorage.getItem('applicationId');
      if (applicationId) {
        const { data: existing } = await supabase.from('applications').select('recommendations').eq('application_id', applicationId).single();
        const existingRecs = (existing && Array.isArray(existing.recommendations)) ? existing.recommendations : [];
        const newRecs = existingRecs.map(r => r?.id === recId ? { ...r, remindersSent: (r?.remindersSent || 0) + 1, lastReminderAt: new Date().toISOString() } : r);
        await supabase.from('applications').update({ recommendations: newRecs }).eq('application_id', applicationId);
      } else {
        const storedFormData = localStorage.getItem('applicationFormData');
        const formData = storedFormData ? JSON.parse(storedFormData) : {};
        formData.recommendations = (formData.recommendations || []).map(r => r?.id === recId ? { ...r, remindersSent: (r?.remindersSent || 0) + 1, lastReminderAt: new Date().toISOString() } : r);
        localStorage.setItem('applicationFormData', JSON.stringify(formData));
      }
    } catch (err) {
      console.error('Failed to resend reminder:', err);
    }
  };

  const handleNavigateToApplication = () => {
    navigate('/application-form');
  };

  const tabs = [
    { id: 'all', label: 'All Documents', icon: 'Files' },
    { id: 'transcripts', label: 'Transcripts', icon: 'GraduationCap' },
    { id: 'portfolio', label: 'Portfolio', icon: 'Image' },
    { id: 'recommendations', label: 'Recommendations', icon: 'Mail' }
  ];

  // Compute totals from dynamic data
  const totalRequired = documentCategories?.reduce((sum, cat) => sum + cat?.requiredCount, 0) || 0;
  const totalUploaded = documentCategories?.reduce((sum, cat) => sum + cat?.uploadedCount, 0) || 0;
  const missingDocuments = documentCategories?.filter((cat) => cat?.uploadedCount < cat?.requiredCount)?.map((cat) => `${cat?.name} (${cat?.requiredCount - cat?.uploadedCount} remaining)`) || [];

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Header />
        <div className="text-center">
          <Icon name="FileText" size={48} color="var(--color-muted-foreground)" className="mx-auto mb-4 animate-pulse" />
          <p className="text-muted-foreground">Loading documents...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <ProgressNavigationBar currentSection={2} totalSections={5} />
      <ApplicationStatusWidget
        completionPercentage={totalRequired > 0 ? Math.round((totalUploaded / totalRequired) * 100) : 0}
        nextDeadline="2025-01-15"
        criticalNotifications={missingDocuments.length > 0 ? 1 : 0}
      />

      <DocumentStatusIndicator
        totalDocuments={totalRequired}
        uploadedDocuments={totalUploaded}
        pendingRecommendations={recommendations?.filter((r) => r?.status !== 'submitted')?.length || 0}
        uploadProgress={0}
      />

      <main className="mx-4 lg:mx-8 py-6 md:py-8 lg:py-12">
        <div className="mb-6 md:mb-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-4">
            <div>
              <h1 className="text-2xl md:text-3xl lg:text-4xl font-heading font-bold text-foreground mb-2">
                Document Upload Center
              </h1>
              <p className="text-sm md:text-base text-muted-foreground">
                Upload and manage all required supporting documents for your scholarship application
              </p>
            </div>
            <Button
              variant="default"
              size="lg"
              iconName="Send"
              iconPosition="left"
              onClick={() => console.log('Send bulk reminders')}>

              <span className="hidden sm:inline">Send Reminders</span>
              <span className="sm:hidden">Remind</span>
            </Button>
          </div>

          <div className="flex items-center gap-2 overflow-x-auto pb-2">
            {tabs?.map((tab) =>
            <button
              key={tab?.id}
              onClick={() => setActiveTab(tab?.id)}
              className={`flex items-center gap-2 px-4 py-2 rounded-md whitespace-nowrap smooth-transition ${
              activeTab === tab?.id ?
              'bg-primary text-primary-foreground' :
              'bg-muted text-foreground hover:bg-muted/80'}`
              }>

                <Icon name={tab?.icon} size={18} />
                <span className="text-sm font-medium">{tab?.label}</span>
              </button>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8">
          <div className="lg:col-span-2 space-y-6 md:space-y-8">
            <DragDropUploadZone
              onFilesSelected={handleFilesSelected}
              acceptedFormats=".pdf,.doc,.docx,.jpg,.jpeg,.png"
              maxSize="10MB" />


            <div>
              <h2 className="text-xl md:text-2xl font-heading font-semibold text-foreground mb-4">
                Document Categories
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {documentCategories?.map((category) =>
                <DocumentCategoryCard
                  key={category?.id}
                  category={category}
                  onUploadClick={handleUploadClick}
                  onViewClick={handleViewClick} />

                )}
              </div>
            </div>

            <div>
              <h2 className="text-xl md:text-2xl font-heading font-semibold text-foreground mb-4">
                Uploaded Documents
              </h2>
              <div className="space-y-3">
                {uploadedDocuments?.map((document) =>
                <UploadedDocumentItem
                  key={document?.id}
                  document={document}
                  onDelete={handleDeleteDocument}
                  onPreview={handlePreviewDocument} />

                )}
              </div>
            </div>

            <RecommendationLetterManager
              recommendations={recommendations}
              onSendInvitation={handleSendInvitation}
              onResendReminder={handleResendReminder} />

          </div>

          <div className="lg:col-span-1">
            <DocumentCompletionPanel
              totalRequired={totalRequired}
              totalUploaded={totalUploaded}
              missingDocuments={missingDocuments}
              onNavigateToApplication={handleNavigateToApplication} />

          </div>
        </div>
      </main>
      {showUploadModal &&
      <UploadProgressModal
        uploads={uploadQueue}
        onClose={handleCloseUploadModal}
        onCancelUpload={handleCancelUpload} />

      }
    </div>);

};

export default DocumentUploadCenter;