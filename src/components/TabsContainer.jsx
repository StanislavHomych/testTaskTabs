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
import { useState } from "react"

let tabsData = [
  {
    id: 1,
    iconSrc: apps,
    title: "",
    isActive: false,
    order: 1,
  },
  {
    id: 2,
    iconSrc: bank,
    title: "Dashboard",
    isActive: false,
    order: 2,
  },
  {
    id: 3,

    iconSrc: bank2,
    title: "Banking",
    isActive: false,
    order: 3,
  },
  {
    id: 4,
    iconSrc: browser,
    title: "Telefonie",
    isActive: false,
    order: 4,
  },
  {
    id: 5,

    iconSrc: chart,
    title: "Accounting",
    isActive: false,
    order: 5,
  },
  {
    id: 6,

    iconSrc: cube,
    title: "Verkauf",
    isActive: false,
    order: 6,
  },
  {
    id: 7,
    iconSrc: list,
    title: "Statistik",
    isActive: false,
    order: 7,
  },
  {
    id: 8,

    iconSrc: phoneCall,
    title: "Post Office",
    isActive: false,
    order: 8,
  },
  {
    id: 9,

    iconSrc: settings,
    title: "Administration",
    isActive: false,
    order: 9,
  },
  {
    id: 10,

    iconSrc: shop,
    title: "Help",
    isActive: false,
    order: 10,
  },
  {
    id: 11,

    iconSrc: shopingCart,
    title: "Warenbestand",
    isActive: false,
    order: 11,
  },
  {
    id: 12,

    iconSrc: userAddBtn,
    title: "Auswahllisten",
    isActive: false,
    order: 12,
  },
  {
    id: 13,

    iconSrc: userAddBtn,
    title: "Winkauf",
    isActive: false,
    order: 13,
  },
  {
    id: 14,

    iconSrc: book,
    title: "Rechn",
    isActive: false,
    order: 14,
  },
]

export default function TabsContainer() {
  const [pinnedTabs, setPinnedTabs] = useLocalStorage("pinnedTabs", [])
  const [currentTab, setCurrentTab] = useState()

  const filteredTabsData = tabsData.filter(
    (tabData) => !pinnedTabs.some((pinnedTab) => pinnedTab.id === tabData.id)
  )

  const [arrayToRender, setArrayTorender] = useState([
    ...pinnedTabs,
    ...filteredTabsData,
  ])

  const sortCards = (a, b) => {
    if (a.order > b.order) {
      return 1
    } else {
      return -1
    }
  }

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
      }}
    >
      {arrayToRender.sort(sortCards).map((item) => {
        const isPinned = pinnedTabs.some(
          (pinnedTab) => pinnedTab.id === item.id
        )

        return (
          <Tab
            key={item.id}
            icon={item.iconSrc}
            title={item.title}
            pinnedTabs={pinnedTabs}
            setPinnedTabs={setPinnedTabs}
            tab={item}
            isPinned={isPinned}
            currentTab={currentTab}
            setCurrentTab={setCurrentTab}
            setArrayTorender={setArrayTorender}
            arrayToRender={arrayToRender}
          />
        )
      })}
      <div></div>
    </div>
  )
}
