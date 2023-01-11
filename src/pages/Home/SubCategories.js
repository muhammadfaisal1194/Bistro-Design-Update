import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faWineBottle } from "@fortawesome/free-solid-svg-icons";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

const SubCategories = ({
  selectedType,
  selectedSubCategories,
  setSelectedType,
}) => {
  const responsive = {
    superLargeDesktop: {
      // the naming can be any, depends on you.
      breakpoint: { max: 4000, min: 3000 },
      items: 5,
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 5,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
    },
  };

  return (
    <Carousel
      swipeable={false}
      draggable={false}
      showDots={false}
      responsive={responsive}
      infinite={true}
      keyBoardControl={true}
      customTransition="all .5"
      transitionDuration={500}
      containerclassName="carousel-container"
      removeArrowOnDeviceType={["tablet", "mobile"]}
      dotListclassName="custom-dot-list-style"
      itemclassName="carousel-item-padding-40-px"
    >
      {selectedSubCategories.map((cat) => (
        <div
          onClick={() => {
            setSelectedType(cat._id);
          }}
          className={`tab-drink text-center  ${
            selectedType === cat._id ? "tab-drink-active" : ""
          }`}
        >
          <div>
            <FontAwesomeIcon icon={faWineBottle} />
          </div>
          <div>{cat.name}</div>
        </div>
      ))}
    </Carousel>
  );
};

export default SubCategories;
