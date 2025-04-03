
import React, { useState, useCallback } from 'react';
import { Upload } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";

interface PDFUploaderProps {
  onFileUpload: (file: File) => void;
}

const PDFUploader: React.FC<PDFUploaderProps> = ({ onFileUpload }) => {
  const [isDragging, setIsDragging] = useState(false);
  const { toast } = useToast();
  
  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback(() => {
    setIsDragging(false);
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    
    const files = e.dataTransfer.files;
    if (files.length) {
      const file = files[0];
      if (file.type === 'application/pdf') {
        onFileUpload(file);
      } else {
        toast({
          title: "Invalid file type",
          description: "Please upload a PDF document",
          variant: "destructive"
        });
      }
    }
  }, [onFileUpload, toast]);

  const handleFileChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      const file = files[0];
      if (file.type === 'application/pdf') {
        onFileUpload(file);
      } else {
        toast({
          title: "Invalid file type",
          description: "Please upload a PDF document",
          variant: "destructive"
        });
      }
    }
  }, [onFileUpload, toast]);

  return (
    <div 
      className={`glass-card flex flex-col items-center justify-center p-12 transition-all duration-300 ${isDragging ? 'border-brainy-lightPurple' : 'border-white/20'}`} 
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
      <div className="rounded-full bg-brainy-lightPurple/20 p-4 mb-6">
        <Upload size={36} className="text-brainy-accent" />
      </div>
      <h3 className="text-xl font-medium mb-2">Upload PDF file</h3>
      <p className="text-brainy-text/70 text-sm mb-6">Drag and drop or click to browse</p>
      
      <label className="glass-button-accent cursor-pointer">
        <input
          type="file"
          accept=".pdf"
          onChange={handleFileChange}
          className="hidden"
        />
        <span>Select PDF</span>
      </label>
    </div>
  );
};

export default PDFUploader;
