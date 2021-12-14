import styled from 'styled-components';

export const TabContainer = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 1152px;
  height: 10rem;
  margin: 1rem auto;
  border-bottom: 1px solid #eeeeee;

  @media screen and (min-width: 768px) {
    flex-direction: row;
    height: 14rem;
    margin: 2rem auto 4rem;
    border-left: 2px solid var(--color-black);
    border-right: 1px solid #eeeeee;
  }
`;

export const TabList = styled.ul`
  flex: 1;
  display: flex;
  flex-direction: row;

  @media screen and (min-width: 768px) {
    flex-direction: column;
  }
`;

export const TabMenu = styled.li`
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: 800;
  color: #888888;
  background: #f8f8f8;
  border: 1px solid #eeeeee;
  cursor: pointer;
  &.tab_focused {
    color: var(--color-black);
    background: #ffffff;
    border: none;
    border-top: 2px solid var(--color-black);
  }

  @media screen and (min-width: 768px) {
    flex: 1;
    justify-content: flex-start;
    align-items: flex-start;
    padding: 1rem 0 0 2rem;
    font-weight: 800;
    color: var(--color-black);
    background: #ffffff;
    border: none;
    border-top: 1px solid #eeeeee;
    cursor: default;
    &.tab_focused {
      background: #ffffff;
      border: none;
      border-top: 1px solid #eeeeee;
    }
  }
`;

export const MenuListWrap = styled.div`
  flex: 1.8;
  display: flex;
  flex-direction: column;

  @media screen and (min-width: 768px) {
    flex: 7;
  }
`;

export const MenuList = styled.ul`
  display: none;

  &.menulist_focused {
    flex: 1;
    display: flex;
    flex-direction: row;
    align-items: center;
    width: 100vw;
    padding: 1rem 0 1rem 1.4rem;
    overflow-x: scroll;
  }
  &::-webkit-scrollbar {
    height: 0.4rem;
  }
  &::-webkit-scrollbar-thumb {
    background: #eeeeee;
  }

  @media screen and (min-width: 768px) {
    flex: 1;
    display: flex;
    flex-direction: row;
    align-items: center;
    padding: 0.8rem 0 0.4rem 1rem;
    border-top: 1px solid #eeeeee;
    overflow-x: scroll;

    &.menulist_focused {
      flex: 1;
      display: flex;
      flex-direction: row;
      align-items: center;
      width: 100%;
      padding: 0.8rem 0 0.4rem 1rem;
    }
  }
`;

export const FilteringMenu = styled.li`
  flex: 0 0 auto;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  margin-right: 1rem;
  padding: 0 1.2rem;
  font-weight: normal;
  color: #888888;
  border: 1px solid #eeeeee;
  border-radius: 0.3rem;
  cursor: pointer;

  &.menu_focused {
    font-weight: 700;
    color: var(--color-black);
    border: 1px solid var(--color-black);
  }
`;
