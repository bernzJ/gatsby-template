import React from "react"
import { Link } from "gatsby"
import { compose } from "recompose"
import { connect } from "react-redux"
import Helmet from "react-helmet"


const enhance = compose(
  connect((state) => ({ ...state }))
)

export default enhance(({ tags, title, description, siteMetadataReducer: { site } }) => {
  return (
    <Helmet
      htmlAttributes={{
        lang: site.lang,
      }}
      title={title || site.title}
      titleTemplate={`%s | ${title || site.title}`}
      meta={[
        {
          name: `description`,
          content: description || site.description,
        },
        {
          property: `title`,
          content: title || site.title,
        }
      ]
        .concat(
          Array.isArray(tags) && tags.length > 0
            ? {
              name: `keywords`,
              content: typeof tags == "string" || tags instanceof String ? tags : tags.join(`, `),
            }
            : []
        )}
    />
  )
})