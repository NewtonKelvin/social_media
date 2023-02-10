//React / Next
import styled from "styled-components"
import React, { useState } from "react"
import dynamic from "next/dynamic"
import Image from "next/image"
//Carousel
const Carousel = dynamic(() => import('react-spring-3d-carousel'), { ssr: false })
import { config } from "react-spring"
//Icons
import { ArrowLeft, ArrowRight } from "@mui/icons-material"

const CustomCarousel = styled.div`

  background-color: var(--input);
  border-radius: 10px;
  transition: background-color var(--transition);

  padding: 10px;
  height: 500px;
  margin: 0 auto;
  padding-bottom: 50px;
  .css-doq0dk {
    width: 80%;
    margin: 0 auto;
  }
  img {
    width: 600px;
    height: 600px;
    border-radius: 10px;
    object-fit: cover !important;
    object-position: 50% 50%;
  }
  @media (max-width: 1280px){
    img {
      width: 300px !important;
      height: 300px !important;
    }
  }
  @media (max-width: 900px){
    img {
      width: 200px !important;
      height: 200px !important;

      min-width: 200px !important;
      min-height: 200px !important;
    }
  }
  @media (max-width: 410px){
    .Arrows {
      position: initial !important;
    }
  }
  
  .Arrows {
    width: 95%;
    height: 40px;
    display: flex;
    justify-content: space-between;
    z-index: 1;
    
    margin: 0 auto;
    position: relative;
    top: calc(-50%);
    -ms-transform: translateY(-50%);
    transform: translateY(-50%);
    span {
      z-index: 1;
      background-color: var(--primary);
      color: var(--white);
      border-radius: 10px;
      height: 40px;
      width: 40px;
      display: flex;
      justify-content: center;
      align-items: center;
    }
  }
  .Dots {
    z-index: 2;
    width: 100%;
    height: 20px;
    display: flex;
    justify-content: center;
    gap: 5px;
    
    margin: 0;
    position: relative;

    top: calc(-5%);
    span {
      border-radius: 50%;
      width: 20px !important;
      height: 20px !important;
      
      transition: background-color var(--transition);
      background-color: var(--container);
      &[is-selected="true"] {
        background-color: var(--primary);
      }
    }
  }
`

export default function StyledCarousel({ slideList, unoptimized }) {

  const [ currentSlide, setCurrentSlide ] = useState(0)

  const mySlideList = []
  const myDotList = []

  const plusSlide = () => {
    const newSlide = (currentSlide == (slideList.length-1)) ? 0 : currentSlide+1
    setCurrentSlide(newSlide)
  }
  const lessSlide = () => {
    const newSlide = (currentSlide == 0) ? slideList.length-1 : currentSlide-1
    setCurrentSlide(newSlide)
  }

  slideList.map((value, index) => {
    const source = (value.includes('http')) ? value : `${process.env.BACK_END}/image/${value}`
    mySlideList.push({
      key: index,
      content:
        <Image
          src={source}
          layout="fixed"
          width={400}
          height={400}
          alt="1"
          onClick={() => setCurrentSlide(index)}
          unoptimized={unoptimized}
        />
    })
    myDotList.push(
      <span
        key={index}
        is-selected={(currentSlide == index) ? "true" : "false"}
        onClick={() => setCurrentSlide(index)}
      />
    )
  })
  
  mySlideList.map((slide, index) => {
    return {
      ...slide,
      onClick: () => setCurrentSlide(index)
    };
  });

  return (
    <CustomCarousel>
      <Carousel
        slides={mySlideList}
        goToSlide={currentSlide}
        offsetRadius={1}
        showNavigation={false}
        animationConfig={config.gentle}
      />
      <div className="Arrows">
        <span onClick={() => lessSlide()}>
          <ArrowLeft fontSize="large" />
        </span>
        <span onClick={() => plusSlide()}>
          <ArrowRight fontSize="large" />
        </span>
      </div>
      <div className="Dots">
        {myDotList}
      </div>
    </CustomCarousel>
  )
}
