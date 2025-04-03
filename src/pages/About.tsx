
import React from 'react';
import Sidebar from '@/components/Sidebar/Sidebar';
import { Github, Twitter, Mail, Globe } from 'lucide-react';

const About = () => {
  return (
    <div className="flex min-h-screen">
      <Sidebar />
      
      <main className="flex-1 p-6 overflow-y-auto max-h-screen">
        <div className="max-w-5xl mx-auto">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h1 className="text-3xl font-bold">About BrainyNotes</h1>
              <p className="text-brainy-text/70">Learn more about our AI-powered PDF summarizer</p>
            </div>
          </div>

          <div className="glass-card mb-6">
            <h2 className="text-xl font-semibold mb-4">Our Mission</h2>
            <p className="mb-4">
              BrainyNotes was created with a simple goal: to help people extract meaningful insights from documents quickly and efficiently. 
              In a world where information overload is a constant challenge, we believe in the power of AI to help distill complex content 
              into clear, actionable summaries.
            </p>
            <p>
              Our application uses advanced natural language processing techniques to analyze PDFs and generate comprehensive summaries, 
              saving you valuable time while ensuring you don't miss critical information.
            </p>
          </div>

          <div className="glass-card mb-6">
            <h2 className="text-xl font-semibold mb-4">Key Features</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 bg-white/5 rounded-lg">
                <h3 className="font-medium text-brainy-accent mb-2">Local AI Processing</h3>
                <p className="text-sm">Process documents locally with our embedded LLM for enhanced privacy and security</p>
              </div>
              <div className="p-4 bg-white/5 rounded-lg">
                <h3 className="font-medium text-brainy-accent mb-2">Smart Summarization</h3>
                <p className="text-sm">Extract key points and generate concise summaries with adjustable detail levels</p>
              </div>
              <div className="p-4 bg-white/5 rounded-lg">
                <h3 className="font-medium text-brainy-accent mb-2">Document History</h3>
                <p className="text-sm">Keep track of your processed documents and access previous summaries instantly</p>
              </div>
              <div className="p-4 bg-white/5 rounded-lg">
                <h3 className="font-medium text-brainy-accent mb-2">Cross-Platform Support</h3>
                <p className="text-sm">Use BrainyNotes on any device with our responsive web interface</p>
              </div>
            </div>
          </div>

          <div className="glass-card mb-6">
            <h2 className="text-xl font-semibold mb-4">Technology Stack</h2>
            <div className="space-y-2">
              <p className="flex items-center gap-2">
                <span className="w-24 text-brainy-text/70">Frontend:</span>
                <span>React, Tailwind CSS, TypeScript</span>
              </p>
              <p className="flex items-center gap-2">
                <span className="w-24 text-brainy-text/70">Backend:</span>
                <span>Node.js, Express</span>
              </p>
              <p className="flex items-center gap-2">
                <span className="w-24 text-brainy-text/70">AI/ML:</span>
                <span>Python, PyTorch, Hugging Face Transformers</span>
              </p>
              <p className="flex items-center gap-2">
                <span className="w-24 text-brainy-text/70">Database:</span>
                <span>PostgreSQL</span>
              </p>
            </div>
          </div>

          <div className="glass-card mb-6">
            <h2 className="text-xl font-semibold mb-4">Connect With Us</h2>
            <div className="flex flex-wrap gap-4">
              <a href="#" className="glass-button flex items-center gap-2">
                <Github size={18} />
                <span>GitHub</span>
              </a>
              <a href="#" className="glass-button flex items-center gap-2">
                <Twitter size={18} />
                <span>Twitter</span>
              </a>
              <a href="#" className="glass-button flex items-center gap-2">
                <Mail size={18} />
                <span>Contact Us</span>
              </a>
              <a href="#" className="glass-button flex items-center gap-2">
                <Globe size={18} />
                <span>Website</span>
              </a>
            </div>
          </div>

          <div className="text-center text-sm text-brainy-text/70 mt-8">
            <p>&copy; 2023 BrainyNotes. All rights reserved.</p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default About;
