import React, { useCallback, useEffect, useState } from "react"
import { Link, graphql } from "gatsby"

import Bio from "../components/bio"
import Layout from "../components/layout"
import SEO from "../components/seo"
import { rhythm, scale } from "../utils/typography"

import Map, { Marker } from "../components/Map";

const BlogPostTemplate = ({ data, pageContext, location }) => {
  const post = data.markdownRemark
  const siteTitle = data.site.siteMetadata.title
  const { previous, next } = pageContext

  // map values
  let defaultCenter = { lat: 35.679835, lng: 139.769099 }
  const defaultZoom = 15;

  const centerArray = post.frontmatter.center ? post.frontmatter.center.split(",") : [];
  if (centerArray.length === 2) {
    const lat = parseFloat(centerArray[0]);
    const lng = parseFloat(centerArray[1]);
    if (!isNaN(lat) && !isNaN(lng)) {
      defaultCenter = { lat: lat, lng: lng };
    }
  }

  const [state, setState] = useState({
    center: { lat: 35.0, lng: 139.0 },
    zoom: 15,
    markers: [],
  })

  const showMap = post.frontmatter.markers ? true : false;
  useEffect(() => {
    try {
      const markers = JSON.parse(post.frontmatter.markers)
      const m0 = markers[0]
      setState({
        ...state,
        markers: markers.map((m, i) => ({ ...m, show: i === 0 })),
        center: m0 ? { lat: m0.lat, lng: m0.lng } : defaultCenter,
        zoom: m0 ? m0.zoom : defaultZoom
      });
    }
    catch (error) {}

    return () => {}
  }, [])

  const moveTo = n => () => {
    const lat = state.markers[n].lat
    const lng = state.markers[n].lng
    const zoom = state.markers[n].zoom
    setState({ ...state,
      zoom,
      center: { lat, lng },
      markers: state.markers.map((m, i) => ({ ...m, show: i === n }))
    })
  }

  const markerStyles = e => {
    //if (!e.show) { return { "visibility": "hidden" } }
    //markers are in view for two zooms in and one out 
    const zoomDif = state.zoom - e.zoom;
    const scale = (zoomDif < -1 || zoomDif > 2) ? 0 : 1 + zoomDif / 2;
    
    return {
      width: "12em",
      height: "auto",
      scroll: "auto",
      backgroundColor: "white",
      position: "relative",
      zIndex: `${22 - e.zoom}`,
      transform: `translate(-50%, -50%) scale(${scale})`,
    }
  }
  
  const inBounds = (i, lat, lng) => {
    if (i < 1001) return true
    return false
    const ret = (
      state.bounds.nw.lat > lat &&
      state.bounds.se.lat < lat &&
      state.bounds.nw.lng < lng &&
      state.bounds.se.lng > lng
    )
    console.log(ret)
    return ret
  }

  const onChange = ({ center, zoom, bounds, marginBounds }) => {
    setState({ ...state, zoom: zoom, center: center, bounds: bounds });
    console.log(state)
  }

  return (
    <Layout location={location} title={siteTitle}>
      <SEO
        title={post.frontmatter.title}
        description={post.frontmatter.description || post.excerpt}
      />
      <article style={{
        maxHeight: "70vh",
        maxHeight: "calc(var(--vh, 1vh) * 70)",
        width: "100%",
        height: "100%",
      }}>
        <header>
          <h1
            style={{
              marginTop: rhythm(1),
              marginBottom: 0,
            }}
          >
            {post.frontmatter.title}
          </h1>
          <p
            style={{
              ...scale(-1 / 5),
              display: `block`,
              marginBottom: rhythm(1),
            }}
          >
            {post.frontmatter.date}
          </p>
        </header>
        <section dangerouslySetInnerHTML={{ __html: post.html }} />
        {showMap && (
          <div style={{width: "100%", height: "500px"}}>  
            <Map 
              center={state.center}
              zoom={state.zoom}
              onChange={onChange}
              yesIWantToUseGoogleMapApiInternals
              onGoogleApiLoaded={({ map, maps }) => setState({...state, center: defaultCenter, zoom: defaultZoom }) }
            >
              {showMap && state.markers.map((e, i) => { 
                  if (inBounds(i, e.lng, e.lat)) { 
                    return( <div
                          key={e.id}
                          style={markerStyles(e)}
                          lat={e.lat}
                          lng={e.lng} 
                      >
                        {e.text}
                      </div>
                    )
                  }
              })}
            </Map>
          </div>
          )
        }
        <hr
          style={{
            marginBottom: rhythm(1),
          }}
        />
      </article>

      <nav>
        <ul
          style={{
            display: `flex`,
            flexWrap: `wrap`,
            justifyContent: `space-between`,
            listStyle: `none`,
            padding: 0,
          }}
        >
          <li>
            {previous && (
              <Link to={previous.fields.slug} rel="prev">
                ← {previous.frontmatter.title}
              </Link>
            )}
          </li>
          <li>
            {next && (
              <Link to={next.fields.slug} rel="next">
                {next.frontmatter.title} →
              </Link>
            )}
          </li>
        </ul>
      </nav>
    </Layout>
  )
}

export default BlogPostTemplate

export const pageQuery = graphql `
  query BlogPostBySlug($slug: String!) {
    site {
      siteMetadata {
        title
      }
    }
    markdownRemark(fields: { slug: { eq: $slug } }) {
      id
      excerpt(pruneLength: 160)
      html
      frontmatter {
        title
        date(formatString: "MMMM DD, YYYY")
        description
        markers
        center
      }
    }
  }
`
