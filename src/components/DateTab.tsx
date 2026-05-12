import sodaCanIcon from 'figma:asset/bdacbb8efdcfaf864d9d40a0cc702a4444c33bf4.png';

interface DateTabProps {
  onAboutClick: () => void;
  onMailingListClick: () => void;
}

export function DateTab({ onAboutClick, onMailingListClick }: DateTabProps) {
  const date = new Date();
  const options: Intl.DateTimeFormatOptions = { 
    weekday: 'long', 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  };
  const dateString = date.toLocaleDateString('en-US', options);

  return (
    <div className="absolute top-4 left-4 flex gap-4 items-center z-[2000]">
      <button 
        className="bg-white border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] p-2.5 hover:bg-gray-100 transition-colors flex items-center justify-center h-[64px] w-[64px]"
        onClick={onAboutClick}
        title="About PelicanClubOS"
      >
        <img src={sodaCanIcon} alt="Pacific Dreams" className="w-9 h-9 object-contain" />
      </button>
      <div className="bg-white border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] px-4 py-3 flex items-center h-[64px]">
        <span className="text-sm italic" style={{ 
          fontFamily: 'Garamond, serif',
          fontWeight: 600,
          imageRendering: 'pixelated',
          WebkitFontSmoothing: 'none',
          MozOsxFontSmoothing: 'grayscale',
        }}>{dateString}</span>
      </div>
      <button 
        className="bg-white border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] px-4 py-3 hover:bg-gray-100 transition-colors flex items-center h-[64px]"
        onClick={onMailingListClick}
      >
        <span className="text-sm italic" style={{ 
          fontFamily: 'Garamond, serif',
          fontWeight: 600,
          imageRendering: 'pixelated',
          WebkitFontSmoothing: 'none',
          MozOsxFontSmoothing: 'grayscale',
        }}>Join The Mailing List</span>
      </button>
    </div>
  );
}