import React from 'react';
import './ProgressBar.scss';

interface ProgressBarProps {
  duration: number
}

const ProgressBar = ({ duration }: ProgressBarProps) => {
  return (
    <div id="pbar-container">
      <div id="pbar-outer">
        <div
          id="pbar-inner"
          style={{ animationDuration: `${duration}s` }}
        ></div>
      </div>
    </div>
  );
};

export default ProgressBar;
