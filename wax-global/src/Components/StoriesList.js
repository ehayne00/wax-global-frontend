import React from 'react'
import StoryCard from './StoryCard'
import MapView from './MapView'

const StoriesList = ({ stories, mapShowing, toggleMapShowing, updateSelectedStory, 
    updateSelectedUserToTargetUser, latitude, longitude, updateSearchTerm, renderMore }) => {
    return (
        <div>
            <div className="filter-input explanation-font"> I want to checkout surf spots in: 
              <input onChange={updateSearchTerm} placeholder="Enter Country name..." /> 
            </div>
            {mapShowing &&
            <div><MapView latitude={latitude} longitude={longitude}
            toggleMapShowing={toggleMapShowing}/></div>}
            <div className="prof-box">
            {stories.map(story => (
                <StoryCard story={story} key={story.id} toggleMapShowing={toggleMapShowing} 
                updateSelectedStory={updateSelectedStory} 
                updateSelectedUserToTargetUser={updateSelectedUserToTargetUser}/>
            ))}
            </div>
            <button className='morebutton' onClick={renderMore} ><span>See More..</span></button>
        </div>
    )
}

export default StoriesList;