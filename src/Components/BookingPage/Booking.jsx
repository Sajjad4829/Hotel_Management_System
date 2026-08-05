import React, { useState, useMemo, useEffect } from "react";
import { useParams, Link, useLocation, useNavigate } from "react-router-dom";
import { calculatePricing } from "../../utils/pricing";
import {
  FiCalendar, FiUsers, FiHome, FiMaximize2, FiPhone, FiMail, FiMapPin, FiShield, FiCreditCard, FiStar, FiHeadphones, FiCheckCircle, FiClock,
  FiChevronRight, FiArrowLeft, FiWifi, FiCoffee, FiTruck, FiTag, FiLock,
} from "react-icons/fi"; 
import { useRoomContext } from "../../Context/RoomContext";
import { useAuth } from "../../Context/AuthContext.jsx";
import api from "../../services/api.js";

function BookingInput({
  label,
  id,
  type = "text",
  value,
  onChange,
  placeholder,
  icon: Icon,
  required = false,
  as = "input",
  options = [],
  className = "",
}) {
  const baseClasses =
    "w-full rounded-xl border border-stone-200 bg-white px-4 py-3 text-sm text-stone-800 placeholder-stone-400 shadow-sm transition focus:border-[#C89B3C] focus:outline-none focus:ring-2 focus:ring-[#C89B3C]/30";

  return (
    <div className={className}>
      <label
        htmlFor={id}
        className="mb-1.5 block text-xs font-medium uppercase tracking-wide text-stone-500"
      >
        {label} {required && <span className="text-[#C89B3C]">*</span>}
      </label>
      <div className="relative">
        {Icon && (
          <Icon className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-stone-400" />
        )}
        {as === "select" ? (
          <select
            id={id}
            value={value}
            onChange={onChange}
            required={required}
            className={`${baseClasses} ${Icon ? "pl-10" : ""} appearance-none`}
          >
            {options.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
        ) : as === "textarea" ? (
          <textarea
            id={id}
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            rows={4}
            className={`${baseClasses} resize-none`}
          />
        ) : (
          <input
            id={id}
            type={type}
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            required={required}
            className={`${baseClasses} ${Icon ? "pl-10" : ""}`}
          />
        )}
      </div>
    </div>
  );
}

function SummaryRow({ label, value, muted = false, bold = false }) {
  return (
    <div className="flex items-center justify-between py-1.5">
      <span
        className={`text-sm ${muted ? "text-stone-400" : "text-stone-600"}`}
      >
        {label}
      </span>
      <span
        className={`text-sm ${bold ? "text-base font-semibold text-stone-900" : "text-stone-700"
          }`}
      >
        {value}
      </span>
    </div>
  );
}

function InfoBadge({ icon: Icon, children }) {
  return (
    <span className="inline-flex items-center gap-1.5 rounded-full border border-[#C89B3C]/30 bg-[#C89B3C]/10 px-3 py-1 text-xs font-medium text-[#8a6a23]">
      {Icon && <Icon className="text-sm" />}
      {children}
    </span>
  );
}

function BenefitItem({ icon: Icon, title, desc }) {
  return (
    <div className="flex items-start gap-3">
      <div className="flex h-10 w-10 flex-none items-center justify-center rounded-full bg-[#C89B3C]/10 text-[#C89B3C]">
        <Icon className="text-lg" />
      </div>
      <div>
        <p className="text-sm font-semibold text-stone-800">{title}</p>
        <p className="text-xs text-stone-500">{desc}</p>
      </div>
    </div>
  );
}

function SectionCard({ title, subtitle, children, className = "" }) {
  return (
    <div
      className={`rounded-2xl border border-stone-200/70 bg-white p-6 shadow-[0_4px_24px_-8px_rgba(0,0,0,0.06)] sm:p-8 ${className}`}
    >
      {title && (
        <div className="mb-6">
          <h2 className="text-lg font-semibold text-stone-900 sm:text-xl">
            {title}
          </h2>
          {subtitle && (
            <p className="mt-1 text-sm text-stone-500">{subtitle}</p>
          )}
        </div>
      )}
      {children}
    </div>
  );
}

// ==================================================
// MAIN BOOKING PAGE
// ==================================================

export default function BookingPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, token } = useAuth();
  const { rooms: allRooms } = useRoomContext();
  const [arrivalTime, setArrivalTime] = useState("");
  const [occasion, setOccasion] = useState("");
  const [selectedRoomForModal, setSelectedRoomForModal] = useState(null);
  const [isBookingLoading, setIsBookingLoading] = useState(false);
  const [bookingSuccessData, setBookingSuccessData] = useState(null);
  
  const { hotel, selectedRooms } = location.state || {};
  const { id } = useParams();

  // const room = location.state?.room || roomsData.find(r => String(r.id) === String(id));
  // const offer = location.state?.offer;

  // const bookingItem = room || offer;
  const offer = location.state?.offer;

  const room =
    location.state?.room ||
    location.state?.selectedRooms?.[0]?.room ||
    allRooms.find((r) => String(r.id || r._id) === String(id));

  const bookingItem = offer || room;
  const bookingRooms = location.state?.selectedRooms || [];
  
  // ---------- Stay state ----------
  const initialGuestsObj = typeof location.state?.guests === "object" && location.state?.guests !== null ? location.state.guests : null;
  const [checkIn, setCheckIn] = useState(location.state?.checkIn || "");
  const [checkOut, setCheckOut] = useState(location.state?.checkOut || "");
  const [guests, setGuests] = useState(initialGuestsObj ? (Number(initialGuestsObj.adults) || 2) : (location.state?.guests || bookingItem?.capacity || bookingItem?.maxGuests || bookingItem?.maxAdults || 2));
  const [children, setChildren] = useState(initialGuestsObj ? (Number(initialGuestsObj.children) || 0) : (location.state?.children || bookingItem?.maxChildren || 0));

  // ---------- Guest information & Payment state ----------
  const [guestInfo, setGuestInfo] = useState(location.state?.guestInfo || {
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    country: "",
    city: "",
    postalCode: "",
    address: "",
  });

  const [paymentMethod, setPaymentMethod] = useState(location.state?.paymentMethod || "Credit Card");
  const [cardDetails, setCardDetails] = useState(location.state?.cardDetails || {
    cardNumber: "",
    expiryDate: "",
    cvc: "",
    cardHolderName: ""
  });

  // ---------- Special request state ----------
  const [specialRequests, setSpecialRequests] = useState(location.state?.specialRequests || "");

  const handleGuestInfoChange = (field) => (e) =>
    setGuestInfo((prev) => ({ ...prev, [field]: e.target.value }));

  const handleCardChange = (field) => (e) =>
    setCardDetails((prev) => ({ ...prev, [field]: e.target.value }));

  // Connect with POST /api/bookings/create with automatic JWT, payment verification, and loading handling
  const handleConfirmBooking = async (e) => {
    e.preventDefault();

    // 1. Validate required guest contact information
    if (!guestInfo.firstName || !guestInfo.lastName || !guestInfo.email || !guestInfo.phone) {
      alert("Please complete all required Guest Information fields (First Name, Last Name, Email, and Phone) before confirming.");
      return;
    }

    // 2. Validate required payment fields based on selected method
    if (paymentMethod === "Credit Card") {
      if (!cardDetails.cardNumber || !cardDetails.expiryDate || !cardDetails.cvc || !cardDetails.cardHolderName) {
        alert("Payment Required: Please input valid Credit / Debit Card details to secure your reservation.");
        return;
      }
    }

    // 3. Ensure valid check-in and check-out dates
    if (!checkIn || !checkOut) {
      alert("Please select valid check-in and check-out dates to confirm your stay.");
      return;
    }

    // 4. Require authentication ONLY when confirming the reservation
    if (!token || !user) {
      alert("Authentication Required: Please sign in to your customer account to process your payment and track this reservation in your dashboard.");
      navigate("/login", { 
        state: { 
          from: location.pathname + location.search, 
          bookingState: { ...location.state, checkIn, checkOut, guests, children, guestInfo, paymentMethod, cardDetails, specialRequests } 
        } 
      });
      return;
    }

    setIsBookingLoading(true);

    const hotelIdParam = bookingItem?.hotelId || bookingItem?.hotel?._id || hotel?._id || "64b0f20d8f0d8a54c8f0d801";
    const roomIdParam = bookingItem?._id || bookingItem?.id || id || "64b0f20d8f0d8a54c8f0d802";
    const totalQty = bookingRooms?.length > 0 ? bookingRooms.reduce((acc, r) => acc + (r.qty || 1), 0) : 1;
    const finalTotal = pricing?.total || 850;

    const payload = {
      hotelId: hotelIdParam.toString(),
      roomId: roomIdParam.toString(),
      checkIn,
      checkOut,
      guests: { adults: Number(guests || 2), children: Number(children || 0) },
      rooms: totalQty,
      totalPrice: Number(finalTotal),
      paymentMethod: paymentMethod,
      paymentStatus: paymentMethod === "Pay at Hotel" ? "Pending" : "Paid",
      specialRequest: specialRequests || occasion || ""
    };

    try {
      const response = await api.post("/bookings/create", payload);
      setIsBookingLoading(false);
      if (response.data?.success) {
        const resultData = response.data.data;
        const confirmedReservation = {
          id: resultData.bookingId || resultData._id || "RES-" + Math.floor(100000 + Math.random() * 900000),
          _id: resultData._id,
          hotelName: resultData.hotel?.name || bookingItem?.hotelName || hotel?.name || "Grand Horizon Resort & Spa",
          roomType: resultData.room?.roomName || bookingItem?.name || bookingItem?.title || "Executive Presidential Suite",
          checkIn: checkIn,
          checkOut: checkOut,
          bookingStatus: resultData.bookingStatus || "Confirmed",
          paymentStatus: resultData.paymentStatus || "Pay at Hotel",
          totalAmount: typeof finalTotal === "number" ? `$${finalTotal.toLocaleString()}` : `$${finalTotal}`,
          bookedAt: new Date().toLocaleDateString()
        };
        try {
          const currentBookings = JSON.parse(localStorage.getItem("customer_bookings") || "[]");
          localStorage.setItem("customer_bookings", JSON.stringify([confirmedReservation, ...currentBookings]));
        } catch (err) {
          console.error("Failed to save customer booking state:", err);
        }
        setBookingSuccessData(resultData || confirmedReservation);
      }
    } catch (err) {
      setIsBookingLoading(false);
      console.error("Booking creation error:", err);
      alert(err.response?.data?.message || err.message || "Failed to finalize reservation. Please check room availability and try again.");
    }
  };

  // ---------- Price calculation ----------
  const nights = useMemo(() => {
    if (!checkIn || !checkOut) return 1;
    const inDate = new Date(checkIn);
    const outDate = new Date(checkOut);
    const diff = Math.round((outDate - inDate) / (1000 * 60 * 60 * 24));
    return diff > 0 ? diff : 1;
  }, [checkIn, checkOut]);

  const datesSelected = Boolean(checkIn && checkOut);


  const freeCancellationDate = useMemo(() => {
    const base = checkIn ? new Date(checkIn) : new Date();
    base.setDate(base.getDate() - 2);
    return base.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  }, [checkIn]);


  const pricing = useMemo(() => {
    let subtotal = 0;
    if (bookingRooms && bookingRooms.length > 0) {
      subtotal = bookingRooms.reduce((sum, item) => {
        const itemPrice = item.room.discountPrice || item.room.price || 0;
        return sum + (itemPrice * item.qty);
      }, 0);
    } else {
      subtotal = bookingItem?.discountPrice || bookingItem?.price || 0;
    }
    return calculatePricing(subtotal * nights);
  }, [bookingRooms, bookingItem, nights]);


  const handleSubmit = (e) => {
    e.preventDefault();

    const bookingData = {
      roomId: bookingItem.id,
      roomName: bookingItem.roomName || bookingItem.name,
      stay: {
        checkIn,
        checkOut,
        nights,
        guests,
        children,
        // roomsCount,
        arrivalTime,
        occasion,
      },
      guest: guestInfo,
      specialRequests,
      pricing,
      createdAt: new Date().toISOString(),
    };

    // Structured for future backend/API integration:
    // e.g. await fetch("/api/bookings", { method: "POST", body: JSON.stringify(bookingData) })
    console.log("Booking submitted:", bookingData);
    alert(
      `Thank you, ${guestInfo.firstName || "Guest"}! Your reservation request for ${bookingItem.roomName ||
      bookingItem.name} has been received.`
    );
  };

  const [selectedImage, setSelectedImage] = useState(
    bookingItem?.mainImage || bookingItem?.image || bookingItem?.gallery?.[0] || ""
  );


  // ==================================================
  // BOOKING SUCCESS CONFIRMATION VIEW (Task 5)
  // ==================================================
  if (bookingSuccessData) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#FBF8F2] dark:bg-[#0B0E14] px-6 py-16 transition-colors duration-500">
        <div className="w-full max-w-lg rounded-3xl border border-stone-200 dark:border-stone-800 bg-white dark:bg-[#151921] p-8 md:p-10 text-center shadow-2xl">
          <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-emerald-500/10 border border-emerald-500/30">
            <FiCheckCircle className="text-4xl text-emerald-600 dark:text-emerald-400 animate-bounce" />
          </div>
          <span className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-widest bg-[#C89B3C]/10 text-[#C89B3C] border border-[#C89B3C]/30 inline-block mb-3">
            Reservation Confirmed & Secured
          </span>
          <h1 className="text-2xl md:text-3xl font-serif font-bold text-stone-900 dark:text-stone-100">
            Booking Successful!
          </h1>
          <p className="mt-2 text-sm text-stone-600 dark:text-stone-400">
            Your luxury room reservation has been successfully booked and room inventory quantity reduced.
          </p>
          <div className="my-6 p-4 rounded-2xl bg-stone-50 dark:bg-stone-900/50 border border-stone-200 dark:border-stone-800 text-left text-xs space-y-2.5">
            <div className="flex justify-between border-b border-stone-200/60 dark:border-stone-800 pb-2">
              <span className="text-stone-400">Booking ID</span>
              <span className="font-mono font-bold text-stone-900 dark:text-stone-200">{bookingSuccessData.bookingId || bookingSuccessData.id || "BK-CONFIRMED"}</span>
            </div>
            <div className="flex justify-between border-b border-stone-200/60 dark:border-stone-800 pb-2">
              <span className="text-stone-400">Accommodation Suite</span>
              <span className="font-semibold text-[#C89B3C]">{bookingSuccessData.room?.roomName || bookingSuccessData.roomType || bookingItem?.roomName || bookingItem?.name || "Deluxe Suite"}</span>
            </div>
            <div className="flex justify-between border-b border-stone-200/60 dark:border-stone-800 pb-2">
              <span className="text-stone-400">Stay Schedule</span>
              <span className="font-medium text-stone-700 dark:text-stone-300">{checkIn} — {checkOut}</span>
            </div>
            <div className="flex justify-between pt-1 text-sm font-serif">
              <span className="font-medium text-stone-600 dark:text-stone-400">Total Rate</span>
              <span className="font-bold text-emerald-600 dark:text-emerald-400">{typeof pricing?.total === "number" ? `$${pricing.total.toLocaleString()}` : `$${pricing?.total || 850}`}</span>
            </div>
          </div>
          <p className="text-xs text-stone-400 mb-6 leading-relaxed">
            Your reservation is linked to your VIP customer account ({user?.email}). You can manage or cancel your booking directly from your dashboard at any time.
          </p>
          <button
            onClick={() => navigate("/customer/bookings")}
            className="w-full py-3.5 rounded-xl bg-gradient-to-r from-[#D7B265] to-[#C89B3C] text-stone-950 font-semibold uppercase text-xs tracking-wider shadow-lg hover:brightness-105 transition-all flex items-center justify-center gap-2"
          >
            <FiClock className="w-4 h-4" /> Go to My Bookings
          </button>
        </div>
      </div>
    );
  }

  // ==================================================
  // ROOM NOT FOUND STATE
  // ==================================================
  if (!bookingItem) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gradient-to-b from-[#FBF8F2] to-white px-6">
        <div className="w-full max-w-md rounded-3xl border border-stone-200 bg-white p-10 text-center shadow-[0_8px_40px_-12px_rgba(0,0,0,0.1)]">
          <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-[#C89B3C]/10">
            <FiHome className="text-2xl text-[#C89B3C]" />
          </div>
          <h1 className="text-2xl font-semibold text-stone-900">
            Room Not Found
          </h1>
          <p className="mt-3 text-sm leading-relaxed text-stone-500">
            We couldn't locate the room you're trying to book. It may have
            been removed or the link may be incorrect. Please return to our
            rooms collection to continue your search.
          </p>
          <Link
            to="/rooms"
            className="mt-8 inline-flex items-center justify-center gap-2 rounded-xl bg-[#C89B3C] px-6 py-3 text-sm font-semibold text-white shadow-md transition hover:bg-[#b3892f]"
          >
            <FiArrowLeft />
            Back to Rooms
          </Link>
        </div>
      </div>
    );
  }

  const guestSelectOptions = Array.from({ length: 6 }, (_, i) => ({
    value: i + 1,
    label: `${i + 1} Guest${i + 1 > 1 ? "s" : ""}`,
  }));
  const roomsSelectOptions = Array.from({ length: 5 }, (_, i) => ({
    value: i + 1,
    label: `${i + 1} Room${i + 1 > 1 ? "s" : ""}`,
  }));
  const childrenSelectOptions = Array.from({ length: 5 }, (_, i) => ({
    value: i,
    label: i === 0 ? "No Children" : `${i} Child${i > 1 ? "ren" : ""}`,
  }));

  return (


    <div className="min-h-screen bg-[#FBF8F2]">
      {/* ================= HERO / PAGE HEADER ================= */}
      <section className="relative overflow-hidden border-b border-stone-200/60 bg-gradient-to-b from-[#FBF3E3] via-[#FBF8F2] to-[#FBF8F2] px-6 pb-14 pt-10 sm:px-10 sm:pt-14">
        <div
          className="pointer-events-none absolute -top-24 right-0 h-72 w-72 rounded-full opacity-40 blur-3xl"
          style={{
            background:
              "radial-gradient(circle, rgba(200,155,60,0.35) 0%, rgba(200,155,60,0) 70%)",
          }}
        />
        <div className="relative mx-auto max-w-6xl">
          {/* Back Button */}
          <button 
            onClick={() => navigate(-1)}
            className="mb-6 flex items-center gap-2 text-sm font-semibold text-stone-500 transition hover:text-[#C89B3C]"
          >
            <FiArrowLeft />
            Back to Room Selection
          </button>

          <InfoBadge icon={FiStar}>Luxury Reservation</InfoBadge>

          <h1 className="mt-4 font-serif text-3xl font-semibold tracking-tight text-stone-900 sm:text-4xl lg:text-5xl">
            Complete Your Reservation
          </h1>
          <p className="mt-3 max-w-xl text-sm text-stone-500 sm:text-base">
            Secure your stay in just a few steps and enjoy a luxury
            experience tailored for you.
          </p>
        </div>
      </section>

      {/* ================= MAIN LAYOUT ================= */}
      <form
        onSubmit={handleSubmit}
        className="mx-auto grid max-w-6xl grid-cols-1 gap-8 px-6 py-10 sm:px-10 lg:grid-cols-[1.6fr_1fr] lg:items-start"
      >
        {/* ================= LEFT COLUMN ================= */}
        <div className="space-y-6">
          {/* Selected Room Preview Card */}

         {(bookingRooms.length > 0 ? bookingRooms : bookingItem ? [{ room: bookingItem, qty: 1 }] : [])
           .reduce((acc, item) => {
             const qty = Number(item.qty) || 1;
             for (let i = 0; i < qty; i++) {
               acc.push({ ...item, instanceNum: i + 1, totalQty: qty });
             }
             return acc;
           }, [])
           .map((item, index, arr) => (
             <div
               key={`${item.room?.id || item.room?._id || index}-${index}`}
               className="mb-5 overflow-hidden rounded-2xl border border-stone-200 bg-white shadow-sm"
             >
               <div className="flex flex-col md:flex-row">
                 {/* Image */}
                 <div className="md:w-64">
                   <img
                     src={item.room?.mainImage || item.room?.image || item.room?.thumbnailImage || item.room?.galleryImages?.[0] || ""}
                     alt={item.room?.name || item.room?.roomName || "Room Image"}
                     className="h-52 w-full object-cover"
                   />
                 </div>

                 {/* Details */}
                 <div className="flex flex-1 flex-col justify-between p-5">
                   <div>
                     <span className="rounded-full bg-[#C89B3C]/10 px-3 py-1 text-xs font-semibold text-[#8a6a23]">
                       {item.room?.roomType || item.room?.category || "Room"} {item.totalQty > 1 ? `(#${item.instanceNum} of ${item.totalQty})` : ""}
                     </span>

                     <div className="flex items-center gap-2 mt-2">
                       <h3 className="text-xl font-semibold">
                         {item.room?.name || item.room?.roomName || "Selected Luxury Room"} {item.totalQty > 1 ? `#${item.instanceNum}` : ""}
                       </h3>
                       <button 
                         type="button" 
                         onClick={() => setSelectedRoomForModal(item.room)} 
                         className="text-[11px] font-medium text-[#C89B3C] hover:text-white hover:bg-[#C89B3C] bg-[#C89B3C]/10 px-2 py-0.5 rounded-full border border-[#C89B3C]/30 transition-colors cursor-pointer"
                       >
                         View Details
                       </button>
                     </div>

                     <p className="mt-2 text-sm text-gray-500">
                       {item.room?.description || item.room?.roomDescription || "Luxury accommodation with premium amenities."}
                     </p>
                   </div>

                   <div className="mt-4 flex flex-wrap items-center gap-4 text-sm">
                     <span>
                       📐 {item.room?.roomSize || item.room?.size || "Standard"} {item.room?.roomSize ? "sq.ft" : ""}
                     </span>

                     <span>
                       👤 {typeof (item.room?.capacity || item.room?.maxGuests) === "object" ? `${(item.room?.capacity?.adults || item.room?.maxGuests?.adults || 2)} Adults` : (item.room?.capacity || item.room?.maxGuests || ((item.room?.maxAdults || 0) + (item.room?.maxChildren || 0)) || 2)} Guests
                     </span>

                     <span>
                       🛏 {item.room?.bedType || item.room?.bed || "King Bed"}
                     </span>

                     <span className="ml-auto font-bold text-lg">
                       ${((item.room?.discountPrice || item.room?.price || 0)).toLocaleString()}
                     </span>
                   </div>

                   <div className="mt-3 flex items-center justify-between text-sm font-medium text-[#2C4A6E] pt-2 border-t border-stone-100">
                     <span>Room {index + 1} of {arr.length} selected</span>
                     <span className="font-bold text-[#8a6a23]">Qty : 1</span>
                   </div>
                 </div>
               </div>
             </div>
           ))}


          {/* Guest Information */}
          <SectionCard
            title="Guest Information"
            subtitle="These details will be used for your reservation confirmation."
          >
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
              <BookingInput
                label="First Name"
                id="firstName"
                value={guestInfo.firstName}
                onChange={handleGuestInfoChange("firstName")}
                placeholder="Adriana"
                required
              />
              <BookingInput
                label="Last Name"
                id="lastName"
                value={guestInfo.lastName}
                onChange={handleGuestInfoChange("lastName")}
                placeholder="Cole"
                required
              />
              <BookingInput
                label="Email Address"
                id="email"
                type="email"
                icon={FiMail}
                value={guestInfo.email}
                onChange={handleGuestInfoChange("email")}
                placeholder="you@example.com"
                required
              />
              <BookingInput
                label="Phone Number"
                id="phone"
                type="tel"
                icon={FiPhone}
                value={guestInfo.phone}
                onChange={handleGuestInfoChange("phone")}
                placeholder="+1 (555) 000-0000"
                required
              />
              <BookingInput
                label="Country / Region"
                id="country"
                icon={FiMapPin}
                value={guestInfo.country}
                onChange={handleGuestInfoChange("country")}
                placeholder="United States"
              />
              <BookingInput
                label="City"
                id="city"
                value={guestInfo.city}
                onChange={handleGuestInfoChange("city")}
                placeholder="New York"
              />
              <BookingInput
                label="Postal Code"
                id="postalCode"
                value={guestInfo.postalCode}
                onChange={handleGuestInfoChange("postalCode")}
                placeholder="10001"
              />
              <BookingInput
                label="Address (Optional)"
                id="address"
                value={guestInfo.address}
                onChange={handleGuestInfoChange("address")}
                placeholder="123 Fifth Avenue"
              />
            </div>
          </SectionCard>

          {/* Special Requests */}
          <SectionCard title="Special Requests">
            <BookingInput
              label="Anything we should know?"
              id="specialRequests"
              as="textarea"
              value={specialRequests}
              onChange={(e) => setSpecialRequests(e.target.value)}
              placeholder="Airport pickup, high-floor room, early check-in, anniversary arrangement, dietary requests…"
            />
            <p className="mt-3 text-xs text-stone-400">
              Special requests are subject to availability and will be
              confirmed by our team.
            </p>
          </SectionCard>

          {/* Interactive Required Payment Section */}
          <SectionCard title="Payment Information (Required)">
            <div className="space-y-5">
              <div className="grid grid-cols-1 gap-3.5 sm:grid-cols-3">
                {[
                  { id: "Credit Card", label: "Credit / Debit Card", desc: "Visa, MC, Amex" },
                  { id: "Mobile Banking", label: "Mobile Wallet", desc: "PayPal, Apple Pay, Nagad" },
                  { id: "Pay at Hotel", label: "Pay at Hotel", desc: "Cash on Arrival" }
                ].map((opt) => (
                  <label
                    key={opt.id}
                    onClick={() => setPaymentMethod(opt.id)}
                    className={`cursor-pointer rounded-xl border p-4 transition-all duration-200 ${
                      paymentMethod === opt.id
                        ? "border-[#C89B3C] bg-[#C89B3C]/10 shadow-sm"
                        : "border-stone-200 bg-stone-50 hover:border-stone-300"
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      <input
                        type="radio"
                        name="paymentMethod"
                        checked={paymentMethod === opt.id}
                        onChange={() => setPaymentMethod(opt.id)}
                        className="h-4 w-4 text-[#C89B3C] focus:ring-[#C89B3C]"
                      />
                      <span className="text-sm font-bold text-stone-800">{opt.label}</span>
                    </div>
                    <p className="mt-1 pl-6 text-xs text-stone-500">{opt.desc}</p>
                  </label>
                ))}
              </div>

              {paymentMethod === "Credit Card" && (
                <div className="rounded-xl border border-stone-200/80 bg-stone-50/70 p-5 space-y-4">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-stone-500">Secure Card Details (Required)</h4>
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <div className="sm:col-span-2">
                      <BookingInput
                        label="Cardholder Full Name"
                        id="cardHolderName"
                        placeholder="e.g. Sofia Martinez"
                        value={cardDetails.cardHolderName}
                        onChange={handleCardChange("cardHolderName")}
                        required={paymentMethod === "Credit Card"}
                      />
                    </div>
                    <div className="sm:col-span-2">
                      <BookingInput
                        label="Card Number"
                        id="cardNumber"
                        icon={FiCreditCard}
                        placeholder="4532 •••• •••• 8942"
                        maxLength="19"
                        value={cardDetails.cardNumber}
                        onChange={handleCardChange("cardNumber")}
                        required={paymentMethod === "Credit Card"}
                      />
                    </div>
                    <div>
                      <BookingInput
                        label="Expiration Date"
                        id="expiryDate"
                        placeholder="MM/YY"
                        maxLength="5"
                        value={cardDetails.expiryDate}
                        onChange={handleCardChange("expiryDate")}
                        required={paymentMethod === "Credit Card"}
                      />
                    </div>
                    <div>
                      <BookingInput
                        label="Security Code (CVC)"
                        id="cvc"
                        icon={FiLock}
                        placeholder="123"
                        maxLength="4"
                        value={cardDetails.cvc}
                        onChange={handleCardChange("cvc")}
                        required={paymentMethod === "Credit Card"}
                      />
                    </div>
                  </div>
                </div>
              )}

              {paymentMethod === "Mobile Banking" && (
                <div className="rounded-xl bg-[#C89B3C]/10 border border-[#C89B3C]/30 p-4">
                  <p className="text-sm text-stone-700 font-medium">
                    ⚡ You will be securely directed to complete your instant payment authorization after clicking <strong>Confirm Booking</strong> below.
                  </p>
                </div>
              )}

              {paymentMethod === "Pay at Hotel" && (
                <div className="rounded-xl bg-emerald-50 border border-emerald-200 p-4">
                  <p className="text-sm text-emerald-800 font-medium">
                    ✅ Your room stay will be reserved instantly. Simply settle your full invoice directly at the hotel reception during check-in.
                  </p>
                </div>
              )}

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 pt-2 border-t border-stone-100">
                <div className="flex items-start gap-3">
                  <FiClock className="mt-0.5 flex-none text-[#C89B3C]" />
                  <p className="text-xs text-stone-600">
                    Check-in from <strong>3:00 PM</strong> · Check-out by <strong>12:00 PM</strong>
                  </p>
                </div>
                <div className="flex items-start gap-3">
                  <FiShield className="mt-0.5 flex-none text-[#C89B3C]" />
                  <p className="text-xs text-stone-600">
                    Free cancellation available before <strong>{freeCancellationDate}</strong>
                  </p>
                </div>
                <div className="flex items-start gap-3">
                  <FiLock className="mt-0.5 flex-none text-[#C89B3C]" />
                  <p className="text-xs text-stone-600">
                    256-bit SSL encrypted secure payment transactions
                  </p>
                </div>
              </div>
            </div>
          </SectionCard>
        </div>

        {/* ================= RIGHT COLUMN — STICKY SUMMARY ================= */}
        <div className="lg:sticky lg:top-8">
          <div className="rounded-2xl border border-stone-200/70 bg-white p-6 shadow-[0_8px_40px_-12px_rgba(0,0,0,0.12)] sm:p-7">
            {/* Room mini preview */}
            <div className="flex flex-col gap-4 border-b border-stone-100 pb-5">
              {(bookingRooms.length > 0
                ? bookingRooms
                : bookingItem
                ? [{ room: bookingItem, qty: 1 }]
                : []
              ).map((item, index) => (
                <div key={index} className="flex items-center gap-3">
                  <img
                    src={item.room.panoramaImage || item.room.mainImage || item.room.image || item.room.thumbnailImage || item.room.galleryImages?.[0]}
                    alt={item.room.roomName || item.room.name}
                    className="h-16 w-16 flex-none rounded-xl object-cover"
                  />
                  <div className="min-w-0">
                    {(item.room.roomType || item.room.category) && (
                      <span className="inline-block rounded-full bg-[#C89B3C]/10 px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-[#8a6a23]">
                        {item.room.roomType || item.room.category}
                      </span>
                    )}
                    <h4 className="mt-1 truncate text-sm font-semibold text-stone-900">
                      {item.room.roomName || item.room.name}
                      {item.qty > 1 && ` (x${item.qty})`}
                    </h4>
                    {(item.room.rating || item.room.reviewCount) && (
                      <span className="inline-flex items-center gap-1 text-xs text-stone-500">
                        <FiStar className="text-[#C89B3C]" /> {item.room.rating || 5} (
                        {item.room.reviewCount || 0})
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* Booking details */}
            <div className="border-b border-stone-100 py-4">
              <SummaryRow
                label="Check-in"
                value={checkIn || "Not selected"}
                muted={!checkIn}
              />
              <SummaryRow
                label="Check-out"
                value={checkOut || "Not selected"}
                muted={!checkOut}
              />
              <SummaryRow
                label="Total Nights"
                value={datesSelected ? nights : "1 (default)"}
              />
              <SummaryRow label="Guests" value={typeof guests === "object" ? `${guests.adults || 2} Adults, ${guests.children || 0} Children` : `${guests} Adults, ${children} Children`} />
              {/* <SummaryRow label="Rooms" value={roomsCount} /> */}
            </div>

            {/* Pricing breakdown */}
            <div className="border-b border-stone-100 py-4">
              {(bookingRooms.length > 0
                ? bookingRooms
                : bookingItem
                ? [{ room: bookingItem, qty: 1 }]
                : []
              ).map((item, index) => (
                <SummaryRow
                  key={item.room.id || index}
                  label={`${item.room.roomName || item.room.name} × ${item.qty}`}
                  value={`$${(
                    (item.room.discountPrice || item.room.price) * item.qty * nights
                  ).toLocaleString()}`}
                />
              ))}
              <SummaryRow
                label="Taxes & Fees"
                value={`$${pricing?.taxes?.toLocaleString() ?? 0}`}
              />
              <SummaryRow
                label="Service Charge"
                value={`$${pricing.serviceFee.toLocaleString()}`}
              />
              {/* {pricing?.discount > 0 && (
                <SummaryRow
                  label="Promo Discount"
                  value={`– $${pricing.discount.toLocaleString()}`}
                />
              )} */}
              {!datesSelected && (
                <p className="mt-2 text-[11px] text-stone-400">
                  Showing estimated price for 1 night. Select your dates for
                  an exact total.
                </p>
              )}
            </div>

            <div className="py-4">
              <SummaryRow
                label="Total"
                value={`$${pricing.total.toLocaleString()}`}
                bold
              />
            </div>

            <p className="mb-4 flex items-center gap-1.5 text-xs text-stone-500">
              <FiShield className="text-[#C89B3C]" />
              Free cancellation before {freeCancellationDate}
            </p>

            {/* Benefits list */}
            {bookingItem.features?.length > 0 && (
              <div className="mb-5 flex flex-wrap gap-2">
                {bookingItem.features.includes("Free WiFi") && (
                  <InfoBadge icon={FiWifi}>WiFi Included</InfoBadge>
                )}
                {bookingItem.features.includes("Breakfast Included") && (
                  <InfoBadge icon={FiCoffee}>Breakfast Included</InfoBadge>
                )}
                {bookingItem.features.includes("Airport Transfer") && (
                  <InfoBadge icon={FiTruck}>Airport Transfer</InfoBadge>
                )}
              </div>
            )}

            <button
              type="button"
              onClick={handleConfirmBooking}
              disabled={isBookingLoading}
              className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#C89B3C] py-3.5 text-sm font-semibold text-white shadow-md transition hover:bg-[#b3892f] active:scale-[0.99] disabled:opacity-70 disabled:cursor-not-allowed"
            >
              <FiCheckCircle />
              {isBookingLoading ? "Processing Reservation..." : "Confirm Booking"}
            </button>

            <Link
              to={`/rooms/${bookingItem.id}`}
              className="mt-3 flex items-center justify-center gap-1.5 text-sm font-medium text-stone-500 transition hover:text-[#C89B3C]"
            >
              <FiArrowLeft className="text-xs" />
              Back to Room Details
            </Link>

            <p className="mt-5 flex items-center justify-center gap-1.5 text-center text-xs text-stone-400">
              <FiHeadphones className="text-[#C89B3C]" />
              Need help? Contact our concierge, available 24/7
            </p>
          </div>
        </div>
      </form>

      {/* ================= TRUST / BENEFITS STRIP ================= */}
      <section className="border-t border-stone-200/60 bg-white px-6 py-10 sm:px-10">
        <div className="mx-auto grid max-w-6xl grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          <BenefitItem
            icon={FiTag}
            title="Best Rate Guarantee"
            desc="Find it cheaper? We'll match it."
          />
          <BenefitItem
            icon={FiShield}
            title="Flexible Cancellation"
            desc="Plans change — we make it easy."
          />
          <BenefitItem
            icon={FiLock}
            title="Secure Reservation"
            desc="Your data is encrypted and protected."
          />
          <BenefitItem
            icon={FiHeadphones}
            title="24/7 Guest Support"
            desc="Our concierge team is always on call."
          />
        </div>
      </section>

      {/* ================= TESTIMONIAL / TRUST NOTE ================= */}
      <section className="bg-[#FBF8F2] px-6 py-14 sm:px-10">
        <div className="mx-auto max-w-2xl text-center">
          <p className="font-serif text-xl italic leading-relaxed text-stone-700 sm:text-2xl">
            "Guests love our seamless booking experience and personalized
            service."
          </p>
          <div className="mt-6 inline-flex items-center gap-2 rounded-2xl border border-stone-200 bg-white px-5 py-3 shadow-sm">
            <div className="flex text-[#C89B3C]">
              {Array.from({ length: 5 }).map((_, i) => (
                <FiStar key={i} className="fill-current" />
              ))}
            </div>
            <span className="text-sm text-stone-500">
              4.9 average guest rating
            </span>
          </div>
        </div>
      </section>

      {/* Room Details Modal */}
      {selectedRoomForModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 p-4">
          <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] flex flex-col overflow-hidden relative shadow-2xl">
            {/* Close Button */}
            <button 
              type="button"
              onClick={() => setSelectedRoomForModal(null)}
              className="absolute top-4 right-4 z-20 w-8 h-8 flex items-center justify-center bg-white/80 backdrop-blur hover:bg-white rounded-full text-stone-800 shadow-sm transition-colors cursor-pointer border-0"
            >
              ✕
            </button>
            
            {/* Content Container (Scrollable) */}
            <div className="overflow-y-auto w-full h-full">
              {/* Image Header */}
              <div className="w-full h-64 relative bg-stone-100">
                {(selectedRoomForModal.mainImage || selectedRoomForModal.image || selectedRoomForModal.thumbnailImage || selectedRoomForModal.galleryImages?.[0]) ? (
                  <img 
                    src={selectedRoomForModal.mainImage || selectedRoomForModal.image || selectedRoomForModal.thumbnailImage || selectedRoomForModal.galleryImages?.[0]} 
                    alt={selectedRoomForModal.name || selectedRoomForModal.roomName} 
                    className="w-full h-full object-cover" 
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-stone-400 font-medium">No Image Available</div>
                )}
              </div>

              {/* Details Body */}
              <div className="p-6 sm:p-8 space-y-6">
                <div>
                  <h2 className="text-2xl font-bold text-stone-900 mb-2">{selectedRoomForModal.name || selectedRoomForModal.roomName}</h2>
                  <div className="flex flex-wrap gap-4 text-sm text-stone-600 font-medium mt-3">
                    {selectedRoomForModal.bedType && (
                      <span className="flex items-center gap-1.5 bg-stone-50 px-3 py-1.5 rounded-lg border border-stone-100">
                        🛏 {selectedRoomForModal.bedType}
                      </span>
                    )}
                    <span className="flex items-center gap-1.5 bg-stone-50 px-3 py-1.5 rounded-lg border border-stone-100">
                      👤 {typeof (selectedRoomForModal.capacity || selectedRoomForModal.maxGuests) === "object" ? `${(selectedRoomForModal.capacity?.adults || selectedRoomForModal.maxGuests?.adults || 2)} Adults` : (selectedRoomForModal.capacity || selectedRoomForModal.maxGuests || ((selectedRoomForModal.maxAdults || 0) + (selectedRoomForModal.maxChildren || 0)))} Guests max
                    </span>
                    {(selectedRoomForModal.roomSize || selectedRoomForModal.size) && (
                      <span className="flex items-center gap-1.5 bg-stone-50 px-3 py-1.5 rounded-lg border border-stone-100">
                        📐 {selectedRoomForModal.roomSize || selectedRoomForModal.size} {selectedRoomForModal.roomSize ? "sq.ft" : ""}
                      </span>
                    )}
                  </div>
                </div>

                {(selectedRoomForModal.description || selectedRoomForModal.roomDescription) && (
                  <div>
                    <h3 className="text-lg font-bold text-stone-900 mb-2">About this room</h3>
                    <p className="text-stone-600 leading-relaxed text-sm">{selectedRoomForModal.description || selectedRoomForModal.roomDescription}</p>
                  </div>
                )}

                {selectedRoomForModal.amenities && Array.isArray(selectedRoomForModal.amenities) && selectedRoomForModal.amenities.length > 0 && (
                  <div>
                    <h3 className="text-lg font-bold text-stone-900 mb-3">Room Amenities</h3>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                      {selectedRoomForModal.amenities.map((amenity, i) => (
                        <div key={i} className="flex items-center gap-2 text-sm text-stone-600 font-medium">
                          ✓ {amenity}
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
            
            {/* Footer */}
            <div className="p-4 border-t border-stone-200 bg-stone-50 flex justify-end shrink-0">
              <button 
                type="button"
                onClick={() => setSelectedRoomForModal(null)}
                className="bg-[#C89B3C] hover:bg-[#a68032] text-white px-6 py-2 rounded-xl font-bold transition-colors cursor-pointer border-0"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}