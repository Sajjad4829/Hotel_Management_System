import React from 'react';
import { usePageContext } from '../../../../Context/PageContext';

export default function OffersSimpleSectionEditor({ sectionKey, title, fields }) {
  const { pagesData, updatePageData } = usePageContext();
  const sectionData = pagesData.offers?.[sectionKey] || {};

  const handleUpdate = (field, value) => {
    updatePageData('offers', sectionKey, field, value);
  };

  return (
    <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm space-y-4">
      <h3 className="font-semibold text-slate-800 mb-4 border-b border-slate-100 pb-2">{title}</h3>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {fields.map(field => {
          if (field.type === 'textarea') {
            return (
              <div key={field.name} className="sm:col-span-2">
                <label className="block text-sm font-semibold text-slate-600 mb-1">{field.label}</label>
                <textarea
                  value={sectionData[field.name] || ''}
                  onChange={(e) => handleUpdate(field.name, e.target.value)}
                  className="w-full p-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-[#b45309] outline-none min-h-[80px]"
                  placeholder={field.placeholder || ''}
                />
              </div>
            )
          }

          if (field.name === 'image') {
             return (
              <div key={field.name} className="sm:col-span-2">
                <label className="block text-sm font-semibold text-slate-600 mb-1">{field.label}</label>
                <input
                  type="text"
                  value={sectionData[field.name] || ''}
                  onChange={(e) => handleUpdate(field.name, e.target.value)}
                  className="w-full p-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-[#b45309] outline-none"
                  placeholder="https://images.unsplash.com/..."
                />
                {sectionData[field.name] && (
                  <div className="mt-3 aspect-video max-w-sm rounded-lg overflow-hidden border border-slate-200">
                    <img src={sectionData[field.name]} alt="Preview" className="w-full h-full object-cover" />
                  </div>
                )}
              </div>
            )
          }

          return (
            <div key={field.name} className={field.fullWidth ? "sm:col-span-2" : ""}>
              <label className="block text-sm font-semibold text-slate-600 mb-1">{field.label}</label>
              <input
                type="text"
                value={sectionData[field.name] || ''}
                onChange={(e) => handleUpdate(field.name, e.target.value)}
                className="w-full p-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-[#b45309] outline-none"
                placeholder={field.placeholder || ''}
              />
            </div>
          )
        })}
      </div>
    </div>
  );
}
