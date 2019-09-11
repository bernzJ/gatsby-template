import React from "react"
import {
    Container,
    Row
} from "reactstrap"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faCircleNotch } from "@fortawesome/free-solid-svg-icons"

export default () => <Container fluid={true}>
    <Row>
        <FontAwesomeIcon size="lg" spin={true} icon={faCircleNotch}></FontAwesomeIcon>
    </Row>
</Container>