import React from 'react'

const StoryCard = ({story}) => {
    return (
        <div>
            <img className="image-size"alt='oh no!' src={story.image} />
            <h3>📌 {story.region}, {story.country}</h3>
            <button>Read Story</button>
            <button>Show Me Where</button>
        </div>
    )
}

export default StoryCard;