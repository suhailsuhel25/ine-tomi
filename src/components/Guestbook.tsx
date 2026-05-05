import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { supabase } from '../lib/supabase';

interface Message {
  id: string;
  sender_name: string;
  message: string;
  relationship: string;
  created_at: string;
}

export function Guestbook() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [formData, setFormData] = useState({
    sender_name: '',
    message: '',
    relationship: 'teman'
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  const fetchMessages = async (pageNumber = 1) => {
    if (!supabase) return;
    
    const limit = 5;
    const from = (pageNumber - 1) * limit;
    const to = from + limit - 1;

    try {
      const { data, error, count } = await supabase
        .from('guestbook')
        .select('*', { count: 'exact' })
        .order('created_at', { ascending: false })
        .range(from, to);

      if (error) throw error;
      
      if (pageNumber === 1) {
        setMessages(data || []);
      } else {
        setMessages(prev => [...prev, ...(data || [])]);
      }
      
      if (count && from + (data?.length || 0) >= count) {
        setHasMore(false);
      } else {
        setHasMore(true);
      }
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchMessages();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMsg('');

    try {
      if (!supabase) {
        throw new Error('Database (Supabase) belum terkonfigurasi.');
      }

      const { error } = await supabase
        .from('guestbook')
        .insert([
          {
            sender_name: formData.sender_name,
            message: formData.message,
            relationship: formData.relationship
          }
        ]);

      if (error) throw error;
      
      setFormData({ sender_name: '', message: '', relationship: 'teman' });
      fetchMessages(1);
      setPage(1);
    } catch (err: any) {
      console.error(err);
      setErrorMsg(err.message || 'Gagal mengirim ucapan.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const timeAgo = (dateStr: string) => {
    const rtf = new Intl.RelativeTimeFormat('id', { numeric: 'auto' });
    const diff = new Date().getTime() - new Date(dateStr).getTime();
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const mins = Math.floor(diff / (1000 * 60));

    if (days > 0) return rtf.format(-days, 'day');
    if (hours > 0) return rtf.format(-hours, 'hour');
    if (mins > 0) return rtf.format(-mins, 'minute');
    return 'baru saja';
  };

  return (
    <section className="py-24 px-6 bg-bg-main relative">
      <div className="max-w-2xl mx-auto flex flex-col items-center">
        <motion.div
           initial={{ opacity: 0, y: 20 }}
           whileInView={{ opacity: 1, y: 0 }}
           viewport={{ once: true }}
           transition={{ duration: 0.8 }}
           className="text-center mb-12"
        >
          <h2 className="font-script text-5xl text-accent mb-4">Buku Tamu</h2>
          <p className="text-text-main/70">Kirimkan doa dan ucapan terbaik Anda.</p>
        </motion.div>

        <div className="w-full grid gap-12">
          <motion.div
             initial={{ opacity: 0, y: 20 }}
             whileInView={{ opacity: 1, y: 0 }}
             viewport={{ once: true }}
             transition={{ duration: 0.8 }}
             className="glass-panel p-6 md:p-8 rounded-3xl"
          >
            <form onSubmit={handleSubmit} className="space-y-4">
              {errorMsg && (
                <div className="p-3 bg-red-50 text-red-600 rounded-xl text-sm text-center">
                  {errorMsg}
                </div>
              )}
              <div>
                <input 
                  type="text" 
                  name="sender_name"
                  required
                  value={formData.sender_name}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-lg bg-white/60 border border-secondary/30 focus:outline-none focus:ring-2 focus:ring-secondary/50 transition-all text-sm"
                  placeholder="Nama Pengirim"
                />
              </div>
              <div className="flex gap-4">
                <select 
                  name="relationship"
                  value={formData.relationship}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-lg bg-white/60 border border-secondary/30 focus:outline-none focus:ring-2 focus:ring-secondary/50 transition-all text-sm"
                >
                  <option value="keluarga">Keluarga</option>
                  <option value="teman">Teman</option>
                  <option value="rekan_kerja">Rekan Kerja</option>
                  <option value="lainnya">Lainnya</option>
                </select>
              </div>
              <div>
                <textarea 
                  name="message"
                  required
                  maxLength={250}
                  value={formData.message}
                  onChange={handleChange}
                  rows={4}
                  className="w-full px-4 py-3 rounded-lg bg-white/60 border border-secondary/30 focus:outline-none focus:ring-2 focus:ring-secondary/50 transition-all text-sm resize-none"
                  placeholder="Tulis ucapan dan doa..."
                ></textarea>
                <div className="text-right text-xs text-text-main/50 mt-1">
                  {formData.message.length}/250
                </div>
              </div>
              <button 
                type="submit"
                disabled={isSubmitting}
                className="px-6 py-3 bg-secondary text-white rounded-lg text-sm tracking-wide font-medium transition hover:bg-accent disabled:opacity-70 disabled:cursor-not-allowed w-full md:w-auto"
              >
                {isSubmitting ? 'Mengirim...' : 'Kirim Ucapan'}
              </button>
            </form>
          </motion.div>

          {/* List Messages */}
          <div className="space-y-4">
            {messages.length === 0 ? (
               <p className="text-center text-text-main/50 italic text-sm">Belum ada ucapan. Jadilah yang pertama!</p>
            ) : (
              messages.map((msg, i) => (
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  key={msg.id} 
                  className="bg-white p-5 rounded-2xl shadow-sm border border-black/[0.03]"
                >
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h4 className="font-semibold text-text-main">{msg.sender_name}</h4>
                      <span className="text-[10px] uppercase tracking-wider text-accent/80 bg-accent/10 px-2 py-0.5 rounded-full inline-block mt-1">
                        {msg.relationship.replace('_', ' ')}
                      </span>
                    </div>
                    <span className="text-xs text-text-main/40">{timeAgo(msg.created_at)}</span>
                  </div>
                  <p className="text-sm text-text-main/80 pt-2">{msg.message}</p>
                </motion.div>
              ))
            )}
            
            {hasMore && messages.length > 0 && (
              <div className="text-center pt-4">
                <button 
                  onClick={() => {
                    const nextPage = page + 1;
                    setPage(nextPage);
                    fetchMessages(nextPage);
                  }}
                  className="text-sm text-accent underline underline-offset-4 hover:text-text-main transition"
                >
                  Lihat Ucapan Lainnya
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
