import React, { useState } from 'react';
import { graphql } from "gatsby";
import { uuid } from "../utils/uuid";

import Layout from "../components/layout";
import Map, { Marker } from "../components/Map";


const gridListStyles = {
    container: {
        margin: 0,
        height: "2em",
        width: "100%",
        scrollSnapAlign: "start",
        listStyle: "none",
    },
    deleteBtn: {
        border: "none",
    }
}

const MarkerRec = ({onUpdateText, onDel, lat, lng}) => {
    return (
        <li style={gridListStyles.container}>
            <input type="text" onChange={onUpdateText} />
            <button style={gridListStyles.deleteBtn} onClick={onDel}>delete</button>
        </li>
    )
}


const MapEditorPage = ({ data, location }) => {
    const siteTitle = data.site.siteMetadata.title
    const center = { lat: 35.679835, lng: 139.769099 }
    const defaultZoom = 11

    const markerStyles = zoom => {
        const zoomDif = state.zoom - zoom;
        const scale = Math.abs(zoomDif) < 5 ? 1 + zoomDif / 5 : 0;
        return {
            transform: `scale(${scale})`,
        }
    }
    
    const [state, setState] = useState({
        zoom: defaultZoom,
        markers: [],
    });
    
    const removeMarker = id => () => {
        setState({...state, markers: state.markers.filter(s => s.id !== id)})
    }
    
    const onUpdateText = id => evt => {
        setState({...state, marker: state.markers.map(s => {
            if (s.id === id) {
               s.text = evt.target.value; 
            }
            return s;
        })})
    }
    
    const onClick = ({lat, lng, ...props}) => {
        setState({
            ...state, 
            markers: [
                ...state.markers, 
                { id: uuid(), lat, lng, text: "", zoom: state.zoom }
            ]
        })
    }
    
    const onChange = ({ center, zoom, bounds, marginBounds }) => {
        setState({...state, zoom: zoom});
    }
    
    return (
        <Layout location={location} title={siteTitle}>
            <div style={styles.container}>
                <div style={{ height: '100%', width: '100%' }}>
                    <Map
                        onChange={onChange}
                        onClick={onClick} 
                        center={center} 
                        zoom={defaultZoom} 
                        markers={state.markers.map(e => (
                            <Marker 
                                style={markerStyles(e.zoom)}
                                text={e.text}
                                lat={e.lat}
                                lng={e.lng} 
                            />
                        ))}
                    />
                </div>
                <ul style={styles.editor}>
                    {state.markers.map(e => (
                        <MarkerRec 
                            onUpdateText={onUpdateText(e.id)}
                            onDel={removeMarker(e.id)}
                            lat={e.lat}
                            lng={e.lng}
                        />
                    ))}
                </ul>
            </div>
        </Layout>
    );
}

export default MapEditorPage;

const styles = {
    container: {
        width: "100%",
        height: "100%",
        maxHeight: "70vh",
        maxHeight: "calc(var(--vh, 1vh) * 70)",
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
    },
    editor: {
        margin: 0,
        width: "100%",
        height: "100%",
        overflowY: "scroll",
        scrollSnapType: "y mandatory",
    }
}

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
  }
`