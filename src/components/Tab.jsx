import PropTypes from "prop-types"
import { useState } from "react"
import closeIconHover from "./../../images/closeHover.png"
import Pin from "./Pin"
import { useRef, useCallback } from "react"
import useMouse from "@react-hook/mouse-position"

export default function Tab({ icon, title, setPinnedTabs, tab, isPinned }) {
  const [close, setCloseIcon] = useState(false)
  const [isTabActive, setIsTabActive] = useState(false)
  const [isTabPinned, setIsTabPinned] = useState(false)

  const ref = useRef(null)
  const mouse = useMouse(ref, {
    enterDelay: 0,
    leaveDelay: 0,
  })

  const [hoveredPosition, setHoveredPosition] = useState({ x: 0, y: 0 })

  function onTabClick() {
    setIsTabActive(!isTabActive)
  }

  const handleMouseEnter = useCallback(() => {
    const rect = ref.current.getBoundingClientRect()

    setHoveredPosition({
      x: mouse.x - rect.left,
      y: mouse.y - rect.top,
    })
  }, [mouse])

  function onPinClick() {
    if (!isTabPinned) {
      setPinnedTabs((tabs) => {
        if (tabs.some((existingTab) => existingTab.id === tab.id)) {
          return tabs
        }
        return [...tabs, tab]
      })
      setIsTabPinned(!isTabPinned)
    } else {
      setPinnedTabs((tabs) =>
        tabs.filter((existingTab) => existingTab.id !== tab.id)
      )
    }
  }

  return (
    <div
      ref={ref}
      style={{
        display: "flex",
        alignItems: "center",
        height: "35px",
        padding: " 0 10px",
        fontFamily: "Poppins",
        fontSize: "15px",
        borderTop: isPinned ? "3px solid #4690E2" : "none",
        backgroundColor: isTabActive ? "#F1F5F8" : "#fff",
        whiteSpace: "nowrap",
      }}
      onClick={() => {
        onTabClick()
      }}
      onMouseOver={() => {
        setCloseIcon(true)
      }}
      onMouseOut={() => {
        setCloseIcon(false)
      }}
      onMouseEnter={handleMouseEnter}
    >
      <img src={icon} alt="icon" width="15px" height="15px" />
      <p
        style={{
          padding: "5px",
          color: !isTabActive ? "#73767e" : "#000",
        }}
      >
        {title}
      </p>
      <img
        src={closeIconHover}
        alt="closeIcon"
        width="15px"
        height="15px"
        style={{
          visibility: close ? "visible" : "hidden",
          cursor: "pointer",
        }}
      />
      <Pin
        isVisible={close}
        pageX={hoveredPosition.x}
        pageY={hoveredPosition.y}
        onPinClick={onPinClick}
        isTabPinned={isTabPinned}
      />
    </div>
  )
}

Tab.propTypes = {
  icon: PropTypes.string,
  title: PropTypes.string,
  setPinnedTabs: PropTypes.func,
  tab: PropTypes.object,
  isPinned: PropTypes.bool,
}
