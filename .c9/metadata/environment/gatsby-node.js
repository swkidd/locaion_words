{"filter":false,"title":"gatsby-node.js","tooltip":"/gatsby-node.js","undoManager":{"mark":2,"position":2,"stack":[[{"start":{"row":18,"column":1},"end":{"row":19,"column":0},"action":"insert","lines":["",""],"id":2},{"start":{"row":19,"column":0},"end":{"row":20,"column":0},"action":"insert","lines":["",""]}],[{"start":{"row":20,"column":0},"end":{"row":83,"column":1},"action":"insert","lines":["const path = require(`path`)","const { createFilePath } = require(`gatsby-source-filesystem`)","","exports.createPages = async ({ graphql, actions }) => {","  const { createPage } = actions","","  const blogPost = path.resolve(`./src/templates/blog-post.js`)","  const result = await graphql(","    `","      {","        allMarkdownRemark(","          sort: { fields: [frontmatter___date], order: DESC }","          limit: 1000","        ) {","          edges {","            node {","              fields {","                slug","              }","              frontmatter {","                title","              }","            }","          }","        }","      }","    `","  )","","  if (result.errors) {","    throw result.errors","  }","","  // Create blog posts pages.","  const posts = result.data.allMarkdownRemark.edges","","  posts.forEach((post, index) => {","    const previous = index === posts.length - 1 ? null : posts[index + 1].node","    const next = index === 0 ? null : posts[index - 1].node","","    createPage({","      path: post.node.fields.slug,","      component: blogPost,","      context: {","        slug: post.node.fields.slug,","        previous,","        next,","      },","    })","  })","}","","exports.onCreateNode = ({ node, actions, getNode }) => {","  const { createNodeField } = actions","","  if (node.internal.type === `MarkdownRemark`) {","    const value = createFilePath({ node, getNode })","    createNodeField({","      name: `slug`,","      node,","      value,","    })","  }","}"],"id":3}],[{"start":{"row":0,"column":0},"end":{"row":19,"column":0},"action":"remove","lines":["/**"," * Implement Gatsby's Node APIs in this file."," *"," * See: https://www.gatsbyjs.org/docs/node-apis/"," */","","// You can delete this file if you're not using it","exports.onCreatePage = async ({ page, actions }) => {","  const { createPage } = actions","","  // page.matchPath is a special key that's used for matching pages","  // only on the client.","  if (page.path.match(/^\\/app/)) {","    page.matchPath = `/app/*`","","    // Update the page.","    createPage(page)","  }","}",""],"id":4}]]},"ace":{"folds":[],"scrolltop":0,"scrollleft":0,"selection":{"start":{"row":0,"column":0},"end":{"row":0,"column":0},"isBackwards":false},"options":{"guessTabSize":true,"useWrapMode":false,"wrapToView":true},"firstLineState":0},"timestamp":1581047400713,"hash":"82f97868267f4290de074b8314a338eb8c7fc5be"}