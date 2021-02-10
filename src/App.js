import React from 'react';
import './App.css';
import Restaurants from './components/Restaurants';

class App extends React.Component{
  constructor(){
    super();
    this.state = {
      latitude: 0,
      longitude: 0,
      businesses: [],
      fetching: false,
      error: false,
      errorMessage: "",
      locationAllowed: false
    };
  }

  getLocation = (pos) => {
    /* This is the callback function that gets called when the user allows the app to use their location. Inserts the user's coordinates into state. */
    this.setState({
      locationAllowed: true,
      latitude: pos.coords.latitude,
      longitude: pos.coords.longitude
    })
  }

  getGluten = async () => {
    /* If the user has not allowed the app to use their location, they will get an error */
    if (locationAllowed === false){
      this.setState({
        ...this.state,
        fetching: false,
        error: true,
        errorMessage: "You have not allowed the app to access your location."
      })
    } else {
      if (this.state.fetching === false){
        this.setState({
          ...this.state,
          error: false,
          fetching: true,
          businesses: []
        })
        // API call is made to my server, which contains my API key. The user will never be able to see it.
        fetch(`https://bernardmurphy.net/glutenfree/${this.state.latitude}/${this.state.longitude}`).then(async res => {
          const rests = await res.json();
          this.setState({
            ...this.state,
            businesses: rests.rests.businesses,
            fetching: false
          })
    
        }).catch(err => {
          this.setState({
            ...this.state,
            fetching: false,
            error: true,
            errorMessage: "An error occurred. Please try again."
          })
        })
      }
    } 
  }

  getVegan = async () => {
    // This one is identical to getGluten, but with vegan restaurants instead.
    if (locationAllowed === false){
      this.setState({
        ...this.state,
        fetching: false,
        error: true,
        errorMessage: "You have not allowed the app to access your location."
      })
    } else {
      if (this.state.fetching === false){
        this.setState({
          ...this.state,
          error: false,
          fetching: true,
          businesses: []
        })
        fetch(`https://bernardmurphy.net/vegan/${this.state.latitude}/${this.state.longitude}`).then(async res => {
          const rests = await res.json();
          this.setState({
            ...this.state,
            businesses: rests.rests.businesses,
            fetching: false
          })
        }).catch(err => {
          this.setState({
            ...this.state,
            fetching: false,
            error: true,
            errorMessage: "An error occurred. Please try again."
          })
        })
      }
    }
    
  }

  componentDidMount(){
    // When the component mounts, the user is prompted to give the app their location
    navigator.geolocation.getCurrentPosition(this.getLocation);
  }


  render(){
    return (
      <>
        <h1 id="h1-specoresto">Specoresto</h1>
        <div id="div-button-container">
          <button id="button-gluten-free" onClick={this.getGluten}>Gluten Free Restaurants Near Me</button>
          <button id="button-vegan" onClick={this.getVegan}>Vegan Restaurants Near Me</button>
        </div>
        {this.state.businesses.length ? <Restaurants rests={this.state.businesses}/> : (this.state.fetching === true) ? <p className="p-fetching">Fetching Restaurants. Please Wait...</p> : <></>}
        <p className="p-error">{(this.state.error) ? this.state.errorMessage : <></>}</p>
      </>
    )
  }
}

export default App;
