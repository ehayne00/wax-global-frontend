import React from 'react'


const StoryDetails = (props) => {

   const {story} = props.location.state

    return (
        <div>
            <h3>{story.user.username}</h3>
            <div>{story.user.image ?
            <img className="profile-image"alt="oh no!"src={story.user.image}/>
            : <img className="profile-image" alt="oh no!" 
            src="https://i.ibb.co/9wsq5cz/Screenshot-2020-02-19-at-09-57-20.png" />
            }</div>
            <h2><u>{story.title}</u></h2>
            { story.image ?
            <img className="picture-uploaded"alt="oh no!" src={story.image}/>
            : <video className="picture-uploaded" controls autoPlay loop>
                <source src={story.video} type="video/mp4"/>
            </video>
            }
            <h3><span role="img">📌 </span>{story.address}</h3>
            <p>{story.content}</p>
            <button onClick={() => props.addToFavourites(story.id)}>Add To Favourites</button>
        </div>
    )

    
}

export default StoryDetails;