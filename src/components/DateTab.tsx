import sodaCanIcon from 'figma:asset/bdacbb8efdcfaf864d9d40a0cc702a4444c33bf4.png';

interface DateTabProps {
  onAboutClick: () => void;
  onMailingListClick: () => void;
  onWallpaperClick: () => void;
}

export function DateTab({ onAboutClick, onMailingListClick, onWallpaperClick }: DateTabProps) {
  const date = new Date();
  const options: Intl.DateTimeFormatOptions = { 
    weekday: 'long', 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  };
  const dateString = date.toLocaleDateString('en-US', options);

  return (
    <div className="top-tab-strip">
      <button 
        className="top-tab top-tab-home"
        onClick={onAboutClick}
        title="About PelicanClubOS"
      >
        <img src={sodaCanIcon} alt="Pacific Dreams" className="object-contain" />
      </button>
      <div className="top-tab top-tab-text">
        <span className="text-sm italic whitespace-nowrap" style={{ 
          fontFamily: 'Garamond, serif',
          fontWeight: 600,
          imageRendering: 'pixelated',
          WebkitFontSmoothing: 'none',
          MozOsxFontSmoothing: 'grayscale',
        }}>{dateString}</span>
      </div>
      <button 
        className="top-tab top-tab-text"
        onClick={onMailingListClick}
      >
        <span className="text-sm italic whitespace-nowrap" style={{ 
          fontFamily: 'Garamond, serif',
          fontWeight: 600,
          imageRendering: 'pixelated',
          WebkitFontSmoothing: 'none',
          MozOsxFontSmoothing: 'grayscale',
        }}>Join The Mailing List</span>
      </button>
      <button 
        className="top-tab top-tab-text"
        onClick={onWallpaperClick}
      >
        <span className="text-sm italic whitespace-nowrap" style={{ 
          fontFamily: 'Garamond, serif',
          fontWeight: 600,
          imageRendering: 'pixelated',
          WebkitFontSmoothing: 'none',
          MozOsxFontSmoothing: 'grayscale',
        }}>Wallpaper</span>
      </button>
    </div>
  );
}
