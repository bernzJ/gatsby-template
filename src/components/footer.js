import React from "react"
import { Link } from "gatsby"
import { compose } from "recompose"
import { connect } from "react-redux"
import {
    Container,
    Col,
    Row
} from "reactstrap"


const enhance = compose(
    connect((state) => ({ ...state }))
)

const renderMenu = (item) => {
    return (
        <li key={item.slug}>
            <Link to={item.slug}>{item.label}</Link>
        </li>
    )
}

export default enhance(({ menuReducer: { menu } }) => {
    return (
        <Container fluid={true}>
            <Row className="justify-content-center" >
                <Col lg="8">
                    <ul>
                        {menu.data.map(i => Array.isArray(i.items) ? i.items.map(s => renderMenu(s)) : renderMenu(i))}
                    </ul>
                </Col>
            </Row>
        </Container>
    )
})