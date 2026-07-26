// src/pages/Booking.integration.example.jsx
//
// Reference snippet only — merge into your existing Booking page (src/pages/Booking.jsx).
// Shows how to read the { offer, room } state pushed by OfferDetails' Book Now button,
// and how to pre-fill the booking summary when it's present.

import React from "react";
import { useLocation } from "react-router-dom";

const Booking = () => {
  const location = useLocation();
  const { offer, room } = location.state || {};

  // `offer` and `room` will be undefined if a user lands on /book directly
  // (e.g. from the Rooms page instead of an Offer). Always guard for that.

  return (
    <div className="min-h-screen bg-ink-900 text-ivory-100 px-6 py-12">
      <div className="max-w-3xl mx-auto">
        <h1 className="font-serif text-3xl mb-6">Confirm Your Booking</h1>

        {offer && room ? (
          <div className="rounded-2xl border border-brass-400/25 bg-ink-800 p-6 mb-8">
            <p className="text-xs uppercase tracking-[0.2em] text-brass-300/90 mb-1">
              Booking with offer
            </p>
            <h2 className="font-serif text-xl text-ivory-50 mb-3">{offer.offerTitle}</h2>

            <div className="flex items-center gap-4">
              <img
                src={room.mainImage}
                alt={room.roomName}
                className="w-20 h-20 rounded-lg object-cover"
              />
              <div>
                <p className="text-ivory-100">{room.roomName}</p>
                <p className="text-sm text-ivory-400/60">{room.roomType} · {room.bedType}</p>
              </div>
            </div>

            <div className="mt-4 flex items-baseline gap-3">
              <span className="text-ivory-400/50 line-through text-sm">
                {offer.currency} {offer.offerOriginalPrice}
              </span>
              <span className="font-serif text-2xl text-ivory-50">
                {offer.currency} {offer.offerDiscountPrice}
              </span>
              <span className="text-brass-400 text-sm">
                Save {offer.currency} {offer.offerSavings}
              </span>
            </div>
          </div>
        ) : (
          <p className="text-ivory-400/60 mb-8">
            No offer selected — continue booking at standard room rates.
          </p>
        )}

        {/* ... rest of your existing booking form goes here ... */}
      </div>
    </div>
  );
};

export default Booking;
