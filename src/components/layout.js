import React from "react"
import { compose, branch, lifecycle, renderComponent } from "recompose"
import { connect } from "react-redux"
import jquery from "jquery"

import Loading from "./loading"
import Header from "./header"
import Footer from "./footer"
import Session from "./session"

const spinnerWhileLoading = isLoading =>
  branch(
    isLoading,
    renderComponent(Loading)
  )

const enhance = compose(
  connect((state) => ({ ...state })),
  lifecycle({
    componentDidMount() {
      window.$ = jquery;
    }
  }),
  spinnerWhileLoading(({ dispatch, sessionReducer: { initialized } }) => {
    Session(dispatch, initialized);
    return !initialized;
  })
)

export default enhance(({ children }) => {
  return (
    <div>
      <Header></Header>
      <main>{children}</main>
      <Footer></Footer>
    </div>
  )
})