import React from 'react';
import './App.css';
import NavBar from './Components/NavBar'
import API from './API'
import StoriesList from './Components/StoriesList'

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
      < NavBar />
      
      <StoriesList stories={stories}/>
    </div>
  );
}
}

export default App;
