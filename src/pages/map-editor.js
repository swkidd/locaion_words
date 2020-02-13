import React, { Component, useState } from 'react';
import { graphql } from "gatsby";

import Layout from "../components/layout";
import Map, { Marker } from "../components/Map";

const MapEditorPage = ({ data, location }) => {
    const siteTitle = data.site.siteMetadata.title
    const center = { lat: 35.679835, lng: 139.769099 }
    const zoom = 11
    
    const [markers, setMarkers] = useState([]);
    const onClick = args => {
        const m = <Marker text="有る"　lat={args.lat} lng={args.lng} />
        setMarkers([...markers, m])
    }
    
    return (
        <Layout location={location} title={siteTitle}>
            <div style={styles.container}>
                <div style={{ height: '100%', width: '100%' }}>
                    <Map 
                        onClick={onClick} 
                        center={center} 
                        zoom={zoom} 
                        markers={markers}
                    />
                </div>
                <div style={styles.editor}>editor</div>
            </div>
        </Layout>
    );
}

export default MapEditorPage;

const styles = {
    container: {
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
    },
    editor: {
        width: "100%",
        height: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
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