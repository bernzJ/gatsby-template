import React from "react"
import { Link, graphql } from "gatsby"
import Img from "gatsby-image"
import {
  Card,
  CardImg,
  CardBody,
  CardTitle,
  Container,
  Col,
  Row
} from "reactstrap"
import Layout from "../components/layout"
import SEO from "../components/seo"
import Carousel from "../components/carousel"


export default ({ data }) => {
  return (
    <Layout>
      <SEO title="Index" tags={[`some`, `things`]} />
      <Carousel items={data.featured.edges.map(({ node: { frontmatter } }) => ({
        imageColor: frontmatter.imageColor || false,
        childImageSharp: frontmatter.image.childImageSharp,
        altText: frontmatter.description || "",
        jsxDom: frontmatter.jsxDom,
        caption: frontmatter.title
      }))} />
      {data.all.edges.map(({ node, node: { frontmatter: { image: { childImageSharp } } } }, i) => {
        return (
          <Col lg="3" xs="12" key={i}>
            <Link to={node.fields.slug}>
              <Card>
                <CardImg tag={() => <Img style={{ maxHeight: childImageSharp.presentationHeight }} fluid={childImageSharp.fluid} backgroundColor={node.frontmatter.imageColor || false} />} />
                <CardBody>
                  <h2>
                    <CardTitle>
                      <span href={node.fields.slug}>{node.frontmatter.title}</span>
                    </CardTitle>
                  </h2>
                </CardBody>
              </Card>
            </Link>
          </Col>
        )
      })}
    </Layout>
  )
}

export const pageQuery = graphql`
query {
  all: allMarkdownRemark(
    sort: { fields: [frontmatter___date], order: DESC },
    filter: {
      frontmatter: { draft: { ne: true }, featured: { ne: true} }
    },
  ) {
    edges {
      node {
        fields {
          slug
        }
        frontmatter {
          date(formatString: "MMMM DD, YYYY")
          title
          description
          jsxDom
          imageColor
          image {
            childImageSharp {
              fluid(maxHeight: 175, quality: 100) {
                ...GatsbyImageSharpFluid
                presentationHeight
              }
            }
          }
        }
      }
    }
  }
  featured: allMarkdownRemark(
    sort: { fields: [frontmatter___date], order: DESC },
    filter: {
      frontmatter: { draft: { ne: true }, featured: { eq: true} }
    },
  ) {
    edges {
      node {
        fields {
          slug
        }
        frontmatter {
          date(formatString: "MMMM DD, YYYY")
          title
          description
          jsxDom
          imageColor
          image {
            childImageSharp {
              fluid(maxHeight: 1141, quality: 100) {
                ...GatsbyImageSharpFluid
                presentationHeight
              }
            }
          }
        }
      }
    }
  }
}
`