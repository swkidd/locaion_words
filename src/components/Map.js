import React, { Component, useState } from 'react';

import GoogleMapReact from 'google-map-react';

const markerStyles = {
    height: "auto",
    maxHeight: "300px",
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
        <div style={{...markerStyles, ...style}}>{text}</div>
);

const mapOptions = (map) => {
    return {
        mapTypeId: "hybrid",
        streetViewControl: true,
    }
};

const Map = ({
    defaultZoom,
    defaultCenter,
    onClick,
    children,
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
                {children}
            </GoogleMapReact>
        </div>
    );
}

export default Map;
