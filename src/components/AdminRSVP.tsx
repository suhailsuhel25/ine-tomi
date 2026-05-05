import React, { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';

interface RSVPData {
  id: string;
  name: string;
  phone: string;
  attendance_status: string;
  guest_count: number;
  message: string;
  created_at: string;
}

export function AdminRSVP() {
  const [rsvps, setRsvps] = useState<RSVPData[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const fetchData = async () => {
    setIsLoading(true);
    if (!supabase) return;
    
    try {
      const { data, error } = await supabase
        .from('rsvp')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setRsvps(data || []);
    } catch (err: any) {
      console.error(err);
      setError('Gagal mengambil data dari database.');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // Statistik
  const totalHadir = rsvps.filter(r => r.attendance_status === 'hadir').length;
  const totalTamu = rsvps.reduce((acc, curr) => acc + (curr.guest_count || 0), 0);
  const totalTidakHadir = rsvps.filter(r => r.attendance_status === 'tidak_hadir').length;

  return (
    <div className="min-h-screen bg-bg-main p-6 md:p-12">
      <div className="max-w-6xl mx-auto space-y-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <h1 className="font-script text-5xl text-accent mb-2">Hasil RSVP</h1>
            <p className="text-text-main/70">Daftar konfirmasi kehadiran tamu undangan.</p>
          </div>
          <button 
            onClick={() => window.location.href = '/'}
            className="px-6 py-2 bg-white border border-secondary/30 rounded-lg text-sm hover:bg-gray-50 transition"
          >
            Kembali ke Undangan
          </button>
        </div>

        {/* Statistik */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-secondary/20">
            <div className="text-text-main/60 text-sm mb-1">Total RSVP Masuk</div>
            <div className="text-3xl font-serif text-accent">{rsvps.length}</div>
          </div>
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-secondary/20">
            <div className="text-text-main/60 text-sm mb-1">Konfirmasi Hadir</div>
            <div className="text-3xl font-serif text-accent">{totalHadir} <span className="text-base text-text-main/50 font-sans">({totalTamu} Tamu)</span></div>
          </div>
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-secondary/20">
            <div className="text-text-main/60 text-sm mb-1">Tidak Hadir / Ragu</div>
            <div className="text-3xl font-serif text-accent">{totalTidakHadir + (rsvps.length - totalHadir - totalTidakHadir)}</div>
          </div>
        </div>

        {/* Tabel Data */}
        <div className="bg-white rounded-2xl shadow-sm border border-secondary/20 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm whitespace-nowrap">
              <thead className="bg-primary/20 text-accent font-serif border-b border-secondary/20">
                <tr>
                  <th className="px-6 py-4">No</th>
                  <th className="px-6 py-4">Nama Lengkap</th>
                  <th className="px-6 py-4">No WhatsApp</th>
                  <th className="px-6 py-4">Kehadiran</th>
                  <th className="px-6 py-4">Jml Tamu</th>
                  <th className="px-6 py-4 min-w-[200px]">Pesan</th>
                  <th className="px-6 py-4">Waktu Submit</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-secondary/10">
                {isLoading ? (
                  <tr>
                    <td colSpan={7} className="px-6 py-8 text-center text-text-main/50">Memuat data...</td>
                  </tr>
                ) : rsvps.length === 0 ? (
                  <tr>
                    <td colSpan={7} className="px-6 py-8 text-center text-text-main/50">Belum ada data RSVP.</td>
                  </tr>
                ) : (
                  rsvps.map((rsvp, index) => (
                    <tr key={rsvp.id} className="hover:bg-gray-50/50 transition">
                      <td className="px-6 py-4 text-text-main/60">{index + 1}</td>
                      <td className="px-6 py-4 font-medium">{rsvp.name}</td>
                      <td className="px-6 py-4 text-text-main/80">{rsvp.phone}</td>
                      <td className="px-6 py-4">
                        <span className={`px-3 py-1 rounded-full text-xs uppercase tracking-wide ${
                          rsvp.attendance_status === 'hadir' ? 'bg-green-100 text-green-700' :
                          rsvp.attendance_status === 'tidak_hadir' ? 'bg-red-100 text-red-700' :
                          'bg-yellow-100 text-yellow-700'
                        }`}>
                          {rsvp.attendance_status.replace('_', ' ')}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-center">{rsvp.guest_count || '-'}</td>
                      <td className="px-6 py-4 text-text-main/70 whitespace-normal min-w-[200px]">{rsvp.message || '-'}</td>
                      <td className="px-6 py-4 text-text-main/50 text-xs">
                        {new Date(rsvp.created_at).toLocaleString('id-ID')}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

      </div>
    </div>
  );
}
