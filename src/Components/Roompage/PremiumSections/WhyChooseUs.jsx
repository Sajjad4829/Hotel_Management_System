import { motion } from "framer-motion";
import { Waves, Bath, BedDouble, MonitorPlay, Sparkles, Wifi, BellRing, UserCheck } from "lucide-react";
import * as LucideIcons from "lucide-react";
import { usePageContext } from "../../../Context/PageContext";

const defaultFeatures = [
  { icon: 'Waves', title: "Ocean View", description: "Wake up to breathtaking panoramic views of the ocean from your private balcony." },
  { icon: 'Bath', title: "Luxury Bathroom", description: "Marble finishes, rain showers, and deep soaking tubs for ultimate relaxation." },
  { icon: 'BedDouble', title: "Premium Bedding", description: "Sink into our custom king-sized beds with Egyptian cotton linens." },
  { icon: 'MonitorPlay', title: "Smart Room", description: "Control lighting, temperature, and entertainment with a touch of a button." },
  { icon: 'Sparkles', title: "Premium Interior", description: "Handcrafted furniture and curated artwork in every suite." },
  { icon: 'Wifi', title: "Fast WiFi", description: "Stay connected with complimentary high-speed fiber internet." },
  { icon: 'BellRing', title: "Room Service", description: "Gourmet dining delivered to your room, 24 hours a day." },
  { icon: 'UserCheck', title: "24/7 Concierge", description: "Our dedicated team is ready to assist with any request, anytime." },
];

export default function WhyChooseUs() {
  const { pagesData } = usePageContext();
  const rawFeatures = pagesData.rooms?.whyChooseUs;
  const features = Array.isArray(rawFeatures) && rawFeatures.length > 0 ? rawFeatures : defaultFeatures;

  const renderIcon = (iconName) => {
    if (!iconName) return <Sparkles strokeWidth={1.5} size={28} />;
    const IconComponent = LucideIcons[iconName];
    return IconComponent ? <IconComponent strokeWidth={1.5} size={28} /> : <Sparkles strokeWidth={1.5} size={28} />;
  };

  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-amber-600 text-xs font-semibold uppercase tracking-widest mb-4"
          >
            The Haven Standard
          </motion.p>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl font-light text-stone-900 font-serif"
          >
            Why Choose <span className="italic text-stone-500">Our Rooms</span>
          </motion.h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => {
            return (
              <motion.div
                key={feature.title || index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="group p-8 rounded-2xl bg-stone-50 border border-stone-100 hover:bg-white hover:shadow-2xl hover:shadow-stone-200/50 hover:-translate-y-2 transition-all duration-300"
              >
                <div className="w-14 h-14 rounded-xl bg-amber-50 flex items-center justify-center text-amber-600 mb-6 group-hover:scale-110 group-hover:bg-amber-500 group-hover:text-white transition-all duration-300">
                  {renderIcon(feature.icon)}
                </div>
                <h3 className="text-xl font-bold text-stone-800 mb-3">{feature.title}</h3>
                <p className="text-stone-500 text-sm leading-relaxed">{feature.description || feature.desc}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
