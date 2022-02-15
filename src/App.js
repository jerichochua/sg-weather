import React, { Component } from 'react'
import axios from 'axios';

import { ForecastList } from './components/ForecastList';
import { ForecastPeriod } from './components/ForecastPeriod';
import Header from './components/Header';
import Footer from  './components/Footer';

import './App.css';

// Might not be the most elegant but it suffices for now
const convertTimestamp = timestamp => {
    let current_date = new Date(timestamp);
    let day = current_date.getDate();
    let month = current_date.getMonth() + 1; // Months start from 0
    let year = current_date.getFullYear();

    // Make hours/minutes/seconds display double digits (eg: 0 -> 00)
    // Also not elegant but it will do for now
    let hrs = (current_date.getHours() < 10 ? '0' : '') + current_date.getHours();
    let mins = (current_date.getMinutes() < 10 ? '0' : '') + current_date.getMinutes();
    let secs = (current_date.getSeconds() < 10 ? '0' : '') + current_date.getSeconds();

    return day + "/" + month + "/" + year + " " + hrs + ":" + mins + ":" + secs;
}

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
        forecasts: [],
        isFetched: false,
        validStartPeriod: "",
        validEndPeriod: "",
        forecastLastUpdated: "",
    };
  }

  componentDidMount() {
    // Get 2 hour weather forecast
    axios.get('https://api.data.gov.sg/v1/environment/2-hour-weather-forecast')
    .then(resp => {
      this.setState({
        forecasts: resp.data.items[0].forecasts,
        validStartPeriod: convertTimestamp(resp.data.items[0].valid_period.start),
        validEndPeriod: convertTimestamp(resp.data.items[0].valid_period.end),
        forecastLastUpdated: convertTimestamp(resp.data.items[0].update_timestamp),
        isFetched: true
      });
    })
    .catch(error => console.error(error));
  }

  render() {
    return (
      <div className="container">
        <Header />
        {this.state.isFetched ? <ForecastPeriod forecastStart={this.state.validStartPeriod} forecastEnd={this.state.validEndPeriod} /> : <p>...</p>}
        {this.state.isFetched ? <ForecastList forecasts={this.state.forecasts} /> : <h3>Fetching weather forecasts...</h3>}
        <Footer isFetched={this.state.isFetched} forecastLastUpdated={this.state.forecastLastUpdated} />
      </div>
    )
  }
}
