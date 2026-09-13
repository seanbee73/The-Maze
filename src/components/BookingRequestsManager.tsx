import React, { useState } from 'react';
import { BookingInquiry } from '../types';
import { SALON_INFO, STYLISTS_TEAM } from '../data/salonData';

interface BookingRequestsManagerProps {
  bookings: BookingInquiry[];
  onUpdateStatus: (id: string, status: 'pending' | 'confirmed' | 'completed' | 'cancelled') => void;
  onDeleteBooking: (id: string) => void;
  onAddManualBooking: (booking: BookingInquiry) => void;
  onClearAllBookings?: () => void;
}

export const BookingRequestsManager: React.FC<BookingRequestsManagerProps> = ({
  bookings,
  onUpdateStatus,
  onDeleteBooking,
  onAddManualBooking,
  onClearAllBookings,
}) => {
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [isAddingNew, setIsAddingNew] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  // New Manual Booking Form State
  const [newBooking, setNewBooking] = useState<Partial<BookingInquiry>>({
    name: '',
    phone: '',
    email: '',
    preferredStylist: 'Jason (Master Stylist & Color Specialist)',
    serviceCategory: "Women's Designer Haircut & Blowout",
    preferredDate: new Date().toISOString().split('T')[0],
    preferredTime: '11:00 AM',
    notes: 'Walk-in / Phone reservation',
    status: 'confirmed',
  });

  const pendingCount = bookings.filter((b) => (b.status || 'pending') === 'pending').length;
  const confirmedCount = bookings.filter((b) => b.status === 'confirmed').length;
  const completedCount = bookings.filter((b) => b.status === 'completed').length;

  // Filtered Bookings
  const filteredBookings = bookings.filter((b) => {
    const status = b.status || 'pending';
    if (filterStatus !== 'all' && status !== filterStatus) return false;
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const matchName = b.name.toLowerCase().includes(q);
      const matchPhone = b.phone.toLowerCase().includes(q);
      const matchStylist = b.preferredStylist.toLowerCase().includes(q);
      const matchService = b.serviceCategory.toLowerCase().includes(q);
      const matchNotes = (b.notes || '').toLowerCase().includes(q);
      return matchName || matchPhone || matchStylist || matchService || matchNotes;
    }
    return true;
  });

  const handleCreateManual = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newBooking.name || !newBooking.phone) return;

    const created: BookingInquiry = {
      id: `MZ-${Math.floor(1000 + Math.random() * 9000)}`,
      name: newBooking.name,
      phone: newBooking.phone,
      email: newBooking.email || '',
      preferredStylist: newBooking.preferredStylist || 'First Available Master Stylist',
      serviceCategory: newBooking.serviceCategory || "Women's Designer Haircut & Blowout",
      preferredDate: newBooking.preferredDate || new Date().toISOString().split('T')[0],
      preferredTime: newBooking.preferredTime || '11:00 AM',
      notes: newBooking.notes || '',
      status: (newBooking.status as any) || 'confirmed',
      createdAt: new Date().toISOString(),
    };

    onAddManualBooking(created);
    setIsAddingNew(false);
    setNewBooking({
      name: '',
      phone: '',
      email: '',
      preferredStylist: 'Jason (Master Stylist & Color Specialist)',
      serviceCategory: "Women's Designer Haircut & Blowout",
      preferredDate: new Date().toISOString().split('T')[0],
      preferredTime: '11:00 AM',
      notes: 'Walk-in / Phone reservation',
      status: 'confirmed',
    });
  };

  const handleCopyConfirmationText = (b: BookingInquiry) => {
    const text = `Hi ${b.name}! This is ${SALON_INFO.name} (${SALON_INFO.phone}) confirming your booking request for ${b.serviceCategory} with ${b.preferredStylist} on ${b.preferredDate || 'your requested date'} at ${b.preferredTime}. We look forward to seeing you at 5233 Yonge St, North York!`;
    navigator.clipboard.writeText(text);
    setCopiedId(b.id || b.name);
    setTimeout(() => setCopiedId(null), 2500);
  };

  const handleExportCSV = () => {
    if (bookings.length === 0) return;
    const headers = ['Booking ID', 'Status', 'Date Submitted', 'Client Name', 'Phone', 'Email', 'Service', 'Stylist', 'Appointment Date', 'Appointment Time', 'Client Notes'];
    const rows = bookings.map((b) => [
      b.id || 'N/A',
      b.status || 'pending',
      b.createdAt ? new Date(b.createdAt).toLocaleString() : 'N/A',
      `"${(b.name || '').replace(/"/g, '""')}"`,
      `"${(b.phone || '').replace(/"/g, '""')}"`,
      `"${(b.email || '').replace(/"/g, '""')}"`,
      `"${(b.serviceCategory || '').replace(/"/g, '""')}"`,
      `"${(b.preferredStylist || '').replace(/"/g, '""')}"`,
      `"${b.preferredDate || ''}"`,
      `"${b.preferredTime || ''}"`,
      `"${(b.notes || '').replace(/"/g, '""')}"`,
    ]);

    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map((e) => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `the_maze_bookings_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="space-y-6 text-left">
      {/* Storage Information Banner */}
      <div className="p-4 bg-zinc-900/80 border border-[#d8b485]/30 rounded flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="flex items-start gap-3">
          <div className="w-8 h-8 rounded-full bg-[#d8b485]/10 flex items-center justify-center text-[#d8b485] shrink-0 mt-0.5">
            <iconify-icon icon="solar:database-bold" style={{ fontSize: '18px' }}></iconify-icon>
          </div>
          <div>
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">
              Booking Data Destination &amp; Salon Inbox
            </h4>
            <p className="text-[11px] text-zinc-400 leading-relaxed mt-0.5">
              Online client requests are stored in your salon's local database (<code className="text-[#d8b485] font-mono text-[10px]">the_maze_appointments</code>). You can review details, call or text clients, update appointment status, or export them to Excel/CSV.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 self-end md:self-auto shrink-0">
          <button
            onClick={handleExportCSV}
            type="button"
            className="px-3 py-1.5 text-[10px] font-bold tracking-widest text-[#d8b485] hover:text-white bg-[#d8b485]/10 hover:bg-[#d8b485]/20 border border-[#d8b485]/40 uppercase rounded transition-colors flex items-center gap-1.5"
            title="Download CSV spreadsheet of all bookings"
          >
            <iconify-icon icon="solar:download-square-linear"></iconify-icon>
            <span>Export CSV</span>
          </button>
          <button
            onClick={() => setIsAddingNew(true)}
            type="button"
            className="px-3 py-1.5 text-[10px] font-bold tracking-widest text-zinc-950 bg-[#d8b485] hover:bg-[#c4a070] uppercase rounded transition-colors flex items-center gap-1.5"
          >
            <iconify-icon icon="solar:add-circle-bold"></iconify-icon>
            <span>+ Manual Booking</span>
          </button>
        </div>
      </div>

      {/* Metrics Stat Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div className="p-3.5 bg-[#09090b] border border-white/10 rounded">
          <p className="text-[9px] uppercase font-bold text-zinc-500 tracking-widest">Total Inquiries</p>
          <p className="text-xl font-bold text-white mt-1">{bookings.length}</p>
        </div>
        <div className="p-3.5 bg-[#09090b] border border-amber-500/30 rounded">
          <div className="flex items-center justify-between">
            <p className="text-[9px] uppercase font-bold text-amber-400 tracking-widest">Pending Action</p>
            {pendingCount > 0 && (
              <span className="w-2 h-2 rounded-full bg-amber-400 animate-ping"></span>
            )}
          </div>
          <p className="text-xl font-bold text-amber-400 mt-1">{pendingCount}</p>
        </div>
        <div className="p-3.5 bg-[#09090b] border border-emerald-500/30 rounded">
          <p className="text-[9px] uppercase font-bold text-emerald-400 tracking-widest">Confirmed</p>
          <p className="text-xl font-bold text-emerald-400 mt-1">{confirmedCount}</p>
        </div>
        <div className="p-3.5 bg-[#09090b] border border-blue-500/30 rounded">
          <p className="text-[9px] uppercase font-bold text-blue-400 tracking-widest">Completed</p>
          <p className="text-xl font-bold text-blue-400 mt-1">{completedCount}</p>
        </div>
      </div>

      {/* Manual Booking Creation Form */}
      {isAddingNew && (
        <form
          onSubmit={handleCreateManual}
          className="p-5 bg-[#09090b] border border-[#d8b485]/50 rounded space-y-4 animate-fadeIn"
        >
          <div className="flex items-center justify-between border-b border-white/10 pb-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-widest flex items-center gap-2">
              <iconify-icon icon="solar:user-plus-bold" class="text-[#d8b485]"></iconify-icon>
              Record Walk-in / Phone Booking
            </h4>
            <button
              type="button"
              onClick={() => setIsAddingNew(false)}
              className="text-zinc-500 hover:text-white text-xs"
            >
              Cancel
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div>
              <label className="block text-[9px] uppercase font-bold text-zinc-400 mb-1">Client Name *</label>
              <input
                type="text"
                required
                value={newBooking.name || ''}
                onChange={(e) => setNewBooking({ ...newBooking, name: e.target.value })}
                className="w-full bg-[#111114] border border-white/10 px-3 py-2 text-xs text-white rounded focus:border-[#d8b485] focus:outline-none"
                placeholder="Client Name"
              />
            </div>
            <div>
              <label className="block text-[9px] uppercase font-bold text-zinc-400 mb-1">Phone Number *</label>
              <input
                type="tel"
                required
                value={newBooking.phone || ''}
                onChange={(e) => setNewBooking({ ...newBooking, phone: e.target.value })}
                className="w-full bg-[#111114] border border-white/10 px-3 py-2 text-xs text-white rounded focus:border-[#d8b485] focus:outline-none"
                placeholder="(416) 000-0000"
              />
            </div>
            <div>
              <label className="block text-[9px] uppercase font-bold text-zinc-400 mb-1">Email</label>
              <input
                type="email"
                value={newBooking.email || ''}
                onChange={(e) => setNewBooking({ ...newBooking, email: e.target.value })}
                className="w-full bg-[#111114] border border-white/10 px-3 py-2 text-xs text-white rounded focus:border-[#d8b485] focus:outline-none"
                placeholder="email@example.com"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-4 gap-3">
            <div className="sm:col-span-2">
              <label className="block text-[9px] uppercase font-bold text-zinc-400 mb-1">Service</label>
              <select
                value={newBooking.serviceCategory}
                onChange={(e) => setNewBooking({ ...newBooking, serviceCategory: e.target.value })}
                className="w-full bg-[#111114] border border-white/10 px-3 py-2 text-xs text-white rounded focus:border-[#d8b485] focus:outline-none"
              >
                <option value="Women's Designer Haircut & Blowout">Women's Designer Haircut & Blowout ($65 - $95)</option>
                <option value="Men's Precision Cut & Barbering">Men's Precision Cut & Barbering ($38 - $55)</option>
                <option value="Asian Female Pixie & Textured Short Cut">Asian Female Pixie & Short Cut ($70 - $90)</option>
                <option value="Smoky Ash Dimensional Balayage + Gloss">Smoky Ash Dimensional Balayage ($220 - $380)</option>
                <option value="Japanese Thermal Silk Straightening Rebonding">Japanese Silk Rebonding ($240 - $360)</option>
                <option value="Korean Root Lift & Natural Wave Perm">Korean Root Wave Perm ($160 - $240)</option>
                <option value="Milbon Plarmia Deep Scalp & Hair Repair Spa">Milbon Deep Scalp Spa ($85 - $135)</option>
                <option value="Custom Hair Consultation & Strand Test">Custom Hair Consultation</option>
              </select>
            </div>

            <div>
              <label className="block text-[9px] uppercase font-bold text-zinc-400 mb-1">Stylist</label>
              <select
                value={newBooking.preferredStylist}
                onChange={(e) => setNewBooking({ ...newBooking, preferredStylist: e.target.value })}
                className="w-full bg-[#111114] border border-white/10 px-3 py-2 text-xs text-white rounded focus:border-[#d8b485] focus:outline-none"
              >
                <option value="First Available Master Stylist">First Available Master Stylist</option>
                {STYLISTS_TEAM.map((s) => (
                  <option key={s.id} value={`${s.name} (${s.role})`}>
                    {s.name} - {s.role}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-[9px] uppercase font-bold text-zinc-400 mb-1">Initial Status</label>
              <select
                value={newBooking.status}
                onChange={(e) => setNewBooking({ ...newBooking, status: e.target.value as any })}
                className="w-full bg-[#111114] border border-white/10 px-3 py-2 text-xs text-white rounded focus:border-[#d8b485] focus:outline-none"
              >
                <option value="confirmed">Confirmed</option>
                <option value="pending">Pending</option>
                <option value="completed">Completed</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-[9px] uppercase font-bold text-zinc-400 mb-1">Date &amp; Time</label>
              <div className="grid grid-cols-2 gap-2">
                <input
                  type="date"
                  value={newBooking.preferredDate}
                  onChange={(e) => setNewBooking({ ...newBooking, preferredDate: e.target.value })}
                  className="bg-[#111114] border border-white/10 px-3 py-2 text-xs text-white rounded focus:border-[#d8b485] focus:outline-none"
                />
                <select
                  value={newBooking.preferredTime}
                  onChange={(e) => setNewBooking({ ...newBooking, preferredTime: e.target.value })}
                  className="bg-[#111114] border border-white/10 px-3 py-2 text-xs text-white rounded focus:border-[#d8b485] focus:outline-none"
                >
                  <option value="11:00 AM">11:00 AM</option>
                  <option value="12:00 PM">12:00 PM</option>
                  <option value="01:00 PM">01:00 PM</option>
                  <option value="02:00 PM">02:00 PM</option>
                  <option value="03:30 PM">03:30 PM</option>
                  <option value="05:00 PM">05:00 PM</option>
                  <option value="06:30 PM">06:30 PM</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-[9px] uppercase font-bold text-zinc-400 mb-1">Notes / Preferences</label>
              <input
                type="text"
                value={newBooking.notes || ''}
                onChange={(e) => setNewBooking({ ...newBooking, notes: e.target.value })}
                className="w-full bg-[#111114] border border-white/10 px-3 py-2 text-xs text-white rounded focus:border-[#d8b485] focus:outline-none"
                placeholder="e.g. Needs extra wash time, color retouch"
              />
            </div>
          </div>

          <div className="flex justify-end gap-2 pt-2">
            <button
              type="button"
              onClick={() => setIsAddingNew(false)}
              className="px-4 py-2 text-xs text-zinc-400 hover:text-white"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 text-xs font-bold uppercase tracking-wider text-zinc-950 bg-[#d8b485] hover:bg-[#c4a070] rounded"
            >
              Save Booking Request
            </button>
          </div>
        </form>
      )}

      {/* Filter and Search Controls */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 bg-[#09090b] p-3 border border-white/10 rounded">
        {/* Filter Pills */}
        <div className="flex items-center gap-1.5 flex-wrap">
          <button
            onClick={() => setFilterStatus('all')}
            className={`px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider rounded transition-colors ${
              filterStatus === 'all' ? 'bg-[#d8b485] text-zinc-950' : 'bg-white/5 text-zinc-400 hover:text-white'
            }`}
          >
            All ({bookings.length})
          </button>
          <button
            onClick={() => setFilterStatus('pending')}
            className={`px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider rounded transition-colors ${
              filterStatus === 'pending'
                ? 'bg-amber-400 text-zinc-950'
                : 'bg-amber-950/30 text-amber-300 hover:bg-amber-900/40 border border-amber-500/20'
            }`}
          >
            Pending ({pendingCount})
          </button>
          <button
            onClick={() => setFilterStatus('confirmed')}
            className={`px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider rounded transition-colors ${
              filterStatus === 'confirmed'
                ? 'bg-emerald-400 text-zinc-950'
                : 'bg-emerald-950/30 text-emerald-300 hover:bg-emerald-900/40 border border-emerald-500/20'
            }`}
          >
            Confirmed ({confirmedCount})
          </button>
          <button
            onClick={() => setFilterStatus('completed')}
            className={`px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider rounded transition-colors ${
              filterStatus === 'completed'
                ? 'bg-blue-400 text-zinc-950'
                : 'bg-blue-950/30 text-blue-300 hover:bg-blue-900/40 border border-blue-500/20'
            }`}
          >
            Completed ({completedCount})
          </button>
        </div>

        {/* Search */}
        <div className="relative min-w-[200px]">
          <iconify-icon
            icon="solar:magnifer-linear"
            class="absolute left-2.5 top-1/2 -translate-y-1/2 text-zinc-500 text-sm"
          ></iconify-icon>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by client, phone, stylist..."
            className="w-full bg-[#111114] border border-white/10 rounded pl-8 pr-3 py-1.5 text-xs text-white placeholder:text-zinc-600 focus:outline-none focus:border-[#d8b485]"
          />
        </div>
      </div>

      {/* Bookings List */}
      {filteredBookings.length === 0 ? (
        <div className="p-12 text-center bg-[#09090b] border border-white/10 rounded">
          <iconify-icon
            icon="solar:calendar-minimalistic-linear"
            style={{ fontSize: '36px' }}
            class="text-zinc-600 mb-3"
          ></iconify-icon>
          <p className="text-sm font-medium text-white mb-1">No booking requests match your filter</p>
          <p className="text-xs text-zinc-500 max-w-sm mx-auto mb-4">
            When clients submit the appointment request form on your website, their requests will appear here instantly.
          </p>
          <button
            onClick={() => {
              setFilterStatus('all');
              setSearchQuery('');
            }}
            className="px-4 py-2 text-xs font-bold uppercase tracking-wider text-[#d8b485] bg-white/5 border border-white/10 rounded hover:bg-white/10"
          >
            Reset Filters
          </button>
        </div>
      ) : (
        <div className="space-y-4">
          {filteredBookings.map((b, idx) => {
            const currentStatus = b.status || 'pending';
            const bookingId = b.id || `MZ-${8900 + idx}`;
            return (
              <div
                key={bookingId}
                className="p-5 bg-[#09090b] border border-white/10 hover:border-[#d8b485]/40 transition-all rounded text-left space-y-4"
              >
                {/* Header Row */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-white/5 pb-3">
                  <div className="flex items-center gap-3">
                    <span className="px-2 py-0.5 text-[10px] font-mono font-bold bg-white/5 text-[#d8b485] border border-white/10 rounded">
                      #{bookingId}
                    </span>
                    <div>
                      <h4 className="text-sm font-bold text-white tracking-wide flex items-center gap-2">
                        {b.name}
                      </h4>
                      <p className="text-[10px] text-zinc-500">
                        Submitted:{' '}
                        {b.createdAt ? new Date(b.createdAt).toLocaleString() : 'Recent online request'}
                      </p>
                    </div>
                  </div>

                  {/* Status Dropdown & Badges */}
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest hidden sm:inline">
                      Status:
                    </span>
                    <select
                      value={currentStatus}
                      onChange={(e) => onUpdateStatus(bookingId, e.target.value as any)}
                      className={`px-3 py-1 text-[11px] font-bold uppercase tracking-wider rounded border focus:outline-none cursor-pointer ${
                        currentStatus === 'pending'
                          ? 'bg-amber-950/60 text-amber-300 border-amber-500/40'
                          : currentStatus === 'confirmed'
                          ? 'bg-emerald-950/60 text-emerald-300 border-emerald-500/40'
                          : currentStatus === 'completed'
                          ? 'bg-blue-950/60 text-blue-300 border-blue-500/40'
                          : 'bg-zinc-800 text-zinc-400 border-zinc-700'
                      }`}
                    >
                      <option value="pending">🟡 Pending</option>
                      <option value="confirmed">🟢 Confirmed</option>
                      <option value="completed">🔵 Completed</option>
                      <option value="cancelled">🔴 Cancelled</option>
                    </select>

                    <button
                      onClick={() => {
                        if (confirm(`Delete booking request for ${b.name}?`)) {
                          onDeleteBooking(bookingId);
                        }
                      }}
                      className="p-1.5 text-zinc-600 hover:text-red-400 transition-colors"
                      title="Delete request"
                    >
                      <iconify-icon icon="solar:trash-bin-trash-linear" style={{ fontSize: '16px' }}></iconify-icon>
                    </button>
                  </div>
                </div>

                {/* Details Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
                  {/* Service & Stylist */}
                  <div className="space-y-1.5">
                    <p className="text-[10px] font-bold uppercase text-zinc-500 tracking-wider">Service &amp; Stylist</p>
                    <p className="font-semibold text-white">{b.serviceCategory}</p>
                    <p className="text-zinc-400 flex items-center gap-1">
                      <iconify-icon icon="solar:user-linear" class="text-[#d8b485]"></iconify-icon>
                      {b.preferredStylist}
                    </p>
                  </div>

                  {/* Date & Time Slot */}
                  <div className="space-y-1.5">
                    <p className="text-[10px] font-bold uppercase text-zinc-500 tracking-wider">Requested Slot</p>
                    <p className="font-semibold text-[#d8b485] flex items-center gap-1.5">
                      <iconify-icon icon="solar:calendar-date-bold"></iconify-icon>
                      {b.preferredDate || 'Flexible / Soonest'}
                    </p>
                    <p className="text-zinc-300 font-mono flex items-center gap-1.5">
                      <iconify-icon icon="solar:clock-circle-bold" class="text-zinc-500"></iconify-icon>
                      {b.preferredTime || '11:00 AM'}
                    </p>
                  </div>

                  {/* Direct Contact Actions */}
                  <div className="space-y-2">
                    <p className="text-[10px] font-bold uppercase text-zinc-500 tracking-wider">Contact Client</p>
                    <div className="flex items-center gap-2 flex-wrap">
                      <a
                        href={`tel:${b.phone.replace(/[^0-9+]/g, '')}`}
                        className="inline-flex items-center gap-1 px-2.5 py-1 bg-white/5 hover:bg-white/10 border border-white/10 text-white rounded font-mono text-[11px] transition-colors"
                      >
                        <iconify-icon icon="solar:phone-calling-bold" class="text-[#d8b485]"></iconify-icon>
                        <span>{b.phone}</span>
                      </a>
                      {b.email && (
                        <a
                          href={`mailto:${b.email}?subject=The Maze Hair Salon - Appointment Confirmation&body=Hi ${encodeURIComponent(b.name)}, we received your request for ${encodeURIComponent(b.serviceCategory)} with ${encodeURIComponent(b.preferredStylist)}...`}
                          className="inline-flex items-center gap-1 px-2.5 py-1 bg-white/5 hover:bg-white/10 border border-white/10 text-zinc-300 hover:text-white rounded text-[11px] transition-colors"
                          title={b.email}
                        >
                          <iconify-icon icon="solar:letter-linear" class="text-[#d8b485]"></iconify-icon>
                          <span className="max-w-[120px] truncate">{b.email}</span>
                        </a>
                      )}
                    </div>
                  </div>
                </div>

                {/* Notes & Quick Confirmation Text Generator */}
                <div className="pt-2 border-t border-white/5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs">
                  <div className="text-zinc-400 text-[11px] flex items-start gap-1.5 max-w-xl">
                    <iconify-icon icon="solar:notes-linear" class="text-zinc-500 shrink-0 mt-0.5"></iconify-icon>
                    <span>
                      <strong className="text-zinc-300">Client Notes:</strong> {b.notes || 'None specified.'}
                    </span>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    <button
                      onClick={() => handleCopyConfirmationText(b)}
                      type="button"
                      className="px-3 py-1 text-[10px] font-bold tracking-wider text-zinc-300 hover:text-white bg-white/5 hover:bg-white/10 border border-white/10 rounded uppercase transition-colors flex items-center gap-1"
                      title="Copy ready-to-send SMS confirmation template to clipboard"
                    >
                      <iconify-icon icon={copiedId === bookingId ? 'solar:check-circle-bold' : 'solar:copy-linear'} class={copiedId === bookingId ? 'text-emerald-400' : 'text-[#d8b485]'}></iconify-icon>
                      <span>{copiedId === bookingId ? 'Copied Confirmation SMS!' : 'Copy SMS Template'}</span>
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Clear all test bookings */}
      {bookings.length > 0 && onClearAllBookings && (
        <div className="pt-4 border-t border-white/5 flex justify-end">
          <button
            onClick={() => {
              if (confirm('Clear all booking records? This cannot be undone.')) {
                onClearAllBookings();
              }
            }}
            type="button"
            className="text-[10px] uppercase font-bold tracking-wider text-zinc-600 hover:text-red-400 transition-colors"
          >
            Clear All Booking Records
          </button>
        </div>
      )}
    </div>
  );
};
