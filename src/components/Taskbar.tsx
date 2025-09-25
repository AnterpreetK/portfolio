import React from 'react';
import { Coffee } from 'lucide-react';

interface TaskbarProps {
  minimizedWindows: string[];
  onWindowRestore: (windowId: string) => void;
  onWindowActivate: (windowId: string) => void;
  currentTime: Date;
}

const Taskbar: React.FC<TaskbarProps> = ({
  minimizedWindows,
  onWindowRestore,
  onWindowActivate,
  currentTime
}) => {
  const handleTaskbarClick = (windowId: string) => {
    onWindowRestore(windowId);
    onWindowActivate(windowId);
  };

  return (
    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-r from-gray-800 to-gray-900 border-t-2 border-gray-700 px-2 py-1 flex justify-between items-center z-40">
      <div className="flex items-center space-x-2">
        <button className="bg-gradient-to-r from-cyan-500 to-teal-500 text-white px-3 py-1 rounded text-xs font-bold hover:from-cyan-600 hover:to-teal-600 transition-colors">
          START
        </button>
        <div className="flex space-x-1">
          {minimizedWindows.map(windowId => (
            <button
              key={windowId}
              onClick={() => handleTaskbarClick(windowId)}
              className="bg-gray-700 text-white px-2 py-1 rounded text-xs hover:bg-gray-600 transition-colors"
            >
              {windowId}
            </button>
          ))}
        </div>
      </div>
      <div className="flex items-center space-x-3 text-white text-xs">
        <Coffee className="w-4 h-4" />
        <span className="font-mono">{currentTime.toLocaleTimeString()}</span>
      </div>
    </div>
  );
};

export default Taskbar;