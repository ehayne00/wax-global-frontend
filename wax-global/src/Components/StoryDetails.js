import React from 'react'
import EditStoryForm from './EditStoryForm'
import API from '../API'


class StoryDetails extends React.Component {

    state = {
        myFavouriteInstances: [],
        myFaveStories: [],
        editStoryFormShowing: false,
        addToFavouritesButtonShowing: true,
        removeFromFavouritesButtonShowing: false
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
        const {story} = this.props.location.state
        API.fetchUserFavourites()
        .then(data => 
            (this.setState({
          myFaveStories: data.map(fave => fave[0].id),
          myFavouriteInstances: data.map(fave => fave[2])
        }),
        this.buttonShowing(story))
        )
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

   

render() {
   const {story} = this.props.location.state

    return (
        <div>
            <h3>{story.user.username}</h3>
            <div>{story.user.image ?
            <img className="profile-image"alt="oh no!"src={story.user.image}/>
            : <img className="profile-image" alt="oh no!" 
            src="https://i.ibb.co/9wsq5cz/Screenshot-2020-02-19-at-09-57-20.png" />
            }</div>
            <h2><u>{story.title}</u></h2>
            { story.image ?
            <img className="picture-uploaded"alt="oh no!" src={story.image}/>
            : <video className="picture-uploaded" controls autoPlay loop muted>
                <source src={story.video} type="video/mp4"/>
            </video>
            }
            <h3><span role="img">📌 </span>{story.address}</h3>
            <p>{story.content}</p>
            {this.state.addToFavouritesButtonShowing &&(
            <button onClick={() => this.props.addToFavourites(story.id, this.toggleFavouriteAndRemoveButtons, this.updateState)}>Add To Favourites</button>
            )}
            {this.state.removeFromFavouritesButtonShowing &&(
            <button onClick={() => this.deleteFave(this.state.myFavouriteInstances, story, this.props.user)}>Remove From Favourites</button>
            )}
            {this.props.user.id === story.user.id && (
                <div>
                <button onClick={() => this.props.deleteStory(story.id)}>Delete Story</button>
                <button onClick={() => this.toggleEditStoryForm()}>Edit Story</button>
                </div>
            )} 
            {this.state.editStoryFormShowing && (
                
                    <EditStoryForm {...this.props} story={story} user={this.props.user} toggleEditStoryForm={this.toggleEditStoryForm} 
                    stories={this.props.stories} updateStoriesPatched={this.props.updateStoriesPatched}/>
                
            )}
          </div>
    )

   }
}

export default StoryDetails;