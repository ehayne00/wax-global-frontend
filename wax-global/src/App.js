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

class App extends React.Component {

  state = {
    stories: [],
    mapShowing: false,
    username: null,
    userId: null
  }

  componentDidMount() {
    fetch('http://localhost:3000/stories')
    .then(resp => resp.json())
    .then(stories => this.setState({ stories }))

    if(this.props.username === null) {
      this.props.history.push('/')
    } else if (localStorage.token) {
      API.validate()
      .then(data => {
        if (data.error) throw Error(data.error)
        this.login(data)
        this.props.history.push('/')
      }).catch(error => alert(error))
    }
  }

  toggleMapShowing = () => {
    this.setState({ mapShowing: !this.state.mapShowing})
  }

  login = data => {
    this.setState({
      username:data.user_sername,
      userId: data.user_id
    })
    localStorage.token = data.token
  }

  logout = () => {
    this.setState({ username: null})
    localStorage.removeItem('token')
  }

  render () {
    const { stories, mapShowing, username } = this.state
    const { toggleMapShowing, logout, login } = this

  return (
    <div className="App">
      <div>
      < NavBar logout={logout} username={username}/>
      </div>
      <Switch>
        <Route exact path='/' component={props => (
        <LoginPage {...props} login={login} />)} />
        <Route exact path='/stories' component={ props => (
          <StoriesList {...props} stories={stories} mapShowing={mapShowing} toggleMapShowing={toggleMapShowing}/>
        )} />
        <Route exact path='/favourites' component={ props => (
          <FavouritesList {...props} /> 
        )} />
        <Route exact path='/stories/:id' component={StoryDetails} />
        <Route exact path='/users/:id' component={UserDetails} />

      </Switch>
      
      
    </div>
  );
}
}

export default App;
