import React from 'react';

const Clouds: React.FC = () => {
  return (
    <>
      <div className="absolute inset-0">
        <div className="cloud cloud1"></div>
        <div className="cloud cloud2"></div>
        <div className="cloud cloud3"></div>
      </div>
      <style>{`
        .cloud {
          position: absolute;
          background: white;
          border-radius: 100px;
          opacity: 0.7;
        }
        
        .cloud::before,
        .cloud::after {
          content: '';
          position: absolute;
          background: white;
          border-radius: 100px;
        }
        
        .cloud1 {
          width: 100px;
          height: 40px;
          top: 20%;
          animation: drift 20s infinite;
        }
        
        .cloud1::before {
          width: 50px;
          height: 50px;
          top: -25px;
          left: 10px;
        }
        
        .cloud1::after {
          width: 60px;
          height: 40px;
          top: -15px;
          right: 10px;
        }
        
        .cloud2 {
          width: 80px;
          height: 35px;
          top: 40%;
          animation: drift 25s infinite;
        }
        
        .cloud2::before {
          width: 40px;
          height: 40px;
          top: -20px;
          left: 15px;
        }
        
        .cloud2::after {
          width: 50px;
          height: 35px;
          top: -10px;
          right: 15px;
        }
        
        .cloud3 {
          width: 120px;
          height: 45px;
          top: 60%;
          animation: drift 30s infinite;
        }
        
        .cloud3::before {
          width: 60px;
          height: 60px;
          top: -30px;
          left: 20px;
        }
        
        .cloud3::after {
          width: 70px;
          height: 45px;
          top: -15px;
          right: 20px;
        }
        
        @keyframes drift {
          0% {
            transform: translateX(-100px);
          }
          100% {
            transform: translateX(calc(100vw + 100px));
          }
        }
      `}</style>
    </>
  );
};

export default Clouds;