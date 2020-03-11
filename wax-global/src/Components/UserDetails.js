import React, { Component } from "react";
import ProfileCard from "./ProfileCard";
import MapView from "./MapView";
import API from "../API";
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng
} from "react-places-autocomplete";
import EditUserForm from "./EditUserForm";
import { Button } from "@material-ui/core";
const storyUrl = "http://localhost:3000/stories";
// const API_KEY = 'AIzaSyAgUGzj-VxQPQ1P0uaVNt6r62c9B1rP6Go'

class UserDetails extends Component {
  state = {
    userStories: [],
    createFormShowing: false,
    editFormShowing: false,
    image: "",
    title: "",
    content: "",
    latitude: "",
    longitude: "",
    address: "",
    place: "",
    video: "",
    country: "",
    sortBy: "Image",
    currentUser: {}
  };

  updateSortBy = e => {
    this.setState({
      sortBy: e.target.value
    });
  };

  setVideo = e => {
    let files = e.target.files[0];

    this.setState({
      video: files
    });
  };

  handleImageChange = e => {
    let files = e.target.files[0];

    this.setState({
      image: files
    });
  };

  setCoordinates = e => {
    this.setState({
      latitude: e.lat,
      longitude: e.lng
    });
  };

  setAddress = e => {
    e = e.replace(/,/g, " -");
    let place = e.split(" - ");
   

    const country = place[place.length - 1];
    const town = place[0];
    town !== country
      ? this.setState({
          place: e,
          address: `${town}, ${country}`,
          country: country
        })
      : this.setState({
          place: e,
          address: `${country}`,
          country: country
        });
  };

  updateFormData = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  handleSelect = async value => {
    const results = await geocodeByAddress(value);
    const latLng = await getLatLng(results[0]);
    this.setAddress(value);
    this.setCoordinates(latLng);
  };

  handleSubmit = e => {
    e.preventDefault();

    const bodyObj = {
      user_id: this.props.user.id,
      image: this.state.image,
      title: this.state.title,
      content: this.state.content,
      address: this.state.address,
      latitude: this.state.latitude,
      longitude: this.state.longitude,
      video: this.state.video,
      country: this.state.country
    };

    API.post2(storyUrl, bodyObj)
      .then(story => {
        if (story.error) throw Error(story.error);
        this.setState(
          {
            userStories: [story, ...this.state.userStories]
          },
          () => {
            this.props.updateStories(story);
            this.toggleCreateFormShowing();
            alert("created story! - it may take a moment to load");
          }
        );
      })
      .catch(error => alert(error));
    alert("creating...");
  };

  updateUserStories = () => {
    const { user } = this.props.location.state;

    fetch(`http://localhost:3000/users/${user.id}`)
      .then(resp => resp.json())
      .then(data => {
        if (this.mounted) {
          this.setState({
            userStories: data.stories
          });
        }
      });
  };

