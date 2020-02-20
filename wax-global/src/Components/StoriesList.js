import React from 'react'
import StoryCard from './StoryCard'
import MapView from './MapView'

const StoriesList = ({ stories, mapShowing, toggleMapShowing, updateSelectedStory, updateSelectedUserToTargetUser }) => {
    return (
        <div>
            {mapShowing &&
            <div><MapView /></div>}
            <div className="prof-box">
            {stories.map(story => (
                <StoryCard story={story} key={story.id} toggleMapShowing={toggleMapShowing} updateSelectedStory={updateSelectedStory} updateSelectedUserToTargetUser={updateSelectedUserToTargetUser}/>
            ))}
            </div>
            
        </div>
    )
}

export default StoriesList;