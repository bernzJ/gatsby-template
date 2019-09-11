import React from "react"
import Img from "gatsby-image"
import { compose, withStateHandlers } from "recompose"
import { connect } from "react-redux"
import {
    Container,
    Row,
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
    NavLink,
    UncontrolledDropdown,
    DropdownToggle,
    DropdownMenu
} from "reactstrap"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faBars } from "@fortawesome/free-solid-svg-icons"

const enhance = compose(
    connect((state) => ({ ...state })),
    withStateHandlers(
        () => ({
            isOpen: false
        }),
        {
            toggleOpen: ({ isOpen }) => () => ({ isOpen: !isOpen })
        }
    )
)

const renderMenu = (item) => {
    if (Array.isArray(item.items)) {
        return (
            <UncontrolledDropdown key={item.label} nav inNavbar>
                <DropdownToggle nav caret>
                    {item.label}
                </DropdownToggle>
                <ul>
                    <DropdownMenu right>
                        {item.items.map(i => renderMenu(i))}
                    </DropdownMenu>
                </ul>
            </UncontrolledDropdown>
        )

    } else {
        return (
            <NavItem key={item.slug}>
                <NavLink key={item.slug} href={item.slug}>{item.label}</NavLink>
            </NavItem>
        )
    }
}

export default enhance(({ isOpen, toggleOpen, menuReducer: { menu } }) => {
    return (
        <Container fluid={true}>
            <Row>
                <Navbar id="navblack" color="light" light expand="md" className="navblack w-100">
                    <NavbarBrand href="/"><Img fixed={menu.logo.childImageSharp.fixed}></Img></NavbarBrand>
                    <NavbarToggler onClick={toggleOpen} style={{ padding: "30px" }}>
                        <FontAwesomeIcon size="lg" icon={faBars} />
                    </NavbarToggler>
                    <Collapse isOpen={isOpen} navbar>
                        <Nav className="ml-auto" navbar>
                            {menu.data.map(i => renderMenu(i))}
                        </Nav>
                    </Collapse>
                </Navbar>
            </Row>
        </Container>
    )
})