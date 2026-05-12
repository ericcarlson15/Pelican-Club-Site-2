import { Music, Video, HardDrive, Radio, Mail, Info } from 'lucide-react';

interface MobileNavProps {
  currentSection: string;
  onSectionChange: (section: string) => void;
}

export function MobileNav({ currentSection, onSectionChange }: MobileNavProps) {
  const navItems = [
    { id: 'music', icon: Music, label: 'Music' },
    { id: 'videos', icon: Video, label: 'Videos' },
    { id: 'bio', icon: HardDrive, label: 'Bio' },
    { id: 'streaming', icon: Radio, label: 'Streaming' },
    { id: 'mailing', icon: Mail, label: 'Mailing List' },
    { id: 'about', icon: Info, label: 'About' },
  ];

  return (
    <div className="bg-[#FFFEF9] border-b-4 border-black p-2 flex justify-around items-center">
      {navItems.map((item) => {
        const Icon = item.icon;
        return (
          <button
            key={item.id}
            onClick={() => onSectionChange(item.id)}
            className={`flex flex-col items-center gap-1 p-2 rounded transition-colors ${
              currentSection === item.id ? 'bg-[#FFB6C1]' : 'hover:bg-gray-100'
            }`}
          >
            <Icon size={20} />
            <span className="text-xs">{item.label}</span>
          </button>
        );
      })}
    </div>
  );
}
