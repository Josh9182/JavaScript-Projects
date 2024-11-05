import React from 'react';
import './ProgressBar.scss';

interface ProgressBarProps { {/* Prop interface for a dynamic duration prop which will be filled in when imported into the Dashboard.tsx file. */}
  duration: number
}

const ProgressBar = ({ duration }: ProgressBarProps) => { {/* Component requiring and accessing the props above */}
  return (
    <div id="pbar-container">
      <div id="pbar-outer">
        <div
          id="pbar-inner"
          style={{ animationDuration: `${duration}s` }} {/* Animation length set by dynamic duration prop */}
        ></div>
      </div>
    </div>
  );
};

export default ProgressBar;
