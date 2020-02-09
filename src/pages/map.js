import React, { Component, useState } from 'react';
import GoogleMapReact from 'google-map-react';

const markerStyles = {
    height: "100px",
    width: "100px",
    backgroundColor: "chartreuse",
    color: "white",
    fontWeight: "bold",
    fontSize: "7em",
    textAlign: "center",
}
const AnyReactComponent = ({ text }) => <div style={markerStyles}>{text}</div>;

const mapOptions = (map) => {
    return {
        styles: styles,
        streetViewControl: true,
    }
};

const SimpleMap = ({ center = { lat: 35.679835, lng: 139.769099 }, zoom = 11, ...props }) => {

    const [map, setMap] = useState({});
    const [pano, setPano] = useState({});

    const handleApiLoaded = (map, maps) => {
        setMap(map);
        var bankMarker = new maps.Marker({
            position: { lat: center.lat, lng: center.lng },
            map: map,
            icon: 'https://chart.apis.google.com/chart?chst=d_map_pin_icon&chld=dollar|FFFF00',
            title: 'Bank'
        });
        // pano.visible is true when in streetview
        setPano(map.getStreetView());
    }

    const onClick = () => console.log(map);


    return (
        <div style={{ height: '100vh', width: '100%' }}>
        <GoogleMapReact
          options={mapOptions}
          onClick={onClick}
          bootstrapURLKeys={{ key: "AIzaSyD9jTGYNpWqhcKSA3dI_atkepXqAIvfnck" }}
          defaultCenter={center}
          defaultZoom={zoom}
          yesIWantToUseGoogleMapApiInternals={true}
          onGoogleApiLoaded={({ map, maps }) => handleApiLoaded(map, maps)}
        >
        </GoogleMapReact>
      </div>
    );
}

export default SimpleMap;


const styles = [
    { elementType: 'geometry', stylers: [{ color: '#242f3e' }] },
    { elementType: 'labels.text.stroke', stylers: [{ color: '#242f3e' }] },
    { elementType: 'labels.text.fill', stylers: [{ color: '#746855' }] },
    {
        featureType: 'administrative.locality',
        elementType: 'labels.text.fill',
        stylers: [{ color: '#d59563' }]
    },
    {
        featureType: 'all',
        elementType: 'labels',
        stylers: [{ visibility: 'off' }]
    },
    {
        featureType: 'administrative',
        elementType: 'labels',
        stylers: [{ visibility: 'on' }]
    },
    {
        featureType: 'poi.park',
        elementType: 'labels',
        stylers: [{ visibility: 'on' }]
    },
    {
        featureType: 'poi',
        elementType: 'labels.text.fill',
        stylers: [{ color: '#d59563' }]
    },
    {
        featureType: 'poi.park',
        elementType: 'geometry',
        stylers: [{ color: '#263c3f' }]
    },
    {
        featureType: 'poi.park',
        elementType: 'labels.text.fill',
        stylers: [{ color: '#6b9a76' }]
    },
    {
        featureType: 'road',
        elementType: 'geometry',
        stylers: [{ color: '#38414e' }]
    },
    {
        featureType: 'road',
        elementType: 'geometry.stroke',
        stylers: [{ color: '#212a37' }]
    },
    {
        featureType: 'road',
        elementType: 'labels.text.fill',
        stylers: [{ color: '#9ca5b3' }]
    },
    {
        featureType: 'road.highway',
        elementType: 'geometry',
        stylers: [{ color: '#746855' }]
    },
    {
        featureType: 'road.highway',
        elementType: 'geometry.stroke',
        stylers: [{ color: '#1f2835' }]
    },
    {
        featureType: 'road.highway',
        elementType: 'labels.text.fill',
        stylers: [{ color: '#f3d19c' }]
    },
    {
        featureType: 'transit',
        elementType: 'geometry',
        stylers: [{ color: '#2f3948' }]
    },
    {
        featureType: 'transit.station',
        elementType: 'labels.text.fill',
        stylers: [{ color: '#d59563' }]
    },
    {
        featureType: 'water',
        elementType: 'geometry',
        stylers: [{ color: '#17263c' }]
    },
    {
        featureType: 'water',
        elementType: 'labels.text.fill',
        stylers: [{ color: '#515c6d' }]
    },
    {
        featureType: 'water',
        elementType: 'labels.text.stroke',
        stylers: [{ color: '#17263c' }]
    }
]
