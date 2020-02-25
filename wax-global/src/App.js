import React from 'react';
import './App.css';
import NavBar from './Components/NavBar'
import API from './API'
import StoriesList from './Components/StoriesList'
import {Route, withRouter, Switch} from 'react-router-dom'
import LoginPage from './Components/LoginPage'
import FavouritesList from './Components/FavouritesList'
import StoryDetails from './Components/StoryDetails';
import UserDetails from './Components/UserDetails';
// import { GoogleComponent } from 'react-google-location'

const favouritesUrl = 'http://localhost:3000/favourites'
// const widget = cloudinary.createUploadWidget({ 
//   cloudName: "demo", uploadPreset: "preset1" }, (error, result) => { });
// widget.open();

class App extends React.Component {

  state = {
    stories: [],
    mapShowing: false,
    user: null,
    user_id: null,
    latitude: "",
    longitude: "",
    searchTerm: ""
  }

  updateSearchTerm = event => {
    this.setState({
        searchTerm: event.target.value
    })
  }

  filterStories = () => {
    
    return this.state.stories.filter(story =>  
       story.country.toLowerCase().includes(this.state.searchTerm.toLowerCase()))
  } 

  updateStories = (story) => {
    this.setState({
      stories: [...this.state.stories, story]
    })
  }

  addToFavourites = (id) =>
  API.post(favouritesUrl, {
    favourite: {
      user_id: this.state.user.id,
      story_id: id,

    }
  })

  componentDidMount() {
    // if (this.state.user === null){
    //   this.props.history.push('/')
    // }
    // else 
    if(localStorage.token) {
      
      API.validate()
      .then(data => {
        if (data.error) throw Error(data.error)
        this.login(data)
        // this.props.history.push('/stories')
      }).catch(error => alert(error))
    }

    this.fetchStories()
  }

  fetchStories = () => {
    fetch('http://localhost:3000/stories')
    .then(resp => resp.json())
    .then(stories => this.setState({ stories }))
  }

  toggleMapShowing = (latitude, longitude) => {
    this.setState({ mapShowing: !this.state.mapShowing,
       })
       !this.state.mapShowing && (this.setLatLng(latitude, longitude))
  }

  setLatLng = (latitude, longitude) => {
    this.setState({
      latitude: latitude,
      longitude: longitude
    })
  }

  deleteStory = (id) => {
    this.props.history.push('/stories')
    API.destroy('http://localhost:3000/stories', id)
    .then(this.setState({
      stories: [...this.state.stories].filter(story => story.id !== id)
    }))
  }

  deleteUser = () => {
    
    API.destroy('http://localhost:3000/users', this.state.user.id)
    .then(this.logout(),
    this.props.history.push('/'))
  }

  login = data => {
    this.setState({
      
      user_id: data.user.id,
      user: data.user
    })
    localStorage.token = data.token
  }

  logout = () => {
    this.setState({ user: null})
    localStorage.removeItem('token')
  }

  render () {
    const { stories, mapShowing, user, latitude, longitude } = this.state
    const { toggleMapShowing, logout, login, addToFavourites, updateSearchTerm, 
      updateStories, deleteStory, deleteUser } = this
    const filteredStories = this.filterStories()
  return (
    <div className="App">
      <div>
      < NavBar logout={logout} user={user} />
      </div>
      <Switch>
        <Route exact path='/' component={props => (
        <LoginPage {...props} login={login} />)} />
        <Route exact path='/stories' render={ props => (
          <StoriesList {...props} stories={filteredStories} mapShowing={mapShowing} 
          toggleMapShowing={toggleMapShowing} latitude={latitude} 
          longitude={longitude} updateSearchTerm={updateSearchTerm}/>
        )} />
        <Route exact path='/favourites' component={ props => (
          <FavouritesList {...props} toggleMapShowing={toggleMapShowing} 
          mapShowing={mapShowing} latitude={latitude} longitude={longitude}/> 
        )} />
        <Route exact path='/stories/:id' component={ props => (
        <StoryDetails {...props} addToFavourites={addToFavourites} user={user} deleteStory={deleteStory}/>)} />
        <Route exact path='/users/:id' component={ props => (
          <UserDetails {...props} user={user} toggleMapShowing={toggleMapShowing} mapShowing={mapShowing}
          latitude={latitude} longitude={longitude} updateStories={updateStories} deleteUser={deleteUser}/>)}/>

      </Switch>
      
      
    </div>
  );
}
}

export default withRouter(App);
