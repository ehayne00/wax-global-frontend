import React from 'react'


const StoryDetails = (props) => {

   const details = props.location.state.story

    return (
        <div>
            <h3>{details.user.username}</h3>
            <img className="profile-image"alt="oh no!"src={details.user.image}/>
            <h2><u>{details.title}</u></h2>
            <img className="picture-uploaded"alt="oh no!" src={details.image}/>

            <h3>{details.region}, {details.country}</h3>
            <p>{details.content}</p>
            <button onClick={() => props.addToFavourites(details.id)}>Add To Favourites</button>
        </div>
    )
    
}

export default StoryDetails;