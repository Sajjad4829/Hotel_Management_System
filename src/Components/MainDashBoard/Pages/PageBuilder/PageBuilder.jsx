import React, { useState } from 'react';
import { usePageContext } from '../../../../Context/PageContext';
import { Save, Check, Layout, Type, Image as ImageIcon, Link as LinkIcon, Plus, ChevronDown, ChevronRight, Minus } from 'lucide-react';
import NavbarEditor from './NavbarEditor';
import BookingSearchEditor from './BookingSearchEditor';
import HeroEditor from './HeroEditor';
import FeaturedCollectionEditor from './FeaturedCollectionEditor';
import FacilitiesEditor from './FacilitiesEditor';
import ReviewsEditor from './ReviewsEditor';
import StatisticsEditor from './StatisticsEditor';

export default function PageBuilder() {
  const { pagesData, updatePageData } = usePageContext();
  const [selectedPage, setSelectedPage] = useState('home');
  const [selectedSection, setSelectedSection] = useState('hero'); // Only relevant if page has sections
  const [expandedPages, setExpandedPages] = useState({ home: true }); // Track which pages are expanded
  const [savedStatus, setSavedStatus] = useState(false);

  const availablePages = [
    { 
      id: 'home', 
      name: 'Home Page',
      sections: [
        { id: 'navbar', name: 'Navbar' },
        { id: 'hero', name: 'Hero' },
        { id: 'bookingSearch', name: 'Booking Search' },
        { id: 'featuredCollection', name: 'Curated Destinations' },
        { id: 'facilities', name: 'Facilities' },
        { id: 'reviews', name: 'Reviews' },
        { id: 'statistics', name: 'Statistics' },
        { id: 'cta', name: 'CTA' },
        { id: 'newsletter', name: 'Newsletter' },
        { id: 'footer', name: 'Footer' },
      ]
    },
    { id: 'about', name: 'About Us' },
    { id: 'contact', name: 'Contact Us' },
    { id: 'faq', name: 'FAQ' },
    { id: 'newsletter', name: 'Newsletter' }
  ];

  // Determine what data to edit based on whether the page has sections
  const isNestedPage = !!availablePages.find(p => p.id === selectedPage)?.sections;
  const currentPageData = isNestedPage 
    ? (pagesData[selectedPage]?.[selectedSection] || {})
    : (pagesData[selectedPage] || {});

  const handleInputChange = (field, value) => {
    if (isNestedPage) {
      updatePageData(selectedPage, selectedSection, field, value);
    } else {
      updatePageData(selectedPage, null, field, value);
    }
    setSavedStatus(false);
  };

  const handleSave = () => {
    setSavedStatus(true);
    setTimeout(() => setSavedStatus(false), 2000);
  };

  const handleAddPage = () => {
    alert("Add Page functionality will be integrated with the backend.");
  };

  const togglePageExpansion = (pageId, hasSections) => {
    if (hasSections) {
      setExpandedPages(prev => ({ ...prev, [pageId]: !prev[pageId] }));
    }
    setSelectedPage(pageId);
    if (hasSections && pageId === 'home') {
      setSelectedSection('hero');
    } else {
      setSelectedSection(null);
    }
  };

  // Helper to determine what type of input to render based on the key name
  const renderInput = (key, value) => {
    const isImage = key.toLowerCase().includes('image');
    const isTextarea = key.toLowerCase().includes('description') || key.toLowerCase().includes('subtitle');
    
    return (
      <div key={key} className="mb-6">
        <label className="block text-sm font-semibold text-slate-700 mb-2 capitalize flex items-center gap-2">
          {isImage ? <ImageIcon size={14} className="text-[#b45309]" /> : <Type size={14} className="text-[#b45309]" />}
          {key.replace(/([A-Z])/g, ' $1').trim()}
        </label>
        
        {isTextarea ? (
          <textarea
            value={value}
            onChange={(e) => handleInputChange(key, e.target.value)}
            className="w-full p-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-[#b45309] focus:border-[#b45309] outline-none transition-all min-h-[100px]"
          />
        ) : (
          <div className="flex gap-3">
            <input
              type="text"
              value={value}
              onChange={(e) => handleInputChange(key, e.target.value)}
              className="flex-1 p-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-[#b45309] focus:border-[#b45309] outline-none transition-all"
            />
            {isImage && value && (
              <div className="w-12 h-12 rounded overflow-hidden border border-slate-200 shrink-0">
                <img src={value} alt="Preview" className="w-full h-full object-cover" />
              </div>
            )}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="max-w-6xl mx-auto py-6">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-slate-900" style={{ fontFamily: "Georgia, serif" }}>Page Builder</h1>
          <p className="text-slate-500 mt-1">Manage content across your frontend pages</p>
        </div>
        <button
          onClick={handleSave}
          className="flex items-center gap-2 px-6 py-2.5 bg-[#1e3a5f] hover:bg-[#0f2942] text-white rounded-xl font-semibold transition-colors shadow-sm"
        >
          {savedStatus ? <Check size={18} /> : <Save size={18} />}
          {savedStatus ? "Saved!" : "Save Changes"}
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Page Selector Sidebar */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
            <div className="bg-slate-50 p-4 border-b border-slate-100 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Layout size={18} className="text-slate-500" />
                <h3 className="font-semibold text-slate-700">Pages</h3>
              </div>
              <button 
                onClick={handleAddPage}
                className="text-[#b45309] hover:text-orange-700 font-semibold text-xs flex items-center gap-1 bg-orange-50 hover:bg-orange-100 px-2 py-1.5 rounded-lg transition-colors border border-orange-200"
              >
                <Plus size={14} /> Add Page
              </button>
            </div>
            <div className="p-2">
              {availablePages.map((page) => {
                const isExpanded = expandedPages[page.id];
                const hasSections = !!page.sections;
                
                return (
                  <div key={page.id} className="mb-1">
                    <button
                      onClick={() => togglePageExpansion(page.id, hasSections)}
                      className={`w-full flex items-center justify-between text-left px-4 py-3 rounded-xl transition-all font-medium text-sm ${
                        selectedPage === page.id && !hasSections
                          ? "bg-[#b45309] text-white shadow-md" 
                          : "text-slate-600 hover:bg-slate-50"
                      }`}
                    >
                      <span className="flex items-center gap-2">
                        {hasSections && (isExpanded ? <ChevronDown size={16} /> : <ChevronRight size={16} />)}
                        {page.name}
                      </span>
                    </button>
                    
                    {/* Nested Sections */}
                    {hasSections && isExpanded && (
                      <div className="ml-4 pl-2 border-l border-slate-200 mt-1 space-y-1">
                        {page.sections.map(section => (
                          <button
                            key={section.id}
                            onClick={() => {
                              setSelectedPage(page.id);
                              setSelectedSection(section.id);
                            }}
                            className={`w-full flex items-center gap-2 text-left px-3 py-2 rounded-lg transition-all text-xs font-medium ${
                              selectedPage === page.id && selectedSection === section.id
                                ? "bg-orange-50 text-[#b45309]"
                                : "text-slate-500 hover:bg-slate-50 hover:text-slate-700"
                            }`}
                          >
                            <Minus size={12} className={selectedPage === page.id && selectedSection === section.id ? "opacity-100" : "opacity-40"} />
                            {section.name}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Editor Form */}
        <div className="lg:col-span-3">
          <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6 md:p-8">
            <h2 className="text-xl font-bold text-slate-800 mb-6 border-b border-slate-100 pb-4">
              Editing: {availablePages.find(p => p.id === selectedPage)?.name}
              {isNestedPage && selectedSection && ` > ${availablePages.find(p => p.id === selectedPage).sections.find(s => s.id === selectedSection)?.name}`}
            </h2>
            
            {isNestedPage && selectedSection === 'navbar' ? (
              <NavbarEditor 
                data={currentPageData} 
                onChange={(field, value) => handleInputChange(field, value)} 
              />
            ) : isNestedPage && selectedSection === 'bookingSearch' ? (
              <BookingSearchEditor 
                data={currentPageData} 
                onChange={(field, value) => handleInputChange(field, value)} 
              />
            ) : isNestedPage && selectedSection === 'hero' ? (
              <HeroEditor 
                data={currentPageData} 
                onChange={(field, value) => handleInputChange(field, value)} 
              />
            ) : isNestedPage && selectedSection === 'featuredCollection' ? (
              <FeaturedCollectionEditor 
                data={currentPageData} 
                onChange={(field, value) => handleInputChange(field, value)} 
              />
            ) : isNestedPage && selectedSection === 'facilities' ? (
              <FacilitiesEditor />
            ) : isNestedPage && selectedSection === 'reviews' ? (
              <ReviewsEditor />
            ) : isNestedPage && selectedSection === 'statistics' ? (
              <StatisticsEditor />
            ) : (
              <div className="space-y-2">
                {Object.entries(currentPageData).map(([key, value]) => renderInput(key, value))}
              </div>
            )}
            
            {Object.keys(currentPageData).length === 0 && selectedSection !== 'navbar' && (
              <div className="text-center py-12 text-slate-400">
                <p>No configurable fields found for this section.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
