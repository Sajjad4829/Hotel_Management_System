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

export default function ContentManagerWrapper() {
  const { page } = useParams(); // 'homepage', 'about', 'offer', etc.
  const { pagesData, updatePageData, resetPageData } = usePageContext();
  const [savedStatus, setSavedStatus] = useState(false);

  // Since we are refactoring, we currently only have editors for the 'homepage'
  // and they are broken down into sections.
  const isHomepage = page === 'homepage';

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
      ) : (
        <div className="bg-white p-12 text-center rounded-2xl shadow-sm border border-slate-100">
          <h3 className="text-lg font-medium text-slate-600 mb-2">Editor Coming Soon</h3>
          <p className="text-slate-500 text-sm">The content management module for the {getPageTitle(page)} is currently under development.</p>
        </div>
      )}
    </div>
  );
}
