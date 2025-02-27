import React from 'react';
import './Loading.scss';

const Loading = () => {
  return (
    <div id="loading-screen">
      <div id="loading-symbol1">
        <div id="inner-symbol1"></div>
      </div>
      <div id="loading-symbol2">
        <div id="inner-symbol2"></div>
      </div>
      <div id="loading-symbol3">
        <div id="inner-symbol3"></div>
      </div>
    </div>
  );
};

export default Loading;
