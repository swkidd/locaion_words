import React, { useState } from 'react'
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'

const markerStyles = (currentZoom, zoom) => {
    //markers are in view for two zooms in and one out 
    const zoomDif = currentZoom - zoom;
    const scale = (zoomDif < -1 || zoomDif > 1) ? 0 : 1 + zoomDif / 2;
    return {
        transform: `translate(-50%, -50%) scale(${scale})`,
    }
}

const FlashCardMarker = ({ currentZoom, zoom, frontText, backText, nextMarker }) => {
    const [showFront, setShowFront] = useState(true)
    return (
        <Card 
            style={{...markerStyles(currentZoom, zoom), width: "4rem"}}
            onClick={() => {
                setShowFront(!showFront)
                if (nextMarker && !showFront) {
                    nextMarker()
                }
            }}
        >
            <Card.Body className="font-weight-bold text-justify h3">
                {showFront ? frontText : backText}
            </Card.Body>
        </Card>
    )
}

export default FlashCardMarker