import React from "react"
import { Link } from "gatsby"
import useExactVH from '../utils/useExactVH';
import { rhythm, scale } from "../utils/typography"

import "bootstrap/dist/css/bootstrap.min.css";
import "./layout.css";

import Amplify from "@aws-amplify/core";
import aws_exports from "../aws-exports";
Amplify.configure(aws_exports);

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
          margin: 0,
          padding: 0,
          textAlign: "right",
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
        margin: 0,
        marginLeft: `auto`,
        marginRight: `auto`,
        padding: `${rhythm(0)} ${rhythm(1 / 4)}`,
        height: "100vh",
        height: "calc(var(--vh, 1vh) * 90)",
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
