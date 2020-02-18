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
    stories: []
  }

  componentDidMount() {
    fetch('http://localhost:3000/stories')
    .then(resp => resp.json())
    .then(stories => this.setState({ stories }))
  }

  render () {
    const { stories } = this.state

  return (
    <div className="App">
      <div>
      < NavBar />
      </div>
      <Switch>
        <Route exact path='/' component={LoginPage} />
        <Route exact path='/stories' component={ props => (
          <StoriesList {...props} stories={stories}/>
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
