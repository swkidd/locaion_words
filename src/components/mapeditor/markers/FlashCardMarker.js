import React, { useState } from 'react'

const markerStyles = (currentZoom, zoom) => {
    //markers are in view for two zooms in and one out 
    const zoomDif = currentZoom - zoom;
    const scale = (zoomDif < -1 || zoomDif > 1) ? 0 : 1 + zoomDif / 2;
    return {
        transform: `translate(-50%, -50%) scale(${scale})`,
    }
}

const FlashCardMarker = ({ currentZoom, zoom, frontText, backText, nextMarker, lat, lng}) => {
    const [showFront, setShowFront] = useState(true)
    return (
        <div
            className="font-weight-bold h3"
            style={{...markerStyles(currentZoom, zoom), width: "1em"}}
            onClick={() => {
                setShowFront(!showFront)
                if (nextMarker && !showFront) {
                    nextMarker()
                }
            }}
        >
            {showFront ? frontText : backText}
        </div>
    )
}

export default FlashCardMarker
