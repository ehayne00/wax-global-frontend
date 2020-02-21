import React, { Component } from 'react'
import ProfileCard from './ProfileCard'
import MapView from './MapView'
import StoryForm from './StoryForm'


class UserDetails extends Component {

    state = {
        userStories: [],
        formShowing: false
    }


    updateUserStories = () => {
        const details = this.props.location.state.user

        fetch(`http://localhost:3000/users/${details.id}`)
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

    toggleFormShowing = () => {
        this.setState({ formShowing: !this.state.formShowing})
    }

    render() {
        const details = this.props.location.state.user
    return (
        <div>
            <h1>{details.username}</h1>
            <div>{details.image ?
            <img className="profile-image" alt="oh no!" src={details.image} />
            : <img className="profile-image" alt="oh no!" 
             src="https://i.ibb.co/9wsq5cz/Screenshot-2020-02-19-at-09-57-20.png" /> }
            </div>
            <p>{details.bio}</p>
            {this.props.mapShowing &&
            <div><MapView /></div>}
            {this.props.user === details && (

            <div>
              <button>Delete My Account</button>
              <button>Edit My Profile</button>
              <button onClick={() => this.toggleFormShowing()}>Create Story</button>
            </div>
            )}
            {this.state.formShowing && (
                <div><StoryForm /></div>
            )}
            <div className="prof-box">
               {
                   this.state.userStories.map(story => <ProfileCard story={story} user={details} key={story.id} toggleMapShowing={this.props.toggleMapShowing}/>)
               }
            </div>
        </div>
    )
        }
}

export default UserDetails;

