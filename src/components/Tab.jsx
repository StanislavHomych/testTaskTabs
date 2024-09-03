import PropTypes from "prop-types"
import { useState, useRef, useCallback } from "react"
import closeIconHover from "./../../images/closeHover.png"
import Pin from "./Pin"
import useMouse from "@react-hook/mouse-position"

export default function Tab({
  icon,
  title,
  setPinnedTabs,
  tab,
  isPinned,
  currentTab,
  setCurrentTab,
  setArrayToRender,
  isActive,
}) {
  const [close, setCloseIcon] = useState(false)
  const [isTabPinned, setIsTabPinned] = useState(false)
  const [isDragging, setIsDragging] = useState(false)

  const ref = useRef(null)
  const mouse = useMouse(ref, {
    enterDelay: 0,
    leaveDelay: 0,
  })

  const [hoveredPosition, setHoveredPosition] = useState({ x: 0, y: 0 })

  const onTabClick = () => {
    setCurrentTab(tab)
  }

  const handleMouseEnter = useCallback(() => {
    const rect = ref.current.getBoundingClientRect()

    setHoveredPosition({
      x: mouse.x - rect.left,
      y: mouse.y - rect.top,
    })
  }, [mouse])

  const onPinClick = () => {
    if (!isTabPinned) {
      setPinnedTabs((tabs) => {
        if (tabs.some((existingTab) => existingTab.id === tab.id)) {
          return tabs
        }
        return [...tabs, tab]
      })
      setIsTabPinned(true)
    } else {
      setPinnedTabs((tabs) =>
        tabs.filter((existingTab) => existingTab.id !== tab.id)
      )
      setIsTabPinned(false)
    }
  }

  const dragStartHandler = () => {
    setIsDragging(true)
    setCurrentTab(tab)
  }

  const dragEndHandler = () => {
    setIsDragging(false)
  }

  const onDragOverHandler = (e) => {
    e.preventDefault()
  }

  const dropHandler = (e, tab) => {
    e.preventDefault()
    setArrayToRender((prevArray) =>
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

  const handleRemoveClick = (e) => {
    e.stopPropagation()
    setArrayToRender((prevArray) => prevArray.filter((t) => t.id !== tab.id))
  }

  return (
    <div
      ref={ref}
      draggable={true}
      onDragStart={dragStartHandler}
      onDragEnd={dragEndHandler}
      onDragOver={onDragOverHandler}
      onDrop={(e) => dropHandler(e, tab)}
      className="item"
      style={{
        display: "flex",
        alignItems: "center",
        height: "35px",
        padding: "0 10px",
        fontFamily: "Poppins",
        fontSize: "15px",
        borderTop: isPinned ? "3px solid #4690E2" : "none",
        whiteSpace: "nowrap",
        cursor: "grab",
        backgroundColor: isDragging ? "#333" : isActive ? "#F1F5F8" : "#fff",
      }}
      onClick={onTabClick}
      onMouseOver={() => setCloseIcon(true)}
      onMouseOut={() => setCloseIcon(false)}
      onMouseEnter={handleMouseEnter}
    >
      <img src={icon} alt="icon" width="15px" height="15px" />
      <p
        style={{
          padding: "5px",
          color: !isActive ? "#73767e" : "#000",
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
        onClick={handleRemoveClick}
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
  currentTab: PropTypes.object,
  setCurrentTab: PropTypes.func,
  setArrayToRender: PropTypes.func,
  isActive: PropTypes.bool,
}
