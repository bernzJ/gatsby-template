import React from "react"
import { Link, graphql } from "gatsby"
import styled from "styled-components"
import Layout from "../components/layout"
import SEO from "../components/seo"

const ExtraJSXWrapper = styled.div`

`;

export default ({ data: { markdownRemark } }) => {
  return (
    <Layout>
      <SEO
        title={markdownRemark.frontmatter.title}
        description={markdownRemark.frontmatter.description || markdownRemark.excerpt}
      />
      <article>
        <header>
          <h1
            style={{
              marginBottom: 0,
            }}
          >
            {markdownRemark.frontmatter.title}
          </h1>
          <p
            style={{
              display: `block`,
            }}
          >
            {markdownRemark.frontmatter.date}
          </p>
        </header>
        <section dangerouslySetInnerHTML={{ __html: markdownRemark.html }} />
        <hr />
        <footer>

        </footer>
      </article>
    </Layout>
  )
}


export const pageQuery = graphql`
  query ServiceBySlug($slug: String!) {
    markdownRemark(fields: { slug: { eq: $slug } }) {
      id
      excerpt(pruneLength: 160)
      html
      frontmatter {
        title
        date(formatString: "MMMM DD, YYYY")
        description
      }
    }
  }
`
