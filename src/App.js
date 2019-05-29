import React, {Component} from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.css';
import {Spinner} from "react-bootstrap";
import { css } from "@emotion/core";
import { PacmanLoader } from 'react-spinners';

const override = css`
    display: block;
    margin: 0 auto;
    border-color: black;
  `

class App extends Component {
  constructor(props) {
    super (props)
    this.state= {
      isLoading: true,
      locationName: "",
      temperature: "",
      weatherDescription: "",
      humidity: "",
      windSpeed: ""
    }
  }

  componentDidMount () {
    navigator.geolocation.getCurrentPosition(position => {
      const {latitude, longitude} = position.coords;
      this.getWeather(latitude, longitude);
      console.log(latitude,longitude);
    });
  };
  
  
  getWeather = (latitude, longitude) => {
    const API_KEY = "78fd42863de465e165b74fc3046198aa";
    const api = `http://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${API_KEY}`;
    fetch(api)
    .then(response => {
      if (response.ok) {
        return response
      }
      else { 
        let error = new Error(`Error ${response.status} is ${response.statusText}`);
        throw error;
      }
     })
    .then(response => response.json())
    .catch(error => { 
      alert(`Data could not be fetched ${error.message}`)
    })
    .then(data => {
      this.setState({
        locationName: data.name,
        weatherDescription: data.weather[0].description,
        humidity : data.main.humidity,
        temperature: data.main.temp,
        windSpeed: data.wind.speed,
        isLoading: false
      });
    })
  };

  render () {
    return (
      <div className="container-fluid text-white my-auto bg pt-5" style={{ height: '100vh', width: '100vw', backgroundSize: 'cover' }}>.
        <div className="container mx-auto my-4 py-4">
          {this.state.isLoading ? 
          <div className='sweet-loading '> <PacmanLoader css={override} sizeUnit={"px"} size={150} color={'yellow'} loading={this.state.loading} /> </div>  
          : 
          <div className="row justify-content-center text-center">
            <h1 className="col-12 display-4 my-2 py-3 text-warning"><i className="fas fa-city"></i> {this.state.locationName}</h1>              
            <h3 className="col-12 text-danger"><i className='fas fa-temperature-high'></i> {this.state.temperature - 273.15}ºC</h3>
            <h3 className="col-12 text-primary"><i className="fas fa-tint"></i> {this.state.humidity}%</h3>
            <h3 className="col-12 text-primary"><i className='fas fa-wind'></i> {this.state.windSpeed * 3.6} km/h</h3>
            <h3 className="col-12 text-primary">{this.state.weatherDescription.toLowerCase().split(' ').map((s) => s.charAt(0).toUpperCase() + s.substring(1)).join(' ')}</h3>
          </div>
          }
        </div>
      </div>
    );
  }
}

export default App;
