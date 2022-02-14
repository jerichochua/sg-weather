import React, { Component } from 'react'
import { ForecastList } from './components/ForecastList';
import { ForecastPeriod } from './components/ForecastPeriod';
import Header from './components/Header';
import Footer from  './components/Footer';
import axios from 'axios';
import './App.css';

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
        validStartPeriod: new Date(resp.data.items[0].valid_period.start),
        validEndPeriod: new Date(resp.data.items[0].valid_period.end),
        forecastLastUpdated: new Date(resp.data.items[0].update_timestamp),
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
