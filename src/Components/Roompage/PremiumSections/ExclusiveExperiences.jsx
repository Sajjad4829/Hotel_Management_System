import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { usePageContext } from "../../../Context/PageContext";

const defaultExperiences = [
  {
    title: "Tranquility Spa",
    desc: "Rejuvenate your senses with bespoke holistic treatments.",
    image: "https://images.unsplash.com/photo-1540555700478-4be289fbecef?q=80&w=2070&auto=format&fit=crop"
  },
  {
    title: "Infinity Pool",
    desc: "Swim in our temperature-controlled pool overlooking the horizon.",
    image: "https://images.unsplash.com/photo-1571896349842-33c89424de2d?q=80&w=2070&auto=format&fit=crop"
  },
  {
    title: "Fine Dining",
    desc: "Experience Michelin-star quality cuisine prepared by world-class chefs.",
    image: "https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?q=80&w=2070&auto=format&fit=crop"
  },
  {
    title: "Private Beach",
    desc: "Enjoy exclusive access to our pristine white sand beach.",
    image: "https://images.unsplash.com/photo-1499793983690-e29da59ef1c2?q=80&w=2068&auto=format&fit=crop"
  }
];

export default function ExclusiveExperiences() {
  const { pagesData } = usePageContext();
  const rawExperiences = pagesData.rooms?.exclusiveExperiences;
  const experiences = Array.isArray(rawExperiences) && rawExperiences.length > 0 ? rawExperiences : defaultExperiences;

  return (
    <section className="py-24 bg-[#0A0A0A] text-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-8">
          <div>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-amber-500 text-xs font-semibold uppercase tracking-widest mb-4"
            >
              Beyond The Room
            </motion.p>
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-4xl md:text-6xl font-light text-white font-serif max-w-2xl"
            >
              Exclusive <span className="italic text-white/50">Experiences</span>
            </motion.h2>
          </div>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-white/40 max-w-md text-sm md:text-base leading-relaxed"
          >
            Enhance your stay with our curated amenities. Because true luxury extends far beyond the walls of your suite.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {experiences.map((exp, index) => (
            <motion.div
              key={exp.title || index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="group relative h-[400px] md:h-[500px] rounded-2xl overflow-hidden cursor-pointer"
            >
              {/* Background Image */}
              <div className="absolute inset-0">
                <img 
                  src={exp.image} 
                  alt={exp.title} 
                  className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                />
              </div>

              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent opacity-80 group-hover:opacity-90 transition-opacity duration-300" />

              {/* Content */}
              <div className="absolute inset-0 p-8 flex flex-col justify-end">
                <div className="transform translate-y-8 group-hover:translate-y-0 transition-transform duration-500">
                  <h3 className="text-2xl font-serif mb-3">{exp.title}</h3>
                  <p className="text-stone-300 text-sm leading-relaxed mb-6 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100 line-clamp-3">
                    {exp.description || exp.desc}
                  </p>
                  <Link 
                    to="#" 
                    className="inline-block text-amber-500 text-xs font-bold uppercase tracking-widest hover:text-amber-400 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-200"
                  >
                    Discover More &rarr;
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
