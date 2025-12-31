import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Icon from '../AppIcon';
import Button from './Button';

const DocumentStatusIndicator = ({
  totalDocuments = 5,
  uploadedDocuments = 3,
  pendingRecommendations = 2,
  uploadProgress = 0
}) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isExpanded, setIsExpanded] = useState(false);

  const isDocumentCenter = location?.pathname === '/document-upload-center';
  
  if (isDocumentCenter) return null;

  const missingDocuments = totalDocuments - uploadedDocuments;
  const hasIncompleteItems = missingDocuments > 0 || pendingRecommendations > 0;
  const isUploading = uploadProgress > 0 && uploadProgress < 100;

  const handleNavigateToDocuments = () => {
    navigate('/document-upload-center');
  };

  return (
    <>
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className={`lg:hidden fixed bottom-20 right-4 z-75 rounded-full p-4 shadow-lg smooth-transition hover-lift press-scale ${
          hasIncompleteItems
            ? 'bg-warning text-warning-foreground'
            : 'bg-success text-success-foreground'
        }`}
        aria-label="Document status"
      >
        <div className="relative">
          <Icon name={isUploading ? 'Upload' : 'FileText'} size={24} />
          {hasIncompleteItems && (
            <span className="absolute -top-2 -right-2 bg-error text-error-foreground text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
              {missingDocuments + pendingRecommendations}
            </span>
          )}
        </div>
      </button>

      <div className="hidden lg:block fixed top-[76px] right-[336px] z-75 bg-card border border-border rounded-lg shadow-lg p-4 w-64">
        <div className="flex items-center justify-between mb-3">
          <h4 className="text-sm font-heading font-semibold text-foreground">
            Documents
          </h4>
          <Button
            variant="ghost"
            size="xs"
            onClick={handleNavigateToDocuments}
            iconName="ExternalLink"
            iconSize={14}
          >
            Manage
          </Button>
        </div>

        <div className="space-y-3">
          {isUploading && (
            <div>
              <div className="flex items-center justify-between mb-1">
                <span className="text-xs font-caption text-muted-foreground">
                  Uploading...
                </span>
                <span className="text-xs font-medium text-foreground">
                  {uploadProgress}%
                </span>
              </div>
              <div className="h-2 bg-muted rounded-full overflow-hidden">
                <div
                  className="h-full bg-primary smooth-transition"
                  style={{ width: `${uploadProgress}%` }}
                />
              </div>
            </div>
          )}

          <div className="flex items-center gap-2 p-2 bg-muted rounded-md">
            <Icon
              name={uploadedDocuments === totalDocuments ? 'CheckCircle' : 'FileText'}
              size={16}
              color={uploadedDocuments === totalDocuments ? 'var(--color-success)' : 'var(--color-foreground)'}
            />
            <div className="flex-1">
              <p className="text-xs font-caption text-muted-foreground">
                Uploaded
              </p>
              <p className="text-sm font-medium text-foreground">
                {uploadedDocuments} of {totalDocuments}
              </p>
            </div>
          </div>

          {missingDocuments > 0 && (
            <div className="flex items-center gap-2 p-2 bg-warning/10 rounded-md">
              <Icon name="AlertCircle" size={16} color="var(--color-warning)" />
              <div className="flex-1">
                <p className="text-sm font-medium text-warning">
                  {missingDocuments} Missing
                </p>
                <p className="text-xs text-muted-foreground">
                  Upload required
                </p>
              </div>
            </div>
          )}

          {pendingRecommendations > 0 && (
            <div className="flex items-center gap-2 p-2 bg-warning/10 rounded-md">
              <Icon name="Mail" size={16} color="var(--color-warning)" />
              <div className="flex-1">
                <p className="text-sm font-medium text-warning">
                  {pendingRecommendations} Pending
                </p>
                <p className="text-xs text-muted-foreground">
                  Recommendations
                </p>
              </div>
            </div>
          )}
        </div>
      </div>

      {isExpanded && (
        <div className="lg:hidden fixed inset-0 z-200 bg-background">
          <div className="h-full flex flex-col">
            <div className="flex items-center justify-between p-4 border-b border-border">
              <h3 className="text-lg font-heading font-semibold text-foreground">
                Document Status
              </h3>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsExpanded(false)}
              >
                <Icon name="X" size={24} />
              </Button>
            </div>

            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {isUploading && (
                <div className="p-4 bg-card border border-border rounded-lg">
                  <div className="flex items-center gap-3 mb-2">
                    <Icon name="Upload" size={24} color="var(--color-primary)" />
                    <div className="flex-1">
                      <p className="text-sm font-caption text-muted-foreground">
                        Upload Progress
                      </p>
                      <p className="text-xl font-heading font-semibold text-foreground">
                        {uploadProgress}%
                      </p>
                    </div>
                  </div>
                  <div className="h-3 bg-muted rounded-full overflow-hidden">
                    <div
                      className="h-full bg-primary smooth-transition"
                      style={{ width: `${uploadProgress}%` }}
                    />
                  </div>
                </div>
              )}

              <div className="p-4 bg-card border border-border rounded-lg">
                <div className="flex items-center gap-3 mb-2">
                  <Icon
                    name={uploadedDocuments === totalDocuments ? 'CheckCircle' : 'FileText'}
                    size={24}
                    color={uploadedDocuments === totalDocuments ? 'var(--color-success)' : 'var(--color-primary)'}
                  />
                  <div className="flex-1">
                    <p className="text-sm font-caption text-muted-foreground">
                      Documents Uploaded
                    </p>
                    <p className="text-xl font-heading font-semibold text-foreground">
                      {uploadedDocuments} of {totalDocuments}
                    </p>
                  </div>
                </div>
              </div>

              {missingDocuments > 0 && (
                <div className="p-4 bg-warning/10 border border-warning rounded-lg">
                  <div className="flex items-center gap-3 mb-2">
                    <Icon name="AlertCircle" size={24} color="var(--color-warning)" />
                    <div className="flex-1">
                      <p className="text-lg font-semibold text-warning">
                        {missingDocuments} Missing {missingDocuments === 1 ? 'Document' : 'Documents'}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        Upload required to complete application
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {pendingRecommendations > 0 && (
                <div className="p-4 bg-warning/10 border border-warning rounded-lg">
                  <div className="flex items-center gap-3 mb-2">
                    <Icon name="Mail" size={24} color="var(--color-warning)" />
                    <div className="flex-1">
                      <p className="text-lg font-semibold text-warning">
                        {pendingRecommendations} Pending {pendingRecommendations === 1 ? 'Recommendation' : 'Recommendations'}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        Awaiting submission from recommenders
                      </p>
                    </div>
                  </div>
                </div>
              )}

              <Button
                variant="default"
                fullWidth
                onClick={handleNavigateToDocuments}
                iconName="ExternalLink"
                iconPosition="right"
              >
                Manage Documents
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default DocumentStatusIndicator;