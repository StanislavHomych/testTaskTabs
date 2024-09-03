import { useState } from "react"
import PropTypes from "prop-types"
import expandMore1 from "./../../images/expand_more.png"
import expandMore2 from "./../../images/expand_more2.png"
import closeIconHover from "./../../images/closeHover.png"

export default function DropdownMenu({ elementsToShowInDropDown }) {
  const [isVisible, setIsVisible] = useState(false)
  const [hoveredItem, setHoveredItem] = useState(null)

  return (
    <div
      style={{
        backgroundColor: !isVisible ? "#4690E2" : "#ffffff",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        position: "relative",
        height: "30px",
        padding: "0px 8px",
      }}
    >
      <img
        src={!isVisible ? expandMore1 : expandMore2}
        onClick={() => setIsVisible(!isVisible)}
      />
      <div
        style={{
          visibility: isVisible ? "visible" : "hidden",
          position: "absolute",
          height: "35px",
          top: "30px",
          right: "0px",
          backgroundColor: "#ffffff",
        }}
      >
        {elementsToShowInDropDown.map((item) => (
          <div
            key={item.id}
            onMouseOver={() => setHoveredItem(item.id)}
            onMouseOut={() => setHoveredItem(null)}
            style={{
              display: "flex",
              alignItems: "center",
              height: "35px",
              padding: "0 10px",
              fontFamily: "Poppins",
              fontSize: "15px",
              whiteSpace: "nowrap",
              cursor: "grab",
            }}
          >
            <img src={item.iconSrc} alt={item.title} />
            <p
              style={{
                padding: "5px",
                color: "#73767e",
              }}
            >
              {item.title}
            </p>
            <img
              src={closeIconHover}
              alt="closeIcon"
              width="15px"
              height="15px"
              style={{
                visibility: hoveredItem === item.id ? "visible" : "hidden",
                cursor: "pointer",
              }}
            />
          </div>
        ))}
      </div>
    </div>
  )
}

DropdownMenu.propTypes = {
  elementsToShowInDropDown: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      iconSrc: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
    })
  ).isRequired,
}
