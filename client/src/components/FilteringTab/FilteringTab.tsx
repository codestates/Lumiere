import { useState } from 'react';
import {
  TabContainer,
  TabList,
  TabMenu,
  MenuListWrap,
  MenuList,
  FilteringMenu,
} from './styled';

const FilteringTab = () => {
  const tabMenus = [
    {
      id: 0,
      name: '테마',
      content: [
        { id: 0, parent: 0, name: '인물' },
        { id: 1, parent: 0, name: '풍경' },
        { id: 2, parent: 0, name: '정물' },
        { id: 3, parent: 0, name: '동물' },
        { id: 4, parent: 0, name: '상상' },
        { id: 5, parent: 0, name: '추상' },
      ],
    },
    {
      id: 1,
      name: '사이즈',
      content: [
        { id: 10, parent: 1, name: '1~5호' },
        { id: 11, parent: 1, name: '6~10호' },
        { id: 12, parent: 1, name: '~20호' },
        { id: 13, parent: 1, name: '~30호' },
        { id: 14, parent: 1, name: '~40호' },
        { id: 15, parent: 1, name: '~60호' },
      ],
    },
    {
      id: 2,
      name: '구매가격',
      content: [
        { id: 20, parent: 2, name: '~5만원' },
        { id: 21, parent: 2, name: '5~10만원' },
        { id: 22, parent: 2, name: '10~20만원' },
        { id: 23, parent: 2, name: '20~50만원' },
        { id: 24, parent: 2, name: '50~100만원' },
        { id: 25, parent: 2, name: '100만원~' },
      ],
    },
  ];

  const [currentTab, setCurrentTab] = useState(1);
  const [currentMenu, setCurrentMenu] = useState(0);

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
