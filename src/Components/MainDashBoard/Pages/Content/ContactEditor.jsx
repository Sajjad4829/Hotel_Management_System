import React from 'react';
import {
  Type, Phone, Globe, MapPin, MessageCircle, Palette,
  Layout, Plus, Trash2, ChevronUp, ChevronDown,
} from 'lucide-react';

// ── Shared helpers (match BookingSearchEditor pattern) ──────────────────────

const inputCls =
  'w-full p-2.5 text-sm border border-slate-200 rounded-lg focus:ring-2 focus:ring-[#b45309] focus:border-[#b45309] outline-none';

function renderTextInput(key, label, placeholder = '', data, onChange) {
  return (
    <div className="mb-4">
      <label className="block text-xs font-semibold text-slate-500 mb-1">{label}</label>
      <input
        type="text"
        value={data[key] || ''}
        onChange={(e) => onChange(key, e.target.value)}
        placeholder={placeholder}
        className={inputCls}
      />
    </div>
  );
}

function renderTextarea(key, label, placeholder = '', rows = 3, data, onChange) {
  return (
    <div className="mb-4">
      <label className="block text-xs font-semibold text-slate-500 mb-1">{label}</label>
      <textarea
        value={data[key] || ''}
        onChange={(e) => onChange(key, e.target.value)}
        placeholder={placeholder}
        rows={rows}
        className={`${inputCls} resize-none`}
      />
    </div>
  );
}

function renderToggle(key, label, data, onChange) {
  const isChecked = data[key] !== false && data[key] !== undefined ? !!data[key] : false;
  return (
    <div className="flex items-center justify-between p-3 bg-white border border-slate-200 rounded-xl mb-3">
      <span className="text-sm font-medium text-slate-700">{label}</span>
      <button
        onClick={() => onChange(key, !isChecked)}
        className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${isChecked ? 'bg-[#b45309]' : 'bg-slate-300'}`}
      >
        <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${isChecked ? 'translate-x-6' : 'translate-x-1'}`} />
      </button>
    </div>
  );
}

function renderColorPicker(key, label, defaultColor = '#C8A96A', data, onChange) {
  return (
    <div className="flex items-center justify-between p-3 bg-white border border-slate-200 rounded-xl mb-3">
      <span className="text-sm font-medium text-slate-700">{label}</span>
      <div className="flex items-center gap-2">
        <span className="text-xs text-slate-500 uppercase font-mono">{data[key] || defaultColor}</span>
        <input
          type="color"
          value={data[key] || defaultColor}
          onChange={(e) => onChange(key, e.target.value)}
          className="w-8 h-8 rounded cursor-pointer border-0 p-0"
        />
      </div>
    </div>
  );
}

function SectionHeader({ icon: Icon, title }) {
  return (
    <h3 className="text-lg font-bold text-slate-800 mb-4 flex items-center gap-2">
      <Icon size={18} className="text-[#b45309]" />
      {title}
    </h3>
  );
}

// ── Field Type Options ──────────────────────────────────────────────────────
const FIELD_TYPES = [
  { value: 'text',     label: 'Text' },
  { value: 'email',    label: 'Email' },
  { value: 'tel',      label: 'Phone / Tel' },
  { value: 'number',   label: 'Number' },
  { value: 'textarea', label: 'Textarea (multi-line)' },
  { value: 'select',   label: 'Dropdown / Select' },
];

