import React from 'react';
import './App.css';
import NavBar from './Components/NavBar'
import API from './API'
import StoriesList from './Components/StoriesList'
import {Route, Switch} from 'react-router-dom'
import LoginPage from './Components/LoginPage'
import FavouritesList from './Components/FavouritesList'
import StoryDetails from './Components/StoryDetails';
import UserDetails from './Components/UserDetails';
// import { GoogleComponent } from 'react-google-location'

const favouritesUrl = 'http://localhost:3000/favourites'

class App extends React.Component {

  state = {
    stories: [],
    mapShowing: false,
    user: null,
    user_id: null
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

    fetch('http://localhost:3000/stories')
    .then(resp => resp.json())
    .then(stories => this.setState({ stories }))
    
  }

  toggleMapShowing = () => {
    this.setState({ mapShowing: !this.state.mapShowing})
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
    const { stories, mapShowing, user } = this.state
    const { toggleMapShowing, logout, login, addToFavourites } = this

  return (
    <div className="App">
      <div>
      < NavBar logout={logout} user={user} />
      </div>
      <Switch>
        <Route exact path='/' component={props => (
        <LoginPage {...props} login={login} />)} />
        <Route exact path='/stories' component={ props => (
          <StoriesList {...props} stories={stories} mapShowing={mapShowing} 
          toggleMapShowing={toggleMapShowing} />
        )} />
        <Route exact path='/favourites' component={ props => (
          <FavouritesList {...props} toggleMapShowing={toggleMapShowing} 
          mapShowing={mapShowing}/> 
        )} />
        <Route exact path='/stories/:id' component={ props => (
        <StoryDetails {...props} addToFavourites={addToFavourites}/>)} />
        <Route exact path='/users/:id' component={ props => (
          <UserDetails {...props} user={user} toggleMapShowing={toggleMapShowing} mapShowing={mapShowing}/>)}/>

      </Switch>
      
      
    </div>
  );
}
}

export default App;
