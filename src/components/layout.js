import React from "react"
import { Link } from "gatsby"
import useExactVH from '../utils/useExactVH';
import { rhythm, scale } from "../utils/typography"

import "./layout.css";

const Layout = ({ location, title, children }) => {
  useExactVH();
  
  const rootPath = `${__PATH_PREFIX__}/`
  let header

  if (location && location.pathname && location.pathname === rootPath) {
    header = (
      <h1
        style={{
          ...scale(1.5),
          marginBottom: rhythm(1.5),
          marginTop: 0,
        }}
      >
        <Link
          style={{
            boxShadow: `none`,
            textDecoration: `none`,
            color: `inherit`,
          }}
          to={`/`}
        >
          {title}
        </Link>
      </h1>
    )
  } else {
    header = (
      <h3
        style={{
          fontFamily: `Montserrat, sans-serif`,
          marginTop: 0,
        }}
      >
        <Link
          style={{
            boxShadow: `none`,
            textDecoration: `none`,
            color: `inherit`,
          }}
          to={`/`}
        >
          {title}
        </Link>
      </h3>
    )
  }
  return (
    <div
      style={{
        marginLeft: `auto`,
        marginRight: `auto`,
        padding: `${rhythm(1.5)} ${rhythm(3 / 4)}`,
        height: "100vh",
        height: "calc(var(--vh, 1vh) * 100)",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <header>{header}</header>
      <main style={{height: "100%"}}>{children}</main>
      <footer></footer>
    </div>
  )
}

export default Layout
