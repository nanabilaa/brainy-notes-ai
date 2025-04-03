
import React, { useState } from 'react';
import Sidebar from '@/components/Sidebar/Sidebar';
import PDFUploader from '@/components/PDFUploader/PDFUploader';
import HowItWorks from '@/components/HowItWorks/HowItWorks';
import PDFPreview from '@/components/PDFPreview/PDFPreview';
import Summary from '@/components/Summary/Summary';
import { Copy } from 'lucide-react';

const Index = () => {
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);

  const handleFileUpload = (file: File) => {
    setUploadedFile(file);
  };

  const handleCloseFile = () => {
    setUploadedFile(null);
  };

  return (
    <div className="flex min-h-screen">
      <Sidebar />
      
      <main className="flex-1 p-6 overflow-y-auto max-h-screen">
        <div className="max-w-5xl mx-auto">
          <div className="flex justify-between items-center mb-2">
            <div>
              <h1 className="text-3xl font-bold">PDF Summarizer</h1>
              <p className="text-brainy-text/70">Upload a PDF to get an AI-powered summary using a local LLM</p>
            </div>
            <button className="glass-button">
              <Copy size={18} />
              <span className="sr-only md:not-sr-only">Copy</span>
            </button>
          </div>

          {!uploadedFile ? (
            <>
              <PDFUploader onFileUpload={handleFileUpload} />
              <HowItWorks />
            </>
          ) : (
            <>
              <PDFPreview file={uploadedFile} onClose={handleCloseFile} />
              <Summary file={uploadedFile} />
            </>
          )}
        </div>
      </main>
    </div>
  );
};

export default Index;
