import React from 'react'
import { Link } from 'react-router-dom'
// import {GoogleApiWrapper} from 'google-maps-react';
// import StoryDetails from './StoryDetails';


const StoryCard = ({story, toggleMapShowing}) => {
    return (
        <div className="card"> 
          <div className="thumbnails">{story.user.image ?
            <img className="thumbnail-image" alt="oh no!" src={story.user.image} />
          : <img className="thumbnail-image" alt="oh no!" src="https://i.ibb.co/z5Xj6hH/profile-pic.png" /> }
            <Link to={{pathname: `/users/${story.user_id}`,
            state: {user: story.user}}} >
            <p className="thumbnail-name">{story.user.username}</p>
            </Link>
            </div>
            { story.image ?
            <img className="image-size"alt='oh no!' src={story.image} />
            : <video className="image-size" controls autoPlay loop muted>
              <source src={story.video} type="video/mp4" />
            </video>
            }
            <h3><span role="img">📌</span> {story.address}</h3>
          <p>"{story.title}.."</p>
            <Link to={{pathname:`/stories/${story.id}`,
            state: {story: story}}} >
              <button>Read Story</button>
            </Link>
            <button onClick={() => toggleMapShowing(story.latitude, story.longitude)}>Show Me Where</button>
        </div>

    )
}

export default StoryCard;