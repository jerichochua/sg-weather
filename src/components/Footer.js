import React from 'react';

const Footer = ({ isFetched, forecastLastUpdated }) => {
    return (
        <footer className="footer">
            <p>Forecast last updated: {isFetched ? forecastLastUpdated.toLocaleString() : "-"}</p>
            <p>Source: <a href="https://data.gov.sg/" target="_blank" rel="noopener noreferrer">data.gov.sg</a></p>
        </footer>
    )
}

export default Footer;
