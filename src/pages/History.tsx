
import React, { useState } from 'react';
import Sidebar from '@/components/Sidebar/Sidebar';
import { Clock, Search } from 'lucide-react';
import { Input } from '@/components/ui/input';

const History = () => {
  const [sidebarOpen, setSidebarOpen] = useState<boolean>(false);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };
  
  // Mock history data
  const historyItems = [
    { id: 1, title: 'Research Paper.pdf', date: '2023-10-15', size: '2.3MB' },
    { id: 2, title: 'Meeting Minutes.pdf', date: '2023-10-10', size: '1.1MB' },
    { id: 3, title: 'Financial Report Q3.pdf', date: '2023-09-28', size: '4.2MB' },
    { id: 4, title: 'Product Specifications.pdf', date: '2023-09-15', size: '3.7MB' },
  ];

  return (
    <div className="flex min-h-screen">
      <Sidebar isOpen={sidebarOpen} toggleSidebar={toggleSidebar} />
      
      <main className="flex-1 p-6 overflow-y-auto max-h-screen">
        <div className="max-w-5xl mx-auto">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h1 className="text-3xl font-bold">History</h1>
              <p className="text-brainy-text/70">View and manage your document history</p>
            </div>
          </div>

          <div className="glass-card mb-6">
            <div className="flex items-center gap-2 mb-4">
              <Search className="text-brainy-accent" size={20} />
              <Input 
                type="text" 
                placeholder="Search history..." 
                className="flex-1 bg-white/5 border-white/10 focus-visible:ring-brainy-accent"
              />
            </div>
            
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-white/10">
                    <th className="text-left p-3 text-brainy-text/70">Document</th>
                    <th className="text-left p-3 text-brainy-text/70">Date</th>
                    <th className="text-left p-3 text-brainy-text/70">Size</th>
                    <th className="text-left p-3 text-brainy-text/70">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {historyItems.map((item) => (
                    <tr key={item.id} className="border-b border-white/5 hover:bg-white/5">
                      <td className="p-3 flex items-center gap-2">
                        <Clock size={16} className="text-brainy-accent" />
                        {item.title}
                      </td>
                      <td className="p-3">{item.date}</td>
                      <td className="p-3">{item.size}</td>
                      <td className="p-3">
                        <button className="glass-button text-xs py-1">View</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default History;
