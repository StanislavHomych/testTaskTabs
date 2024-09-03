import { bool, func, number } from "prop-types"
import pinIcon from "./../../images/fi-rs-thumbtack.png"

export default function Pin({ isVisible, onPinClick, isTabPinned }) {
  return (
    <div
      style={{
        position: "absolute",
        visibility: isVisible ? "visible" : "hidden",
        display: "flex",
        alignItems: "center",
        top: "30px",
        border: "1px solid #AEB6CE33",
        backgroundColor: "#fff",
        height: "35px",
        padding: "0px 10px",
        boxShadow: "0px 0px 20px -11px rgba(0,0,0,0.75)",
        cursor: "pointer",
        color: "#73767e",
        borderRadius: "5px",
      }}
      onClick={() => {
        onPinClick()
      }}
    >
      <img
        src={pinIcon}
        alt="pinIcon"
        style={{
          padding: "5px",
        }}
        height="15px"
      />
      <p>{isTabPinned ? "Tab anpinen" : "pin"}</p>
    </div>
  )
}

Pin.propTypes = {
  isVisible: bool,
  pageX: number,
  pageY: number,
  onPinClick: func,
  isTabPinned: bool,
}
