
import React, { useState } from 'react';
import { FileText, X, Loader2 } from 'lucide-react';

interface PDFPreviewProps {
  file: File;
  onClose: () => void;
}

const PDFPreview: React.FC<PDFPreviewProps> = ({ file, onClose }) => {
  const [isLoading, setIsLoading] = useState(true);
  const fileUrl = URL.createObjectURL(file);
  
  setTimeout(() => setIsLoading(false), 1500); // Simulate loading for demo purposes
  
  return (
    <div className="glass-card mb-6">
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center gap-2">
          <FileText className="text-brainy-accent" />
          <h3 className="font-medium">{file.name}</h3>
        </div>
        <button 
          onClick={onClose}
          className="p-1 hover:bg-white/10 rounded-full transition-colors"
        >
          <X size={18} />
        </button>
      </div>
      
      <div className="relative h-[400px] glass-darker rounded-lg overflow-hidden">
        {isLoading ? (
          <div className="absolute inset-0 flex items-center justify-center">
            <Loader2 className="animate-spin text-brainy-accent" size={24} />
          </div>
        ) : (
          <iframe 
            src={`${fileUrl}#toolbar=0`} 
            className="w-full h-full"
          />
        )}
      </div>
    </div>
  );
};

export default PDFPreview;
