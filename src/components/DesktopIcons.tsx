import React from 'react';
import { User, Folder, Code, Terminal, FolderOpen, Mail } from 'lucide-react';

interface DesktopIconsProps {
  onWindowOpen: (windowId: string) => void;
  onWindowRestore: (windowId: string) => void;
  minimizedWindows: string[];
}

const DesktopIcons: React.FC<DesktopIconsProps> = ({
  onWindowOpen,
  onWindowRestore,
  minimizedWindows
}) => {
  const handleIconClick = (windowId: string) => {
    if (minimizedWindows.includes(windowId)) {
      onWindowRestore(windowId);
    }
    onWindowOpen(windowId);
  };

  const icons = [
    { id: 'about', icon: User, label: 'About Me' },
    { id: 'projects', icon: Folder, label: 'Projects' },
    { id: 'skills', icon: Code, label: 'Skills' },
    { id: 'terminal', icon: Terminal, label: 'Terminal' },
    { id: 'explorer', icon: FolderOpen, label: 'File Explorer' },
    { id: 'contact', icon: Mail, label: 'Contact' },
  ];

  return (
    <div className="absolute top-4 left-4 space-y-4 z-10">
      {icons.map(({ id, icon: Icon, label }) => (
        <button
          key={id}
          onClick={() => handleIconClick(id)}
          className="flex flex-col items-center p-2 hover:bg-white/30 rounded transition-colors"
        >
          <Icon className="w-12 h-12 text-gray-700 mb-1" />
          <span className="text-xs text-gray-700">{label}</span>
        </button>
      ))}
    </div>
  );
};

export default DesktopIcons;