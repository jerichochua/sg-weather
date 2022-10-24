import React from 'react';

const Forecast = ({ forecast }) => {
  return (
    <div className='forecast'>
      <p className='forecast-area'>{forecast.area}</p>
      <p>{forecast.forecast}</p>
    </div>
  );
};

export default Forecast;
