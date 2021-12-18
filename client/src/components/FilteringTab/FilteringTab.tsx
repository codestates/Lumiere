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
};
const FilteringTab = ({ filteringHandler }: GreetingProps) => {
  const [currentTab, setCurrentTab] = useState(1);
  const [currentMenu, setCurrentMenu] = useState(-1);

  useEffect(() => {
    if (currentMenu <= 5) filteringHandler(tabTypes[currentMenu]);
    else if (currentMenu <= 16) {
      filteringHandler(tabTypes[currentMenu]);
    } else {
      filteringHandler(tabTypes[currentMenu]);
    }
  }, [currentMenu]);

  const selectTabHandler = (id: number) => {
    setCurrentTab(id);
  };
  const selectMenuHandler = (id: number) => {
    if (currentMenu === id) {
      setCurrentMenu(-1);
    } else {
      setCurrentMenu(id);
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
