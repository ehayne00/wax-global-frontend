import React from 'react'
import { Link } from 'react-router-dom'
// import {GoogleApiWrapper} from 'google-maps-react';
// import StoryDetails from './StoryDetails';


const FavesCard = ({story, toggleMapShowing}) => {
    const newStory = {...story[0], user: story[1]}
    return (
        <div className="card"> 
          <div className="thumbnails">{story[1].image ?
            <img className="thumbnail-image" alt="oh no!" src={story[1].image} />
          : <img className="thumbnail-image" alt="oh no!" src="https://i.ibb.co/9wsq5cz/Screenshot-2020-02-19-at-09-57-20.png" /> }
            <Link to={{pathname: `/users/${story[1].id}`,
            state: {user: story[1]}}} >
            <p className="thumbnail-name">{story[1].username}</p>
            </Link>
            </div>
            { story[0].image ?
            <img className="image-size"alt='oh no!' src={story[0].image} />
            : <video className="image-size" controls autoPlay loop>
              <source src={story[0].video} type="video/mp4"/>
            </video>
            }
            <h3><span role="img">📌</span> {story[0].address}</h3>
            <Link to={{pathname:`/stories/${story[0].id}`,
            state: {story: newStory}}} >
              <button>Read Story</button>
            </Link>
            <button onClick={() => toggleMapShowing(story[0].latitude, story[0].longitude)}>Show Me Where</button>
            <button>Remove story</button>
        </div>

    )
}

export default FavesCard;