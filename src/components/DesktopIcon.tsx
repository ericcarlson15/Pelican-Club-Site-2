import { useState } from 'react';

interface DesktopIconProps {
  icon: React.ReactNode;
  label: string;
  onDoubleClick?: () => void;
}

export function DesktopIcon({ icon, label, onDoubleClick }: DesktopIconProps) {
  const [selected, setSelected] = useState(false);

  return (
    <button
      className={`desktop-icon-tile flex flex-col items-center gap-1 transition-all ${
        selected ? 'bg-[#D4B5FF]' : 'hover:bg-white'
      }`}
      onClick={() => setSelected(!selected)}
      onDoubleClick={onDoubleClick}
    >
      <div className="desktop-icon-art w-12 h-12 flex items-center justify-center">
        {icon}
      </div>
      <span className="desktop-icon-label text-xs text-center break-words text-black">
        {label}
      </span>
    </button>
  );
}
