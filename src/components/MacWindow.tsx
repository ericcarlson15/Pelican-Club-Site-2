import { useState, useEffect } from 'react';

interface MacWindowProps {
  title: string;
  children: React.ReactNode;
  initialX?: number;
  initialY?: number;
  width?: number;
  height?: number;
  onClose?: () => void;
}

export function MacWindow({ 
  title, 
  children, 
  initialX = 100, 
  initialY = 100,
  width = 400,
  height = 300,
  onClose
}: MacWindowProps) {
  // Constrain initial position to viewport - be more lenient with bounds
  const constrainPosition = (x: number, y: number) => {
    const minX = 20;
    const minY = 80; // Below date tab area
    const maxX = Math.max(minX, window.innerWidth - 250); // Leave at least 250px visible
    const maxY = Math.max(minY, window.innerHeight - 100); // Leave at least 100px visible
    
    return {
      x: Math.max(minX, Math.min(x, maxX)),
      y: Math.max(minY, Math.min(y, maxY))
    };
  };

  const [position, setPosition] = useState(constrainPosition(initialX, initialY));
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    setDragStart({
      x: e.clientX - position.x,
      y: e.clientY - position.y
    });
    e.preventDefault();
  };

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (isDragging) {
        const newX = e.clientX - dragStart.x;
        const newY = e.clientY - dragStart.y;
        setPosition(constrainPosition(newX, newY));
      }
    };

    const handleMouseUp = () => {
      setIsDragging(false);
    };

    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
      
      return () => {
        document.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mouseup', handleMouseUp);
      };
    }
  }, [isDragging, dragStart]);

  return (
    <div
      className="absolute"
      style={{
        left: position.x,
        top: position.y,
        width: `${width}px`,
        height: `${height}px`,
      }}
    >
      <div
        className="size-full bg-[#FFFEF9] border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] rounded-lg flex flex-col"
      >
        {/* Title Bar */}
        <div 
          className="h-10 bg-[#FFFEF9] border-b-4 border-black flex items-center justify-between px-3 cursor-move select-none shrink-0 rounded-t-md"
          onMouseDown={handleMouseDown}
        >
          <span className="italic" style={{ 
            fontFamily: 'Garamond, serif',
            imageRendering: 'pixelated',
            WebkitFontSmoothing: 'none',
            MozOsxFontSmoothing: 'grayscale',
          }}>{title}</span>
          <button 
            className="w-6 h-6 bg-black text-white hover:bg-gray-800 transition-colors flex items-center justify-center text-lg leading-none"
            onClick={onClose}
          >
            ×
          </button>
        </div>
        
        {/* Content */}
        <div className="p-4 flex-1 overflow-auto bg-[#FFFEF9] rounded-b-md">
          {children}
        </div>
      </div>
    </div>
  );
}