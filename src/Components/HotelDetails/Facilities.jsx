import { Wifi, Waves, Sparkles, Dumbbell, Car, UtensilsCrossed, CheckCircle } from "lucide-react";

const FACILITY_MAP = {
  wifi:       { icon: <Wifi size={18} />,            label: "Free WiFi" },
  pool:       { icon: <Waves size={18} />,           label: "Swimming Pool" },
  spa:        { icon: <Sparkles size={18} />,        label: "Spa & Wellness" },
  gym:        { icon: <Dumbbell size={18} />,        label: "Fitness Center" },
  parking:    { icon: <Car size={18} />,             label: "Free Parking" },
  restaurant: { icon: <UtensilsCrossed size={18} />, label: "Restaurant & Bar" },
};

export default function Facilities({ facilities = [] }) {
  if (!facilities.length) return null;

  return (
    <div>
      <h2 className="text-[16px] font-bold text-[#1E2A38] mb-4">Popular Facilities</h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
        {facilities.map((key) => {
          const item = FACILITY_MAP[key];
          if (!item) return null;
          return (
            <div
              key={key}
              className="flex items-center gap-2.5 bg-slate-50 rounded-xl px-4 py-3 border border-slate-100"
            >
              <span className="text-[#2C4A6E]">{item.icon}</span>
              <span className="text-[13px] font-medium text-slate-700">{item.label}</span>
            </div>
          );
        })}
        {/* Generic "All facilities included" note */}
        <div className="flex items-center gap-2.5 col-span-2 sm:col-span-3 text-emerald-700 text-[12px] font-medium mt-1">
          <CheckCircle size={14} />
          All facilities are complimentary for hotel guests
        </div>
      </div>
    </div>
  );
}