// ── Single field card ───────────────────────────────────────────────────────
function FieldRow({ field, index, total, onUpdate, onDelete, onMove }) {
  return (
    <div className="bg-white border border-slate-200 rounded-xl p-4 mb-3">

      {/* Card top bar: number + field name + move + delete */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <span className="w-6 h-6 flex items-center justify-center rounded-full bg-[#b45309] text-white text-xs font-bold shrink-0">
            {index + 1}
          </span>
          <span className="text-sm font-semibold text-slate-700">
            {field.label || <span className="text-slate-400 italic font-normal">New Field</span>}
          </span>
          {field.required && (
            <span className="text-xs text-rose-500 font-medium">• Required</span>
          )}
        </div>
        <div className="flex items-center gap-1">
          <button
            onClick={() => onMove(index, -1)} disabled={index === 0}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 disabled:opacity-30 transition-colors"
            title="Move Up"
          >
            <ChevronUp size={14} />
          </button>
          <button
            onClick={() => onMove(index, 1)} disabled={index === total - 1}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 disabled:opacity-30 transition-colors"
            title="Move Down"
          >
            <ChevronDown size={14} />
          </button>
          <button
            onClick={() => onDelete(field.id)}
            className="p-1.5 rounded-lg text-slate-400 hover:text-red-500 hover:bg-red-50 transition-colors ml-1"
            title="Delete Field"
          >
            <Trash2 size={14} />
          </button>
        </div>
      </div>

      {/* Row 1: Label + Key */}
      <div className="grid grid-cols-2 gap-3 mb-3">
        <div>
          <label className="block text-xs font-semibold text-slate-500 mb-1">Field Label</label>
          <input
            type="text"
            value={field.label || ''}
            onChange={(e) => onUpdate(field.id, 'label', e.target.value)}
            placeholder="e.g. Full Name"
            className={inputCls}
          />
        </div>
        <div>
          <label className="block text-xs font-semibold text-slate-500 mb-1">Field Key</label>
          <input
            type="text"
            value={field.name || ''}
            onChange={(e) => onUpdate(field.id, 'name', e.target.value.toLowerCase().replace(/\s+/g, '_'))}
            placeholder="e.g. full_name"
            className={inputCls}
          />
        </div>
      </div>

      {/* Row 2: Type + Placeholder */}
      <div className="grid grid-cols-2 gap-3 mb-3">
        <div>
          <label className="block text-xs font-semibold text-slate-500 mb-1">Input Type</label>
          <select
            value={field.type || 'text'}
            onChange={(e) => onUpdate(field.id, 'type', e.target.value)}
            className={inputCls}
          >
            {FIELD_TYPES.map((t) => (
              <option key={t.value} value={t.value}>{t.label}</option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-xs font-semibold text-slate-500 mb-1">Placeholder</label>
          <input
            type="text"
            value={field.placeholder || ''}
            onChange={(e) => onUpdate(field.id, 'placeholder', e.target.value)}
            placeholder="e.g. Enter your name…"
            className={inputCls}
          />
        </div>
      </div>

      {/* Textarea rows (only if textarea) */}
      {field.type === 'textarea' && (
        <div className="mb-3">
          <label className="block text-xs font-semibold text-slate-500 mb-1">Rows (height)</label>
          <input
            type="number"
            value={field.rows || 4}
            onChange={(e) => onUpdate(field.id, 'rows', parseInt(e.target.value) || 4)}
            min={2} max={12}
            className={inputCls}
          />
        </div>
      )}

      {/* Dropdown options (only if select) */}
      {field.type === 'select' && (
        <div className="mb-3">
          <label className="block text-xs font-semibold text-slate-500 mb-1">Options (comma-separated)</label>
          <input
            type="text"
            value={Array.isArray(field.options) ? field.options.join(', ') : ''}
            onChange={(e) =>
              onUpdate(field.id, 'options', e.target.value.split(',').map((s) => s.trim()).filter(Boolean))
            }
            placeholder="Option 1, Option 2, Option 3"
            className={inputCls}
          />
        </div>
      )}

      {/* Required toggle */}
      <div className="flex items-center justify-between p-3 bg-slate-50 border border-slate-200 rounded-lg mt-1">
        <span className="text-sm font-medium text-slate-700">Required field</span>
        <button
          onClick={() => onUpdate(field.id, 'required', !field.required)}
          className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${field.required ? 'bg-[#b45309]' : 'bg-slate-300'}`}
        >
          <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${field.required ? 'translate-x-6' : 'translate-x-1'}`} />
        </button>
      </div>

    </div>
  );
}


// ── Main Editor ─────────────────────────────────────────────────────────────

export default function ContactEditor({ data = {}, onChange }) {
  const formFields = Array.isArray(data.formFields) ? data.formFields : [];

  const addField = () => {
    const newField = {
      id: `ff-${Date.now()}`,
      label: '',
      name: `field_${Date.now()}`,
      type: 'text',
      placeholder: '',
      required: false,
      rows: null,
    };
    onChange('formFields', [...formFields, newField]);
  };

  const updateField = (id, key, value) => {
    onChange('formFields', formFields.map((f) => (f.id === id ? { ...f, [key]: value } : f)));
  };

  const deleteField = (id) => {
    onChange('formFields', formFields.filter((f) => f.id !== id));
  };

  const moveField = (index, direction) => {
    const arr = [...formFields];
    const target = index + direction;
    if (target < 0 || target >= arr.length) return;
    [arr[index], arr[target]] = [arr[target], arr[index]];
    onChange('formFields', arr);
  };

  return (
    <div className="space-y-8">

      {/* ── 1. Form Fields ── */}
      <div>
        <SectionHeader icon={Layout} title="Form Fields" />
        <div className="bg-slate-50 p-4 rounded-xl border border-slate-200">

          {formFields.length === 0 && (
            <p className="text-sm text-slate-400 text-center py-4">
              No fields yet. Click <strong>+ Add Field</strong> to create one.
            </p>
          )}

          {formFields.map((field, index) => (
            <FieldRow
              key={field.id}
              field={field}
              index={index}
              total={formFields.length}
              onUpdate={updateField}
              onDelete={deleteField}
              onMove={moveField}
            />
          ))}

          <button
            onClick={addField}
            className="w-full flex items-center justify-center gap-2 py-2.5 mt-2 rounded-xl border-2 border-dashed border-amber-300 text-amber-700 hover:bg-amber-50 hover:border-amber-400 text-sm font-semibold transition-all"
          >
            <Plus size={15} />
            Add Field
          </button>
        </div>
      </div>

      {/* ── 2. Page Header ── */}
      <div>
        <SectionHeader icon={Type} title="Page Header" />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            {renderTextInput('badgeText', 'Badge / Eyebrow Text', 'Reach Out', data, onChange)}
            {renderTextInput('heading', 'Main Heading', 'Contact', data, onChange)}
            {renderTextInput('headingHighlight', 'Highlighted Word', 'Us', data, onChange)}
          </div>
          <div>
            {renderTextInput('subheading', 'Sub-heading', "We're here to assist you 24/7", data, onChange)}
            {renderTextarea('description', 'Description', 'Brief description…', 4, data, onChange)}
          </div>
        </div>
      </div>

      {/* ── 3. Contact Info ── */}
      <div>
        <SectionHeader icon={Phone} title="Contact Info" />
        <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-0">
          {renderTextInput('phone', 'Phone Number', '+880 1234-567890', data, onChange)}
          {renderTextInput('email', 'Email Address', 'info@hotelname.com', data, onChange)}
          {renderTextInput('address', 'Address', 'Gulshan-2, Dhaka, Bangladesh', data, onChange)}
        </div>
      </div>

      {/* ── 4. Social Links ── */}
      <div>
        <SectionHeader icon={Globe} title="Social Links" />
        <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-4">
          <div>
            {renderToggle('showFacebook', 'Show Facebook', data, onChange)}
            {data.showFacebook && renderTextInput('facebookUrl', 'Facebook URL', 'https://facebook.com/…', data, onChange)}
          </div>
          <div>
            {renderToggle('showInstagram', 'Show Instagram', data, onChange)}
            {data.showInstagram && renderTextInput('instagramUrl', 'Instagram URL', 'https://instagram.com/…', data, onChange)}
          </div>
          <div>
            {renderToggle('showWhatsapp', 'Show WhatsApp', data, onChange)}
            {data.showWhatsapp && renderTextInput('whatsappUrl', 'WhatsApp URL', 'https://wa.me/…', data, onChange)}
          </div>
        </div>
      </div>

      {/* ── 5. Map Card ── */}
      <div>
        <SectionHeader icon={MapPin} title="Map Card" />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            {renderTextInput('mapLabel', 'Pin Label', 'Hotel Grand Dhaka', data, onChange)}
            {renderTextInput('mapCity', 'City Line', 'Gulshan-2, Dhaka', data, onChange)}
          </div>
          <div>
            {renderTextInput('mapCountry', 'Country / Hours Line', 'Bangladesh — Open 24 / 7', data, onChange)}
            {renderTextInput('mapLink', 'Google Maps Link', 'https://maps.google.com', data, onChange)}
          </div>
        </div>
      </div>

      {/* ── 6. Form Settings ── */}
      <div>
        <SectionHeader icon={MessageCircle} title="Form Settings" />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>{renderTextInput('formTitle', 'Form Title', 'Send a Message', data, onChange)}</div>
          <div>{renderTextInput('formSubtitle', 'Form Subtitle', "We'll reply within a few hours.", data, onChange)}</div>
          <div>{renderTextInput('buttonText', 'Submit Button Text', 'Send Message', data, onChange)}</div>
        </div>
      </div>

      {/* ── 7. Colours ── */}
      <div>
        <SectionHeader icon={Palette} title="Colours" />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            {renderColorPicker('accentColor', 'Accent / Gold Colour', '#C8A96A', data, onChange)}
          </div>
          <div>
            <div className="mb-4">
              <label className="block text-xs font-semibold text-slate-500 mb-1">Section Background (CSS gradient or colour)</label>
              <textarea
                value={data.sectionBg || ''}
                onChange={(e) => onChange('sectionBg', e.target.value)}
                placeholder="linear-gradient(135deg, #f9f7f4 0%, #ffffff 60%, #f3f0ec 100%)"
                rows={2}
                className={`${inputCls} resize-none`}
              />
            </div>
            <div
              className="h-12 rounded-xl border border-slate-200"
              style={{ background: data.sectionBg || 'linear-gradient(135deg, #f9f7f4 0%, #ffffff 60%, #f3f0ec 100%)' }}
            />
          </div>
        </div>
      </div>

    </div>
  );
}
