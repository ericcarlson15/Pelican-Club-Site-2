import { useState, useEffect } from 'react';
import { DateTab } from './components/DateTab';
import { DesktopIcon } from './components/DesktopIcon';
import { MacWindow } from './components/MacWindow';
import { AudioPlayer } from './components/AudioPlayer';
import { MailchimpForm } from './components/MailchimpForm';
import { AboutOS } from './components/AboutOS';
import { MobileView } from './components/MobileView';
import { HardDriveIcon, DocumentIcon, VideoIcon, MusicIcon, PelicanIcon, InstagramIcon as InstagramDesktopIcon, MerchIcon } from './components/PixelIcons';
import { SpotifyIcon, AppleMusicIcon, AmazonMusicIcon, TidalIcon, BandcampIcon, QobuzIcon, YouTubeMusicIcon, InstagramIcon } from './components/StreamingIcons';
import clubLinksImage from 'figma:asset/b221501d42a2955f41798a40054419c9f1bc29b2.png';
import pelicanClubHeader from 'figma:asset/162c82ac08ae5ab345c17d141ec5bbfffc5b3836.png';
import pelicanClubFilmsHeader from 'figma:asset/7e4bfc54b0d4688d9666622ac8c7c478873e3096.png';
import pelicanMemberImageBlue from 'figma:asset/f1a5abaebda838b0ec877b5e31ddddda969b182c.png';
import pelicanMemberImagePink from 'figma:asset/579de5ffd535f61b758f2b36fe174e0b7a68f4e2.png';
import pelicanOSLogo from 'figma:asset/8cd4d39790de8d33778d9d345d9c0bba09b12f74.png';
import sodaCanIcon from 'figma:asset/bdacbb8efdcfaf864d9d40a0cc702a4444c33bf4.png';
import { MerchWindow } from './components/MerchWindow';

