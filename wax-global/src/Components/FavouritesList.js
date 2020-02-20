import React from 'react'
import StoryCard from './StoryCard'

class FavouritesList extends React.Component {



   render() {
    return (
        <div>
            <h3>Your Favourites:</h3>
            {this.props.myFavouritesList !== null || this.props.myFavouritesList !== undefined ?
        <div className="prof-box">
          {
              this.props.myFavouritesList.map(fave => <StoryCard item={fave} key={fave.id}/>)
          }
        </div>
        : <h3>You do not have any favourites yet</h3>}
        </div>
    )
   }
}

export default FavouritesList;