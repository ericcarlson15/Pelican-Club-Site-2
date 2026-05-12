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
      className={`flex flex-col items-center gap-1 p-2 w-20 transition-all ${
        selected ? 'bg-[#D4B5FF] border-2 border-black' : 'hover:bg-white/50'
      }`}
      onClick={() => setSelected(!selected)}
      onDoubleClick={onDoubleClick}
    >
      <div className="w-12 h-12 flex items-center justify-center">
        {icon}
      </div>
      <span className="text-xs text-center break-words text-black">
        {label}
      </span>
    </button>
  );
}