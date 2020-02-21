import React, { useState } from "react"
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
    center: defaultCenter,
    zoom: defaultZoom,
  })
  
  const showMap = post.frontmatter.markers ? true : false; 
  
  let markers = [];
  try {
    markers = showMap && JSON.parse(post.frontmatter.markers);
  } catch (error) {}
    
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
          transform: `translate(-50%, -50%) scale(${scale})`,
      }
  }
    
  const onChange = ({ center, zoom, bounds, marginBounds }) => {
      setState({...state, zoom: zoom, center: center});
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
            >
              {showMap && markers.map(e => (
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
          )
        }
        <hr
          style={{
            marginBottom: rhythm(1),
          }}
        />
        <footer>
          <Bio />
        </footer>
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

export const pageQuery = graphql`
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
