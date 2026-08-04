import { motion } from "framer-motion";
import { Star, Quote, UserCircle } from "lucide-react";
import { usePageContext } from "../../../Context/PageContext";

const defaultReviews = [
  {
    name: "Alexander Pierce",
    title: "An Unforgettable Stay",
    text: "From the moment we arrived, the service was impeccable. The suite was stunning and the views were breathtaking. A true masterclass in luxury hospitality.",
    rating: 5,
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop"
  },
  {
    name: "Eleanor Sterling",
    title: "Exceeded Every Expectation",
    text: "The attention to detail in the room design and the personalized concierge service made our anniversary trip absolutely perfect.",
    rating: 5,
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop"
  },
  {
    name: "Jameson Wright",
    title: "The Standard of Luxury",
    text: "I travel frequently for business and this property stands out. The amenities are world-class, and the culinary experiences are unmatched.",
    rating: 5,
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop"
  }
];

export default function GuestReviews() {
  const { pagesData } = usePageContext();
  const rawReviews = pagesData.rooms?.guestReviews;
  const reviews = Array.isArray(rawReviews) && rawReviews.length > 0 ? rawReviews : defaultReviews;

  return (
    <section className="py-24 bg-[#FAFAF8] overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-amber-600 text-xs font-semibold uppercase tracking-widest mb-4"
          >
            Guest Stories
          </motion.p>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl font-light text-stone-900 font-serif"
          >
            Words From <span className="italic text-stone-500">Our Guests</span>
          </motion.h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {reviews.map((review, index) => (
            <motion.div
              key={review.name || index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              className="bg-white p-10 rounded-2xl shadow-xl shadow-stone-200/40 relative"
            >
              <Quote className="absolute top-8 right-8 w-12 h-12 text-amber-500/10" />
              
              <div className="flex items-center gap-1 mb-6">
                {[...Array(review.rating || 5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-amber-500 text-amber-500" />
                ))}
              </div>

              <h3 className="text-lg font-bold text-stone-800 mb-4 font-serif">{review.title || 'Excellent Stay'}</h3>
              <p className="text-stone-500 text-sm leading-relaxed mb-8 italic">
                "{review.text}"
              </p>

              <div className="flex items-center gap-4 mt-auto">
                {review.image || review.avatar ? (
                  <img src={review.image || review.avatar} alt={review.name} className="w-12 h-12 rounded-full object-cover" />
                ) : (
                  <div className="w-12 h-12 rounded-full bg-stone-100 flex items-center justify-center text-stone-400">
                    <UserCircle size={24} />
                  </div>
                )}
                <div>
                  <h4 className="text-sm font-bold text-stone-800">{review.name}</h4>
                  <p className="text-xs text-stone-400">{review.location || 'Verified Guest'}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
