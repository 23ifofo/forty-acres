import React, { useState, useRef } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const DragDropUploadZone = ({ onFilesSelected, acceptedFormats, maxSize }) => {
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef(null);

  const handleDragEnter = (e) => {
    e?.preventDefault();
    e?.stopPropagation();
    setIsDragging(true);
  };

  const handleDragLeave = (e) => {
    e?.preventDefault();
    e?.stopPropagation();
    setIsDragging(false);
  };

  const handleDragOver = (e) => {
    e?.preventDefault();
    e?.stopPropagation();
  };

  const handleDrop = (e) => {
    e?.preventDefault();
    e?.stopPropagation();
    setIsDragging(false);

    const files = Array.from(e?.dataTransfer?.files);
    if (files?.length > 0) {
      onFilesSelected(files);
    }
  };

  const handleFileInputChange = (e) => {
    const files = Array.from(e?.target?.files);
    if (files?.length > 0) {
      onFilesSelected(files);
    }
  };

  const handleBrowseClick = () => {
    fileInputRef?.current?.click();
  };

  return (
    <div
      onDragEnter={handleDragEnter}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      className={`border-2 border-dashed rounded-lg p-6 md:p-8 lg:p-12 smooth-transition ${
        isDragging
          ? 'border-primary bg-primary/5' :'border-border bg-muted/30 hover:border-primary/50 hover:bg-muted/50'
      }`}
    >
      <input
        ref={fileInputRef}
        type="file"
        multiple
        accept={acceptedFormats}
        onChange={handleFileInputChange}
        className="hidden"
      />

      <div className="flex flex-col items-center justify-center text-center">
        <div className={`w-16 h-16 md:w-20 md:h-20 rounded-full flex items-center justify-center mb-4 smooth-transition ${
          isDragging ? 'bg-primary/10' : 'bg-muted'
        }`}>
          <Icon 
            name="Upload" 
            size={32} 
            color={isDragging ? 'var(--color-primary)' : 'var(--color-muted-foreground)'} 
          />
        </div>

        <h3 className="text-lg md:text-xl font-heading font-semibold text-foreground mb-2">
          {isDragging ? 'Drop files here' : 'Drag & drop files here'}
        </h3>

        <p className="text-sm md:text-base text-muted-foreground mb-4">
          or click to browse from your device
        </p>

        <Button
          variant="default"
          size="lg"
          iconName="FolderOpen"
          iconPosition="left"
          onClick={handleBrowseClick}
        >
          Browse Files
        </Button>

        <div className="mt-6 space-y-2">
          <p className="text-xs md:text-sm text-muted-foreground">
            <strong>Accepted formats:</strong> {acceptedFormats}
          </p>
          <p className="text-xs md:text-sm text-muted-foreground">
            <strong>Maximum file size:</strong> {maxSize}
          </p>
        </div>
      </div>
    </div>
  );
};

export default DragDropUploadZone;