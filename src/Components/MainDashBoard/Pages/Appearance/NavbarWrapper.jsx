import React, { useState } from 'react';
import { usePageContext } from '../../../../Context/PageContext';
import { Save, Check } from 'lucide-react';
import NavbarEditor from './NavbarEditor';

export default function NavbarWrapper() {
  const { pagesData, updatePageData } = usePageContext();
  const [savedStatus, setSavedStatus] = useState(false);

  // Navbar is global, currently stored in home.navbar
  const currentPageData = pagesData['home']?.['navbar'] || {};

  const handleInputChange = (field, value) => {
    updatePageData('home', 'navbar', field, value);
    setSavedStatus(false);
  };

  const handleSave = () => {
    setSavedStatus(true);
    setTimeout(() => setSavedStatus(false), 2000);
  };

  return (
    <div className="max-w-4xl mx-auto py-6">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-slate-900" style={{ fontFamily: "Georgia, serif" }}>Navbar Editor</h1>
          <p className="text-slate-500 mt-1">Manage global navigation, logo, and header buttons.</p>
        </div>
        <button
          onClick={handleSave}
          className="flex items-center gap-2 px-6 py-2.5 bg-[#1e3a5f] hover:bg-[#0f2942] text-white rounded-xl font-semibold transition-colors shadow-sm"
        >
          {savedStatus ? <Check size={18} /> : <Save size={18} />}
          {savedStatus ? "Saved!" : "Save Changes"}
        </button>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6 md:p-8">
        <NavbarEditor data={currentPageData} onChange={handleInputChange} />
      </div>
    </div>
  );
}
