import React, { useState } from 'react';
import { graphql } from "gatsby";
import { uuid } from "../utils/uuid";

import Layout from "../components/layout";
import Map, { Marker } from "../components/Map";

const gridListStyles = {
    container: {
        height: "2em",
        width: "100%",
        display: "flex",
        justifyContent: "space-around",
        alignItems: "center",
        scrollSnapAlign: "start",
        listStyle: "none",
    },
    input: {
        border: "0",
        padding: "2px",
        margin: "0 5px 0 0",
        width: "100%",
        outline: "0",
        background: "#242f3e",
        border: "3px solid #746855",
        color: "#d59563",
        borderRadius: "1px",
    },
    btnContainer: {
        width: "4em",
    },
    btn: {
        border: "0",
        outline: "0",
        padding: "2px",
        margin: "0 5px 0 0",
        color: "#d59563",
        background: "#242f3e",
        border: "3px solid #746855",
        borderRadius: "1px",
        fontWeight: "bold",
        cursor: "pointer",
    }
}

const MarkerRec = ({ text, onUpdateText, onDel, onFocus, lat, lng}) => {
    return (
        <li style={gridListStyles.container}>
            <input type="text" style={gridListStyles.input} value={text} onChange={onUpdateText} />
            <div style={gridListStyles.btnContainer}>
                <button style={gridListStyles.btn} onClick={onDel}>D</button>
                <button style={gridListStyles.btn} onClick={onFocus}>F</button>
            </div>
        </li>
    )
}

const MapEditorPage = ({ data, location }) => {
    const siteTitle = data.site.siteMetadata.title
    const defaultCenter = { lat: 35.679835, lng: 139.769099 }
    const defaultZoom = 11
    const markerStyles = zoom => {
        //markers are in view for two zooms in and one out 
        const zoomDif = state.zoom - zoom;
        const scale = (zoomDif < -1 || zoomDif > 2) ? 0 : 1 + zoomDif / 2;
        let markerStyle = {} 
        if (zoom < 15 ) {
            markerStyle = {
                color: '#d59563',
                backgroundColor: "inherit",
            } 
        }
        
        return {
            ...markerStyle, 
            transform: `scale(${scale})`,
        }
    }
    
    const [state, setState] = useState({
        modal: false,
        goTo: "",
        center: defaultCenter,
        zoom: defaultZoom,
        markers: [],
    });
    
    const onDel = id => async () => {
        setState({...state, markers: state.markers.filter(s => s.id !== id)})
    }
    
    const onFocus = id => () => {
        let elm = state.markers.find(m => m.id === id)
        setState({...state, zoom: elm.zoom, center: { lat: elm.lat, lng: elm.lng }})
    }
    
    const onUpdateText = id => evt => {
        setState({...state, markers: state.markers.map(s => {
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
        setState({...state, zoom: zoom, center: center});
    }
    
   const onGoTo = e => {
       e.preventDefault();
       const latLng = state.goTo.split(",");
       if (latLng.length < 2) return; 
       const lat = parseFloat(latLng[0]);
       const lng = parseFloat(latLng[1]);
       if (isNaN(lat) || isNaN(lng)) return;
       setState({...state, zoom: 19, center: {lat: parseFloat(lat), lng: parseFloat(lng)}});
    }
   
   const goToOnChange = e => {
       setState({...state, goTo: e.target.value});
    }
    
    return (
        <Layout location={location} title={siteTitle}>
            {state.modal && 
                <div style={styles.modal}>
                    <div style={styles.modalContent}>{JSON.stringify(state.markers)}</div>
                    <button 
                        style={styles.closeBtn} 
                        onClick={() => setState({...state, modal: !state.modal})}
                    >close</button>
                </div>
            }
            <div style={styles.container}>
                <div style={{ height: '100%', width: '100%' }}>
                    <Map
                        onChange={onChange}
                        onClick={onClick} 
                        defaultCenter={defaultCenter} 
                        defaultZoom={defaultZoom} 
                        center={state.center}
                        zoom={state.zoom}>
                        {state.markers.map(e => (
                            <Marker 
                                key={e.id}
                                style={markerStyles(e.zoom)}
                                text={e.text}
                                lat={e.lat}
                                lng={e.lng} 
                            />
                        ))}
                    </Map>
                </div>
                <div style={styles.editorContainer}>
                    <ul style={styles.editor}>
                        {state.markers.map(e => (
                            <MarkerRec 
                                key={e.id}
                                text={e.text}
                                onUpdateText={onUpdateText(e.id)}
                                onDel={onDel(e.id)}
                                onFocus={onFocus(e.id)}
                                lat={e.lat}
                                lng={e.lng}
                            />
                        ))}
                    </ul>
                    <button onClick={() => setState({...state, modal: !state.modal })}>export markers</button>
                    <form onSubmit={onGoTo}>
                        <label>
                            Lat, Lng:
                            <input type="text" value={state.goTo.lat} onChange={goToOnChange} />
                        </label>
                        <input type="submit" value="Go To" />
                    </form>
                </div>
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
        justifyContent: "space-around",
        alignItems: "center",
    },
    editorContainer: {
        display: "flex",
        flexDirection: "column",
        width: "100%",
        height: "100%",
        margin: "0",
    },
    editor: {
        maxHeight: "100%",
        height: "100%",
        overflowY: "scroll",
        scrollSnapType: "y mandatory",
        background: "#17263c",
        margin: "0",
    },
    modal: {
        position: "fixed",
        zIndex: "1",
        width: "50%",
        height: "50%",
        backgroundColor: "white",
        color: "black",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        border: "1px solid black",
        borderRadius: "5px",
        padding: "10px",
        dispaly: "flex",
        flexDirection: "column",
    },
    modalContent: {
        maxHeight: "90%",
        height: "90%",
        width: "100%",
        overflowY: "auto",
    },
    closeBtn: {
        width: "100%",
        marginTop: "5px",
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
