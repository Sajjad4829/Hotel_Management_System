import { Bed, Users, Maximize2, Check, X } from "lucide-react";
import { Link } from "react-router-dom";

export default function RoomTable({ rooms }) {
  if (!rooms || rooms.length === 0) return null;

  return (
    <div className="w-full overflow-x-auto border border-slate-200 rounded-md">
      <table className="w-full text-left border-collapse min-w-[800px]">
        <thead>
          <tr className="bg-[#4a82c3] text-white text-[13px]">
            <th className="py-3 px-4 font-bold border-r border-[#3b6b9f] w-1/3">Room Type</th>
            <th className="py-3 px-4 font-bold border-r border-[#3b6b9f] text-center w-24">Number of guests</th>
            <th className="py-3 px-4 font-bold border-r border-[#3b6b9f]">Price for 1 night</th>
            <th className="py-3 px-4 font-bold border-r border-[#3b6b9f]">Your choices</th>
            <th className="py-3 px-4 font-bold border-r border-[#3b6b9f] w-32">Select rooms</th>
            <th className="py-3 px-4 font-bold"></th>
          </tr>
        </thead>
        <tbody className="bg-white">
          {rooms.map((room) => {
            const guests = (room.maxAdults || 0) + (room.maxChildren || 0);
            const breakfast = room.amenities?.includes("Breakfast") || true;
            const freeCancellation = true;

            return (
              <tr key={room.id} className="border-b border-slate-200 hover:bg-slate-50 transition-colors">
                
                {/* Room Type Column */}
                <td className="py-4 px-4 border-r border-slate-200 align-top">
                  <Link to={`/rooms/${room.id || ''}`} className="text-[#0071c2] font-bold text-[16px] hover:underline mb-2 block">
                    {room.roomName}
                  </Link>
                  {room.bedType && (
                    <div className="flex items-center gap-2 text-[13px] text-slate-700 mb-2">
                      <Bed size={14} className="text-slate-500" />
                      <span>1 {room.bedType}</span>
                    </div>
                  )}
                  {room.roomSize && (
                    <div className="flex items-center gap-2 text-[12px] text-slate-600 mb-3">
                      <Maximize2 size={13} className="text-slate-400" />
                      <span>{room.roomSize} sq.ft</span>
                    </div>
                  )}
                  
                  {room.amenities && room.amenities.length > 0 && (
                    <div className="flex flex-wrap gap-1.5 mt-2">
                      {room.amenities.slice(0, 3).map((am, i) => (
                        <span key={i} className="text-[11px] text-slate-600 bg-slate-100 px-2 py-0.5 rounded border border-slate-200">
                          {am}
                        </span>
                      ))}
                    </div>
                  )}
                  {room.thumbnailImage && (
                    <img src={room.thumbnailImage} alt="room" className="w-24 h-16 object-cover mt-3 rounded shadow-sm border border-slate-200" />
                  )}
                </td>

                {/* Number of guests Column */}
                <td className="py-4 px-4 border-r border-slate-200 align-top text-center">
                  <div className="flex items-center justify-center text-slate-600">
                    {Array.from({ length: Math.min(guests, 6) }).map((_, i) => (
                      <Users key={i} size={14} className="text-[#1E2A38]" />
                    ))}
                    {guests > 6 && <span className="text-[12px] font-bold ml-1">+{guests - 6}</span>}
                  </div>
                </td>

                {/* Price Column */}
                <td className="py-4 px-4 border-r border-slate-200 align-top">
                  <p className="text-[20px] font-bold text-[#333333] leading-none mb-1">US${room.price}</p>
                  <p className="text-[12px] text-slate-500 mb-2">Includes taxes and charges</p>
                </td>

                {/* Your Choices Column */}
                <td className="py-4 px-4 border-r border-slate-200 align-top">
                  <div className="flex flex-col gap-2">
                    {breakfast && (
                      <div className="flex items-start gap-1.5 text-[13px] font-bold text-[#008009]">
                        <Check size={16} className="mt-0.5" />
                        <span>Breakfast included</span>
                      </div>
                    )}
                    {freeCancellation && (
                      <div className="flex flex-col text-[13px] font-bold text-[#008009]">
                        <div className="flex items-start gap-1.5">
                          <Check size={16} className="mt-0.5" />
                          <span>Free cancellation</span>
                        </div>
                        <span className="text-[11px] font-normal text-slate-600 ml-5 mt-0.5">
                          You can cancel later, so lock in this great price today!
                        </span>
                      </div>
                    )}
                    {!freeCancellation && (
                      <div className="flex items-start gap-1.5 text-[13px] font-bold text-slate-600">
                        <X size={16} className="text-rose-600 mt-0.5" />
                        <span>Non-refundable</span>
                      </div>
                    )}
                  </div>
                </td>

                {/* Select Rooms Column */}
                <td className="py-4 px-4 border-r border-slate-200 align-top">
                  <select className="w-full border border-slate-300 rounded px-2 py-1.5 text-[14px] outline-none focus:border-[#0071c2]">
                    <option value="0">0</option>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                  </select>
                </td>

                {/* Reserve Column (Rendered only on the first row to span across if we wanted, but Booking renders it per room group. We will render it per room for simplicity) */}
                <td className="py-4 px-4 align-top text-center bg-[#f0f6fd]">
                  <Link
                    to={`/book/${room.id || ''}`}
                    className="inline-block w-full py-2.5 px-3 rounded text-[14px] font-bold text-white transition-colors hover:bg-[#005c9e] shadow-sm mb-2"
                    style={{ background: "#0071c2" }}
                  >
                    I'll reserve
                  </Link>
                  <ul className="text-[11px] text-slate-600 text-left list-disc pl-4 space-y-1">
                    <li>Confirmation is immediate</li>
                    <li>No booking or credit card fees!</li>
                  </ul>
                </td>

              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