  componentDidMount() {
    this.mounted = true;
    this.validateUser();
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.currentUser !== this.state.currentUser) {
      this.updateUserStories();
    }
  }

  componentWillUnmount() {
    this.mounted = false;
  }

  toggleCreateFormShowing = () => {
    this.setState({ createFormShowing: !this.state.createFormShowing });
  };

  toggleEditFormShowing = () => {
    this.setState({ editFormShowing: !this.state.editFormShowing });
  };

  validateUser = () => {
    fetch("http://localhost:3000/validate", {
      headers: {
        Authorization: localStorage.token
      }
    })
      .then(resp => resp.json())
      .then(data =>
        this.setState({
          currentUser: data.user
        })
      );
  };

  render() {
    const { user } = this.props.location.state;
    // debugger
    return (
      <div className="prof-box2">
        <h1 className="explanation-font font-size2">
          <u>{user.username}</u>
        </h1>
        <div className="name-pic-div">
          {user.image ? (
            <img className="profile-image" alt="oh no!" src={user.image} />
          ) : (
            <img
              className="profile-image"
              alt="oh no!"
              src="https://i.ibb.co/z5Xj6hH/profile-pic.png"
            />
          )}
        </div>
        <p className="user-font font-size2">"{user.bio}"</p>
        {this.props.mapShowing && (
          <div className="map-view2">
            <MapView
              latitude={this.props.latitude}
              longitude={this.props.longitude}
              toggleMapShowing={this.props.toggleMapShowing}
            />
          </div>
        )}
        {this.state.currentUser.id === user.id && (
          <div className="buttons-width">
            <Button
              className="button-extra"
              variant="contained"
              color="secondary"
              onClick={() => this.props.deleteUser()}
            >
              Delete My Account
            </Button>
            <Button
              className="button-nine"
              variant="contained"
              color="secondary"
              onClick={() => this.toggleEditFormShowing()}
            >
              Edit My Profile
            </Button>
            <Button
              className="button-seven"
              variant="contained"
              color="secondary"
              onClick={() => this.toggleCreateFormShowing()}
            >
              Create Story
            </Button>
          </div>
        )}

        {this.state.editFormShowing && (
          <EditUserForm
            user={this.props.user}
            toggleEditFormShowing={this.toggleEditFormShowing}
            updateUserPatched={this.props.updateUserPatched}
          />
        )}

        {this.state.createFormShowing && (
          <div className="createstory-container">
            <Button
              variant="contained"
              color="secondary"
              onClick={this.toggleCreateFormShowing}
            >
              x
            </Button>
            <h1>Create Story Form:</h1>
            <p>
              (Upload one image <u>or</u> video per story, videos take a few
              minutes to upload. You will see your story once the video has
              finished uploading.)
            </p>

            <PlacesAutocomplete
              name="address"
              value={this.state.place}
              onChange={e => this.setAddress(e)}
              onSelect={this.handleSelect}
            >
              {({
                getInputProps,
                suggestions,
                getSuggestionItemProps,
                loading
              }) => (
                <div>
                  <label>Town/region and country: </label>
                  <input
                    {...getInputProps({
                      placeholder: '"town/region, country.."'
                    })}
                  />
                  <div>
                    {loading ? <div>...loading</div> : null}

                    {suggestions.map(suggestion => {
                      const style = {
                        backgroundColor: suggestion.active ? "#41b6e6" : "#fff"
                      };

                      return (
                        <div {...getSuggestionItemProps(suggestion, { style })}>
                          {suggestion.description}
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}
            </PlacesAutocomplete>

            <form onSubmit={event => this.handleSubmit(event)}>
              <label>
                <input
                  type="radio"
                  value="Image"
                  checked={this.state.sortBy === "Image" ? true : false}
                  onChange={this.updateSortBy}
                />
                Image
              </label>
              <label>
                <input
                  type="radio"
                  value="Video"
                  checked={this.state.sortBy === "Video" ? true : false}
                  onChange={this.updateSortBy}
                />
                Video
              </label>
              {this.state.sortBy === "Image" && (
                <div>
                  <label>Image: </label>
                  <input
                    accept="image/*"
                    id="outlined-button-file"
                    multiple={false}
                    type="file"
                    name="image"
                    onChange={e => this.handleImageChange(e)}
                  />
                  <br />
                </div>
              )}
              {this.state.sortBy === "Video" && (
                <div>
                  <label>Video: </label>
                  <input
                    type="file"
                    name="video"
                    id="upload_widget"
                    accept="video/mp4"
                    multiple={false}
                    onChange={e => this.setVideo(e)}
                  />
                  <br />
                </div>
              )}
              <label>Title: </label>
              <input onChange={this.updateFormData} name="title" />
              <br />
              <label>Content: </label>
              <textarea
                onChange={this.updateFormData}
                name="content"
                type="text-area"
              />
              <br />
              <Button variant="contained" color="secondary" type="submit">
                Create Story
              </Button>
            </form>
          </div>
        )}
        {this.state.userStories.length > 0 ? (
          <div className="prof-box5">
            {this.state.userStories.map(story => (
              <ProfileCard
                story={story}
                user={user}
                key={story.id}
                toggleMapShowing={this.props.toggleMapShowing}
              />
            ))}
          </div>
        ) : (
          <h3 className="explanation-font text-color">
            No stories created yet.
          </h3>
        )}
      </div>
    );
  }
}

export default UserDetails;
