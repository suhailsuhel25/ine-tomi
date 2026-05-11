import { useState, useEffect } from 'react';
import { Cover } from './components/Cover';
import { Hero } from './components/Hero';
import { Couple } from './components/Couple';
import { Events } from './components/Events';
import { RSVP } from './components/RSVP';
import { Guestbook } from './components/Guestbook';
import { Footer } from './components/Footer';
import { MusicPlayer } from './components/MusicPlayer';
import bgMusic from './Assets/pure-love-304010.mp3';

export default function App() {
  const [isOpen, setIsOpen] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  
  // Use the local audio track
  const audioUrl = bgMusic;

  // When 'Buka Undangan' is clicked, enable scrolling and start music
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'auto';
      setIsPlaying(true);
    } else {
      document.body.style.overflow = 'hidden'; // Lock scroll on cover
    }
    
    return () => { document.body.style.overflow = 'auto'; };
  }, [isOpen]);

  const handleOpen = () => {
    setIsOpen(true);
  };

  const togglePlay = () => {
    setIsPlaying(!isPlaying);
  };

  return (
    <div className="relative bg-bg-main min-h-screen">
      {!isOpen && <Cover isOpen={isOpen} onOpen={handleOpen} />}
      
      {/* We keep Cover mounted so it animates out, then gets hidden */}
      {isOpen && <Cover isOpen={isOpen} onOpen={handleOpen} />}
      
      <main>
        <Hero />
        <Couple />
        <Events />
        <RSVP />
        <Guestbook />
        <Footer />
      </main>

      {isOpen && (
        <MusicPlayer 
          isPlaying={isPlaying} 
          togglePlay={togglePlay} 
          audioUrl={audioUrl} 
        />
      )}
    </div>
  );
}
