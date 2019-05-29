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
      weatherDescription: ""

    }
  }

  componentDidMount () {
    navigator.geolocation.getCurrentPosition(position => {
      const {latitude, longitude} = position.coords;
      this.getWeather(latitude, longitude);
    });
  };

  async getWeather(latitude, longitude) {
    const API_KEY = "78fd42863de465e165b74fc3046198aa";
    const api = `http://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${API_KEY}`;
    let response = await fetch (api);
    let data = await response.json();
    this.setState({
      locationName: data.name,
      weatherDescription: data.weather[0].description,
      temperature: data.main.temp,
      isLoading: false
    })
    console.log(this.state)
  }

  render () {
    return (
      <div className="container-fluid text-black my-auto bg">
        <div className="container mx-auto my-4 py-4">
          {this.state.isLoading ? 
          <div className='sweet-loading'> <PacmanLoader css={override} sizeUnit={"px"} size={150} color={'yellow'} loading={this.state.loading} /> </div>  
          : 
          <div className="row justify-content-center text-center">
            <h1 className="col-12 display-4 my-2 py-3 text-success">Awesome Weather App</h1>              
            <h2 className="col-12">{this.state.locationName}</h2>
            <h3 className="col-12 text-danger">{this.state.temperature - 273.15}ºC</h3>
            <h3 className="col-12">{this.state.weatherDescription}</h3>
          </div>
          }
        </div>
      </div>
    );
  }
}

export default App;
