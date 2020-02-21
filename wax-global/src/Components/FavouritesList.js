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


   render() {
    

    return (
        <div>
            <h3>Your Favourites:</h3>
            {this.props.mapShowing &&
            <div><MapView /></div>}
            {this.state.myFavouritesList !== null || this.state.myFavouritesList !== undefined ?
        <div className="prof-box">
          {
              this.state.myFavouriteStories.map(fave => <FavesCard story={fave} key={fave[0].id} toggleMapShowing={this.props.toggleMapShowing}/>)
          }
        </div>
        : <h3>You do not have any favourites yet</h3>}
        </div>
    )
   }
}

export default FavouritesList;