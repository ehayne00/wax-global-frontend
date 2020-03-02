import React from 'react'
import { Link } from 'react-router-dom'
import { Button } from '@material-ui/core'
// import StoryDetails from './StoryDetails';


const FavesCard = ({story, toggleMapShowing, deleteFave}) => {
    const newStory = {...story[0], user: story[1]}
    return (
        <div className="card"> 
        <div className="address-background">
          <h4 className="h4-position"><span role="img">📌</span> {story[0].address}</h4>
        </div>
          <div className="thumbnails">{story[1].image ?
            <img className="thumbnail-image" alt="oh no!" src={story[1].image} />
          : <img className="thumbnail-image" alt="oh no!" src="https://i.ibb.co/z5Xj6hH/profile-pic.png" /> }
            <Link to={{pathname: `/users/${story[1].id}`,
            state: {user: story[1]}}} >
            <p className="thumbnail-name">{story[1].username}</p>
            </Link>
            </div>
            <div>
            { story[0].image ?
            <img className="image-size"alt='oh no!' src={story[0].image} />
            : <video className="image-size" controls autoPlay loop muted>
              <source src={story[0].video} type="video/mp4"/>
            </video>
            }
            </div>
            <div>
            <Link to={{pathname:`/stories/${story[0].id}`,
            state: {story: newStory}}} >
              <Button color="secondary">Read Story</Button>
            </Link>
            <Button color="secondary" onClick={() => toggleMapShowing(story[0].latitude, story[0].longitude)}>Show Me Where</Button>
            <Button color="secondary" onClick={() => deleteFave(story[2].id, story[0].id)}>Remove story</Button>
            </div>
            <div>
              <p >"{story[0].title}.."</p>
            </div>
        </div>

    )
}

export default FavesCard;