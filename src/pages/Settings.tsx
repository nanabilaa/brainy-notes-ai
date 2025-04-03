
import React from 'react';
import Sidebar from '@/components/Sidebar/Sidebar';
import { Database, Cpu, Moon, Sun, Languages } from 'lucide-react';

const Settings = () => {
  return (
    <div className="flex min-h-screen">
      <Sidebar />
      
      <main className="flex-1 p-6 overflow-y-auto max-h-screen">
        <div className="max-w-5xl mx-auto">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h1 className="text-3xl font-bold">Settings</h1>
              <p className="text-brainy-text/70">Configure your application preferences</p>
            </div>
          </div>

          <div className="glass-card mb-6">
            <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
              <Database size={20} className="text-brainy-accent" />
              <span>Storage</span>
            </h2>
            
            <div className="mb-6">
              <p className="mb-2 text-sm text-brainy-text/70">Local document storage</p>
              <div className="h-2 rounded-full bg-white/10 overflow-hidden">
                <div className="h-full bg-brainy-accent w-3/5 rounded-full"></div>
              </div>
              <div className="flex justify-between mt-1 text-sm">
                <span>3.2 GB used</span>
                <span>5 GB total</span>
              </div>
            </div>
            
            <div className="flex justify-between items-center mb-4 pb-4 border-b border-white/10">
              <div>
                <p className="font-medium">Auto-delete old documents</p>
                <p className="text-sm text-brainy-text/70">Automatically remove documents older than 30 days</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" className="sr-only peer" />
                <div className="w-11 h-6 bg-white/10 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-brainy-accent"></div>
              </label>
            </div>
          </div>

          <div className="glass-card mb-6">
            <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
              <Cpu size={20} className="text-brainy-accent" />
              <span>AI Model Settings</span>
            </h2>
            
            <div className="space-y-4">
              <div className="flex justify-between items-center mb-2">
                <div>
                  <p className="font-medium">Model Selection</p>
                  <p className="text-sm text-brainy-text/70">Select the AI model to use for summarization</p>
                </div>
                <select className="glass-button px-3 py-2 bg-transparent border border-white/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-brainy-accent">
                  <option value="local-llm">Local LLM</option>
                  <option value="openai-gpt4">OpenAI GPT-4</option>
                  <option value="brainy-default">BrainyNotes Default</option>
                </select>
              </div>
              
              <div className="flex justify-between items-center mb-2">
                <div>
                  <p className="font-medium">Summary Length</p>
                  <p className="text-sm text-brainy-text/70">Adjust the length of generated summaries</p>
                </div>
                <div className="flex items-center">
                  <span className="mr-2 text-sm">Short</span>
                  <input type="range" min="1" max="5" defaultValue="3" className="w-32 h-2 bg-white/10 rounded-lg appearance-none cursor-pointer accent-brainy-accent" />
                  <span className="ml-2 text-sm">Long</span>
                </div>
              </div>
            </div>
          </div>

          <div className="glass-card mb-6">
            <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
              <Moon size={20} className="text-brainy-accent" />
              <span>Appearance</span>
            </h2>
            
            <div className="space-y-4">
              <div className="flex justify-between items-center mb-2">
                <div>
                  <p className="font-medium">Dark Mode</p>
                  <p className="text-sm text-brainy-text/70">Toggle between light and dark themes</p>
                </div>
                <div className="flex glass-darker rounded-full p-1">
                  <button className="p-2 rounded-full bg-white/10">
                    <Moon size={16} />
                  </button>
                  <button className="p-2 rounded-full">
                    <Sun size={16} />
                  </button>
                </div>
              </div>
              
              <div className="flex justify-between items-center mb-2">
                <div>
                  <p className="font-medium">Language</p>
                  <p className="text-sm text-brainy-text/70">Set your preferred language</p>
                </div>
                <div className="flex items-center gap-2">
                  <Languages size={16} className="text-brainy-accent" />
                  <select className="glass-button px-3 py-2 bg-transparent border border-white/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-brainy-accent">
                    <option value="en">English</option>
                    <option value="es">Español</option>
                    <option value="fr">Français</option>
                    <option value="de">Deutsch</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Settings;
