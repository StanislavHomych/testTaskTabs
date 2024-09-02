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

let tabsData = [
  {
    id: 1,
    iconSrc: apps,
    title: "",
    isActive: false,
  },
  {
    id: 2,
    iconSrc: bank,
    title: "Dashboard",
    isActive: false,
  },
  {
    id: 3,

    iconSrc: bank2,
    title: "Banking",
    isActive: false,
  },
  {
    id: 4,
    iconSrc: browser,
    title: "Telefonie",
    isActive: false,
  },
  {
    id: 5,

    iconSrc: chart,
    title: "Accounting",
    isActive: false,
  },
  {
    id: 6,

    iconSrc: cube,
    title: "Verkauf",
    isActive: false,
  },
  {
    id: 7,
    iconSrc: list,
    title: "Statistik",
    isActive: false,
  },
  {
    id: 8,

    iconSrc: phoneCall,
    title: "Post Office",
    isActive: false,
  },
  {
    id: 9,

    iconSrc: settings,
    title: "Administration",
    isActive: false,
  },
  {
    id: 10,

    iconSrc: shop,
    title: "Help",
    isActive: false,
  },
  {
    id: 11,

    iconSrc: shopingCart,
    title: "Warenbestand",
    isActive: false,
  },
  {
    id: 12,

    iconSrc: userAddBtn,
    title: "Auswahllisten",
    isActive: false,
  },
  {
    id: 13,

    iconSrc: userAddBtn,
    title: "Winkauf",
    isActive: false,
  },
  {
    id: 14,

    iconSrc: book,
    title: "Rechn",
    isActive: false,
  },
]

export default function TabsContainer() {
  const [pinnedTabs, setPinnedTabs] = useLocalStorage("pinnedTabs", [])

  const filteredTabsData = tabsData.filter(
    (tabData) => !pinnedTabs.some((pinnedTab) => pinnedTab.id === tabData.id)
  )

  let arrayToRender = [...pinnedTabs, ...filteredTabsData]

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
      }}
    >
      {arrayToRender.map((item) => {
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
          />
        )
      })}
      <div></div>
    </div>
  )
}
