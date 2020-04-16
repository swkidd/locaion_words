import React, { Component, useState, useRef, useEffect } from 'react';

import GoogleMapReact from 'google-map-react';

const markerStyles = {
    height: "auto",
    maxHeight: "300px",
    height: "50px",
    maxWidth: "300px",
    minWidth: "100px",
    width: "max-content",
    overflow: "auto",
    backgroundColor: "white",
    color: "black",
    fontWeight: "bold",
    textAlign: "center",
    fontSize: "1.5em",
}

export const Marker = ({ style, text }) => (
    <div 
            style={{...markerStyles, ...style}}
            dangerouslySetInnerHTML={{ __html: text }}
        >
        </div>
);


const Map = ({
    setDimensions,
    defaultZoom,
    defaultCenter,
    onClick,
    children,
    ...rest
}) => {
    const mapOptions = (map) => {
        return {
            styles: mapStyle(rest.zoom),
            mapTypeId: "hybrid",
            streetViewControl: true,
        }
    };
    const mapRef = useRef()
    const onResize = () => {
        setDimensions(mapRef.current.getBoundingClientRect())
    }
    
    useEffect(() => {
        onResize()
    }, [])
    return (
        <div ref={mapRef} style={{ height: '100%', width: '100%' }}>
            <GoogleMapReact
                options={mapOptions}
                onClick={onClick}
                bootstrapURLKeys={{ key: "AIzaSyD9jTGYNpWqhcKSA3dI_atkepXqAIvfnck" }}
                defaultCenter={defaultCenter}
                defaultZoom={defaultZoom}
                {...rest}
            >
                {children}
            </GoogleMapReact>
        </div>
    );
}

export default Map;

//remove locality labels (chome etc) when zoomed in
const mapStyle = (zoom) => [{
        "elementType": "labels",
        "stylers": [{
            "visibility": "off"
        }]
    },
    {
        "featureType": "administrative",
        "elementType": "geometry",
        "stylers": [{
            "visibility": "off"
        }]
    },
    {
        "featureType": "administrative.locality",
        "stylers": [{
            "visibility": (zoom > 14) ? "off" : "on"
        }]
    },
    {
        "featureType": "administrative.land_parcel",
        "stylers": [{
            "visibility": "off"
        }]
    },
    {
        "featureType": "administrative.neighborhood",
        "stylers": [{
            "visibility": "off"
        }]
    },
    {
        "featureType": "poi",
        "stylers": [{
            "visibility": "off"
        }]
    },
    {
        "featureType": "road",
        "stylers": [{
            "visibility": "off"
        }]
    },
    {
        "featureType": "road",
        "elementType": "labels.icon",
        "stylers": [{
            "visibility": "off"
        }]
    },
    {
        "featureType": "transit",
        "stylers": [{
            "visibility": "off"
        }]
    }
]

