import { motion } from "framer-motion";

export default function RoomCategories({ categories, activeCategory, onSelectCategory }) {
  return (
    <section className="py-12 bg-[#FAFAF8] border-b border-stone-200">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-wrap items-center justify-center gap-4 md:gap-8">
          {categories.map((category, index) => (
            <motion.button
              key={category}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              onClick={() => onSelectCategory(category)}
              className={`relative px-4 py-2 text-sm font-semibold uppercase tracking-widest transition-all duration-300 ${
                activeCategory === category
                  ? "text-amber-600"
                  : "text-stone-400 hover:text-stone-800"
              }`}
            >
              {category === "All" ? "All Rooms" : category}
              
              {/* Active Indicator line */}
              {activeCategory === category && (
                <motion.div
                  layoutId="activeCategoryIndicator"
                  className="absolute -bottom-2 left-0 right-0 h-[2px] bg-amber-500"
                />
              )}
            </motion.button>
          ))}
        </div>
      </div>
    </section>
  );
}
