import React from 'react';
import './Coin.css';

const Coin = ({ isFlipping, result }) => {
  return (
    <div className={`coin ${isFlipping ? 'flipping' : ''}`}>
      <div className="coin-inner">
        <div className="side heads">
          <div className="coin-face">
            <div className="coin-content">H</div>
          </div>
          <div className="coin-edge"></div>
        </div>
        <div className="side tails">
          <div className="coin-face">
            <div className="coin-content">T</div>
          </div>
          <div className="coin-edge"></div>
        </div>
      </div>
    </div>
  );
};

export default Coin;