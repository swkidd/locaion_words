import React, { useReducer, useEffect, useState } from 'react';
import { graphql } from "gatsby";
import { uuid } from "../utils/uuid";

import Layout from "../components/layout";
import Map, { Marker } from "../components/Map";
import MarkerForm from "../components/mapeditor/MarkerForm"

import { withAuthenticator } from "aws-amplify-react";
import { reducer, asyncDispatch } from "../components/mapeditor/utils/markerstore"

const MapEditorPage = ({ data, location }) => {
    const siteTitle = data.site.siteMetadata.title
    
    const initState = { markers: [], markerGroups: [], currentGroup: "", currentMarker: {} }
    const [state, localDispatch] = useReducer(reducer, initState)
    const dispatch = asyncDispatch(localDispatch) 
    
    const defaultCenter = { lat: 35.679835, lng: 139.769099 }
    const defaultZoom = 11
    const [modal, setModal] = useState(false);
    const [mapPosition, setMapPosition] = useState({
        center: defaultCenter,
        zoom: defaultZoom,
    });
    
    const goToPosition = ({ center, zoom }) => {
        setMapPosition({ center, zoom })
    }
    
    const onClick = ({ lat, lng }) => {
        if (state.createPlace) {
            console.log(state)
            dispatch({ 
                ...state.currentMarker,
                type: "save",
                markerType: "flashCard",
                lat, lng,
                zoom: mapPosition.zoom 
            })
            dispatch({ type: "createPlace", value: false })
        }
    }

    const onChange = ({ center, zoom, bounds, marginBounds }) => {
        /*setState({ ...state, zoom: zoom, center: center });*/
    }
    
    useEffect(() => {
        dispatch({ type: "listGroups" }) 
        dispatch({ type: "listMarkers" }) 
        if (state.markerGroups.length > 1) {
            dispatch({ type: "currentGroup", id: state.markerGroups[0].id})
        }
        
        /*    
        const listener = (data) => {
            if (data.payload.event === "signOut") {
                DataStore.clear();
            }
        }
        Hub.listen('auth', listener);

        const handleConnectionChange = () => {
            const condition = navigator.onLine ? "online" : "offline";
            console.log(condition);
            if (condition === "online") {
                listMarkers();
            }
        };

        window.addEventListener("online", handleConnectionChange);
        window.addEventListener("offline", handleConnectionChange);
        */
        return () => {};
    }, []);

    return (
        <Layout location={location} title={siteTitle}>
            <MarkerForm goToPosition={goToPosition} state={state} dispatch={dispatch} />
            <div style={{ height: '100%', width: '100%' }}>
                <Map
                    onChange={onChange}
                    onClick={onClick} 
                    defaultCenter={defaultCenter} 
                    defaultZoom={defaultZoom} 
                    center={mapPosition.center}
                    zoom={mapPosition.zoom}>
                    {((state || {}).markers || []).map(e => {
                        console.log(e)
                        return (<Marker 
                            key={e.id}
                            text={e.text}
                            lat={e.lat}
                            lng={e.lng} 
                        />)
                    })}
                </Map>
            </div>
        </Layout>
    );
}

export default withAuthenticator(MapEditorPage);

export const pageQuery = graphql `
  query {
    site {
      siteMetadata {
        title
      }
    }
  }
`
