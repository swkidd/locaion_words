import React, { Component, useState } from 'react';

import GoogleMapReact from 'google-map-react';

const markerStyles = {
    position: "relative",
    left: "-50px",
    height: "auto",
    width: "100px",
    backgroundColor: "white",
    color: "black",
    fontWeight: "bold",
    textAlign: "center",
    fontSize: "1.5em",
}

export const Marker = ({ style, text }) => <div style={{...markerStyles, ...style}}>{text}</div>;

const mapOptions = (map) => {
    return {
        mapTypeId: "satellite",
        styles: mapStyles,
        streetViewControl: true,
    }
};

const Map = ({
    markers = [],
    defaultZoom,
    defaultCenter,
    onClick,
    ...rest
}) => {
    return (
        <div style={{ height: '100%', width: '100%' }}>
            <GoogleMapReact
                options={mapOptions}
                onClick={onClick}
                bootstrapURLKeys={{ key: "AIzaSyD9jTGYNpWqhcKSA3dI_atkepXqAIvfnck" }}
                defaultCenter={defaultCenter}
                defaultZoom={defaultZoom}
                {...rest}
            >
                {markers}
            </GoogleMapReact>
        </div>
    );
}

export default Map;

const mapStyles = [
    { elementType: 'geometry', stylers: [{ color: '#242f3e' }] },
    { elementType: 'labels.text.stroke', stylers: [{ color: '#242f3e' }] },
    { elementType: 'labels.text.fill', stylers: [{ color: '#746855' }] },
    /*
    {
        featureType: 'administrative.locality',
        elementType: 'labels.text.fill',
        stylers: [{ color: '#d59563' }]
    },
    {
        featureType: 'administrative',
        elementType: 'labels',
        stylers: [{ visibility: 'on' }]
    },
    */
    {
        featureType: 'all',
        elementType: 'labels',
        stylers: [{ visibility: 'off' }]
    },
    {
        featureType: 'poi.park',
        elementType: 'geometry',
        stylers: [{ color: '#263c3f' }]
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
        featureType: 'transit',
        elementType: 'geometry',
        stylers: [{ color: '#2f3948' }]
    },
    {
        featureType: 'water',
        elementType: 'labels',
        stylers: [{ visibility: 'on' }]
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
