import React from 'react'
import StoryCard from './StoryCard'
import MapView from './MapView'

const StoriesList = ({ stories, mapShowing, toggleMapShowing }) => {
    return (
        <div>
            {mapShowing &&
            <div><MapView /></div>}
            <div className="prof-box">
            {stories.map(story => (
                <StoryCard story={story} key={story.id} toggleMapShowing={toggleMapShowing}/>
            ))}
            </div>
            
        </div>
    )
}

export default StoriesList;