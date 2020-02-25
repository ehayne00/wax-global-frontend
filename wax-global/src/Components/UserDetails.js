import React, { Component } from 'react'
import ProfileCard from './ProfileCard'
import MapView from './MapView'
import API from '../API'
import PlacesAutocomplete, {
    geocodeByAddress, getLatLng
} from 'react-places-autocomplete'
import EditUserForm from './EditUserForm'
const storyUrl = 'http://localhost:3000/stories'
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
        video: "",
        country: ""
    }

    setVideo = e => {
        let files = e.target.files;
        let reader = new FileReader();
        reader.readAsDataURL(files[0]);
  
        reader.onload= e =>{
          this.setState({
            video: e.target.result
          })
        }
    }

    handleImageChange = e => {
        let files = e.target.files;

        let reader = new FileReader();
        reader.readAsDataURL(files[0]);
  
        reader.onload= e =>{
          this.setState({
            image: e.target.result
          })
        }

      }

    setCoordinates = e => {
        
        this.setState({
            latitude: e.lat,
            longitude: e.lng
        })
    }
    
    setAddress = e => {
        const place = e.split(", ")
        const country = place[place.length-1]
        this.setState({
            address: e,
            country: country
        })
    }

    updateFormData = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    handleSelect = async value => {
        const results = await geocodeByAddress(value);
        const latLng = await getLatLng(results[0]);
        this.setAddress(value);
        this.setCoordinates(latLng);
    }

    handleSubmit = e => {
        e.preventDefault()

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
        }

        API.post(storyUrl, bodyObj)
        .then(story => (this.setState({
            userStories: [...this.state.userStories, story]
        }), this.props.updateStories(story)))
        this.toggleCreateFormShowing()
        
    }


    updateUserStories = () => {
        const {user} = this.props.location.state

        fetch(`http://localhost:3000/users/${user.id}`)
        .then(resp => resp.json())
        .then(data => {
            if (this.mounted) {
                this.setState({
                    userStories: data.stories
                })
            }
        })
    }

    componentDidMount() {
        this.mounted = true;
        this.updateUserStories()
       
    }

    componentWillUnmount(){
        this.mounted = false;
    }

    toggleCreateFormShowing = () => {
        this.setState({ createFormShowing: !this.state.createFormShowing})
    }

    toggleEditFormShowing = () => {
        this.setState({ editFormShowing: !this.state.editFormShowing})
    }

    render() {
        const {user} = this.props.location.state
        // debugger
    return (
        
        <div>
            <h1>{user.username}</h1>
            <div>{user.image ?
            <img className="profile-image" alt="oh no!" src={user.image} />
            : <img className="profile-image" alt="oh no!" 
             src="https://i.ibb.co/9wsq5cz/Screenshot-2020-02-19-at-09-57-20.png" /> }
            </div>
            <p>{user.bio}</p>
            {this.props.mapShowing &&
            <div><MapView latitude={this.props.latitude} 
            longitude={this.props.longitude} toggleMapShowing={this.props.toggleMapShowing}/></div>}
            {this.props.user === user && (

            <div>
              <button onClick={() => this.props.deleteUser()}>Delete My Account</button>
              <button onClick={() => this.toggleEditFormShowing()}>Edit My Profile</button>
              <button onClick={() => this.toggleCreateFormShowing()}>Create Story</button>
            </div>
            )}

            {this.state.createFormShowing && ( 
                <div>
                <h1>Create Story Form:</h1>
                <p>(Upload one image <u>or</u> video per story, videos take a few minutes to upload. You will see your story once the video has finished uploading.)</p>

                <PlacesAutocomplete name='address' value={this.state.address} onChange={(e) =>this.setAddress(e)} onSelect={this.handleSelect}>
                    {({getInputProps, suggestions, getSuggestionItemProps, loading}) => (
                        <div>
                            <label>Town/region and country: </label>
                            <input {...getInputProps({placeholder: '"town/region, country.."'})} />
                            <div>
                                {loading ? <div>...loading</div> : null}

                                {suggestions.map(suggestion => {

                                   const style = {
                                       backgroundColor: suggestion.active ? "#41b6e6" : "#fff"
                                   }


                                    return (
                                    <div {...getSuggestionItemProps(suggestion, { style })}>
                                        {suggestion.description}</div>)
                                })}
                            </div>
                        </div>
                    )}
                </PlacesAutocomplete>

                
                <form onSubmit={(event) => this.handleSubmit(event)}>
                    <label>Image: </label>
                     <input
                     accept="image/*"      
                     id="outlined-button-file"
                     multiple={false}
                     type="file"
                     name="file"
                     onChange={(e) => this.handleImageChange(e)}
                     /><br />
                     <label>Video: </label>
                     <input type="file"
                     id="upload_widget"
                     accept="video/mp4"
                     multiple={false} 
                     onChange={(e) => this.setVideo(e)}/><br />

                    <label>Title: </label>
                    <input onChange={this.updateFormData} name='title' /><br />
                    <label>Content: </label>
                    <textarea onChange={this.updateFormData} name='content' type="text-area" /><br />
                    <button>Create Story</button>
                 </form>
                </div>
            )}
            <div className="prof-box">
               {
                   this.state.userStories.map(story => <ProfileCard story={story} user={user} key={story.id} toggleMapShowing={this.props.toggleMapShowing}/>)
               }
            </div>
        
       

        {this.state.editFormShowing && (
            <EditUserForm user={this.props.user} toggleEditFormShowing={this.toggleEditFormShowing}/>
        )} 
        </div>
             )
        }
        
}

export default UserDetails;

