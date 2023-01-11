import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faWineBottle } from "@fortawesome/free-solid-svg-icons";

const MobileDrink = ({
  selectedType,
  selectedSubCategories,
  setSelectedType,
}) => {
  return (
    <div
      className="overflow-scroll"
      style={{ height: "26.3rem", width: "35%" }}
    >
      <div className="d-flex flex-column">
        {selectedSubCategories.map((cat) => (
          <div
            onClick={() => {
              setSelectedType(cat._id);
            }}
            class={`tab-drink text-center  ${
              selectedType === cat._id ? "tab-drink-active" : ""
            }`}
          >
            <div>
              <FontAwesomeIcon icon={faWineBottle} />
            </div>
            <div>{cat.name}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MobileDrink;
