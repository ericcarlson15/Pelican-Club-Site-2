import { useState } from 'react';
import { MobileNav } from './MobileNav';
import { AudioPlayer } from './AudioPlayer';
import { MailchimpForm } from './MailchimpForm';
import { AboutOS } from './AboutOS';
import { 
  SpotifyIcon, 
  AppleMusicIcon, 
  AmazonMusicIcon, 
  TidalIcon, 
  BandcampIcon, 
  QobuzIcon, 
  YouTubeMusicIcon,
  InstagramIcon 
} from './StreamingIcons';
import pelicanClubHeader from 'figma:asset/162c82ac08ae5ab345c17d141ec5bbfffc5b3836.png';
import pelicanClubFilmsHeader from 'figma:asset/7e4bfc54b0d4688d9666622ac8c7c478873e3096.png';

export function MobileView() {
  const [currentSection, setCurrentSection] = useState('music');

  const renderContent = () => {
    switch (currentSection) {
      case 'music':
        return (
          <div className="p-4 h-full flex items-center justify-center">
            <div className="w-full max-w-md bg-[#FFFEF9] border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] rounded-lg p-4">
              <AudioPlayer />
            </div>
          </div>
        );
      
      case 'videos':
        return (
          <div className="p-4 overflow-auto">
            <div className="bg-[#FFFEF9] border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] rounded-lg p-4">
              <div className="flex justify-center mb-4">
                <img 
                  src={pelicanClubFilmsHeader} 
                  alt="Pelican Club Films" 
                  className="max-w-full h-auto"
                  style={{ maxHeight: '50px' }}
                />
              </div>
              <div className="space-y-4">
              <iframe
                width="100%"
                height="200"
                src="https://www.youtube.com/embed/tXWbsBjp_QE"
                title="Pelican Club - Lovers"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
              <iframe
                width="100%"
                height="200"
                src="https://www.youtube.com/embed/jjzy8fHpjUE"
                title="Pelican Club - Turn My TV On"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
              </div>
            </div>
          </div>
        );
      
      case 'bio':
        return (
          <div className="p-4 overflow-auto">
            <div className="bg-[#FFFEF9] border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] rounded-lg p-4">
              <div className="flex justify-center mb-4">
                <img 
                  src={pelicanClubHeader} 
                  alt="Pelican Club" 
                  className="max-w-full h-auto"
                  style={{ maxHeight: '50px' }}
                />
              </div>
              <div className="space-y-3">
              <p>Welcome to Pelican Club. The Indie Band that will change your life.</p>
              <p>So what is Pelican Club?</p>
              <p>We're glad you asked.</p>
              <p>Pelican Club is a dream, a notion, an idea.</p>
              <p>Amidst the rhythmic waves and the swaying palms, Pelican Club was born.</p>
              <p>The cosmology of the west coast sound are the constellations of Pelican Club's music, tracing the California influences of The Doobie Brothers, Steely Dan, and Boz Scaggs, among others. The songs don't stop there, though, pairing together sounds from indie rock it-boys such as Mac DeMarco and Brazilian pop music a la Chico Buarque to form a unique, homegrown identity.</p>
              <p>The root of it all is fantasy, expectation, and desire, pulling imagery from Vaporwave and Japanese advertisements for a cosmic meditation on the swirling maelstrom of consumerism and internet escapism we all take part in.</p>
              </div>
            </div>
          </div>
        );
      
      case 'streaming':
        return (
          <div className="p-4 overflow-auto">
            <div className="bg-[#FFFEF9] border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] rounded-lg p-4">
              <h2 className="text-center mb-6">Listen on Your Favorite Platform</h2>
              <div className="grid grid-cols-2 gap-4">
              <a
                href="https://open.spotify.com/artist/7rXfdsGqTE4N0UVd3hedst?si=XLH4hWaKQfqvXvO_TcXn2g"
                target="_blank"
                rel="noopener noreferrer"
                className="flex flex-col items-center gap-2 p-4 hover:bg-gray-100 rounded transition-colors"
              >
                <SpotifyIcon />
                <span className="text-sm">Spotify</span>
              </a>
              <a
                href="https://music.apple.com/us/artist/pelican-club/1585068539"
                target="_blank"
                rel="noopener noreferrer"
                className="flex flex-col items-center gap-2 p-4 hover:bg-gray-100 rounded transition-colors"
              >
                <AppleMusicIcon />
                <span className="text-sm">Apple Music</span>
              </a>
              <a
                href="https://music.amazon.com/artists/B09KQ5QN4H/pelican-club"
                target="_blank"
                rel="noopener noreferrer"
                className="flex flex-col items-center gap-2 p-4 hover:bg-gray-100 rounded transition-colors"
              >
                <AmazonMusicIcon />
                <span className="text-sm">Amazon Music</span>
              </a>
              <a
                href="https://tidal.com/browse/artist/28821374"
                target="_blank"
                rel="noopener noreferrer"
                className="flex flex-col items-center gap-2 p-4 hover:bg-gray-100 rounded transition-colors"
              >
                <TidalIcon />
                <span className="text-sm">Tidal</span>
              </a>
              <a
                href="https://pelicanclub.bandcamp.com"
                target="_blank"
                rel="noopener noreferrer"
                className="flex flex-col items-center gap-2 p-4 hover:bg-gray-100 rounded transition-colors"
              >
                <BandcampIcon />
                <span className="text-sm">Bandcamp</span>
              </a>
              <a
                href="https://www.qobuz.com/us-en/interpreter/pelican-club/19167071"
                target="_blank"
                rel="noopener noreferrer"
                className="flex flex-col items-center gap-2 p-4 hover:bg-gray-100 rounded transition-colors"
              >
                <QobuzIcon />
                <span className="text-sm">Qobuz</span>
              </a>
              <a
                href="https://music.youtube.com/channel/UCkiYVZmEdkjvvMRQF5BJIKw"
                target="_blank"
                rel="noopener noreferrer"
                className="flex flex-col items-center gap-2 p-4 hover:bg-gray-100 rounded transition-colors"
              >
                <YouTubeMusicIcon />
                <span className="text-sm">YouTube Music</span>
              </a>
              <a
                href="https://www.instagram.com/pelicanclub"
                target="_blank"
                rel="noopener noreferrer"
                className="flex flex-col items-center gap-2 p-4 hover:bg-gray-100 rounded transition-colors"
              >
                <InstagramIcon />
                <span className="text-sm">Instagram</span>
              </a>
              </div>
            </div>
          </div>
        );
      
      case 'mailing':
        return (
          <div className="p-4 overflow-auto">
            <div className="bg-[#FFFEF9] border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] rounded-lg p-4">
              <h2 className="text-center mb-6">Join The Mailing List</h2>
              <MailchimpForm />
            </div>
          </div>
        );
      
      case 'about':
        return (
          <div className="p-4 overflow-auto">
            <div className="bg-[#FFFEF9] border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] rounded-lg p-4">
              <AboutOS />
            </div>
          </div>
        );
      
      default:
        return null;
    }
  };

  return (
    <div className="h-screen flex flex-col marble-bg">
      <MobileNav currentSection={currentSection} onSectionChange={setCurrentSection} />
      <div className="flex-1 overflow-auto">
        {renderContent()}
      </div>
    </div>
  );
}
