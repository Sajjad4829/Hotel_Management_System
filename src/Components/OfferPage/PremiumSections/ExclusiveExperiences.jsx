import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { exclusiveExperiences } from "./premiumOfferData";
import { Heart, Sparkles, Users, Briefcase, ArrowRight } from "lucide-react";

const iconMap = {
  Heart: Heart,
  Sparkles: Sparkles,
  Users: Users,
  Briefcase: Briefcase,
};

export default function ExclusiveExperiences() {
  return (
    <section className="py-24 bg-slate-50 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        <div className="text-center mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-sm font-bold tracking-[0.2em] text-amber-600 uppercase mb-3"
          >
            Curated For You
          </motion.h2>
          <motion.h3 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl font-light text-slate-900 font-serif"
          >
            Exclusive Experiences
          </motion.h3>
          <motion.div 
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="w-24 h-px bg-amber-300 mx-auto mt-8 origin-left"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {exclusiveExperiences.map((exp, index) => {
            const Icon = iconMap[exp.icon];
            
            return (
              <motion.div
                key={exp.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="group relative h-96 rounded-2xl overflow-hidden cursor-pointer"
              >
                {/* Image */}
                <img 
                  src={exp.image} 
                  alt={exp.title} 
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                
                {/* Gradient Overlays */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent opacity-80 group-hover:opacity-90 transition-opacity duration-300" />
                
                {/* Content */}
                <div className="absolute inset-0 p-8 flex flex-col justify-end">
                  <div className="translate-y-8 group-hover:translate-y-0 transition-transform duration-500 ease-out">
                    <div className="w-12 h-12 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center mb-4 text-white">
                      {Icon && <Icon size={24} strokeWidth={1.5} />}
                    </div>
                    <h4 className="text-2xl font-serif text-white mb-2">{exp.title}</h4>
                    <p className="text-slate-300 text-sm leading-relaxed mb-6 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">
                      {exp.description}
                    </p>
                    <Link to="/rooms" className="inline-flex items-center gap-2 text-amber-400 font-medium text-sm tracking-wide uppercase hover:text-amber-300 transition-colors opacity-0 group-hover:opacity-100 delay-200 duration-500">
                      Explore Package <ArrowRight size={16} />
                    </Link>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
