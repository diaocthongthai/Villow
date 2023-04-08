import { faAngleDown, faAngleUp } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useRef, useState } from "react";
import "./DropDown.scss";

const DropDown = (props) => {
  const { children, buttonValue, handleSubmit, containerWidth } = props;
  const buttonRef = useRef();

  const [dropDown, setDropDown] = useState(false);
  const [dropDownWidth, setDropDownWidth] = useState("auto");

  useEffect(() => {
    setDropDownWidth(containerWidth);
  }, [dropDown, children]);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (
        dropDown &&
        buttonRef.current &&
        !buttonRef.current.contains(e.target)
      ) {
        setDropDown(false);
      }
    };

    if (dropDown) {
      document.addEventListener("click", handleClickOutside);
    }

    return () => document.removeEventListener("click", handleClickOutside);
  }, [dropDown]);

  function onForSaleButtonClick(e) {
    if (e.currentTarget === buttonRef.current) {
      setDropDown(!dropDown);
    }
  }

  console.log("buttonValue: ", buttonValue)

  return (
    <div className="home-listing-type-wrapper">
      <button
        className={`filter-btn ${buttonValue ? "selected" : ""}`}
        style={{
          width:
            buttonValue !== "For Sale" && buttonValue !== "For Rent"
              ? "140px"
              : "auto",
        }} // Every button has 140px width except "For Sale" button
        ref={buttonRef}
        onClick={onForSaleButtonClick}
      >
        <span>{buttonValue}</span>
        <FontAwesomeIcon icon={dropDown ? faAngleUp : faAngleDown} />
      </button>
      {dropDown && (
        <div
          style={{ width: dropDownWidth, display: "inline-block" }}
          className="dropdown"
          onClick={(e) => e.stopPropagation()}
        >
          <form
            className={
              "" + buttonValue === "For Sale" || buttonValue === "For Rent"
                ? "listing-type-dropdown-form"
                : "non-listing_type-dropdown-form"
            }
            onSubmit={(e) => handleSubmit(e, setDropDown)}
          >
            {children}
          </form>
        </div>
      )}
    </div>
  );
};

export default DropDown;
