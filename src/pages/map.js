import React, { Component, useState } from "react";
import { graphql, Link } from "gatsby";

import Layout from "../components/layout"
import Map, { Marker } from "../components/Map"

const onClick = args => console.log(args)

const MapPage = ({ data, location}) => {
    const siteTitle = data.site.siteMetadata.title;
    const center = { lat: 35.679835, lng: 139.769099 }
    const zoom = 11
    const markers = [
        <Marker text="張る"　lat={center.lat} lng={center.lng} />,
        <Marker text="張る"　lat={center.lat + 1} lng={center.lng} />
    ]

    return (
        <Layout location={location} title={siteTitle}>
            <div style={{ height: '100%', width: '100%' }}>
                <Map 
                    onClick={onClick} 
                    center={center} 
                    zoom={zoom} 
                    markers={markers}
                />
            </div>
      </Layout>
    );
}

export default MapPage;

export const pageQuery = graphql `
  query {
    site {
      siteMetadata {
        title
      }
    }
  }
`
