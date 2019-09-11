import React from "react"
import Img from "gatsby-image"
import { compose, withStateHandlers, branch, renderNothing } from "recompose"
import { connect } from "react-redux"
import {
    Carousel,
    CarouselItem,
    CarouselControl,
    CarouselIndicators,
    CarouselCaption,
    Container,
    Row
} from "reactstrap"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faBars } from "@fortawesome/free-solid-svg-icons"

// NOTE: we are not using a reducer to store the carousel values as they may change so refreshing on each page seems like the proper move.
const enhance = compose(
    connect((state) => ({ ...state })),
    branch(({ items }) => !Array.isArray(items) || items.length == 0, renderNothing),
    withStateHandlers(
        () => ({
            activeIndex: 0
        }),
        {
            setActiveIndex: () => (activeIndex) => ({ activeIndex })
        }
    )
)

// NOTE: reason for this, we don't want to reload our component each time when this value is changed and sticking thins into props would
// be anti pattern (props immutable).
const animating = {
    busy: false
}

const setAnimating = (value) => {
    animating.busy = value;
}

const setSlide = (newIndex, setActiveIndex) => {
    if (animating.busy == false) {
        setActiveIndex(newIndex);
    }
}

export default enhance(({ items, activeIndex, setActiveIndex }) => {
    //console.log(items)
    const next = () => setSlide(activeIndex === 0 ? items.length - 1 : activeIndex - 1, setActiveIndex)
    const prev = () => setSlide(activeIndex === items.length - 1 ? 0 : activeIndex + 1, setActiveIndex)
    return (
        <Container fluid={true}>
            <Row>
                <Carousel
                    activeIndex={activeIndex}
                    next={next}
                    previous={prev}
                    className="w-100">
                    <CarouselIndicators items={items} activeIndex={activeIndex} onClickHandler={(i) => setSlide(i, setActiveIndex)} />
                    {items.map((item, key) => {
                        return (
                            <CarouselItem
                                onExiting={() => { setAnimating(true) }}
                                onExited={() => { setAnimating(false) }}
                                key={key}
                            >
                                <Img style={{ maxHeight: item.childImageSharp.presentationHeight }} alt={item.altText} fluid={item.childImageSharp.fluid} backgroundColor={item.imageColor} />
                                <CarouselCaption className="carousel-control-custom" captionText={item.altText} captionHeader={item.caption} />
                                <div dangerouslySetInnerHTML={({ __html: item.jsxDom })}>
                                </div>
                            </CarouselItem>
                        );
                    })}
                    <CarouselControl direction="prev" directionText="Previous" onClickHandler={next} />
                    <CarouselControl direction="next" directionText="Next" onClickHandler={prev} />
                </Carousel>
            </Row>
        </Container>
    )
})