import { NavLink } from "react-router-dom";
// সঠিক পাথ (Path) সেট করা হলো
import logoImg from "../../assets/navimage.png";

export default function HotelLogo() {
  return (
    <NavLink to="/" className="flex items-center gap-2.5 group select-none">
      {/* গোল্ডেন ব্যাকগ্রাউন্ড */}
      <div className="relative flex items-center justify-center w-9 h-9 rounded-sm bg-amber-600 shadow-md group-hover:bg-amber-500 transition-colors duration-300">
        <img 
          src={logoImg} 
          alt="Aurum Hotel Logo" 
          className="w-5 h-5 object-contain" 
        />
      </div>
      
      {/* হোটেলের নাম */}
      <div className="flex flex-col leading-none">
        <span className="text-base font-bold tracking-widest text-stone-800 uppercase">
        Hotel
        </span>
        <span className="text-[10px] font-medium tracking-[0.25em] text-amber-600 uppercase mt-1">
        & Resort
        </span>
      </div>
    </NavLink>
  );
}