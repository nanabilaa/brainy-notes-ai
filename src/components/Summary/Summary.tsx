
import React, { useState, useEffect } from 'react';
import { Loader2 } from 'lucide-react';

interface SummaryProps {
  file: File;
}

const Summary: React.FC<SummaryProps> = ({ file }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [summary, setSummary] = useState<string | null>(null);

  // Simulate API call for summary generation
  useEffect(() => {
    const timer = setTimeout(() => {
      const demoSummary = `# Summary of ${file.name}

## Key Points

1. This document discusses the implementation of artificial intelligence in modern business practices.
2. It highlights three main approaches to AI integration: automated workflows, predictive analysis, and customer insights.
3. The research indicates a 27% increase in operational efficiency for companies that properly implement AI solutions.

## Critical Findings

The most successful AI implementations were found in companies that:
- Invested in proper data infrastructure before AI deployment
- Trained employees on working alongside AI systems
- Started with small, focused AI projects before scaling

## Recommendations

Based on the analysis, organizations should consider:
1. Auditing current data collection practices
2. Identifying high-value, low-complexity processes for initial AI implementation
3. Developing clear metrics to measure AI impact on business outcomes`;

      setSummary(demoSummary);
      setIsLoading(false);
    }, 2500); // Simulate loading for demo purposes
    
    return () => clearTimeout(timer);
  }, [file]);

  return (
    <div className="glass-card">
      <h3 className="font-medium text-xl mb-4">AI-Generated Summary</h3>
      
      {isLoading ? (
        <div className="h-72 flex flex-col items-center justify-center gap-3">
          <Loader2 className="animate-spin text-brainy-accent" size={24} />
          <p className="text-sm text-brainy-text/70">Analyzing document with AI...</p>
        </div>
      ) : (
        <div className="prose prose-invert max-w-none">
          <div className="whitespace-pre-wrap font-light text-brainy-text/90 bg-black/10 p-4 rounded-lg">
            {summary}
          </div>
        </div>
      )}
    </div>
  );
};

export default Summary;
