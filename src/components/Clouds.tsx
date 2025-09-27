import React from 'react';

const Clouds: React.FC = () => {
  return (
    <div className="absolute inset-0 pointer-events-none">
      <div className="cloud cloud1"></div>
      <div className="cloud cloud2"></div>
      <div className="cloud cloud3"></div>
      <div className="cloud cloud4"></div>
      <div className="cloud cloud5"></div>
    </div>
  );
};

export default Clouds;