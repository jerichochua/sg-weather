import React from 'react';
import Forecast from './Forecast';

export const ForecastList = ({ forecasts }) => {
  return (
    <div className='forecastList'>
      {forecasts.map((forecast) => (
        <Forecast key={forecast.area} forecast={forecast} />
      ))}
    </div>
  );
};
