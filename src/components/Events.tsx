import { motion } from 'motion/react';
import { CalendarDays, Clock, MapPin } from 'lucide-react';
import { useEffect } from 'react';

export function Events() {
  useEffect(() => {
    const initMap = () => {
      const L = (window as any).L;
      const mapContainer = document.getElementById('map');
      if (!mapContainer || (mapContainer as any)._leaflet_id) return;

      const venueLocation = [-6.3535487, 108.3565345];

      const map = L.map('map').setView(venueLocation, 17);

      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap contributors',
        maxZoom: 19,
      }).addTo(map);

      // Venue marker
      L.marker(venueLocation).addTo(map).bindPopup('Perum Griya Ayu Utama').openPopup();

      // Polyline dari titik awal ke venue
      const polylineCoordinates = [
        [-6.3535487,108.3565345], // Titik awal
        venueLocation, // Venue
      ];

      L.polyline(polylineCoordinates, {
        color: '#f4a261',
        weight: 3,
        opacity: 0.7,
        dashArray: '5, 10',
      }).addTo(map);
    };

    if ((window as any).L) {
      initMap();
    } else {
      window.addEventListener('load', initMap);
      return () => window.removeEventListener('load', initMap);
    }
  }, []);
  return (
    <section className="py-24 px-6 bg-primary relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-secondary/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3"></div>
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-accent/10 rounded-full blur-3xl translate-y-1/2 -translate-x-1/3"></div>

      <div className="max-w-4xl mx-auto text-center relative z-10">
        <motion.div
           initial={{ opacity: 0, y: 20 }}
           whileInView={{ opacity: 1, y: 0 }}
           viewport={{ once: true }}
           transition={{ duration: 0.8 }}
           className="mb-16"
        >
          <p className="text-secondary tracking-[0.2em] uppercase text-sm mb-2">Jadwal</p>
          <h2 className="font-script text-5xl text-accent">Rangkaian Acara</h2>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8 mb-16">
          {/* Akad Card */}
          <motion.div
             initial={{ opacity: 0, y: 30 }}
             whileInView={{ opacity: 1, y: 0 }}
             viewport={{ once: true }}
             transition={{ duration: 0.6 }}
             className="glass-panel p-8 rounded-2xl flex flex-col items-center border border-secondary/20"
          >
            <h3 className="font-serif text-2xl text-accent mb-6 border-b border-secondary/30 pb-4 w-full">Akad Nikah</h3>
            
            <div className="space-y-4 text-text-main/80 mb-8 w-full">
              <div className="flex items-center justify-center gap-3">
                <CalendarDays className="w-5 h-5 text-secondary" />
                <span>Sabtu, 16 Mei 2026</span>
              </div>
              <div className="flex items-center justify-center gap-3">
                <Clock className="w-5 h-5 text-secondary" />
                <span>10.00 WIB</span>
              </div>
              <div className="flex items-start justify-center gap-3 mt-4 pt-4 border-t border-black/5">
                <MapPin className="w-5 h-5 text-secondary shrink-0 mt-1" />
                <span className="text-sm">Perum. Griya Ayu Utama,<br/> Ds. Singajaya, Indramayu</span>
              </div>
            </div>
          </motion.div>

          {/* Resepsi Card */}
          <motion.div
             initial={{ opacity: 0, y: 30 }}
             whileInView={{ opacity: 1, y: 0 }}
             viewport={{ once: true }}
             transition={{ duration: 0.6, delay: 0.2 }}
             className="glass-panel p-8 rounded-2xl flex flex-col items-center border border-secondary/20"
          >
            <h3 className="font-serif text-2xl text-accent mb-6 border-b border-secondary/30 pb-4 w-full">Resepsi</h3>
            
            <div className="space-y-4 text-text-main/80 mb-8 w-full">
              <div className="flex items-center justify-center gap-3">
                <CalendarDays className="w-5 h-5 text-secondary" />
                <span>Sabtu, 16 Mei 2026</span>
              </div>
              <div className="flex items-center justify-center gap-3">
                <Clock className="w-5 h-5 text-secondary" />
                <span>11.00 WIB s/d Selesai</span>
              </div>
              <div className="flex items-start justify-center gap-3 mt-4 pt-4 border-t border-black/5">
                <MapPin className="w-5 h-5 text-secondary shrink-0 mt-1" />
                <span className="text-sm">Perum. Griya Ayu Utama,<br/> Ds. Singajaya, Indramayu</span>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Map Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="w-full"
        >
          <div id="map" className="w-full h-80 bg-gray-200 rounded-2xl overflow-hidden shadow-lg border border-white mb-8 z-0"></div>
          
          <a
            href="https://maps.app.goo.gl/L36iTy5ZEwMqMNC7A" // A placeholder link, would ideally be the real link
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-8 py-3 bg-accent text-white rounded-full transition-transform hover:bg-opacity-90 hover:scale-105 shadow-md"
          >
            <MapPin className="w-4 h-4" />
            <span className="text-sm tracking-wide">Buka Google Maps</span>
          </a>
        </motion.div>

      </div>
    </section>
  );
}
