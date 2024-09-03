import Tab from "./Tab"
import userAddBtn from "./../../images/fi-rs-user-add.png"
import shopingCart from "./../../images/fi-rs-shopping-cart-check.png"
import shop from "./../../images/fi-rs-shop.png"
import settings from "./../../images/fi-rs-settings.png"
import phoneCall from "./../../images/fi-rs-phone-call.png"
import list from "./../../images/fi-rs-list.png"
import cube from "./../../images/fi-rs-cube.png"
import chart from "./../../images/fi-rs-chart-pie.png"
import browser from "./../../images/fi-rs-browser.png"
import book from "./../../images/fi-rs-book-alt.png"
import bank from "./../../images/fi-rs-bank.png"
import bank2 from "./../../images/fi-rs-bank (1).png"
import apps from "./../../images/fi-rs-apps.png"
import useLocalStorage from "../hooks/useLocalStore"
import { useEffect, useState } from "react"
import DropdownMenu from "./DropdownMenu"

let tabsData = [
  {
    id: 1,
    iconSrc: apps,
    title: "",
    isActive: false,
    order: 1,
    showInMain: true,
  },
  {
    id: 2,
    iconSrc: bank,
    title: "Dashboard",
    isActive: false,
    order: 2,
    showInMain: true,
  },
  {
    id: 3,

    iconSrc: bank2,
    title: "Banking",
    isActive: false,
    order: 3,
    showInMain: true,
  },
  {
    id: 4,
    iconSrc: browser,
    title: "Telefonie",
    isActive: false,
    order: 4,
    showInMain: true,
  },
  {
    id: 5,

    iconSrc: chart,
    title: "Accounting",
    isActive: false,
    order: 5,
    showInMain: true,
  },
  {
    id: 6,

    iconSrc: cube,
    title: "Verkauf",
    isActive: false,
    order: 6,
    showInMain: true,
  },
  {
    id: 7,
    iconSrc: list,
    title: "Statistik",
    isActive: false,
    order: 7,
    showInMain: true,
  },
  {
    id: 8,

    iconSrc: phoneCall,
    title: "Post Office",
    isActive: false,
    order: 8,
    showInMain: true,
  },
  {
    id: 9,

    iconSrc: settings,
    title: "Administration",
    isActive: false,
    order: 9,
    showInMain: true,
  },
  {
    id: 10,

    iconSrc: shop,
    title: "Help",
    isActive: false,
    order: 10,
    showInMain: true,
  },
  {
    id: 11,

    iconSrc: shopingCart,
    title: "Warenbestand",
    isActive: false,
    order: 11,
    showInMain: true,
  },
  {
    id: 12,

    iconSrc: userAddBtn,
    title: "Auswahllisten",
    isActive: false,
    order: 12,
    showInMain: true,
  },
  {
    id: 13,

    iconSrc: userAddBtn,
    title: "Winkauf",
    isActive: false,
    order: 13,
    showInMain: true,
  },
  {
    id: 14,

    iconSrc: book,
    title: "Rechn",
    isActive: false,
    order: 14,
    showInMain: true,
  },
]

export default function TabsContainer() {
  const [pinnedTabs, setPinnedTabs] = useLocalStorage("pinnedTabs", [])
  const [currentTab, setCurrentTab] = useState(null)
  // eslint-disable-next-line no-unused-vars
  const [visibleItems, setVisibleItems] = useState([])
  const [elementsToShowInDropDown, setElementsToShowInDropDown] = useState([])
  const [arrayToRender, setArrayToRender] = useState([
    ...pinnedTabs,
    ...tabsData.filter(
      (tabData) => !pinnedTabs.some((pinnedTab) => pinnedTab.id === tabData.id)
    ),
  ])

  console.log(pinnedTabs)

  const updateItems = () => {
    const container = document.getElementById("container")
    if (!container) return

    const containerWidth = container.clientWidth
    const itemElements = document.querySelectorAll(".item")

    let totalWidth = 0
    const visible = []
    const overflow = []

    itemElements.forEach((element, index) => {
      totalWidth += element.clientWidth
      if (totalWidth <= containerWidth) {
        visible.push(arrayToRender[index])
      } else {
        overflow.push(arrayToRender[index])
      }
    })

    setVisibleItems(visible)
    setElementsToShowInDropDown(overflow)
  }

  useEffect(() => {
    updateItems()
    window.addEventListener("resize", updateItems)

    return () => {
      window.removeEventListener("resize", updateItems)
    }
  }, [arrayToRender])

  const sortCards = (a, b) => a.order - b.order

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        width: "100%",
        justifyContent: "space-between",
      }}
      id="container"
    >
      {arrayToRender.sort(sortCards).map((item) => (
        <Tab
          key={item.id}
          icon={item.iconSrc}
          title={item.title}
          setPinnedTabs={setPinnedTabs}
          tab={item}
          isPinned={pinnedTabs.some((pinnedTab) => pinnedTab.id === item.id)}
          currentTab={currentTab}
          setCurrentTab={setCurrentTab}
          setArrayToRender={setArrayToRender}
          isActive={currentTab?.id === item.id}
        />
      ))}
      <DropdownMenu elementsToShowInDropDown={elementsToShowInDropDown} />
    </div>
  )
}
