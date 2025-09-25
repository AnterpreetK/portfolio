import React from 'react';
import { X, Minimize, Maximize } from 'lucide-react';

interface WindowProps {
  id: string;
  title: string;
  children: React.ReactNode;
  icon: React.ComponentType<{ className?: string }>;
  activeWindow: string;
  minimizedWindows: string[];
  onActivate: (id: string) => void;
  onMinimize: (id: string) => void;
  position?: string;
}

const Window: React.FC<WindowProps> = ({
  id,
  title,
  children,
  icon: Icon,
  activeWindow,
  minimizedWindows,
  onActivate,
  onMinimize,
  position = ''
}) => {
  if (minimizedWindows.includes(id)) return null;
  
  return (
    <div 
      className={`absolute ${id === activeWindow ? 'z-30' : 'z-20'} ${position} w-11/12 md:w-auto`}
      onClick={() => onActivate(id)}
    >
      <div className="bg-white rounded-lg shadow-2xl border-2 border-gray-800 overflow-hidden">
        <div className="bg-gradient-to-r from-teal-400 to-cyan-400 p-2 flex justify-between items-center cursor-move">
          <div className="flex items-center space-x-2">
            <Icon className="w-4 h-4 text-gray-800" />
            <span className="text-sm font-bold text-gray-800">{title}</span>
          </div>
          <div className="flex space-x-1">
            <button 
              onClick={(e) => {
                e.stopPropagation();
                onMinimize(id);
              }}
              className="w-5 h-5 bg-yellow-400 rounded-full border border-gray-700 hover:bg-yellow-500 transition-colors"
            >
              <Minimize className="w-3 h-3 mx-auto" />
            </button>
            <button className="w-5 h-5 bg-green-400 rounded-full border border-gray-700 hover:bg-green-500 transition-colors">
              <Maximize className="w-3 h-3 mx-auto" />
            </button>
            <button className="w-5 h-5 bg-red-400 rounded-full border border-gray-700 hover:bg-red-500 transition-colors">
              <X className="w-3 h-3 mx-auto" />
            </button>
          </div>
        </div>
        <div className="bg-gray-50 max-h-96 overflow-y-auto">
          {children}
        </div>
      </div>
    </div>
  );
};

export default Window;