import React from 'react'
import API from '../API'
import FavesCard from './FavesCard'
import MapView from './MapView'

class FavouritesList extends React.Component {

    state = {
        myFavouriteStories: []
        
    }

    updateMyFavouritesList = () => {
        API.fetchUserFavourites()
        .then(data => this.setState({
          myFavouriteStories: data
        }))
    }

    componentDidMount() {
        this.updateMyFavouritesList()
    }

    deleteFave = (id, faveStoryId) => {
      API.destroy('http://localhost:3000/favourites', id)
      .then(this.setState({
          myFavouriteStories: [...this.state.myFavouriteStories].filter(story => story[0].id !== faveStoryId)
          
      }))
      alert('Favourite deleted!')
    }

    // deleteStory = (id) => {

    //     API.destroy('http://localhost:3000/stories', id)
    //     .then(this.setState({
    //       stories: [...this.state.stories].filter(story => story.id !== id)
    //     }))
    //     alert('Story deleted!')
    //   }


   render() {
    

    return (
        <div>
            <p>Use this space to store stories that inspire you/ places you aspire to surf!</p>
            <h3>Your Favourites:</h3>
            {this.props.mapShowing &&
            <div><MapView latitude={this.props.latitude} longitude={this.props.longitude}
            toggleMapShowing={this.props.toggleMapShowing}/></div>}
            {this.state.myFavouriteStories !== null || this.state.myFavouritesList !== undefined ?
        <div className="prof-box">
          { this.state.myFavouriteStories && (
              this.state.myFavouriteStories.map(fave => <FavesCard story={fave} key={fave[2].id} 
                toggleMapShowing={this.props.toggleMapShowing} deleteFave={this.deleteFave}/>)
          )
          }
         </div>
        : 
            <h3>You do not have any favourites yet</h3>}
          </div>
    )
   }
}

export default FavouritesList;