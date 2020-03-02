import React from 'react'
import { Link } from 'react-router-dom'
import { Button } from '@material-ui/core'
// import {GoogleApiWrapper} from 'google-maps-react';
// import StoryDetails from './StoryDetails';


const StoryCard = ({story, toggleMapShowing}) => {
    return (
        <div className="card"> 
        <div>
          <div className="address-background">
            <h4 className="h4-position"><span role="img">📌</span> {story.address}</h4>
          </div>
          <div className="thumbnails">{story.user.image ?
            <img className="thumbnail-image" alt="oh no!" src={story.user.image} />
          : <img className="thumbnail-image" alt="oh no!" src="https://i.ibb.co/z5Xj6hH/profile-pic.png" /> }
            <Link to={{pathname: `/users/${story.user_id}`,
            state: {user: story.user}}} >
            <p className="thumbnail-name">{story.user.username}</p>
            </Link>
            </div>
            <div>
            { story.image ?
            <img className="image-size"alt='oh no!' src={story.image} />
            : <video className="image-size" controls autoPlay loop muted>
              <source src={story.video} type="video/mp4" />
            </video>
            }
            </div>
            <div >
            <Link to={{pathname:`/stories/${story.id}`,
            state: {story: story}}} >
            <Button color="secondary">Read Story</Button>
            </Link>
            <Button color="secondary"onClick={() => toggleMapShowing(story.latitude, story.longitude)}>Show Me Where</Button>
            </div>
            <div>
              <p >"{story.title}.."</p>
            </div>
            </div>
        </div>

    )
}

export default StoryCard;