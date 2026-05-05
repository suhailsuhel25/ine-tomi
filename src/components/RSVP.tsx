import React, { useState } from 'react';
import { motion } from 'motion/react';
import { supabase } from '../lib/supabase';

export function RSVP() {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    attendance: '',
    guests: '1',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMsg('');

    try {
      if (!supabase) {
        throw new Error('Database (Supabase) belum dikonfirmasi. Pastikan ENV keys terpasang.');
      }

      const { error } = await supabase
        .from('rsvp')
        .insert([
          {
            name: formData.name,
            phone: formData.phone,
            attendance_status: formData.attendance,
            guest_count: formData.attendance === 'hadir' ? parseInt(formData.guests) : 0,
            message: formData.message
          }
        ]);

      if (error) throw error;
      
      setSubmitted(true);
    } catch (err: any) {
      console.error(err);
      setErrorMsg(err.message || 'Terjadi kesalahan. Silakan coba lagi.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="py-24 px-6 bg-white">
      <div className="max-w-2xl mx-auto flex flex-col items-center">
        <motion.div
           initial={{ opacity: 0, y: 20 }}
           whileInView={{ opacity: 1, y: 0 }}
           viewport={{ once: true }}
           transition={{ duration: 0.8 }}
           className="text-center mb-12"
        >
          <h2 className="font-script text-5xl text-accent mb-4">RSVP</h2>
          <p className="text-text-main/70">Mohon konfirmasi kehadiran Anda melalui form berikut ini.</p>
        </motion.div>

        <motion.div
           initial={{ opacity: 0, y: 20 }}
           whileInView={{ opacity: 1, y: 0 }}
           viewport={{ once: true }}
           transition={{ duration: 0.8, delay: 0.2 }}
           className="w-full bg-primary/30 p-8 rounded-3xl border border-secondary/20 shadow-sm"
        >
          {submitted ? (
             <div className="text-center py-12">
               <h3 className="text-2xl font-serif text-accent mb-2">Terima Kasih!</h3>
               <p className="text-text-main/80">Konfirmasi Anda telah kami terima.</p>
             </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              {errorMsg && (
                <div className="p-4 bg-red-50 text-red-600 rounded-xl text-sm text-center">
                  {errorMsg}
                </div>
              )}
              
              <div>
                <label className="block text-sm text-text-main/80 mb-2">Nama Lengkap *</label>
                <input 
                  type="text" 
                  name="name"
                  required
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-xl border border-secondary/30 bg-white focus:outline-none focus:ring-2 focus:ring-secondary/50 transition-all text-sm"
                  placeholder="Contoh: Budi Santoso"
                />
              </div>

              <div>
                <label className="block text-sm text-text-main/80 mb-2">No. WhatsApp *</label>
                <input 
                  type="tel" 
                  name="phone"
                  required
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-xl border border-secondary/30 bg-white focus:outline-none focus:ring-2 focus:ring-secondary/50 transition-all text-sm"
                  placeholder="Contoh: 08123456789"
                />
              </div>

              <div>
                <label className="block text-sm text-text-main/80 mb-2">Konfirmasi Kehadiran *</label>
                <select 
                  name="attendance"
                  required
                  value={formData.attendance}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-xl border border-secondary/30 bg-white focus:outline-none focus:ring-2 focus:ring-secondary/50 transition-all text-sm"
                >
                  <option value="" disabled>Pilih status kehadiran...</option>
                  <option value="hadir">Yakin akan hadir</option>
                  <option value="ragu">Masih ragu-ragu</option>
                  <option value="tidak_hadir">Maaf, tidak bisa hadir</option>
                </select>
              </div>

              {formData.attendance === 'hadir' && (
                <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }}>
                  <label className="block text-sm text-text-main/80 mb-2">Jumlah Tamu *</label>
                  <select 
                    name="guests"
                    required
                    value={formData.guests}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-xl border border-secondary/30 bg-white focus:outline-none focus:ring-2 focus:ring-secondary/50 transition-all text-sm"
                  >
                    <option value="1">1 Orang</option>
                    <option value="2">2 Orang</option>
                  </select>
                </motion.div>
              )}

              <div>
                <label className="block text-sm text-text-main/80 mb-2">Pesan Tambahan (Opsional)</label>
                <textarea 
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows={3}
                  className="w-full px-4 py-3 rounded-xl border border-secondary/30 bg-white focus:outline-none focus:ring-2 focus:ring-secondary/50 transition-all text-sm resize-none"
                  placeholder="Pesan untuk mempelai..."
                ></textarea>
              </div>

              <button 
                type="submit"
                disabled={isSubmitting}
                className="w-full py-4 bg-accent text-white rounded-xl font-medium tracking-wide transition-all hover:bg-opacity-90 active:scale-[0.98] disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {isSubmitting ? 'Mengirim...' : 'Kirim Konfirmasi'}
              </button>
            </form>
          )}
        </motion.div>
      </div>
    </section>
  );
}
