import React, { useState, useMemo } from "react";
import { useParams, Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
import {
  FiCalendar,
  FiUsers,
  FiHome,
  FiMaximize2,
  FiPhone,
  FiMail,
  FiMapPin,
  FiShield,
  FiCreditCard,
  FiStar,
  FiHeadphones,
  FiCheckCircle,
  FiClock,
  FiChevronRight,
  FiArrowLeft,
  FiWifi,
  FiCoffee,
  FiTruck,
  FiTag,
  FiLock,
} from "react-icons/fi";
import { roomsData } from "../Roompage/Roomsdata";


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



  // const location = useLocation();
  // const { id } = useParams();

  // const room =
  //   location.state?.room ||
  //   roomsData.find((r) => String(r.id) === String(id));
  // const offer = location.state?.offer;
  // console.log(room);
  // console.log(bookingItem.roomName);
  // const location = useLocation();
  // const { id } = useParams();

  // const room = location.state?.room;

  // const offer = location.state?.offer;

  // const bookingItem =
  //   room ||
  //   offer ||
  //   roomsData.find((r) => String(r.id) === String(id));

  const location = useLocation();
  const { id } = useParams();

  const room = location.state?.room || roomsData.find(r => String(r.id) === String(id));
  const offer = location.state?.offer;

  const bookingItem = room || offer;

  console.log(bookingItem);


  // ---------- Stay details state ----------
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [guests, setGuests] = useState(2);
  const [roomsCount, setRoomsCount] = useState(1);
  const [children, setChildren] = useState(0);
  const [arrivalTime, setArrivalTime] = useState("");
  const [occasion, setOccasion] = useState("");

  // ---------- Guest information state ----------
  const [guestInfo, setGuestInfo] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    country: "",
    city: "",
    postalCode: "",
    address: "",
  });

  // ---------- Special request state ----------
  const [specialRequests, setSpecialRequests] = useState("");

  const handleGuestInfoChange = (field) => (e) =>
    setGuestInfo((prev) => ({ ...prev, [field]: e.target.value }));

  // ---------- Price calculation ----------
  const nights = useMemo(() => {
    if (!checkIn || !checkOut) return 1;
    const inDate = new Date(checkIn);
    const outDate = new Date(checkOut);
    const diff = Math.round((outDate - inDate) / (1000 * 60 * 60 * 24));
    return diff > 0 ? diff : 1;
  }, [checkIn, checkOut]);

  const datesSelected = Boolean(checkIn && checkOut);

  // const pricing = useMemo(() => {
  //   if (!bookingItem) return null;
  //   const subtotal = bookingItem.discountPrice || bookingItem.price * nights * roomsCount;
  //   const taxesAndFees = Math.round(subtotal * 0.08);
  //   const serviceCharge = Math.round(subtotal * 0.05);
  //   const discount = subtotal > 500 ? Math.round(subtotal * 0.05) : 0;
  //   const total = subtotal + taxesAndFees + serviceCharge - discount;
  //   return { subtotal, taxesAndFees, serviceCharge, discount, total };
  // }, [room, nights, roomsCount]);
  const pricing = useMemo(() => {
    if (!bookingItem) return null;

    const roomPrice =
      bookingItem.discountPrice ??
      bookingItem.discountedPrice ??
      bookingItem.price ??
      bookingItem.originalPrice;

    const subtotal = roomPrice * nights * roomsCount;

    const taxesAndFees = Math.round(subtotal * 0.08);
    const serviceCharge = Math.round(subtotal * 0.05);
    const discount = subtotal > 500 ? Math.round(subtotal * 0.05) : 0;
    const total = subtotal + taxesAndFees + serviceCharge - discount;

    return {
      subtotal,
      taxesAndFees,
      serviceCharge,
      discount,
      total,
      roomPrice,
    };
  }, [bookingItem, nights, roomsCount]);


  const freeCancellationDate = useMemo(() => {
    const base = checkIn ? new Date(checkIn) : new Date();
    base.setDate(base.getDate() - 2);
    return base.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  }, [checkIn]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const bookingData = {
      roomId: bookingItem.id,
      roomName: bookingItem.roomName,
      stay: {
        checkIn,
        checkOut,
        nights,
        guests,
        children,
        roomsCount,
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
      `Thank you, ${guestInfo.firstName || "Guest"}! Your reservation request for ${bookingItem.roomName} has been received.`
    );
  };

  const [selectedImage, setSelectedImage] = useState(
    bookingItem?.mainImage ||
    bookingItem?.image ||
    bookingItem?.gallery?.[0] ||
    ""
  );

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
          {/* Breadcrumb */}
          <nav className="mb-6 flex flex-wrap items-center gap-1.5 text-xs font-medium text-stone-500">
            <Link to="/" className="transition hover:text-[#C89B3C]">
              Home
            </Link>
            <FiChevronRight className="text-stone-300" />
            <Link to="/rooms" className="transition hover:text-[#C89B3C]">
              Rooms
            </Link>
            <FiChevronRight className="text-stone-300" />
            {/* <Link
              to={`/rooms/${bookingItem.id}`}
              className="transition hover:text-[#C89B3C]"
            >
              Room Details
            </Link> */}
            <Link
              to={
                location.state?.offer
                  ? `/offers/${location.state.offer.id}`
                  : `/rooms/${bookingItem.id}`
              }
              className="transition hover:text-[#C89B3C]"
            >
              {location.state?.offer ? "Offer Details" : "Room Details"}
            </Link>
            <FiChevronRight className="text-stone-300" />
            <span className="text-stone-800">Booking</span>
          </nav>

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
          <div className="overflow-hidden rounded-2xl border border-stone-200/70 bg-white shadow-[0_4px_24px_-8px_rgba(0,0,0,0.06)] sm:flex">
            {/* <div className="h-48 w-full flex-none overflow-hidden sm:h-auto sm:w-64">
              {<img
                src={selectedImage}
                alt={bookingItem.roomName}
                className="w-full h-full object-cover"
              />}
              
            </div> */}
            <div className="w-full flex-none sm:w-64">
              {/* Main Image */}
              <div className="h-48 overflow-hidden rounded-t-xl sm:rounded-xl">
                <img
                  src={selectedImage}
                  alt={bookingItem.roomName}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Gallery */}
              {bookingItem.gallery?.length > 0 && (
                <div className="mt-3 grid grid-cols-5 gap-2 px-2 pb-2">
                  {bookingItem.gallery.map((img, index) => (
                    <img
                      key={index}
                      src={img}
                      alt={`${bookingItem.roomName} ${index + 1}`}
                      onClick={() => setSelectedImage(img)}
                      className={`h-14 w-full cursor-pointer rounded-lg object-cover border-2 transition ${selectedImage === img
                        ? "border-amber-500"
                        : "border-transparent hover:border-amber-300"
                        }`}
                    />
                  ))}
                </div>
              )}
            </div>
            <div className="flex flex-1 flex-col justify-between p-6">
              <div>
                <div className="flex flex-wrap items-center gap-2">
                  <span className="rounded-full bg-[#C89B3C]/10 px-3 py-1 text-xs font-semibold text-[#8a6a23]">
                    {bookingItem.roomType}
                  </span>
                  <span className="inline-flex items-center gap-1 text-xs font-medium text-stone-500">
                    <FiStar className="text-[#C89B3C]" />
                    {bookingItem.rating}{" "}
                    <span className="text-stone-400">
                      ({bookingItem.reviews} reviews)
                    </span>
                  </span>
                </div>
                <h3 className="mt-2 font-serif text-xl font-semibold text-stone-900 sm:text-2xl">
                  {bookingItem.roomName}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-stone-500">
                  {bookingItem.description}
                </p>
              </div>

              <div className="mt-4 flex flex-wrap items-center gap-x-5 gap-y-2 text-xs text-stone-500">
                <span className="inline-flex items-center gap-1.5">
                  <FiMaximize2 className="text-[#C89B3C]" /> {bookingItem.roomSize} m²
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <FiUsers className="text-[#C89B3C]" /> {bookingItem.capacity} Guests
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <FiHome className="text-[#C89B3C]" /> {bookingItem.bedType}
                </span>
                <span className="ml-auto text-sm font-semibold text-stone-900">
                  ${bookingItem.discountPrice || bookingItem.price}{" "}
                  <span className="text-xs font-normal text-stone-400">
                    / night
                  </span>
                </span>
              </div>
            </div>
          </div>

          {/* Stay Details */}
          <SectionCard
            title="Stay Information"
            subtitle="Tell us when you'd like to arrive and how many will be staying."
          >
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
              <BookingInput
                label="Check-in"
                id="checkIn"
                type="date"
                icon={FiCalendar}
                value={checkIn}
                onChange={(e) => setCheckIn(e.target.value)}
                required
              />
              <BookingInput
                label="Check-out"
                id="checkOut"
                type="date"
                icon={FiCalendar}
                value={checkOut}
                onChange={(e) => setCheckOut(e.target.value)}
                required
              />
              <BookingInput
                label="Guests"
                id="guests"
                as="select"
                icon={FiUsers}
                value={guests}
                onChange={(e) => setGuests(Number(e.target.value))}
                options={guestSelectOptions}
              />
              <BookingInput
                label="Rooms"
                id="roomsCount"
                as="select"
                icon={FiHome}
                value={roomsCount}
                onChange={(e) => setRoomsCount(Number(e.target.value))}
                options={roomsSelectOptions}
              />
              <BookingInput
                label="Children"
                id="children"
                as="select"
                icon={FiUsers}
                value={children}
                onChange={(e) => setChildren(Number(e.target.value))}
                options={childrenSelectOptions}
              />
              <BookingInput
                label="Arrival Time"
                id="arrivalTime"
                as="select"
                icon={FiClock}
                value={arrivalTime}
                onChange={(e) => setArrivalTime(e.target.value)}
                options={[
                  { value: "", label: "Select a time (optional)" },
                  { value: "morning", label: "Morning (8AM – 12PM)" },
                  { value: "afternoon", label: "Afternoon (12PM – 4PM)" },
                  { value: "evening", label: "Evening (4PM – 8PM)" },
                  { value: "night", label: "Night (After 8PM)" },
                ]}
              />
              <BookingInput
                label="Special Occasion"
                id="occasion"
                as="select"
                icon={FiStar}
                value={occasion}
                onChange={(e) => setOccasion(e.target.value)}
                className="sm:col-span-2"
                options={[
                  { value: "", label: "None (optional)" },
                  { value: "honeymoon", label: "Honeymoon" },
                  { value: "anniversary", label: "Anniversary" },
                  { value: "business", label: "Business Trip" },
                  { value: "family", label: "Family Stay" },
                ]}
              />
            </div>
          </SectionCard>

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

          {/* Payment / Policy Info Block */}
          <SectionCard title="Payment & Booking Policy">
            <div className="space-y-4">
              <div className="flex items-start gap-3 rounded-xl bg-[#C89B3C]/5 p-4">
                <FiCreditCard className="mt-0.5 flex-none text-[#C89B3C]" />
                <p className="text-sm text-stone-600">
                  <span className="font-semibold text-stone-800">
                    No payment is charged right now.
                  </span>{" "}
                  Your card details will only be required to guarantee the
                  reservation; payment is handled securely at a later step.
                </p>
              </div>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div className="flex items-start gap-3">
                  <FiClock className="mt-0.5 flex-none text-[#C89B3C]" />
                  <p className="text-sm text-stone-600">
                    Check-in from <strong>3:00 PM</strong> · Check-out by{" "}
                    <strong>12:00 PM</strong>
                  </p>
                </div>
                <div className="flex items-start gap-3">
                  <FiShield className="mt-0.5 flex-none text-[#C89B3C]" />
                  <p className="text-sm text-stone-600">
                    Free cancellation available before{" "}
                    <strong>{freeCancellationDate}</strong>
                  </p>
                </div>
                <div className="flex items-start gap-3">
                  <FiTag className="mt-0.5 flex-none text-[#C89B3C]" />
                  <p className="text-sm text-stone-600">
                    Listed rate excludes applicable taxes and service charges
                  </p>
                </div>
                <div className="flex items-start gap-3">
                  <FiLock className="mt-0.5 flex-none text-[#C89B3C]" />
                  <p className="text-sm text-stone-600">
                    Your information is protected with secure, encrypted
                    booking
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
            <div className="flex items-center gap-3 border-b border-stone-100 pb-5">
              <img
                src={bookingItem.panoramaImage}
                alt={bookingItem.roomName}
                className="h-16 w-16 flex-none rounded-xl object-cover"
              />
              <div className="min-w-0">
                <span className="inline-block rounded-full bg-[#C89B3C]/10 px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-[#8a6a23]">
                  {bookingItem.roomType}
                </span>
                <h4 className="mt-1 truncate text-sm font-semibold text-stone-900">
                  {bookingItem.roomName}
                </h4>
                <span className="inline-flex items-center gap-1 text-xs text-stone-500">
                  <FiStar className="text-[#C89B3C]" /> {bookingItem.rating} (
                  {bookingItem.reviewCount})
                </span>
              </div>
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
              <SummaryRow label="Guests" value={`${guests} Adults, ${children} Children`} />
              <SummaryRow label="Rooms" value={roomsCount} />
            </div>

            {/* Pricing breakdown */}
            <div className="border-b border-stone-100 py-4">
              <SummaryRow
                label={`$${bookingItem.discountPrice || bookingItem.price} × ${nights} night${nights > 1 ? "s" : ""} × ${roomsCount} room${roomsCount > 1 ? "s" : ""}`}
                value={`$${pricing.subtotal.toLocaleString()}`}
              />
              <SummaryRow
                label="Taxes & Fees"
                value={`$${pricing.taxesAndFees.toLocaleString()}`}
              />
              <SummaryRow
                label="Service Charge"
                value={`$${pricing.serviceCharge.toLocaleString()}`}
              />
              {pricing.discount > 0 && (
                <SummaryRow
                  label="Promo Discount"
                  value={`– $${pricing.discount.toLocaleString()}`}
                />
              )}
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
              type="submit"
              className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#C89B3C] py-3.5 text-sm font-semibold text-white shadow-md transition hover:bg-[#b3892f] active:scale-[0.99]"
            >
              <FiCheckCircle />
              Confirm Booking
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
    </div>
  );
}