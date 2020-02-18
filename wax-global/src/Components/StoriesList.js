import React from 'react'
import StoryCard from './StoryCard'

const StoriesList = ({ stories }) => {
    return (
        <div>
            {stories.map(story => (
                <StoryCard story={story} key={story.id}/>
            ))}
            
        </div>
    )
}

export default StoriesList;