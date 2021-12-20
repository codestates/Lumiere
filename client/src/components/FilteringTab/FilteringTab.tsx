import { useState, useEffect } from 'react';
import { tabMenus, tabTypes } from './dummy';
import {
  TabContainer,
  TabList,
  TabMenu,
  MenuListWrap,
  MenuList,
  FilteringMenu,
} from './styled';

type GreetingProps = {
  filteringHandler: (type: {
    theme?: string;
    sizeMin?: number;
    sizeMax?: number;
    priceMin?: number;
    priceMax?: number;
  }) => void;
  setCurrentMenuHandler: (tabNumber: number) => void;
  currentMenu: number;
  setGetTypes: (tabTypes: {
    [key: number]: {
      theme?: string;
      sizeMin?: number;
      sizeMax?: number;
      priceMin?: number;
      priceMax?: number;
    };
  }) => void;
  setLastTabStateHandler: (tabNumber: number) => void;
};

const FilteringTab = ({
  filteringHandler,
  setCurrentMenuHandler,
  currentMenu,
  setGetTypes,
  setLastTabStateHandler,
}: GreetingProps) => {
  const [currentTab, setCurrentTab] = useState(1);
  useEffect(() => {
    if (currentMenu <= 5) {
      setGetTypes(tabTypes[currentMenu]);
      filteringHandler(tabTypes[currentMenu]);
    } else if (currentMenu <= 16) {
      setGetTypes(tabTypes[currentMenu]);
      filteringHandler(tabTypes[currentMenu]);
    } else {
      setGetTypes(tabTypes[currentMenu]);
      filteringHandler(tabTypes[currentMenu]);
    }
  }, [currentMenu]);

  const selectTabHandler = (id: number) => {
    setCurrentTab(id);
  };
  const selectMenuHandler = (id: number) => {
    if (currentMenu === id) {
      setLastTabStateHandler(currentMenu);
      setCurrentMenuHandler(-1);
    } else {
      setLastTabStateHandler(currentMenu);
      setCurrentMenuHandler(id);
    }
  };

  return (
    <TabContainer>
      <TabList>
        {tabMenus.map((tab) => {
          return (
            <TabMenu
              key={tab.id}
              onClick={() => selectTabHandler(tab.id)}
              className={currentTab === tab.id ? 'tab_focused' : ''}
            >
              {tab.name}
            </TabMenu>
          );
        })}
      </TabList>
      <MenuListWrap>
        {tabMenus.map((tab, idx) => {
          return (
            <MenuList
              key={tab.id}
              className={currentTab === idx ? 'menulist_focused' : ''}
            >
              {tab.content.map((menu) => {
                return (
                  <FilteringMenu
                    key={menu.id}
                    onClick={() => selectMenuHandler(menu.id)}
                    className={currentMenu === menu.id ? 'menu_focused' : ''}
                  >
                    {menu.name}
                  </FilteringMenu>
                );
              })}
            </MenuList>
          );
        })}
      </MenuListWrap>
    </TabContainer>
  );
};
export default FilteringTab;
