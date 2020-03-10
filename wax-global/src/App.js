import React from "react";
import "./App.css";
import NavBar from "./Components/NavBar";
import API from "./API";
import StoriesList from "./Components/StoriesList";
import { Route, withRouter, Switch } from "react-router-dom";
import LoginPage from "./Components/LoginPage";
import FavouritesList from "./Components/FavouritesList";
import StoryDetails from "./Components/StoryDetails";
import UserDetails from "./Components/UserDetails";

const favouritesUrl = "http://localhost:3000/favourites";

class App extends React.Component {
  state = {
    stories: [],
    mapShowing: false,
    user: null,
    user_id: null,
    latitude: "",
    longitude: "",
    searchTerm: "",
    index: 0
  };

  updateStoriesPatched = (story, updatedStory) => {
    const index = this.state.stories.indexOf(story);
    const storyArray = [...this.state.stories];
    storyArray.splice(index, 1, updatedStory);
    this.setState({
      stories: storyArray
    });
  };

  updateUserPatched = updatedUser => {
    let { user } = this.state;
    let newUser = Object.assign(user, updatedUser.user);
    this.setState({
      user: newUser
    });
  };

  updateSearchTerm = event => {
    this.setState({
      searchTerm: event.target.value
    });
  };

  filterStories = () => {
    return this.state.stories.filter(story =>
      story.country.toLowerCase().includes(this.state.searchTerm.toLowerCase())
    );
  };

  updateStories = story => {
    this.setState({
      stories: [story, ...this.state.stories]
    });
  };

  addToFavourites = (id, method1, method2) => {
    API.post3(favouritesUrl, {
      favourite: {
        user_id: this.state.user.id,
        story_id: id
      }
    }).then(fave => method2(fave));
    alert("Added to your favourites!");
    method1();
  };

  componentDidMount() {
    // if (this.state.user === null){
    //   this.props.history.push('/')
    // }
    // else
    if (localStorage.token) {
      API.validate()
        .then(data => {
          if (data.error) throw Error(data.error);
          this.login(data);
          // this.props.history.push("/stories");
        })
        .catch(error => alert(error));
    }

    this.fetchStories();
  }

  fetchStories = () => {
    fetch("http://localhost:3000/stories")
      .then(resp => resp.json())
      .then(stories => this.setState({ stories }));
  };

  toggleMapShowing = (latitude, longitude) => {
    this.setState({ mapShowing: !this.state.mapShowing });
    !this.state.mapShowing && this.setLatLng(latitude, longitude);
  };

  setLatLng = (latitude, longitude) => {
    this.setState({
      latitude: latitude,
      longitude: longitude
    });
  };

  deleteStory = id => {
    this.props.history.push("/stories");
    API.destroy("http://localhost:3000/stories", id).then(
      this.setState({
        stories: [...this.state.stories].filter(story => story.id !== id)
      })
    );
    alert("Story deleted!");
  };

  deleteUser = () => {
    API.destroy("http://localhost:3000/users", this.state.user.id).then(
      this.logout(),
      this.props.history.push("/")
    );
    alert("Account deleted!");
  };

  login = data => {
    this.setState({
      user_id: data.user.id,
      user: data.user
    });
    localStorage.token = data.token;
  };

  logout = () => {
    this.setState({ user: null });
    localStorage.removeItem("token");
  };

  renderMore = () => {
    const filteredStories = this.filterStories();

    this.state.index >= filteredStories.length - 21
      ? this.setState({
          index: 0
        })
      : this.setState({
          index: this.state.index + 21
        });
  };

  render() {
    const {
      stories,
      mapShowing,
      user,
      latitude,
      longitude,
      index
    } = this.state;
    const {
      toggleMapShowing,
      logout,
      login,
      addToFavourites,
      updateSearchTerm,
      renderMore,
      updateStories,
      deleteStory,
      deleteUser,
      updateStoriesPatched,
      updateUserPatched
    } = this;
    const filteredStories = this.filterStories();
    const render21 = filteredStories.slice(index, index + 21);
    return (
      <div className="App">
        <img
          className="top-image"
          src="https://ecole-surf-srilanka.com/wp-content/uploads/2019/08/s02-surf-coaching-sri-lanka-sunrise.jpg"
        />

        <NavBar logout={logout} user={user} />

        <div className="main-position">
          <Switch>
            <Route
              exact
              path="/users/:id"
              component={props => (
                <UserDetails
                  {...props}
                  user={user}
                  toggleMapShowing={toggleMapShowing}
                  mapShowing={mapShowing}
                  latitude={latitude}
                  longitude={longitude}
                  updateStories={updateStories}
                  deleteUser={deleteUser}
                  updateUserPatched={updateUserPatched}
                />
              )}
            />
            <Route
              exact
              path="/stories/:id"
              component={props => (
                <StoryDetails
                  {...props}
                  addToFavourites={addToFavourites}
                  user={user}
                  deleteStory={deleteStory}
                  stories={stories}
                  updateStoriesPatched={updateStoriesPatched}
                />
              )}
            />
            <Route
              exact
              path="/"
              component={props => <LoginPage {...props} login={login} />}
            />
            <Route
              exact
              path="/stories"
              render={props => (
                <StoriesList
                  {...props}
                  stories={render21}
                  mapShowing={mapShowing}
                  toggleMapShowing={toggleMapShowing}
                  latitude={latitude}
                  longitude={longitude}
                  updateSearchTerm={updateSearchTerm}
                  renderMore={renderMore}
                />
              )}
            />
            <Route
              exact
              path="/favourites"
              component={props => (
                <FavouritesList
                  {...props}
                  toggleMapShowing={toggleMapShowing}
                  mapShowing={mapShowing}
                  latitude={latitude}
                  longitude={longitude}
                />
              )}
            />
          </Switch>
        </div>
      </div>
    );
  }
}

export default withRouter(App);
