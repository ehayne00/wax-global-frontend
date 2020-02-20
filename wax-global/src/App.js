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
const favouritesUrl = 'http://localhost:3000/favourites'

class App extends React.Component {

  state = {
    stories: [],
    mapShowing: false,
    user: null,
    myFavouritesList: [],
    selectedStory: null,
    selectedUser: null
  }

  updateSelectedUserToTargetUser = story => {
    this.setState({
      selectedUser: story.user
    })
  }

  updateSelectedUserToCurrentUser = () =>{
    console.log(this.state.user)
    this.setState({
      selectedUser: this.state.user
    })
  }

  updateSelectedStory = story => {
    this.setState({
      selectedStory: story
    })
     
  }

  updateMyFavouritesList = () => {
    API.fetchUserFavourites()
    .then(data => this.setState({
      myFavouritesList: data
    }))
  }

  addToFavourites = (id) =>
  API.post(favouritesUrl, {
    favourite: {
      user_id: this.state.userId,
      story_id: id
    }
  })

  componentDidMount() {

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

    this.updateMyFavouritesList()
  }

  toggleMapShowing = () => {
    this.setState({ mapShowing: !this.state.mapShowing})
  }

  login = data => {
    this.setState({
      
      userId: data.user.id,
      user: data.user
    })
    localStorage.token = data.token
  }

  logout = () => {
    this.setState({ user: null})
    localStorage.removeItem('token')
  }

  render () {
    const { stories, mapShowing, myFavouritesList, selectedStory, selectedUser, user } = this.state
    const { toggleMapShowing, logout, login, addToFavourites, updateSelectedStory,
    updateSelectedUserToCurrentUser, updateSelectedUserToTargetUser } = this

  return (
    <div className="App">
      <div>
      < NavBar logout={logout} user={user} 
      updateSelectedUserToCurrentUser={updateSelectedUserToCurrentUser} user={user}/>
      </div>
      <Switch>
        <Route exact path='/' component={props => (
        <LoginPage {...props} login={login} />)} />
        <Route exact path='/stories' component={ props => (
          <StoriesList {...props} stories={stories} mapShowing={mapShowing} 
          toggleMapShowing={toggleMapShowing} addToFavourites={addToFavourites}
          updateSelectedStory={updateSelectedStory} updateSelectedUserToTargetUser={updateSelectedUserToTargetUser}/>
        )} />
        <Route exact path='/favourites' component={ props => (
          <FavouritesList {...props} myFavouritesList={myFavouritesList}/> 
        )} />
        <Route exact path='/stories/:id' component={ props => (
        <StoryDetails {...props} selectedStory={selectedStory}/>)} />
        <Route exact path='/users/:id' component={props => (
          <UserDetails {...props} selectedUser={selectedUser}/>)}/>

      </Switch>
      
      
    </div>
  );
}
}

export default App;
