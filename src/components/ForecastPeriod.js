import React from 'react';

export const ForecastPeriod = ({ forecastStart, forecastEnd }) => {
    return (
        <div className="forecastPeriod">
            <h3>{forecastStart.toLocaleString()} - {forecastEnd.toLocaleString()}</h3>
        </div>
    )
}
