import React from 'react';
import Paper from 'material-ui/Paper';
import CircularProgress from 'material-ui/CircularProgress';


const Loader = ({ msg }) => (
  <div className="loader">
    <CircularProgress size={80} thickness={5} color="#fff"/>

    <h2>{msg}</h2>
  </div>
);

const Weather = ({ temp, icon, unit, switcher }) => (
  <div className="weather-box">
    <div className="icon">
      <i className={icon}></i>
    </div>
    <div className="data">
      {temp}
      <div onClick={switcher} className="unit-container">
         ⁰{unit}
      </div>
    </div>
  </div>
);


class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tempC: undefined,
      tempF: undefined,
      currentTemp: "C",
      sky: undefined,
      msg: ""
    }
  }

  getWeatherIcon = (text) => {
    const icons = {
                "Sunny": "wi wi-day-sunny",
                "Clear": "wi wi-night-clear",
                "Partly cloudy": "wi wi-cloud",
                "Cloudy": "wi wi-cloudy",
                "Overcast": "wi wi-cloudy",
                "Mist": "wi wi-sprinkle",
                "Patchy rain nearby": "wi wi-sprinkle",
                "Patchy snow nearby": "wi wi-snow",
                "Patchy sleet nearby": "wi wi-sleet",
                "Patchy freezing drizzle nearby": "wi wi-rain-mix",
                "Thundery outbreaks in nearby": "wi wi-thuderstorm",
                "Blowing snow": "wi wi-snow-wind",
                "Blizzard": "wi wi-snow-wind",
                "Fog": "wi wi-fog",
                "Freezing fog": "wi wi-fog",
                "Patchy light drizzle": "wi wi-rain-mix",
                "Light drizzle": "wi wi-rain-mix",
                "Freezing drizzle": "wi wi-rain-mix",
                "Heavy freezing drizzle": "wi wi-rain-mix",
                "Patchy light rain": "wi wi-rain-mix",
                "Light rain": "wi wi-sprinkle",
                "Moderate rain at times": "wi wi-rain",
                "Moderate rain": "wi wi-rain",
                "Heavy rain at times": "wi wi-rain",
                "Heavy rain": "wi wi-rain",
                "Light freezing rain": "wi wi-sleet",
                "Moderate or heavy freezing rain": "wi wi-sleet",
                "Light sleet": "wi wi-sleet",
                "Moderate or heavy sleet": "wi wi-sleet",
                "Patchy light snow": "wi wi-snow",
                "Light snow": "wi wi-snow",
                "Patchy moderate snow": "wi wi-snow",
                "Moderate snow": "wi wi-snow",
                "Patchy heavy snow": "wi wi-snow",
                "Heavy snow": "wi wi-snow",
                "Ice pellets": "wi wi-hail",
                "Light rain shower": "wi wi-showers",
                "Moderate or heavy rain shower": "wi wi-showers",
                "Torrential rain shower": "wi wi-showers",
                "Light sleet showers": "wi wi-sleet",
                "Moderate or heavy sleet showers": "wi wi-sleet",
                "Light snow showers": "wi wi-snow",
                "Moderate or heavy snow showers": "wi wi-snow",
                "Light showers of ice pellets": "wi wi-hail",
                "Moderate or heavy showers of ice pellets": "wi wi-hail",
                "Patchy light rain in area with thunder": "wi wi-storm-showers",
                "Moderate or heavy rain in area with thunder": "wi wi-storm-showers",
                "Patchy light snow in area with thunder": "wi wi-storm-showers",
                "Moderate or heavy snow in area with thunder": "wi wi-storm-showers",
                "default": "wi wi-na"
            };
    return icons[text ? text : "default"];
  }
 
  getPosition = () => new Promise((resolve, reject) => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        let key = "e984c7d121044a32a18221132170402"
        let url = `https://api.apixu.com/v1/current.json?key=${key}&q=${position.coords.latitude.toFixed(2)},${position.coords.longitude.toFixed(2)}`
        resolve(url);
      },
      () => {reject("Please turn on geolocation")}
    );
  });

  getWeather = (url) => {
    return fetch(url)
      .then(
        (res) => res && res.ok ? res.json() : Promise.reject("Weather servie does not respond") 
      )} 

  pushData = (data) => {
    this.setState(
      () => ({
        tempC: data.current.temp_c,
        tempF: data.current.temp_f,
        sky: this.getWeatherIcon(data.current.condition.text)
      })
    )
  }

  changeUnit = () => {
    this.setState(
      (prev) => ({
        currentTemp: prev.currentTemp === "C" ? "F" : "C"
      })
    );
  }

  errorHandler = (err) => {
    this.setState(
      () => ({ msg : err})
    )
  }

  componentDidMount = () => {
    this.getPosition().then(this.getWeather).then(this.pushData).catch(this.errorHandler);
  }


  render() {
    return (
      <Paper 
        style={{backgroundColor:"#E91E63"}} 
        zDepth={1}  
        className="main-container">
        {this.state.sky
          ? <Weather 
              temp={this.state.currentTemp === "C" 
                      ? this.state.tempC : this.state.tempF} 
              icon={this.state.sky}
              unit={this.state.currentTemp}
              switcher={this.changeUnit} />
          : <Loader msg={this.state.msg} />}
      </Paper>
    );
  }
}

export default App;

