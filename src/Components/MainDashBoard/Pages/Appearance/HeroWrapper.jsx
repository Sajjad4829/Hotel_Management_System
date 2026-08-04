import React, { useState, useEffect } from 'react';
import { usePageContext } from '../../../../Context/PageContext';
import { Save, Check, RefreshCw } from 'lucide-react';
import HeroEditor from './HeroEditor';
import HeroSection from '../../../Home/Herosec';

const PAGES = [
  { id: 'home', label: 'Home Page', autoRoute: '/rooms' },
  { id: 'about', label: 'About Page', autoRoute: '/about' },
  { id: 'rooms', label: 'Rooms Page', autoRoute: '/rooms' },
  { id: 'roomDetails', label: 'Room Details', autoRoute: '/booking' },
  { id: 'offers', label: 'Offers Page', autoRoute: '/offers' },
  { id: 'offerDetails', label: 'Offer Details', autoRoute: '/booking' },
  { id: 'restaurant', label: 'Restaurant', autoRoute: '/dining' },
  { id: 'spa', label: 'Spa & Wellness', autoRoute: '/spa' },
  { id: 'gallery', label: 'Gallery', autoRoute: '/gallery' },
  { id: 'contact', label: 'Contact', autoRoute: '/contact' },
  { id: 'faq', label: 'FAQ', autoRoute: '/faq' },
  { id: 'blog', label: 'Blog', autoRoute: '/blog' },
  { id: 'custom', label: 'Custom Page', autoRoute: '/' },
];

export default function HeroWrapper() {
  const { pagesData, updatePageData } = usePageContext();
  const [savedStatus, setSavedStatus] = useState(false);
  const [selectedPage, setSelectedPage] = useState('home');
  const [previewKey, setPreviewKey] = useState(0);

  // Get current page hero data
  const currentPageData = pagesData[selectedPage]?.['hero'] || {};

  // Auto-route functionality when a new page is selected and hasn't been configured yet
  useEffect(() => {
    const pageConfig = PAGES.find(p => p.id === selectedPage);
    if (pageConfig && !currentPageData.primaryButtonLink) {
      updatePageData(selectedPage, 'hero', 'primaryButtonLink', pageConfig.autoRoute);
    }
  }, [selectedPage]);

  const handleInputChange = (field, value) => {
    updatePageData(selectedPage, 'hero', field, value);
    setSavedStatus(false);
  };

  const handleSave = () => {
    setSavedStatus(true);
    setTimeout(() => setSavedStatus(false), 2000);
  };

  const triggerPreviewRefresh = () => {
    setPreviewKey(prev => prev + 1);
  };

  return (
    <div className="max-w-[1600px] mx-auto py-6 px-4">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-8 gap-4 bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
        <div>
          <h1 className="text-3xl font-bold text-slate-900" style={{ fontFamily: 'Georgia, serif' }}>Hero CMS</h1>
          <p className="text-slate-500 mt-1">Manage Hero sections globally across all pages.</p>
        </div>
        
        <div className="flex flex-wrap items-center gap-3 w-full md:w-auto">
          <div className="flex flex-col flex-1 md:flex-none">
            <span className="text-[10px] font-bold tracking-wider text-slate-400 uppercase mb-1 ml-1">Target Page</span>
            <select 
              value={selectedPage} 
              onChange={(e) => setSelectedPage(e.target.value)}
              className="px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-[#b45309] focus:border-[#b45309] outline-none text-sm font-semibold text-slate-700 shadow-sm min-w-[200px]"
            >
              {PAGES.map(page => (
                <option key={page.id} value={page.id}>{page.label}</option>
              ))}
            </select>
          </div>

          <button
            onClick={handleSave}
            className="flex items-center gap-2 px-8 py-2.5 bg-[#1e3a5f] hover:bg-[#0f2942] text-white rounded-xl font-semibold transition-colors shadow-md shrink-0 mt-5"
          >
            {savedStatus ? <Check size={18} /> : <Save size={18} />}
            {savedStatus ? "Saved!" : "Save Changes"}
          </button>
        </div>
      </div>

      {/* Editor & Preview Split View */}
      <div className="flex flex-col xl:flex-row gap-6 items-start">
        
        {/* Left Side: Editor */}
        <div className="w-full xl:w-[45%] shrink-0">
          <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6">
            <HeroEditor 
              data={currentPageData} 
              onChange={handleInputChange} 
            />
          </div>
        </div>

        {/* Right Side: Live Preview */}
        <div className="w-full xl:w-[55%] sticky top-6">
          <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden flex flex-col">
            <div className="bg-slate-50 border-b border-slate-100 px-4 py-3 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-2.5 h-2.5 rounded-full bg-rose-400"></div>
                <div className="w-2.5 h-2.5 rounded-full bg-amber-400"></div>
                <div className="w-2.5 h-2.5 rounded-full bg-emerald-400"></div>
                <span className="ml-3 text-xs font-semibold text-slate-500 uppercase tracking-widest">Live Preview</span>
              </div>
              <button onClick={triggerPreviewRefresh} className="text-slate-400 hover:text-amber-600 transition-colors" title="Force Refresh Animation">
                <RefreshCw size={14} />
              </button>
            </div>
            
            {/* The actual preview container */}
            <div className="w-full relative bg-slate-900 flex items-center justify-center overflow-hidden" style={{ height: '700px' }}>
              <div className="w-full h-full transform-gpu origin-top">
                <HeroSection key={previewKey} data={currentPageData} />
              </div>
            </div>
            
          </div>
        </div>
        
      </div>
    </div>
  );
}