export default function App() {
  const [isMobile, setIsMobile] = useState(false);
  const [windows, setWindows] = useState<Array<{ id: number; title: string; content: string; isAudioPlayer?: boolean; isCustomContent?: boolean; zIndex: number }>>([]);
  const [nextId, setNextId] = useState(1);
  const [nextZIndex, setNextZIndex] = useState(1000);
  const [activeWindowId, setActiveWindowId] = useState<number | null>(null);
  const [welcomeDismissed, setWelcomeDismissed] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Set favicon and title
useEffect(() => {
  const link = (document.querySelector("link[rel*='icon']") || document.createElement('link')) as HTMLLinkElement;
  
  link.type = 'image/png';
  link.rel = 'icon';
  link.href = sodaCanIcon;
  document.head.appendChild(link);

  // Also set the page title
  document.title = 'PelicanClubOS';
}, []);

  // Open initial windows on load
  useEffect(() => {
    if (!isMobile && windows.length === 0) {
      // Open Discover Pelican Club
      setWindows([
        { 
          id: 1, 
          title: 'Discover Pelican Club', 
          content: '', 
          isCustomContent: true, 
          zIndex: 1000 
        },
        { 
          id: 2, 
          title: 'Pelican Club Player', 
          content: '', 
          isAudioPlayer: true, 
          zIndex: 1001 
        }
      ]);
      setNextId(3);
      setNextZIndex(1002);
      setActiveWindowId(2);
      setWelcomeDismissed(true);
    }
  }, [isMobile]);

  if (isMobile) {
    return <MobileView />;
  }

  console.log('Current windows:', windows.length, 'Next ID:', nextId);

  // Define specific positions for each window type
  const windowPositions: Record<string, { x: number; y: number }> = {
    'Pelican Club HD': { x: 100, y: 120 },
    'Discover Pelican Club': { x: 600, y: 120 },
    'ReadMe': { x: 200, y: 160 },
    'Pelican Club Player': { x: 80, y: 120 },
    'Videos': { x: 180, y: 120 },
    'About PelicanClubOS': { x: 160, y: 120 },
    'Join The Mailing List': { x: 140, y: 150 },
    'Merch': { x: 220, y: 140 }
  };

  const openWindow = (title: string, content: string) => {
    // Check if window already exists
    const existingWindow = windows.find(w => w.title === title);
    if (existingWindow) {
      bringToFront(existingWindow.id);
      return;
    }
    
    const newId = nextId;
    const newZIndex = nextZIndex;
    setWindows(prevWindows => [...prevWindows, { id: newId, title, content, zIndex: newZIndex }]);
    setActiveWindowId(newId);
    setNextId(prevId => prevId + 1);
    setNextZIndex(prevZ => prevZ + 1);
  };

  const openAudioPlayer = () => {
    // Check if window already exists
    const existingWindow = windows.find(w => w.title === 'Pelican Club Player');
    if (existingWindow) {
      bringToFront(existingWindow.id);
      return;
    }
    
    const newId = nextId;
    const newZIndex = nextZIndex;
    setWindows(prevWindows => [...prevWindows, { id: newId, title: 'Pelican Club Player', content: '', isAudioPlayer: true, zIndex: newZIndex }]);
    setActiveWindowId(newId);
    setNextId(prevId => prevId + 1);
    setNextZIndex(prevZ => prevZ + 1);
  };

  const openCustomWindow = (title: string) => {
    // Check if window already exists
    const existingWindow = windows.find(w => w.title === title);
    if (existingWindow) {
      bringToFront(existingWindow.id);
      return;
    }
    
    const newId = nextId;
    const newZIndex = nextZIndex;
    setWindows(prevWindows => [...prevWindows, { id: newId, title, content: '', isCustomContent: true, zIndex: newZIndex }]);
    setActiveWindowId(newId);
    setNextId(prevId => prevId + 1);
    setNextZIndex(prevZ => prevZ + 1);
  };

  const closeWindow = (id: number) => {
    setWindows(prevWindows => prevWindows.filter(w => w.id !== id));
    if (activeWindowId === id) {
      setActiveWindowId(null);
    }
  };

  const bringToFront = (id: number) => {
    setActiveWindowId(id);
    const newZIndex = nextZIndex;
    setWindows(prevWindows => 
      prevWindows.map(w => 
        w.id === id ? { ...w, zIndex: newZIndex } : w
      )
    );
    setNextZIndex(prevZ => prevZ + 1);
  };

  return (
    <div className="w-full h-screen flex flex-col marble-bg relative overflow-hidden">
      {/* Date Tab */}
      <DateTab 
        onAboutClick={() => {
          console.log('Opening About');
          openCustomWindow('About PelicanClubOS');
        }}
        onMailingListClick={() => {
          console.log('Opening Mailing List');
          openCustomWindow('Join The Mailing List');
        }}
      />
      
      {/* Desktop Area */}
      <div className="flex-1 relative p-4">
        {/* Desktop Icons */}
        <div className="flex flex-col gap-2 absolute top-4 right-4">
          <DesktopIcon
            icon={<HardDriveIcon />}
            label="Pelican Club HD"
            onDoubleClick={() => {
              console.log('Opening Pelican Club HD');
              openWindow('Pelican Club HD', `Welcome to Pelican Club. The Indie Band that will change your life.

So what is Pelican Club?

We're glad you asked.

Pelican Club is a dream, a notion, an idea.

Amidst the rhythmic waves and the swaying palms, Pelican Club was born.

The cosmology of the west coast sound are the constellations of Pelican Club's music, tracing the California influences of The Doobie Brothers, Steely Dan, and Boz Scaggs, among others. The songs don't stop there, though, pairing together sounds from indie rock it-boys such as Mac DeMarco and Brazilian pop music a la Chico Buarque to form a unique, homegrown identity.


The root of it all is fantasy, expectation, and desire, pulling imagery from Vaporwave and Japanese advertisements for a cosmic meditation on the swirling maelstrom of consumerism and internet escapism we all take part in.`);
            }}
          />
          <DesktopIcon
            icon={<PelicanIcon />}
            label="Discover Pelican Club"
            onDoubleClick={() => {
              console.log('Opening Discover Pelican Club');
              openCustomWindow('Discover Pelican Club');
            }}
          />
          <DesktopIcon
            icon={<MusicIcon />}
            label="Pelican Club Player"
            onDoubleClick={() => {
              console.log('Opening Audio Player');
              openAudioPlayer();
            }}
          />
          <DesktopIcon
            icon={<VideoIcon />}
            label="Videos"
            onDoubleClick={() => {
              console.log('Opening Videos');
              openCustomWindow('Videos');
            }}
          />
          <DesktopIcon
            icon={<InstagramDesktopIcon />}
            label="Instagram"
            onDoubleClick={() => {
              console.log('Opening Instagram link');
              window.open('https://www.instagram.com/pelicanclubandspa/', '_blank');
            }}
          />
          <DesktopIcon
            icon={<MerchIcon />}
            label="Merch"
            onDoubleClick={() => {
              openCustomWindow('Merch');
  }}
          />
          <DesktopIcon
            icon={<DocumentIcon />}
            label="ReadMe"
            onDoubleClick={() => {
              console.log('Opening ReadMe');
              openWindow('ReadMe', 'Welcome to the Pelican Club Macintosh experience!\n\nThis is a tribute to the beloved Mac OS interface from the 1990s. Double-click icons to open windows, and drag windows by their title bars.\n\nEnjoy this nostalgic trip back in time!');
            }}
          />
        </div>

        {/* Render all open windows */}
        {windows.map((window) => {
          const position = windowPositions[window.title] || { x: 100, y: 100 };
          const isActive = activeWindowId === window.id;
          
          return (
            <div 
              key={window.id}
              style={{ zIndex: window.zIndex }}
              onClick={() => bringToFront(window.id)}
            >
              <MacWindow
                title={window.title}
                initialX={position.x}
                initialY={position.y}
                width={
                  window.title === 'Videos' ? 600 : 
                  window.title === 'Pelican Club Player' ? 420 : 
                  window.title === 'Discover Pelican Club' ? 500 : 
                  window.title === 'About PelicanClubOS' ? 550 :
                  window.title === 'Join The Mailing List' ? 450 :
                  window.title === 'Merch' ? 620 : 
                  450
                }
                height={
                  window.title === 'Videos' ? 550 : 
                  window.title === 'Pelican Club Player' ? 650 : 
                  window.title === 'About PelicanClubOS' ? 700 :
                  window.title === 'Join The Mailing List' ? 500 :
                  window.title === 'Merch' ? 620 :
                  350
                }
                onClose={() => closeWindow(window.id)}
              >
            {window.isAudioPlayer ? (
              <AudioPlayer />
            ) : window.isCustomContent && window.title === 'Merch' ? (
              <MerchWindow />
            ) : window.isCustomContent && window.title === 'About PelicanClubOS' ? (
              <AboutOS onJoinClick={() => openCustomWindow('Join The Mailing List')} />
            ) : window.isCustomContent && window.title === 'Join The Mailing List' ? (
              <MailchimpForm />
            ) : window.isCustomContent && window.title === 'Discover Pelican Club' ? (
              <div className="space-y-4">
                <div className="flex justify-center mb-4">
                  <img 
                    src={clubLinksImage} 
                    alt="Club Links" 
                    className="max-w-full h-auto"
                    style={{ maxHeight: '60px' }}
                  />
                </div>
                <div className="grid grid-cols-2 gap-4 mt-4">
                  <a 
                    href="https://open.spotify.com/artist/0SKkdsp0HFsN6wkYgXWpWe?si=F7O0fsPvR5WfijrlLFGpmQ" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex flex-col items-center gap-2 p-2 hover:bg-gray-100 rounded transition-colors"
                  >
                    <SpotifyIcon />
                    <span className="text-sm">Spotify</span>
                  </a>
                  <a 
                    href="https://music.apple.com/us/artist/pelican-club/1631362781" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex flex-col items-center gap-2 p-2 hover:bg-gray-100 rounded transition-colors"
                  >
                    <AppleMusicIcon />
                    <span className="text-sm">Apple Music</span>
                  </a>
                  <a 
                    href="https://www.amazon.com/music/player/artists/B0B4XFQ51S/pelican-club" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex flex-col items-center gap-2 p-2 hover:bg-gray-100 rounded transition-colors"
                  >
                    <AmazonMusicIcon />
                    <span className="text-sm">Amazon Music</span>
                  </a>
                  <a 
                    href="https://tidal.com/artist/32865150" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex flex-col items-center gap-2 p-2 hover:bg-gray-100 rounded transition-colors"
                  >
                    <TidalIcon />
                    <span className="text-sm">Tidal</span>
                  </a>
                  <a 
                    href="https://pelicanclub.bandcamp.com/" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex flex-col items-center gap-2 p-2 hover:bg-gray-100 rounded transition-colors"
                  >
                    <BandcampIcon />
                    <span className="text-sm">Bandcamp</span>
                  </a>
                  <a 
                    href="https://www.qobuz.com/us-en/interpreter/pelican-club/21857603" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex flex-col items-center gap-2 p-2 hover:bg-gray-100 rounded transition-colors"
                  >
                    <QobuzIcon />
                    <span className="text-sm">Qobuz</span>
                  </a>
                  <a 
                    href="https://music.youtube.com/channel/UCmK3PJOgCLKU1S-iS3MH1iQ" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex flex-col items-center gap-2 p-2 hover:bg-gray-100 rounded transition-colors"
                  >
                    <YouTubeMusicIcon />
                    <span className="text-sm">YouTube Music</span>
                  </a>
                  <a 
                    href="https://www.instagram.com/pelicanclubandspa/" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex flex-col items-center gap-2 p-2 hover:bg-gray-100 rounded transition-colors"
                  >
                    <InstagramIcon />
                    <span className="text-sm">Instagram</span>
                  </a>
                </div>
              </div>
            ) : window.isCustomContent && window.title === 'Videos' ? (
              <div className="space-y-4">
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
            ) : (
              <div>
                {window.title === 'Pelican Club HD' && (
                  <div className="flex justify-center mb-4">
                    <img 
                      src={pelicanClubHeader} 
                      alt="Pelican Club" 
                      className="max-w-full h-auto"
                      style={{ maxHeight: '50px' }}
                    />
                  </div>
                )}
                {window.title === 'ReadMe' ? (
                  <div>
                    <div className="flex justify-center mb-4">
                      <img 
                        src={pelicanOSLogo} 
                        alt="PelicanOS" 
                        className="max-w-full h-auto"
                        style={{ maxHeight: '80px' }}
                      />
                    </div>
                    <div className="flex gap-4">
                      <p className="flex-1" style={{ whiteSpace: 'pre-wrap' }}>{window.content}</p>
                      <div className="w-1/3 flex-shrink-0">
                        <img 
                          src={pelicanMemberImagePink} 
                          alt="Pelican Club Member" 
                          className="w-full h-full object-cover"
                          style={{ 
                            imageRendering: 'pixelated',
                          }}
                        />
                      </div>
                    </div>
                  </div>
                ) : window.title === 'Pelican Club HD' ? (
                  <div>
                    <div className="flex gap-4 mb-4">
                      <div className="flex-1">
                        <p style={{ whiteSpace: 'pre-wrap' }}>
                          {`Welcome to Pelican Club. The Indie Band that will change your life.

So what is Pelican Club?

We're glad you asked.

Pelican Club is a dream, a notion, an idea.`}
                        </p>
                      </div>
                      <div className="w-1/3 flex-shrink-0">
                        <img 
                          src={pelicanMemberImageBlue} 
                          alt="Pelican Club Member" 
                          className="w-full h-full object-cover"
                          style={{ 
                            imageRendering: 'pixelated',
                          }}
                        />
                      </div>
                    </div>
                    <p style={{ whiteSpace: 'pre-wrap' }}>
                      {`
Amidst the rhythmic waves and the swaying palms, Pelican Club was born.

The cosmology of the west coast sound are the constellations of Pelican Club's music, tracing the California influences of The Doobie Brothers, Steely Dan, and Boz Scaggs, among others. The songs don't stop there, though, pairing together sounds from indie rock it-boys such as Mac DeMarco and Brazilian pop music a la Chico Buarque to form a unique, homegrown identity.


The root of it all is fantasy, expectation, and desire, pulling imagery from Vaporwave and Japanese advertisements for a cosmic meditation on the swirling maelstrom of consumerism and internet escapism we all take part in.`}
                    </p>
                  </div>
                ) : (
                  <p style={{ whiteSpace: 'pre-wrap' }}>{window.content}</p>
                )}
              </div>
            )}
            </MacWindow>
            </div>
          );
        })}

        {/* Welcome Window on Load */}
        {windows.length === 0 && !welcomeDismissed && (
          <div style={{ zIndex: 1 }}>
            <MacWindow
              title="Welcome"
              initialX={120}
              initialY={120}
              width={500}
              height={280}
              onClose={() => setWelcomeDismissed(true)}
            >
            <div className="space-y-4">
              <h2>Welcome to Classic Mac OS</h2>
              <p>
                Experience the nostalgia of the original Macintosh operating system.
              </p>
              <p>
                <strong>Tips:</strong>
              </p>
              <ul className="list-disc list-inside space-y-1">
                <li>Double-click desktop icons to open windows</li>
                <li>Drag windows by their striped title bars</li>
                <li>Click the small box in the top-left to close windows</li>
                <li>Single-click icons to select them</li>
              </ul>
              <p className="mt-4">
                Double-click the icons on the right to get started!
              </p>
            </div>
            </MacWindow>
          </div>
        )}
      </div>
    </div>
  );
}
