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
            <p>Use this space to store stories that inspire you/ places you aspire to surf!</p>
            <h3>Your Favourites:</h3>
            {this.props.mapShowing &&
            <div><MapView latitude={this.props.latitude} longitude={this.props.longitude}
            toggleMapShowing={this.props.toggleMapShowing}/></div>}
            {this.state.myFavouriteStories !== null || this.state.myFavouritesList !== undefined ?
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