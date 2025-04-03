
import React from 'react';

const HowItWorks: React.FC = () => {
  return (
    <div className="mt-12 mb-6">
      <h2 className="text-2xl font-semibold mb-6">How It Works</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Step 1 */}
        <div className="glass-card flex flex-col">
          <div className="relative h-40 mb-4 glass-darker rounded-lg overflow-hidden">
            <img
              src="/lovable-uploads/5f07c087-24ec-49be-9288-b1d2a8c303d1.png"
              alt="Upload Your PDF"
              className="w-full h-full object-cover opacity-50"
            />
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-5xl font-bold text-brainy-accent">01</span>
            </div>
          </div>
          <h3 className="text-xl font-medium mb-2">Upload Your PDF</h3>
          <p className="text-brainy-text/70 text-sm">
            Select and upload any PDF document you want to summarize.
          </p>
        </div>

        {/* Step 2 */}
        <div className="glass-card flex flex-col">
          <div className="relative h-40 mb-4 glass-darker rounded-lg overflow-hidden">
            <img
              src="https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?q=80&w=2070"
              alt="Process with AI"
              className="w-full h-full object-cover opacity-30"
            />
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-5xl font-bold text-brainy-accent">02</span>
            </div>
          </div>
          <h3 className="text-xl font-medium mb-2">Process with AI</h3>
          <p className="text-brainy-text/70 text-sm">
            Our local AI model will analyze your document and extract the key information.
          </p>
        </div>

        {/* Step 3 */}
        <div className="glass-card flex flex-col">
          <div className="relative h-40 mb-4 glass-darker rounded-lg overflow-hidden">
            <img
              src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2070"
              alt="Review Summary"
              className="w-full h-full object-cover opacity-30"
            />
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-5xl font-bold text-brainy-accent">03</span>
            </div>
          </div>
          <h3 className="text-xl font-medium mb-2">Review Summary</h3>
          <p className="text-brainy-text/70 text-sm">
            Get a concise summary of your document and save it for future reference.
          </p>
        </div>
      </div>
    </div>
  );
};

export default HowItWorks;
