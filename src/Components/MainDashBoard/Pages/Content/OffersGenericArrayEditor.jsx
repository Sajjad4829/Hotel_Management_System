import React, { useState } from 'react';
import { usePageContext } from '../../../../Context/PageContext';
import { Plus, Trash2, GripVertical, Settings, Save, ArrowUp, ArrowDown } from 'lucide-react';
import * as LucideIcons from 'lucide-react';

export default function OffersGenericArrayEditor({ sectionKey, fields, defaultItem = {} }) {
  const { pagesData, updatePageData } = usePageContext();
  const rawItems = pagesData.offers?.[sectionKey];
  const items = Array.isArray(rawItems) ? rawItems : (rawItems?.null || []);
  const [editingCardIdx, setEditingCardIdx] = useState(null);

  const handleUpdate = (value) => {
    updatePageData('offers', null, sectionKey, value);
  };

  const handleArrayUpdate = (index, field, value) => {
    const arr = [...items];
    arr[index] = { ...arr[index], [field]: value };
    handleUpdate(arr);
  };

  const handleArrayAdd = () => {
    const newItems = [
      ...items,
      { ...defaultItem, id: `item-${Date.now()}` }
    ];
    handleUpdate(newItems);
    setEditingCardIdx(newItems.length - 1);
  };

  const handleArrayRemove = (index) => {
    const newItems = [...items];
    newItems.splice(index, 1);
    handleUpdate(newItems);
  };

  const moveItem = (index, direction) => {
    const newItems = [...items];
    if (direction === 'up' && index > 0) {
      [newItems[index - 1], newItems[index]] = [newItems[index], newItems[index - 1]];
    } else if (direction === 'down' && index < newItems.length - 1) {
      [newItems[index + 1], newItems[index]] = [newItems[index], newItems[index + 1]];
    }
    handleUpdate(newItems);
  };

  const renderIcon = (iconName) => {
    if (!iconName) return null;
    const IconComponent = LucideIcons[iconName];
    return IconComponent ? <IconComponent size={20} /> : <LucideIcons.HelpCircle size={20} />;
  };

  const AVAILABLE_ICONS = [
    "Heart", "Sparkles", "Users", "Briefcase", "Waves", "UtensilsCrossed", 
    "Sun", "Car", "Tag", "Star", "CalendarCheck", "Search", "CreditCard", "CheckCircle", "Coffee"
  ];

  return (
    <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm space-y-4">
      <div className="flex items-center justify-between mb-4 border-b border-slate-100 pb-2">
        <h3 className="font-semibold text-slate-800 capitalize">{sectionKey.replace(/([A-Z])/g, ' $1').trim()}</h3>
        <button 
          onClick={handleArrayAdd}
          className="flex items-center gap-1.5 text-sm bg-[#b45309] hover:bg-orange-700 text-white px-3 py-1.5 rounded-lg transition-colors font-semibold"
        >
          <Plus size={16} /> Add Item
        </button>
      </div>

      {items.length === 0 ? (
        <p className="text-slate-500 italic text-center py-6">No items added yet.</p>
      ) : (
        <div className="space-y-3">
          {items.map((item, idx) => (
            <div key={item.id || idx} className="border border-slate-200 rounded-xl overflow-hidden bg-slate-50">
              {editingCardIdx !== idx ? (
                <div className="flex items-center p-3 gap-4">
                  <div className="flex flex-col gap-1 text-slate-400">
                    <button onClick={() => moveItem(idx, 'up')} disabled={idx === 0} className="hover:text-slate-700 disabled:opacity-30"><ArrowUp size={16} /></button>
                    <button onClick={() => moveItem(idx, 'down')} disabled={idx === items.length - 1} className="hover:text-slate-700 disabled:opacity-30"><ArrowDown size={16} /></button>
                  </div>
                  
                  {item.icon && (
                    <div className="w-10 h-10 rounded-lg flex items-center justify-center bg-white border border-slate-200 shrink-0 text-slate-700">
                      {renderIcon(item.icon)}
                    </div>
                  )}
                  {item.image && !item.icon && (
                    <img src={item.image} alt="preview" className="w-12 h-12 object-cover rounded-md" />
                  )}
                  
                  <div className="flex-1 min-w-0">
                    <h4 className="font-bold text-slate-800 truncate">{item.title || item.name || item.question || 'Untitled'}</h4>
                    <p className="text-xs text-slate-500 line-clamp-1">{item.description || item.text || item.answer}</p>
                  </div>

                  <div className="flex items-center gap-2 pr-2">
                    <button onClick={() => setEditingCardIdx(idx)} className="p-2 bg-white border border-slate-200 rounded-lg text-slate-600 hover:text-[#b45309] transition-colors">
                      <Settings size={16} />
                    </button>
                    <button onClick={() => handleArrayRemove(idx)} className="p-2 bg-white border border-slate-200 rounded-lg text-red-500 hover:bg-red-50 transition-colors">
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
              ) : (
                <div className="p-5 bg-white border-b-4 border-[#b45309]">
                  <div className="flex justify-between items-center mb-4 pb-2 border-b border-slate-100">
                    <h4 className="font-bold text-[#1e3a5f]">Editing Item</h4>
                    <button onClick={() => setEditingCardIdx(null)} className="flex items-center gap-1 bg-[#1e3a5f] hover:bg-[#0f2942] text-white px-3 py-1.5 rounded-lg text-xs font-semibold">
                      <Save size={14} /> Done
                    </button>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {fields.map(field => {
                      if (field.type === 'textarea') {
                        return (
                          <div key={field.name} className="sm:col-span-2">
                            <label className="block text-xs font-semibold text-slate-500 mb-1">{field.label}</label>
                            <textarea 
                              value={item[field.name] || ''} 
                              onChange={(e) => handleArrayUpdate(idx, field.name, e.target.value)} 
                              className="w-full p-2 border border-slate-300 rounded-lg text-sm min-h-[80px]" 
                            />
                          </div>
                        )
                      }
                      
                      if (field.type === 'icon') {
                        return (
                          <div key={field.name} className="sm:col-span-2">
                            <label className="block text-xs font-semibold text-slate-500 mb-2">{field.label}</label>
                            <div className="flex flex-wrap gap-2 p-3 border border-slate-200 rounded-lg bg-slate-50">
                              {AVAILABLE_ICONS.map(iconName => (
                                <button
                                  key={iconName}
                                  onClick={() => handleArrayUpdate(idx, field.name, iconName)}
                                  className={`p-2 flex justify-center rounded-lg transition-all ${item[field.name] === iconName ? 'bg-[#b45309] text-white shadow-md' : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-100'}`}
                                >
                                  {renderIcon(iconName)}
                                </button>
                              ))}
                            </div>
                          </div>
                        )
                      }
                      
                      if (field.type === 'number') {
                         return (
                          <div key={field.name}>
                            <label className="block text-xs font-semibold text-slate-500 mb-1">{field.label}</label>
                            <input 
                              type="number" 
                              value={item[field.name] || ''} 
                              onChange={(e) => handleArrayUpdate(idx, field.name, Number(e.target.value))} 
                              className="w-full p-2 border border-slate-300 rounded-lg text-sm" 
                            />
                          </div>
                        )
                      }

                      // Default text input
                      return (
                        <div key={field.name} className={field.fullWidth ? "sm:col-span-2" : ""}>
                          <label className="block text-xs font-semibold text-slate-500 mb-1">{field.label}</label>
                          <input 
                            type="text" 
                            value={item[field.name] || ''} 
                            onChange={(e) => handleArrayUpdate(idx, field.name, e.target.value)} 
                            className="w-full p-2 border border-slate-300 rounded-lg text-sm" 
                            placeholder={field.placeholder || ''}
                          />
                        </div>
                      )
                    })}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
