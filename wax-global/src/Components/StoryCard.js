import React from 'react'
import { Link } from 'react-router-dom'


const StoryCard = ({story, toggleMapShowing}) => {
    return (
        <div className="card"> 
          <div className="thumbnails">{story.user.image ?
            <img className="thumbnail-image" alt="oh no!" src={story.user.image} />
          : <img className="thumbnail-image" alt="oh no!" src="https://i.ibb.co/9wsq5cz/Screenshot-2020-02-19-at-09-57-20.png" /> }
            <Link to={`/users/${story.user_id}`} >
            <p className="thumbnail-name">{story.user.username}</p>
            </Link>
            </div>
            <img className="image-size"alt='oh no!' src={story.image} />
            <h3>📌 {story.region}, {story.country}</h3>
            <Link to={`/stories/${story.id}`} >
            <button>Read Story</button>
            </Link>
            <button onClick={() => toggleMapShowing()}>Show Me Where</button>
        </div>
    )
}

export default StoryCard;