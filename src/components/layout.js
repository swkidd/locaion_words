import React from "react"
import { Link } from "gatsby"
import useExactVH from '../utils/useExactVH';
import { rhythm, scale } from "../utils/typography"

import "bootstrap/dist/css/bootstrap.min.css";
import "./layout.css";

import Amplify from "@aws-amplify/core";
import aws_exports from "../aws-exports";
Amplify.configure(aws_exports);


const Layout = ({ location, title, children, footer, header }) => {
  useExactVH();

  const reducer = (state, action) => {
    switch (action.type) {
      case "addToFooter":
        return { footer: action.footer };
      default:
        return state;
    }
  };

  const defaultState = { footer: null }

  const rootPath = `${__PATH_PREFIX__}/`
  let headerWrapper

  if (location && location.pathname && location.pathname === rootPath) {
    headerWrapper = (
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
        }}>
          {header}
          <Link
            style={{
              boxShadow: `none`,
              textDecoration: `none`,
              color: `inherit`,
            }}
            to={`/`}
          >
            <h1
              style={{
                ...scale(1.5),
                marginBottom: rhythm(1.5),
                marginTop: 0,
              }}
            >
              {title}
            </h1>
          </Link>
      </div>
    )
  }
  else {
    headerWrapper = (
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
      }}>
          {header}
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
      </div>
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
        height: "calc(var(--vh, 1vh) * 100)",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <header>{headerWrapper}</header>
      <main style={{height: "100%"}}>{children}</main>
      <footer>
        {footer}
      </footer>
    </div>
  )
}

export default Layout
