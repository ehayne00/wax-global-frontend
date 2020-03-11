import React from 'react'
import {Map, InfoWindow, Marker, GoogleApiWrapper} from 'google-maps-react';


const MapView = ({google, onMapClicked, onMarkerClick, onInfoWindowClose, latitude, longitude, toggleMapShowing}) => {
    const style = {
        width: '100%',
        height: '130%'
      }
    return (
        <div >
           <button className="map-x"onClick={() => toggleMapShowing(latitude, longitude)}><u>Exit Map View</u></button>
            <div >
            <Map           
            google={google}
            style={style}
            initialCenter={{
             lat: latitude,
             lng: longitude
            }}
            zoom={10}
            onClick={onMapClicked}>
 
            <Marker onClick={onMarkerClick}
             name={'Current location'} />

            <InfoWindow onClose={onInfoWindowClose}>

            </InfoWindow>
           </Map>
           </div>
        </div>
    )
}


export default GoogleApiWrapper({
    apiKey: ('AIzaSyAgUGzj-VxQPQ1P0uaVNt6r62c9B1rP6Go')
  })(MapView)