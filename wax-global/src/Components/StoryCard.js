import React from 'react'
import { Link } from 'react-router-dom'

const StoryCard = ({story}) => {
    return (
        <div>
            <img className="image-size"alt='oh no!' src={story.image} />
            <h3>📌 {story.region}, {story.country}</h3>
            <Link to={`/stories/${story.id}`} >
            <button>Read Story</button>
            </Link>
            <button>Show Me Where</button>
        </div>
    )
}

export default StoryCard;