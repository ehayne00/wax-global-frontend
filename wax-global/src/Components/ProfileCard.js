import React from 'react'
import { Link } from 'react-router-dom'
import StoryDetails from './StoryDetails';


const ProfileCard = ({story, user, toggleMapShowing}) => {
    const newStory = {...story, user: user}

    return (
        <div className="card"> 
          <div className="thumbnails">{user.image ?
            <img className="thumbnail-image" alt="oh no!" src={user.image} />
          : <img className="thumbnail-image" alt="oh no!" src="https://i.ibb.co/9wsq5cz/Screenshot-2020-02-19-at-09-57-20.png" /> }
            <Link to={{pathname: `/users/${story.user_id}`,
            state: {user: user}}} >
            <p className="thumbnail-name">{user.username}</p>
            </Link>
            </div>
            <img className="image-size"alt='oh no!' src={story.image} />
            <h3><span role="img">📌</span> {story.region}, {story.country}</h3>
            <Link to={{pathname:`/stories/${story.id}`,
            state: {story: newStory}}} >
              <button>Read Story</button>
            </Link>
            <button onClick={() => toggleMapShowing()}>Show Me Where</button>
        </div>

    )
}

export default ProfileCard;