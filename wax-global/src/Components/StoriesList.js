import React from 'react'
import StoryCard from './StoryCard'
import MapView from './MapView'

const StoriesList = ({ stories, mapShowing, toggleMapShowing, updateSelectedStory, 
    updateSelectedUserToTargetUser, latitude, longitude, updateSearchTerm, renderMore }) => {
    return (
        <div className="wide">
            <div className="filter-input explanation-font prof-box2 input-box"> I want to checkout surf spots in: 
              <input onChange={updateSearchTerm} placeholder="Enter Country name..." /> 
            </div>
            {mapShowing &&
            <div className="map-view"><MapView latitude={latitude} longitude={longitude}
            toggleMapShowing={toggleMapShowing}/></div>}
            <div className="prof-box">
            {stories.map(story => (
                <StoryCard story={story} key={story.id} toggleMapShowing={toggleMapShowing} 
                updateSelectedStory={updateSelectedStory} 
                updateSelectedUserToTargetUser={updateSelectedUserToTargetUser}/>
            ))}
            </div>
            <div className="input-box">
            <button className='morebutton' onClick={renderMore} ><span>See More..</span></button>
            </div >
        </div>
    )
}

export default StoriesList;