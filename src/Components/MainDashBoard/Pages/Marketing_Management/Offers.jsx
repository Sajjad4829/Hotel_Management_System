import React, { useState } from 'react';
import { Plus, Trash2, Tag, Calendar, Percent } from 'lucide-react';
import UniversalEntitySelector from '../Content/UniversalEntitySelector';
import { usePageContext } from '../../../../Context/PageContext';

export default function Offers() {
  const { pagesData, updatePageData } = usePageContext();
  const [editingId, setEditingId] = useState(null);
  
  const data = pagesData?.offers || {};
  const offers = data.items || [];

  const onChange = (field, value) => {
    updatePageData('offers', { ...data, [field]: value });
  };

  const handleAdd = () => {
    const newOffer = {
      id: `offer-${Date.now()}`,
      hotelId: "",
      roomId: [],
      offerTitle: "New Offer",
      offerBanner: "",
      offerBadge: "Hot Deal",
      occasion: "Summer Offer",
      discount: "20% OFF",
      promoCode: "PROMO20",
      startDate: "",
      endDate: "",
      countdown: "",
      validity: "Valid until Dec 31, 2026",
      description: "Description of the offer",
      termsAndConditions: "Standard T&Cs apply.",
      status: "Active",
      displayOrder: offers.length + 1
    };
    onChange('items', [...offers, newOffer]);
    setEditingId(newOffer.id);
  };

  const handleUpdate = (id, field, value) => {
    onChange('items', offers.map(o => o.id === id ? { ...o, [field]: value } : o));
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this offer?")) {
      onChange('items', offers.filter(o => o.id !== id));
      if (editingId === id) setEditingId(null);
    }
  };

  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-semibold text-slate-900">Offers Management</h1>
        <p className="mt-1 text-sm text-slate-500">Configure global promotional campaigns and featured discounts.</p>
      </div>

      <div className="space-y-6">
        {/* Hero Settings */}
        <div className="bg-white p-5 rounded-xl shadow-sm border border-slate-200">
          <h3 className="font-bold text-slate-800 mb-4">Offers Page Hero</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-1">Hero Title</label>
              <input 
                type="text" 
                value={data.heroTitle || ''} 
                onChange={e => onChange('heroTitle', e.target.value)}
                className="w-full p-2 border border-slate-300 rounded focus:border-[#b45309] outline-none"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-1">Hero Subtitle</label>
              <input 
                type="text" 
                value={data.heroSubtitle || ''} 
                onChange={e => onChange('heroSubtitle', e.target.value)}
                className="w-full p-2 border border-slate-300 rounded focus:border-[#b45309] outline-none"
              />
            </div>
          </div>
        </div>

        <div className="flex justify-between items-center">
          <h3 className="font-bold text-slate-800">Manage Offers</h3>
          <button onClick={handleAdd} className="flex items-center gap-1 text-sm bg-amber-700 text-white px-4 py-2 rounded-lg shadow-sm hover:bg-amber-800 transition">
            <Plus size={16} /> Add Offer
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-1 space-y-3">
            {offers.length === 0 && (
              <div className="text-center p-6 bg-slate-50 rounded-xl border border-slate-200 text-slate-500">
                No offers configured.
              </div>
            )}
            {offers.sort((a,b) => a.displayOrder - b.displayOrder).map(offer => (
              <div 
                key={offer.id}
                onClick={() => setEditingId(offer.id)}
                className={`p-3 rounded-xl border cursor-pointer transition-all ${editingId === offer.id ? 'border-amber-700 bg-amber-50 shadow-sm' : 'border-slate-200 hover:border-slate-300 bg-white'}`}
              >
                <div className="flex justify-between items-start mb-1">
                  <h4 className="font-bold text-slate-800">{offer.offerTitle}</h4>
                  <div className="flex items-center gap-1">
                    <span className={`text-[10px] px-1.5 py-0.5 rounded-full ${offer.status === 'Active' ? 'bg-emerald-100 text-emerald-700' : 'bg-slate-100 text-slate-600'}`}>
                      {offer.status}
                    </span>
                  </div>
                </div>
                <div className="text-xs text-slate-500 line-clamp-1">{offer.description}</div>
              </div>
            ))}
          </div>

          <div className="lg:col-span-2">
            {editingId ? (() => {
              const offer = offers.find(o => o.id === editingId);
              if (!offer) return null;
              return (
                <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm animate-fadeIn">
                  <div className="flex justify-between items-center border-b border-slate-100 pb-3 mb-4">
                    <h3 className="font-bold text-lg text-slate-800">Edit Offer</h3>
                    <button onClick={() => handleDelete(offer.id)} className="text-red-500 hover:text-red-700 flex items-center gap-1 text-sm bg-red-50 px-3 py-1.5 rounded-lg transition">
                      <Trash2 size={14} /> Delete
                    </button>
                  </div>

                  {/* Universal Data Source */}
                  <UniversalEntitySelector 
                    hotelId={offer.hotelId} 
                    roomId={offer.roomId}
                    allowMultipleRooms={true}
                    onChange={(field, val) => handleUpdate(offer.id, field, val)}
                  />

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="md:col-span-2">
                      <label className="block text-xs font-semibold text-slate-600 mb-1">Offer Title</label>
                      <input type="text" value={offer.offerTitle || ""} onChange={e => handleUpdate(offer.id, 'offerTitle', e.target.value)} className="w-full p-2 border border-slate-300 rounded focus:border-[#b45309] outline-none" />
                    </div>

                    <div className="md:col-span-2">
                      <label className="block text-xs font-semibold text-slate-600 mb-1">Offer Banner URL</label>
                      <input type="text" value={offer.offerBanner || ""} onChange={e => handleUpdate(offer.id, 'offerBanner', e.target.value)} className="w-full p-2 border border-slate-300 rounded focus:border-[#b45309] outline-none" placeholder="https://..." />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-600 mb-1">Offer Badge</label>
                      <input type="text" value={offer.offerBadge || ""} onChange={e => handleUpdate(offer.id, 'offerBadge', e.target.value)} className="w-full p-2 border border-slate-300 rounded focus:border-[#b45309] outline-none" placeholder="e.g. Hot Deal" />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-600 mb-1">Occasion</label>
                      <input type="text" value={offer.occasion || ""} onChange={e => handleUpdate(offer.id, 'occasion', e.target.value)} className="w-full p-2 border border-slate-300 rounded focus:border-[#b45309] outline-none" placeholder="e.g. Summer Offer" />
                    </div>
                    
                    <div>
                      <label className="block text-xs font-semibold text-slate-600 mb-1 flex items-center gap-1"><Percent size={12}/> Discount (Text)</label>
                      <input type="text" value={offer.discount || ""} onChange={e => handleUpdate(offer.id, 'discount', e.target.value)} className="w-full p-2 border border-slate-300 rounded focus:border-[#b45309] outline-none" placeholder="e.g. 30% OFF" />
                    </div>
                    
                    <div>
                      <label className="block text-xs font-semibold text-slate-600 mb-1 flex items-center gap-1"><Tag size={12}/> Promo Code</label>
                      <input type="text" value={offer.promoCode || ""} onChange={e => handleUpdate(offer.id, 'promoCode', e.target.value)} className="w-full p-2 border border-slate-300 rounded focus:border-[#b45309] outline-none" />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-600 mb-1 flex items-center gap-1"><Calendar size={12}/> Start Date</label>
                      <input type="date" value={offer.startDate || ""} onChange={e => handleUpdate(offer.id, 'startDate', e.target.value)} className="w-full p-2 border border-slate-300 rounded focus:border-[#b45309] outline-none" />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-600 mb-1 flex items-center gap-1"><Calendar size={12}/> End Date</label>
                      <input type="date" value={offer.endDate || ""} onChange={e => handleUpdate(offer.id, 'endDate', e.target.value)} className="w-full p-2 border border-slate-300 rounded focus:border-[#b45309] outline-none" />
                    </div>
                    
                    <div>
                      <label className="block text-xs font-semibold text-slate-600 mb-1 flex items-center gap-1"><Calendar size={12}/> Countdown To</label>
                      <input type="date" value={offer.countdown || ""} onChange={e => handleUpdate(offer.id, 'countdown', e.target.value)} className="w-full p-2 border border-slate-300 rounded focus:border-[#b45309] outline-none" />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-600 mb-1">Validity Text</label>
                      <input type="text" value={offer.validity || ""} onChange={e => handleUpdate(offer.id, 'validity', e.target.value)} className="w-full p-2 border border-slate-300 rounded focus:border-[#b45309] outline-none" />
                    </div>

                    <div className="md:col-span-2">
                      <label className="block text-xs font-semibold text-slate-600 mb-1">Short Description</label>
                      <textarea value={offer.description || ""} onChange={e => handleUpdate(offer.id, 'description', e.target.value)} className="w-full p-2 border border-slate-300 rounded focus:border-[#b45309] outline-none h-20" />
                    </div>

                    <div className="md:col-span-2">
                      <label className="block text-xs font-semibold text-slate-600 mb-1">Terms & Conditions</label>
                      <textarea value={offer.termsAndConditions || ""} onChange={e => handleUpdate(offer.id, 'termsAndConditions', e.target.value)} className="w-full p-2 border border-slate-300 rounded focus:border-[#b45309] outline-none h-20" />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-600 mb-1">Status</label>
                      <select value={offer.status} onChange={e => handleUpdate(offer.id, 'status', e.target.value)} className="w-full p-2 border border-slate-300 rounded focus:border-[#b45309] outline-none">
                        <option value="Active">Active</option>
                        <option value="Inactive">Inactive</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-600 mb-1">Display Order</label>
                      <input type="number" value={offer.displayOrder} onChange={e => handleUpdate(offer.id, 'displayOrder', parseInt(e.target.value) || 0)} className="w-full p-2 border border-slate-300 rounded focus:border-[#b45309] outline-none" />
                    </div>
                  </div>
                </div>
              );
            })() : (
              <div className="h-full min-h-[300px] flex items-center justify-center bg-slate-50 border border-slate-200 rounded-xl text-slate-400">
                Select an offer to edit or create a new one
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
