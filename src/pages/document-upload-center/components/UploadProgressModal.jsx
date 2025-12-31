import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const UploadProgressModal = ({ uploads, onClose, onCancelUpload }) => {
  if (uploads?.length === 0) return null;

  const allCompleted = uploads?.every(upload => upload?.progress === 100);
  const hasErrors = uploads?.some(upload => upload?.error);

  return (
    <div className="fixed inset-0 z-200 bg-background/80 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-card border border-border rounded-lg shadow-xl w-full max-w-2xl max-h-[80vh] flex flex-col">
        <div className="flex items-center justify-between p-4 md:p-6 border-b border-border">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-primary/10 rounded-md flex items-center justify-center">
              <Icon name="Upload" size={24} color="var(--color-primary)" />
            </div>
            <div>
              <h3 className="text-lg md:text-xl font-heading font-semibold text-foreground">
                {allCompleted ? 'Upload Complete' : 'Uploading Files'}
              </h3>
              <p className="text-xs md:text-sm text-muted-foreground">
                {uploads?.filter(u => u?.progress === 100)?.length} of {uploads?.length} completed
              </p>
            </div>
          </div>
          {allCompleted && (
            <Button variant="ghost" size="icon" onClick={onClose}>
              <Icon name="X" size={24} />
            </Button>
          )}
        </div>

        <div className="flex-1 overflow-y-auto p-4 md:p-6 space-y-4">
          {uploads?.map((upload) => (
            <div key={upload?.id} className="space-y-2">
              <div className="flex items-center justify-between gap-3">
                <div className="flex items-center gap-3 flex-1 min-w-0">
                  <Icon
                    name={
                      upload?.error ? 'XCircle' :
                      upload?.progress === 100 ? 'CheckCircle' : 'File'
                    }
                    size={20}
                    color={
                      upload?.error ? 'var(--color-error)' :
                      upload?.progress === 100 ? 'var(--color-success)' : 'var(--color-primary)'
                    }
                  />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm md:text-base font-medium text-foreground truncate">
                      {upload?.name}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {(upload?.size / 1048576)?.toFixed(2)} MB
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-xs md:text-sm font-medium text-foreground whitespace-nowrap">
                    {upload?.progress}%
                  </span>
                  {upload?.progress < 100 && !upload?.error && (
                    <Button
                      variant="ghost"
                      size="xs"
                      iconName="X"
                      onClick={() => onCancelUpload(upload?.id)}
                    />
                  )}
                </div>
              </div>

              {!upload?.error ? (
                <div className="h-2 bg-muted rounded-full overflow-hidden">
                  <div
                    className={`h-full smooth-transition ${
                      upload?.progress === 100 ? 'bg-success' : 'bg-primary'
                    }`}
                    style={{ width: `${upload?.progress}%` }}
                  />
                </div>
              ) : (
                <div className="flex items-center gap-2 p-2 bg-error/10 rounded-md">
                  <Icon name="AlertCircle" size={16} color="var(--color-error)" />
                  <p className="text-xs md:text-sm text-error">{upload?.error}</p>
                </div>
              )}
            </div>
          ))}
        </div>

        {allCompleted && (
          <div className="p-4 md:p-6 border-t border-border">
            <Button variant="default" fullWidth onClick={onClose}>
              Done
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default UploadProgressModal;