import React, { useState } from 'react'

import Popover from 'react-bootstrap/Popover'

const markerStyles = (currentZoom, zoom) => {
    //markers are in view for two zooms in and one out 
    const zoomDif = currentZoom - zoom;
    const scale = (zoomDif < -1 || zoomDif > 1) ? 0 : 1 + zoomDif / 2;
    return {
        transform: `translate(-50%, -50%) scale(${scale})`,
    }
}

const FlashCardMarker = ({ style, currentZoom, zoom, frontText, backText, nextMarker, lat, lng}) => {
    const [showFront, setShowFront] = useState(true)
    return (
        <Popover 
            placement="top" 
            onClick = {() => setShowFront(!showFront)}
            style={{...style, transform: "translate(0%, -100%)", overflowWrap: "break-word"}} 
            >
            <Popover.Content style={{overflowY: "auto", maxWidth: "100%", fontSize: "2rem" }}>
                {showFront ? frontText : backText }
            </Popover.Content>
        </Popover>
    )
}

export default FlashCardMarker
