import PropTypes, { array, func, object } from "prop-types"
import { useState } from "react"
import closeIconHover from "./../../images/closeHover.png"
import Pin from "./Pin"
import { useRef, useCallback } from "react"
import useMouse from "@react-hook/mouse-position"

export default function Tab({
  icon,
  title,
  setPinnedTabs,
  tab,
  isPinned,
  currentTab,
  setCurrentTab,
  setArrayTorender,
}) {
  const [close, setCloseIcon] = useState(false)
  const [isTabActive, setIsTabActive] = useState(false)
  const [isTabPinned, setIsTabPinned] = useState(false)
  const [isDragging, setIsDragging] = useState(false)

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
      setIsTabPinned(!isTabPinned)
    }
  }

  function dragStartHandler(e, tab) {
    setIsDragging(true)
    console.log("drag", tab)
    setCurrentTab(tab)
  }
  function dragEndHandler() {
    setIsDragging(false)
  }
  function onDragOverHandler(e) {
    e.preventDefault()
  }
  function dropHandler(e, tab) {
    e.preventDefault()
    setArrayTorender((prevArray) =>
      prevArray.map((t) => {
        if (t.id === tab.id) {
          return { ...t, order: currentTab.order }
        }
        if (t.id === currentTab.id) {
          return { ...t, order: tab.order }
        }
        return t
      })
    )
  }

  function handleRemoveClick(e) {
    e.stopPropagation()
    setArrayTorender((prevArray) => prevArray.filter((t) => t.id !== tab.id))
  }

  return (
    <div
      ref={ref}
      draggable={true}
      onDragStart={(e) => dragStartHandler(e, tab)}
      onDragLeave={(e) => dragEndHandler(e)}
      onDragEnd={(e) => dragEndHandler(e)}
      onDragOver={(e) => onDragOverHandler(e)}
      onDrop={(e) => dropHandler(e, tab)}
      style={{
        display: "flex",
        alignItems: "center",
        height: "35px",
        padding: " 0 10px",
        fontFamily: "Poppins",
        fontSize: "15px",
        borderTop: isPinned ? "3px solid #4690E2" : "none",
        whiteSpace: "nowrap",
        cursor: "grab",
        backgroundColor: isDragging ? "#333" : isTabActive ? "#F1F5F8" : "#fff",
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
        onClick={(e) => {
          handleRemoveClick(e)
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
  currentTab: object,
  setCurrentTab: func,
  setArrayTorender: func,
  arrayToRender: array,
}
