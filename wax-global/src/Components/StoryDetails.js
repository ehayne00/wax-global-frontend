import React from 'react'
import EditStoryForm from './EditStoryForm'
import API from '../API'
import { Button } from '@material-ui/core'
import { Link } from 'react-router-dom'


class StoryDetails extends React.Component {

    state = {
        myFavouriteInstances: [],
        myFaveStories: [],
        editStoryFormShowing: false,
        addToFavouritesButtonShowing: true,
        removeFromFavouritesButtonShowing: false,
        currentUser: {}
    }

    updateState = fave => {
         this.setState({
             myFavouriteInstances: [...this.state.myFavouriteInstances, fave]

         })
    }

    toggleEditStoryForm = () => {
        this.setState({
          editStoryFormShowing: !this.state.editStoryFormShowing
        })
    }

    toggleFavouriteAndRemoveButtons = () => {
        this.setState({
            addToFavouritesButtonShowing: !this.state.addToFavouritesButtonShowing,
            removeFromFavouritesButtonShowing: !this.state.removeFromFavouritesButtonShowing
        })
    }

    componentDidMount() {
        
        this.validateUser()
        
    }

    componentDidUpdate(prevProps, prevState) {
        const {story} = this.props.location.state

        if(prevState.currentUser !== this.state.currentUser) {
            API.fetchUserFavourites()
        .then(data => 
            (this.setState({
          myFaveStories: data.map(fave => fave[0].id),
          myFavouriteInstances: data.map(fave => fave[2])
        }),
        this.buttonShowing(story))
        )
        }
    }

    buttonShowing = (story) => {
        this.state.myFaveStories.includes(story.id) ?
        this.setState({
            addToFavouritesButtonShowing: false,
            removeFromFavouritesButtonShowing: true
        })
        : this.setState({
            addToFavouritesButtonShowing: true,
            removeFromFavouritesButtonShowing: false
        })
    }

    deleteFave = (favourites, story, user) => {
        let fave = favourites.find(fave => fave.story_id.toString() === story.id.toString() && fave.user_id.toString() === user.id.toString())
        API.destroy('http://localhost:3000/favourites', fave.id)
        this.toggleFavouriteAndRemoveButtons()
        alert('Favourite deleted!')
    }

validateUser = () => {
        fetch("http://localhost:3000/validate", {
         headers: {
         Authorization: localStorage.token
        }
        }).then(resp => resp.json()).then(data => (
       this.setState({
        currentUser: data.user})
       ))
}

render() {
   const {story} = this.props.location.state

    // this.state.currentUser === null && this.validateUser()
    // debugger
    return (
        <div className="prof-box4">

            <Link to={{pathname: `/users/${story.user_id}`,
            state: {user: story.user}}} >
            <div className="name-pic-div">
            <h3 className="explanation-font">{story.user.username}</h3>
            <div>{story.user.image ?
            <img className="profile-image" alt="oh no!"src={story.user.image}/>
            : <img className="profile-image" alt="oh no!" 
            src="https://i.ibb.co/z5Xj6hH/profile-pic.png" />
            }</div>
            </div>
            </Link>
            <h2 className="user-font text-width"><u>"{story.title}"</u></h2>
            { story.image ?
            <img className="picture-uploaded"alt="oh no!" src={story.image}/>
            : <video className="picture-uploaded" controls autoPlay loop muted>
                <source src={story.video} type="video/mp4"/>
            </video>
            }
            <h3><span role="img">📌 </span>{story.address}</h3>
            <div >
            <p className="user-font story-text">"{story.content}"</p>
            </div>
            <div>
            {this.state.addToFavouritesButtonShowing &&(
            <Button className="button-four"variant='contained'color='secondary' onClick={() => this.props.addToFavourites(story.id, this.toggleFavouriteAndRemoveButtons, this.updateState)}>Add To Favourites</Button>
            )}
            {this.state.removeFromFavouritesButtonShowing &&(
            <Button className="button-four"variant='contained' color='secondary' onClick={() => this.deleteFave(this.state.myFavouriteInstances, story, this.state.currentUser)}>Remove From Favourites</Button>
            )}
            
            {this.state.currentUser.id === story.user.id && (
                <div className="buttons-width">
                <Button className="button-five" variant='contained' color='secondary'onClick={() => this.props.deleteStory(story.id)}>Delete Story</Button>
                <Button className="button-six" variant='contained' color='secondary'onClick={() => this.toggleEditStoryForm()}>Edit Story</Button>
                </div>
            )} 
            </div>
            {this.state.editStoryFormShowing && (
                
                    <EditStoryForm {...this.props} story={story} user={this.props.user} toggleEditStoryForm={this.toggleEditStoryForm} 
                    stories={this.props.stories} updateStoriesPatched={this.props.updateStoriesPatched}/>
                
            )}
          </div>
    )

   }
}

export default StoryDetails;