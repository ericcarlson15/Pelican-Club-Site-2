import { useState, useRef, useEffect } from 'react';
import { Play, Pause, SkipBack, SkipForward } from 'lucide-react';
import mp3PlayerHeader from 'figma:asset/96293e1f6ec42733c757642eeed961855e96feb0.png';

const playlist = [
  { 
    title: "Staring At The Sun", 
    artist: "Pelican Club", 
    url: "https://archive.org/download/staring-at-the-sun-city-love/Staring%20at%20the%20Sun%20%28City%20Love%29.mp3"
  },
  { 
    title: "Turn My TV On", 
    artist: "Pelican Club", 
    url: "https://archive.org/download/pelican-club-turn-my-tv-on/Pelican%20Club%20-%20Turn%20My%20TV%20On.mp3"
  },
  { 
    title: "Modern Languages (feat. Modern Languages)", 
    artist: "Pelican Club", 
    url: "https://archive.org/download/modern-languages/Modern%20Languages.mp3"
  },
  { 
    title: "Call Waiting", 
    artist: "Pelican Club", 
    url: "https://archive.org/download/call-waiting/Call%20Waiting.mp3"
  },
  { 
    title: "Archipelago (Remix)", 
    artist: "Pelican Club", 
    url: "https://archive.org/download/archipelago-remix/Archipelago%20%28Remix%29.mp3"
  },
];

export function AudioPlayer() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTrack, setCurrentTrack] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(70);
  const [error, setError] = useState<string | null>(null);
  const audioRef = useRef<HTMLAudioElement>(null);

  const track = playlist[currentTrack];

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume / 100;
    }
  }, [volume]);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.load();
      setError(null);
      if (isPlaying) {
        audioRef.current.play().catch(() => {
          setError('Unable to load audio. The track may be unavailable.');
          setIsPlaying(false);
        });
      }
    }
  }, [currentTrack]);

  useEffect(() => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.play().catch(() => {
          setError('Unable to play audio. Please try another track.');
          setIsPlaying(false);
        });
      } else {
        audioRef.current.pause();
      }
    }
  }, [isPlaying]);

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      setCurrentTime(audioRef.current.currentTime);
    }
  };

  const handleLoadedMetadata = () => {
    if (audioRef.current) {
      setDuration(audioRef.current.duration);
    }
  };

  const handleEnded = () => {
    handleNext();
  };

  const handleError = () => {
    setError('Unable to load audio. The track may be unavailable.');
    setIsPlaying(false);
  };

  const handlePlayPause = async () => {
    if (!isPlaying && audioRef.current) {
      try {
        setError(null);
        await audioRef.current.play();
        setIsPlaying(true);
      } catch (err) {
        setError('Unable to play audio. Please try another track.');
        setIsPlaying(false);
      }
    } else {
      setIsPlaying(false);
    }
  };

  const handlePrevious = () => {
    setCurrentTrack((prev) => (prev - 1 + playlist.length) % playlist.length);
    setCurrentTime(0);
  };

  const handleNext = () => {
    setCurrentTrack((prev) => (prev + 1) % playlist.length);
    setCurrentTime(0);
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newTime = Number(e.target.value);
    setCurrentTime(newTime);
    if (audioRef.current) {
      audioRef.current.currentTime = newTime;
    }
  };

  const formatTime = (seconds: number) => {
    if (!seconds || isNaN(seconds)) return '0:00';
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="flex flex-col gap-4 p-2">
      {/* Hidden Audio Element */}
      <audio
        ref={audioRef}
        src={track.url}
        onTimeUpdate={handleTimeUpdate}
        onLoadedMetadata={handleLoadedMetadata}
        onEnded={handleEnded}
        onError={handleError}
        crossOrigin="anonymous"
      />

      {/* MP3 Player Header */}
      <div className="bg-[#FFB6C1] border-2 border-black p-4 flex justify-center">
        <img 
          src={mp3PlayerHeader} 
          alt="Pelican Club Mp3 Player" 
          className="max-w-full h-auto"
          style={{ maxHeight: '60px' }}
        />
      </div>

      {/* Display */}
      <div className="bg-[#9FE5A0] border-2 border-black p-3 font-mono">
        {error ? (
          <div className="text-red-600 text-sm">{error}</div>
        ) : (
          <>
            <div className="mb-1">{track.title}</div>
            <div className="text-sm opacity-70">{track.artist}</div>
            <div className="mt-2 flex justify-between text-sm">
              <span>{formatTime(currentTime)}</span>
              <span>{formatTime(duration)}</span>
            </div>
          </>
        )}
      </div>

      {/* Progress Bar */}
      <div className="bg-white border-2 border-black h-6 relative overflow-hidden">
        <div 
          className="bg-[#FFB6C1] h-full transition-all duration-100"
          style={{ width: `${duration ? (currentTime / duration) * 100 : 0}%` }}
        />
        <input
          type="range"
          min="0"
          max={duration || 0}
          value={currentTime}
          onChange={handleSeek}
          className="absolute inset-0 w-full opacity-0 cursor-pointer"
        />
      </div>

      {/* Controls */}
      <div className="flex items-center justify-center gap-2">
        <button
          onClick={handlePrevious}
          className="w-12 h-12 bg-[#B4D7FF] border-2 border-black hover:bg-[#9AC5EE] active:translate-y-0.5 flex items-center justify-center"
        >
          <SkipBack size={20} fill="black" />
        </button>
        <button
          onClick={handlePlayPause}
          className="w-16 h-16 bg-[#FFB6C1] border-2 border-black hover:bg-[#FF9FB0] active:translate-y-0.5 flex items-center justify-center"
        >
          {isPlaying ? <Pause size={24} fill="black" /> : <Play size={24} fill="black" />}
        </button>
        <button
          onClick={handleNext}
          className="w-12 h-12 bg-[#B4D7FF] border-2 border-black hover:bg-[#9AC5EE] active:translate-y-0.5 flex items-center justify-center"
        >
          <SkipForward size={20} fill="black" />
        </button>
      </div>

      {/* Volume */}
      <div className="flex items-center gap-2">
        <span className="text-sm">Vol:</span>
        <div className="flex-1 bg-white border-2 border-black h-6 relative">
          <div 
            className="bg-[#D4B5FF] h-full"
            style={{ width: `${volume}%` }}
          />
          <input
            type="range"
            min="0"
            max="100"
            value={volume}
            onChange={(e) => setVolume(Number(e.target.value))}
            className="absolute inset-0 w-full opacity-0 cursor-pointer"
          />
        </div>
        <span className="text-sm w-8">{volume}</span>
      </div>

      {/* Playlist */}
      <div className="bg-white border-2 border-black p-2 max-h-32 overflow-auto">
        <div className="text-sm mb-1">Playlist:</div>
        {playlist.map((item, index) => (
          <button
            key={index}
            onClick={() => {
              setCurrentTrack(index);
              setCurrentTime(0);
              setIsPlaying(true);
            }}
            className={`w-full text-left px-2 py-1 text-sm hover:bg-[#FFE5B4] ${
              currentTrack === index ? 'bg-[#D4B5FF]' : ''
            }`}
          >
            {index + 1}. {item.title} - {item.artist}
          </button>
        ))}
      </div>
    </div>
  );
}
