import { useState } from 'react';

export const useWindowManager = () => {
  const [activeWindow, setActiveWindow] = useState('about');
  const [minimizedWindows, setMinimizedWindows] = useState<string[]>([]);

  const minimizeWindow = (windowId: string) => {
    if (!minimizedWindows.includes(windowId)) {
      setMinimizedWindows(prev => [...prev, windowId]);
    }
  };

  const restoreWindow = (windowId: string) => {
    setMinimizedWindows(prev => prev.filter(id => id !== windowId));
  };

  return {
    activeWindow,
    minimizedWindows,
    setActiveWindow,
    minimizeWindow,
    restoreWindow
  };
};