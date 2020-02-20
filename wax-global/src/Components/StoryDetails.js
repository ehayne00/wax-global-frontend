import React from 'react'


const StoryDetails = ({selectedStory}) => {



    

        // const story = props.location.storyProps
        // console.log(story)

    return (
        <div>
            <img alt="oh no!"src={selectedStory.user.image}/>
            <h3>{selectedStory.user.username}</h3>
            <img alt="oh no!" src={selectedStory.image}/>
            <h2>{selectedStory.title}</h2>
            <h3>{selectedStory.region}, {selectedStory.country}</h3>
            <p>{selectedStory.content}</p>
            <button>Add To Favourites</button>
        </div>
    )
    
}

export default StoryDetails;