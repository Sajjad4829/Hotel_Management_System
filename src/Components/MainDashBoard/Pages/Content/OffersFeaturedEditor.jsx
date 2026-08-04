import React from 'react';
import { usePageContext } from '../../../../Context/PageContext';

export default function OffersFeaturedEditor() {
  const { pagesData, updatePageData } = usePageContext();
  const featuredOffer = pagesData.offers?.featuredOffer || {};

  const handleUpdate = (field, value) => {
    updatePageData('offers', 'featuredOffer', field, value);
  };

  return (
    <div className="space-y-6">
      <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm space-y-4">
        <div>
          <label className="block text-sm font-semibold text-slate-600 mb-1">Title</label>
          <input
            type="text"
            value={featuredOffer.title || ''}
            onChange={(e) => handleUpdate('title', e.target.value)}
            className="w-full p-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-[#b45309] outline-none"
            placeholder="e.g. The Ultimate Royal Escape"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-slate-600 mb-1">Subtitle</label>
          <input
            type="text"
            value={featuredOffer.subtitle || ''}
            onChange={(e) => handleUpdate('subtitle', e.target.value)}
            className="w-full p-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-[#b45309] outline-none"
            placeholder="e.g. Experience Unmatched Luxury"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-slate-600 mb-1">Description</label>
          <textarea
            value={featuredOffer.description || ''}
            onChange={(e) => handleUpdate('description', e.target.value)}
            className="w-full p-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-[#b45309] outline-none min-h-[80px]"
            placeholder="Description text..."
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-semibold text-slate-600 mb-1">Discount Tag</label>
            <input
              type="text"
              value={featuredOffer.discount || ''}
              onChange={(e) => handleUpdate('discount', e.target.value)}
              className="w-full p-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-[#b45309] outline-none"
              placeholder="e.g. 30% OFF"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-slate-600 mb-1">Button Link</label>
            <input
              type="text"
              value={featuredOffer.link || ''}
              onChange={(e) => handleUpdate('link', e.target.value)}
              className="w-full p-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-[#b45309] outline-none"
              placeholder="e.g. /rooms"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-semibold text-slate-600 mb-1">Background Image URL</label>
          <input
            type="text"
            value={featuredOffer.image || ''}
            onChange={(e) => handleUpdate('image', e.target.value)}
            className="w-full p-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-[#b45309] outline-none"
            placeholder="https://images.unsplash.com/..."
          />
          {featuredOffer.image && (
            <div className="mt-3 aspect-[21/9] rounded-lg overflow-hidden border border-slate-200">
               <img src={featuredOffer.image} alt="Preview" className="w-full h-full object-cover" />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
