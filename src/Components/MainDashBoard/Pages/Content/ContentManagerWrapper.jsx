import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { usePageContext } from '../../../../Context/PageContext';
import { Save, Check } from 'lucide-react';
import BookingSearchEditor from './BookingSearchEditor';
import FeaturedCollectionEditor from './FeaturedCollectionEditor';
import FacilitiesEditor from './FacilitiesEditor';
import ReviewsEditor from './ReviewsEditor';
import StatisticsEditor from './StatisticsEditor';
import OffersFeaturedEditor from './OffersFeaturedEditor';
import OffersGenericArrayEditor from './OffersGenericArrayEditor';
import OffersSimpleSectionEditor from './OffersSimpleSectionEditor';
import ContactEditor from './ContactEditor';
import HotelContactSection from '../../../Contact/Contact';

export default function ContentManagerWrapper() {
  const { page } = useParams(); // 'homepage', 'about', 'offer', etc.
  const { pagesData, updatePageData, resetPageData } = usePageContext();
  const [savedStatus, setSavedStatus] = useState(false);

  // Since we are refactoring, we currently only have editors for the 'homepage'
  // and they are broken down into sections.
  const isHomepage = page === 'homepage';

  // ── Contact page gets its own wide split-view layout (like HeroWrapper) ──
  if (page === 'contact') {
    return (
      <div className="max-w-[1600px] mx-auto py-6 px-4">

        {/* Header */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-8 gap-4 bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
          <div>
            <h1 className="text-3xl font-bold text-slate-900" style={{ fontFamily: 'Georgia, serif' }}>Contact Page</h1>
            <p className="text-slate-500 mt-1">Edit every detail of your /contact page and preview changes live.</p>
          </div>
          <button
            onClick={() => { setSavedStatus(true); setTimeout(() => setSavedStatus(false), 2000); }}
            className="flex items-center gap-2 px-8 py-2.5 bg-[#1e3a5f] hover:bg-[#0f2942] text-white rounded-xl font-semibold transition-colors shadow-md shrink-0"
          >
            {savedStatus ? <Check size={18} /> : <Save size={18} />}
            {savedStatus ? 'Saved!' : 'Save Changes'}
          </button>
        </div>

        {/* Split view */}
        <div className="flex flex-col xl:flex-row gap-6 items-start">

          {/* Left — Editor panel */}
          <div className="w-full xl:w-[42%] shrink-0">
            <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
              <div className="px-6 py-4 border-b border-slate-100 bg-slate-50">
                <h2 className="text-base font-bold text-slate-800">Contact Page Settings</h2>
                <p className="text-xs text-slate-500 mt-0.5">Changes appear instantly in the live preview →</p>
              </div>
              <div className="p-6 space-y-4 max-h-[calc(100vh-220px)] overflow-y-auto">
                <ContactEditor
                  data={pagesData['contact'] || {}}
                  onChange={(field, value) => {
                    updatePageData('contact', null, field, value);
                    setSavedStatus(false);
                  }}
                />
              </div>
            </div>
          </div>

          {/* Right — Live Preview */}
          <div className="w-full xl:w-[58%] sticky top-6">
            <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden flex flex-col">
              {/* Browser chrome bar */}
              <div className="bg-slate-50 border-b border-slate-100 px-4 py-3 flex items-center justify-between shrink-0">
                <div className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5 rounded-full bg-rose-400" />
                  <div className="w-2.5 h-2.5 rounded-full bg-amber-400" />
                  <div className="w-2.5 h-2.5 rounded-full bg-emerald-400" />
                  <span className="ml-3 text-xs font-semibold text-slate-500 uppercase tracking-widest">Live Preview</span>
                </div>
                <span className="text-xs text-slate-400 font-mono">/contact</span>
              </div>
              {/* Preview content */}
              <div className="overflow-y-auto" style={{ maxHeight: 'calc(100vh - 220px)' }}>
                <HotelContactSection data={pagesData['contact'] || {}} />
              </div>
            </div>
          </div>

        </div>
      </div>
    );
  }

  const handleInputChange = (section, field, value) => {
    updatePageData(page === 'homepage' ? 'home' : page, section, field, value);
    setSavedStatus(false);
  };

  const handleSave = () => {
    setSavedStatus(true);
    setTimeout(() => setSavedStatus(false), 2000);
  };

  const getPageTitle = (p) => {
    const titles = {
      'homepage': 'Homepage',
      'about': 'About Page',
      'offer': 'Offer Page',
      'room': 'Room Page',
      'gallery': 'Gallery Page',
      'contact': 'Contact Page',
    };
    return titles[p] || p.charAt(0).toUpperCase() + p.slice(1);
  };

  return (
    <div className="max-w-5xl mx-auto py-6 space-y-8">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-slate-900" style={{ fontFamily: "Georgia, serif" }}>{getPageTitle(page)} Content</h1>
          <p className="text-slate-500 mt-1">Manage content modules for the {getPageTitle(page)}.</p>
        </div>
        <div className="flex items-center gap-3 w-full md:w-auto">
          {isHomepage && (
            <button
              onClick={() => {
                if (window.confirm("Are you sure you want to reset all homepage data to default? This cannot be undone.")) {
                  resetPageData();
                }
              }}
              className="px-4 py-2.5 text-sm font-semibold text-red-600 bg-red-50 hover:bg-red-100 rounded-xl transition-colors border border-red-100"
            >
              Reset to Defaults
            </button>
          )}
          <button
            onClick={handleSave}
            className="flex items-center justify-center gap-2 px-6 py-2.5 bg-[#1e3a5f] hover:bg-[#0f2942] text-white rounded-xl font-semibold transition-colors shadow-sm flex-1 md:flex-none"
          >
            {savedStatus ? <Check size={18} /> : <Save size={18} />}
            {savedStatus ? "Saved!" : "Save Changes"}
          </button>
        </div>
      </div>

      {isHomepage ? (
        <div className="space-y-6">
          <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6 md:p-8">
            <h2 className="text-xl font-bold text-slate-800 border-b border-slate-100 pb-4 mb-6">Booking Search Widget</h2>
            <BookingSearchEditor 
              data={pagesData['home']?.['bookingSearch'] || {}} 
              onChange={(f, v) => handleInputChange('bookingSearch', f, v)} 
            />
          </div>

          <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6 md:p-8">
            <h2 className="text-xl font-bold text-slate-800 border-b border-slate-100 pb-4 mb-6">Curated Destinations</h2>
            <FeaturedCollectionEditor 
              data={pagesData['home']?.['featuredCollection'] || {}} 
              onChange={(f, v) => handleInputChange('featuredCollection', f, v)} 
            />
          </div>

          <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6 md:p-8">
            <h2 className="text-xl font-bold text-slate-800 border-b border-slate-100 pb-4 mb-6">AI Recommendations</h2>
            <div className="space-y-6">
              <OffersSimpleSectionEditor 
                pageKey="home"
                sectionKey="aiRecommended"
                title="AI Section Header"
                fields={[
                  { name: 'badgeText', label: 'Badge Text', type: 'text' },
                  { name: 'title', label: 'Main Title', type: 'text' },
                  { name: 'titleHighlight', label: 'Highlighted Title', type: 'text' },
                  { name: 'subtitle', label: 'Subtitle', type: 'textarea' },
                ]}
              />

              <OffersGenericArrayEditor 
                pageKey="home"
                sectionKey="aiRecommended.destinations"
                fields={[
                  { name: 'name', label: 'Destination Name', type: 'text' },
                  { name: 'matchScore', label: 'Match Score (%)', type: 'number' },
                  { name: 'reason', label: 'AI Reason', type: 'textarea' },
                  { name: 'image', label: 'Image URL', type: 'text', fullWidth: true },
                  { name: 'link', label: 'Link', type: 'text', fullWidth: true },
                ]}
              />
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6 md:p-8">
            <h2 className="text-xl font-bold text-slate-800 border-b border-slate-100 pb-4 mb-6">Facilities Section</h2>
            <FacilitiesEditor 
              data={pagesData['home']?.['facilities'] || {}} 
              onChange={(f, v) => handleInputChange('facilities', f, v)} 
            />
          </div>

          <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6 md:p-8">
            <h2 className="text-xl font-bold text-slate-800 border-b border-slate-100 pb-4 mb-6">Reviews Section</h2>
            <ReviewsEditor 
              data={pagesData['home']?.['reviews'] || {}} 
              onChange={(f, v) => handleInputChange('reviews', f, v)} 
            />
          </div>

          <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6 md:p-8">
            <h2 className="text-xl font-bold text-slate-800 border-b border-slate-100 pb-4 mb-6">Statistics Section</h2>
            <StatisticsEditor 
              data={pagesData['home']?.['statistics'] || {}} 
              onChange={(f, v) => handleInputChange('statistics', f, v)} 
            />
          </div>
        </div>
      ) : page === 'offer' || page === 'offers' ? (
        <div className="space-y-6">
          <OffersFeaturedEditor />
          
          <OffersGenericArrayEditor 
            sectionKey="exclusiveExperiences"
            fields={[
              { name: 'title', label: 'Experience Title', type: 'text' },
              { name: 'description', label: 'Description', type: 'textarea' },
              { name: 'image', label: 'Background Image URL', type: 'text', fullWidth: true },
              { name: 'icon', label: 'Icon', type: 'icon' },
            ]}
          />

          <OffersGenericArrayEditor 
            sectionKey="seasonalOffers"
            fields={[
              { name: 'title', label: 'Offer Title', type: 'text' },
              { name: 'validity', label: 'Validity Text', type: 'text' },
              { name: 'price', label: 'Current Price', type: 'text' },
              { name: 'originalPrice', label: 'Original Price', type: 'text' },
              { name: 'discount', label: 'Discount Tag', type: 'text' },
              { name: 'image', label: 'Background Image URL', type: 'text', fullWidth: true },
            ]}
          />

          <OffersGenericArrayEditor 
            sectionKey="luxuryAmenities"
            fields={[
              { name: 'title', label: 'Amenity Title', type: 'text' },
              { name: 'description', label: 'Description', type: 'textarea' },
              { name: 'icon', label: 'Icon', type: 'icon' },
            ]}
          />

          <OffersSimpleSectionEditor 
            sectionKey="limitedTimeDeal"
            title="Flash Sale Configuration"
            fields={[
              { name: 'tag', label: 'Small Tag', type: 'text', placeholder: 'e.g. Flash Sale' },
              { name: 'title', label: 'Main Title', type: 'text' },
              { name: 'description', label: 'Description', type: 'textarea' },
              { name: 'buttonText', label: 'Button Text', type: 'text' },
              { name: 'image', label: 'Background Image URL', type: 'text' },
            ]}
          />

          <OffersGenericArrayEditor 
            sectionKey="whyGuestsLove"
            fields={[
              { name: 'title', label: 'Feature Title', type: 'text' },
              { name: 'description', label: 'Description', type: 'textarea' },
              { name: 'icon', label: 'Icon', type: 'icon' },
            ]}
          />

          <OffersGenericArrayEditor 
            sectionKey="guestReviews"
            fields={[
              { name: 'name', label: 'Guest Name', type: 'text' },
              { name: 'location', label: 'Location', type: 'text' },
              { name: 'rating', label: 'Rating (1-5)', type: 'number' },
              { name: 'text', label: 'Review Text', type: 'textarea' },
              { name: 'image', label: 'Guest Avatar URL', type: 'text', fullWidth: true },
            ]}
          />

          <OffersGenericArrayEditor 
            sectionKey="bookingJourney"
            fields={[
              { name: 'title', label: 'Step Title', type: 'text' },
              { name: 'description', label: 'Description', type: 'textarea' },
              { name: 'icon', label: 'Icon', type: 'icon' },
            ]}
          />

          <OffersGenericArrayEditor 
            sectionKey="premiumFaqs"
            fields={[
              { name: 'question', label: 'Question', type: 'text', fullWidth: true },
              { name: 'answer', label: 'Answer', type: 'textarea' },
            ]}
          />

          <OffersSimpleSectionEditor 
            sectionKey="finalBookingCTA"
            title="Final Booking CTA Configuration"
            fields={[
              { name: 'tag', label: 'Small Tag', type: 'text', placeholder: 'e.g. Ready for an unforgettable experience?' },
              { name: 'title', label: 'Main Title', type: 'text' },
              { name: 'buttonText', label: 'Button Text', type: 'text' },
              { name: 'image', label: 'Background Image URL', type: 'text' },
            ]}
          />
        </div>
      ) : page === 'room' || page === 'rooms' ? (
        <div className="space-y-6">
          <OffersGenericArrayEditor 
            pageKey="rooms"
            sectionKey="whyChooseUs"
            fields={[
              { name: 'title', label: 'Feature Title', type: 'text' },
              { name: 'description', label: 'Description', type: 'textarea' },
              { name: 'icon', label: 'Icon', type: 'icon' },
            ]}
          />

          <OffersGenericArrayEditor 
            pageKey="rooms"
            sectionKey="exclusiveExperiences"
            fields={[
              { name: 'title', label: 'Experience Title', type: 'text' },
              { name: 'description', label: 'Description', type: 'textarea' },
              { name: 'image', label: 'Background Image URL', type: 'text', fullWidth: true },
            ]}
          />

          <OffersGenericArrayEditor 
            pageKey="rooms"
            sectionKey="guestReviews"
            fields={[
              { name: 'name', label: 'Guest Name', type: 'text' },
              { name: 'location', label: 'Location', type: 'text' },
              { name: 'rating', label: 'Rating (1-5)', type: 'number' },
              { name: 'text', label: 'Review Text', type: 'textarea' },
              { name: 'image', label: 'Guest Avatar URL', type: 'text', fullWidth: true },
            ]}
          />

          <OffersGenericArrayEditor 
            pageKey="rooms"
            sectionKey="faqSection"
            fields={[
              { name: 'question', label: 'Question', type: 'text', fullWidth: true },
              { name: 'answer', label: 'Answer', type: 'textarea' },
            ]}
          />

          <OffersSimpleSectionEditor 
            pageKey="rooms"
            sectionKey="newsletter"
            title="Newsletter Configuration"
            fields={[
              { name: 'tag', label: 'Small Tag', type: 'text' },
              { name: 'title', label: 'Main Title', type: 'text' },
              { name: 'description', label: 'Description', type: 'textarea' },
            ]}
          />

          <OffersSimpleSectionEditor 
            pageKey="rooms"
            sectionKey="premiumBookingCTA"
            title="Premium Booking CTA Configuration"
            fields={[
              { name: 'tag', label: 'Small Tag', type: 'text' },
              { name: 'title', label: 'Main Title', type: 'text' },
              { name: 'description', label: 'Description', type: 'textarea' },
              { name: 'buttonText', label: 'Button Text', type: 'text' },
              { name: 'image', label: 'Background Image URL', type: 'text', fullWidth: true },
            ]}
          />
        </div>
      ) : page === 'gallery' ? (
        <div className="space-y-6">
          <OffersSimpleSectionEditor 
            pageKey="gallery"
            sectionKey="header"
            title="Gallery Header Configuration"
            fields={[
              { name: 'tag', label: 'Small Tag', type: 'text' },
              { name: 'title', label: 'Main Title', type: 'text' },
              { name: 'description', label: 'Description', type: 'textarea' },
            ]}
          />

          <OffersGenericArrayEditor 
            pageKey="gallery"
            sectionKey="images"
            fields={[
              { name: 'title', label: 'Image Title', type: 'text' },
              { name: 'category', label: 'Category', type: 'text' },
              { name: 'image', label: 'Image URL', type: 'text', fullWidth: true },
            ]}
          />
        </div>
      ) : (
        <div className="bg-white p-12 text-center rounded-2xl shadow-sm border border-slate-100">
          <h3 className="text-lg font-medium text-slate-600 mb-2">Editor Coming Soon</h3>
          <p className="text-slate-500 text-sm">The content management module for the {getPageTitle(page)} is currently under development.</p>
        </div>
      )}
    </div>
  );
}
