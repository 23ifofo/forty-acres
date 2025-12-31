import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const UploadedDocumentItem = ({ document, onDelete, onPreview }) => {
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  const getFileIcon = (type) => {
    if (type?.includes('pdf')) return 'FileText';
    if (type?.includes('image')) return 'Image';
    if (type?.includes('word') || type?.includes('doc')) return 'FileType';
    return 'File';
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'verified': return 'success';
      case 'pending': return 'warning';
      case 'rejected': return 'error';
      default: return 'muted';
    }
  };

  const formatFileSize = (bytes) => {
    if (bytes < 1024) return bytes + ' B';
    if (bytes < 1048576) return (bytes / 1024)?.toFixed(1) + ' KB';
    return (bytes / 1048576)?.toFixed(1) + ' MB';
  };

  const formatDate = (dateString) => {
    return new Date(dateString)?.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const statusColor = getStatusColor(document?.status);

  return (
    <div className="bg-card border border-border rounded-lg p-4 smooth-transition hover:shadow-md">
      <div className="flex items-start gap-3 md:gap-4">
        {document?.thumbnail ? (
          <div className="w-12 h-12 md:w-16 md:h-16 flex-shrink-0 rounded-md overflow-hidden bg-muted">
            <Image
              src={document?.thumbnail}
              alt={document?.thumbnailAlt}
              className="w-full h-full object-cover"
            />
          </div>
        ) : (
          <div className="w-12 h-12 md:w-16 md:h-16 flex-shrink-0 rounded-md bg-muted flex items-center justify-center">
            <Icon name={getFileIcon(document?.type)} size={24} color="var(--color-muted-foreground)" />
          </div>
        )}

        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2 mb-2">
            <div className="flex-1 min-w-0">
              <h4 className="text-sm md:text-base font-medium text-foreground truncate">
                {document?.name}
              </h4>
              <p className="text-xs md:text-sm text-muted-foreground">
                {formatFileSize(document?.size)} • {formatDate(document?.uploadedAt)}
              </p>
            </div>
            <div className={`flex items-center gap-1 px-2 py-1 rounded-md text-xs font-medium whitespace-nowrap ${
              statusColor === 'success' ? 'bg-success/10 text-success' :
              statusColor === 'warning' ? 'bg-warning/10 text-warning' :
              statusColor === 'error'? 'bg-error/10 text-error' : 'bg-muted text-muted-foreground'
            }`}>
              <Icon 
                name={
                  statusColor === 'success' ? 'CheckCircle' :
                  statusColor === 'warning' ? 'Clock' :
                  statusColor === 'error' ? 'XCircle' : 'Circle'
                } 
                size={14} 
              />
              <span className="hidden sm:inline">{document?.status}</span>
            </div>
          </div>

          {document?.category && (
            <p className="text-xs text-muted-foreground mb-3">
              Category: {document?.category}
            </p>
          )}

          <div className="flex flex-wrap gap-2">
            <Button
              variant="outline"
              size="xs"
              iconName="Eye"
              iconPosition="left"
              onClick={() => onPreview(document)}
            >
              Preview
            </Button>
            <Button
              variant="outline"
              size="xs"
              iconName="Download"
              iconPosition="left"
            >
              Download
            </Button>
            {!showDeleteConfirm ? (
              <Button
                variant="ghost"
                size="xs"
                iconName="Trash2"
                iconPosition="left"
                onClick={() => setShowDeleteConfirm(true)}
              >
                Delete
              </Button>
            ) : (
              <div className="flex gap-2">
                <Button
                  variant="destructive"
                  size="xs"
                  onClick={() => {
                    onDelete(document?.id);
                    setShowDeleteConfirm(false);
                  }}
                >
                  Confirm
                </Button>
                <Button
                  variant="ghost"
                  size="xs"
                  onClick={() => setShowDeleteConfirm(false)}
                >
                  Cancel
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UploadedDocumentItem;