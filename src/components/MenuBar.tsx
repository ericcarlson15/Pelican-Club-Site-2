export function MenuBar() {
  const currentTime = new Date().toLocaleTimeString('en-US', { 
    hour: 'numeric', 
    minute: '2-digit',
    hour12: true 
  });

  return (
    <div className="h-8 bg-[#D4B5FF] border-b-2 border-black flex items-center px-2 justify-between">
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-1">
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M15.5 8.5C15.5 8.5 14 4 10 4C10 4 11 2 13 2C13 2 16 2.5 15.5 8.5Z" fill="black"/>
            <path d="M10 4C6.5 4 4 6.5 4 10C4 13.5 6.5 16 10 16C11 16 11.8 15.8 12.5 15.5C11.5 14.5 11 13 11 11.5C11 9 12.5 7 14.5 6.5C13.5 5 11.8 4 10 4Z" fill="black"/>
          </svg>
        </div>
        <div className="flex items-center gap-3">
          <button className="px-2 hover:bg-black hover:text-white transition-colors">File</button>
          <button className="px-2 hover:bg-black hover:text-white transition-colors">Edit</button>
          <button className="px-2 hover:bg-black hover:text-white transition-colors">View</button>
          <button className="px-2 hover:bg-black hover:text-white transition-colors">Special</button>
          <button className="px-2 hover:bg-black hover:text-white transition-colors">Help</button>
        </div>
      </div>
      <div className="flex items-center gap-2">
        <span>{currentTime}</span>
      </div>
    </div>
  );
}