import React, { useState } from 'react'

const markerStyles = (currentZoom, zoom) => {
    //markers are in view for two zooms in and one out 
    const zoomDif = currentZoom - zoom;
    const scale = (zoomDif < -1 || zoomDif > 1) ? 0 : 1 + zoomDif / 2;
    let markerStyle = {
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
    /*
    if (zoom < 15) {
        markerStyle = {}
    }
    */

    return {
        ...markerStyle,
        transform: `translate(-50%, -50%) scale(${scale})`,
    }
}

const FlashCardMarker = ({ currentZoom, zoom, frontText, backText }) => {
    const [showFront, setShowFront] = useState(true)
    return (
        <div
            style={markerStyles(currentZoom, zoom)}
            onClick={() => setShowFront(!showFront)}
        >
            {showFront ? frontText : backText}
        </div>
    )
}

export default FlashCardMarker