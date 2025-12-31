import React from "react";
import { BrowserRouter, Routes as RouterRoutes, Route } from "react-router-dom";
import ScrollToTop from "components/ScrollToTop";
import ErrorBoundary from "components/ErrorBoundary";
import NotFound from "pages/NotFound";
import LOSFAInfo from './pages/losfa-info';
import ApplicationForm from './pages/application-form';
import ApplicationDashboard from './pages/application-dashboard';
import Login from './pages/login';
import ApplicationConfirmation from './pages/application-confirmation';
import DocumentUploadCenter from './pages/document-upload-center';

const Routes = () => {
  return (
    <BrowserRouter>
      <ErrorBoundary>
      <ScrollToTop />
      <RouterRoutes>
        {/* LOSFA landing page with university selection */}
        <Route path="/" element={<LOSFAInfo />} />
        <Route path="/losfa" element={<LOSFAInfo />} />
        <Route path="/application-form" element={<ApplicationForm />} />
        <Route path="/application-dashboard" element={<ApplicationDashboard />} />
        <Route path="/login" element={<Login />} />
        <Route path="/application-confirmation" element={<ApplicationConfirmation />} />
        <Route path="/document-upload-center" element={<DocumentUploadCenter />} />
        <Route path="*" element={<NotFound />} />
      </RouterRoutes>
      </ErrorBoundary>
    </BrowserRouter>
  );
};

export default Routes;
