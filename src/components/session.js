import { useStaticQuery, graphql } from "gatsby"

import { actions as menuActions } from "../reducers/menu"
import { actions as siteMetadataActions } from "../reducers/sitemetadata"
import { actions as sessionActions } from "../reducers/session"

const buildMenu = (menu, services, index = 1) => {
    var items = services.map(service => ({
        label: service.node.frontmatter.title, slug: service.node.fields.slug
    }));
    menu.splice(index, 0, { label: "Services", items });
    return menu;
}

export default (dispatch, initialized = false) => {
    if (initialized == false) {
        var data = useStaticQuery(graphql`
          query SessionQuery {
              site {
                  siteMetadata {
                      title
                      author
                      description
                      social {
                        github
                      }
                      menu {
                          label
                          slug
                      }
                  }
              }
              logoImage: file(relativePath: { eq: "assets/logo.png" }) {
                  childImageSharp {
                      fixed(width: 221, height: 61) {
                          ...GatsbyImageSharpFixed_noBase64
                      }
                  }
              }
              allMarkdownRemark(
                  sort: { fields: [frontmatter___date], order: DESC },
                  filter: {
                    frontmatter: { draft: { ne: true } }
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
                      }
                    }
                  }
                }
          }
          `);
        dispatch(
            menuActions.setMenu({
                logo: data.logoImage,
                data: buildMenu(data.site.siteMetadata.menu, data.allMarkdownRemark.edges)
            })
        )

        dispatch(
            siteMetadataActions.setMeta({
                ...data.site.siteMetadata
            })
        )

        dispatch(
            sessionActions.setSession()
        )
    }
}