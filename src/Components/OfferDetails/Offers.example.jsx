// src/pages/Offers.example.jsx
//
// Reference implementation for the Offers listing page (rename to Offers.jsx
// in your project). Shows how OfferCard is used in a grid and confirms cards
// route to /offers/:id rather than straight to booking.

import React from "react";
import { motion } from "framer-motion";
import offersData from "../data/offersData";
import OfferCard from "../components/OfferCard";
import Breadcrumb from "../components/Breadcrumb";

const Offers = () => {
  return (
    <div className="min-h-screen bg-ink-900 text-ivory-100">
      <section className="relative h-[38vh] min-h-[280px] w-full overflow-hidden flex items-end">
        <img
          src="https://images.unsplash.com/photo-1611892440504-42a792e24d32?q=80&w=1920&auto=format&fit=crop"
          alt="Exclusive hotel offers"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ink-900 via-ink-900/70 to-ink-900/20" />
        <div className="relative z-10 max-w-6xl mx-auto px-6 pb-10 w-full">
          <div className="mb-4">
            <Breadcrumb items={[{ label: "Offers" }]} />
          </div>
          <h1 className="font-serif text-4xl sm:text-5xl text-ivory-50">
            Exclusive Stay Offers
          </h1>
          <p className="mt-3 text-ivory-300/80 max-w-xl">
            Curated packages across our properties — from fjord lofts to desert
            villas — each bundled with the details that make a stay memorable.
          </p>
        </div>
      </section>

      <div className="max-w-6xl mx-auto px-6 py-14">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {offersData.map((offer, idx) => (
            <motion.div
              key={offer.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.4, delay: (idx % 6) * 0.06 }}
            >
              <OfferCard offer={offer} />
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Offers;
