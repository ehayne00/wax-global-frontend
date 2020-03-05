import React from "react";
import API from "../API";
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng
} from "react-places-autocomplete";
import { Button } from "@material-ui/core";

class EditStoryForm extends React.Component {
  state = {
    image: this.props.story.image,
    title: this.props.story.title,
    content: this.props.story.content,
    latitude: this.props.story.latitude,
    longitude: this.props.story.longitude,
    address: this.props.story.address,
    video: this.props.story.video,
    country: this.props.story.country
  };

  setVideo = e => {
    let files = e.target.files[0]
        this.setState({
         video: files
        })
  };

  handleImageChange = e => {
    let files = e.target.files[0]
        this.setState({
          image: files
        })
  };

  setCoordinates = e => {
    this.setState({
      latitude: e.lat,
      longitude: e.lng
    });
  };

  setAddress = e => {
    const place = e.split(", ");
    const country = place[place.length - 1];
    this.setState({
      address: e,
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
      video: this.state.video,
      title: this.state.title,
      content: this.state.content,
      address: this.state.address,
      latitude: this.state.latitude,
      longitude: this.state.longitude,
      country: this.state.country
    };

    API.patch2("http://localhost:3000/stories", this.props.story.id, bodyObj)
      .then(
        updatedStory =>
          this.props.updateStoriesPatched(this.props.story, updatedStory)
        // if (data.error) throw Error(data.error)
      )
      .catch(error => alert(error));
    alert("Story updating!..");
    this.props.toggleEditStoryForm();
    this.props.history.push("/stories");
  };

  render() {
    return (
      <div className="createstory-container">
        <Button
          variant="contained"
          color="secondary"
          onClick={this.props.toggleEditStoryForm}
        >
          x
        </Button>
        <h1>Edit Story Form:</h1>
        <p>
          (Upload one image <u>or</u> video per story, videos take a few minutes
          to upload. You will see your story once the video has finished
          uploading.)
        </p>

        <PlacesAutocomplete
          name="address"
          value={this.state.address}
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
                {...getInputProps({ placeholder: '"town/region, country.."' })}
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
          {this.state.image !== null && (
          <div>
            <label>Image: </label>
            <input
              accept="image/*"
              // value={this.state.image}
              id="outlined-button-file2"
              multiple={false}
              type="file"
              name="image"
              onChange={e => this.handleImageChange(e)}
            />
            <br />
          </div>
          )}
          {this.state.video && (
        <div>
         <label>Video: </label>
         <input type="file"
        //  value={this.state.video}
         id="upload_widget"
         accept="video/mp4"
         multiple={false} 
         name="video"
         onChange={(e) => this.setVideo(e)}/><br />
         </div>
       )}

          <label>Title: </label>
          <input
            onChange={this.updateFormData}
            name="title"
            value={this.state.title}
          />
          <br />
          <label>Content: </label>
          <textarea
            onChange={this.updateFormData}
            name="content"
            value={this.state.content}
            type="text-area"
          />
          <br />
          <Button type="submit" variant="contained" color="secondary" >Update Story</Button>
        </form>
      </div>
    );
  }
}

export default EditStoryForm;
