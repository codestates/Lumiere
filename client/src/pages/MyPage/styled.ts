import styled from 'styled-components';

export const MyPageContainer = styled.div`
  padding-top: 6vh;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
`;

export const MyPageWrap = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  text-align: center;
`;

export const StatusWrap = styled.div`
  padding-top: 2rem;
  border-bottom: 1px solid #eeeeee;
  > h1 {
    font-size: 2rem;
    font-weight: 700;
  }
`;

export const StatusList = styled.ul`
  display: flex;
  justify-content: center;
  margin-top: 2rem;
  > li {
    > div {
      width: 3rem;
      height: 3rem;
      margin: 0 auto 0.5rem;
      font-weight: 700;
      line-height: 3rem;
      color: #666666;
      background-color: #f9f9f9;
      border-radius: 50%;
    }
    > span {
      font-size: 0.9rem;
      color: #999999;
    }
  }
  > svg {
    margin: 1rem 1rem 0;
  }
`;

export const TabContainer = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 1152px;
  height: 3rem;
  margin: 2rem auto 0;
  border-bottom: 1px solid #eeeeee;
`;

export const TabList = styled.ul`
  flex: 1;
  display: flex;
`;

export const TabMenu = styled.li`
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: 800;
  color: #888888;
  cursor: pointer;
  &.tab_focused {
    color: var(--color-black);
    background: #ffffff;
    border: none;
    border-bottom: 2px solid var(--color-black);
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

export const ContentContainer = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 2rem 1rem;
  background-color: #f7f7f7;
`;

export const ContentWrap = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  max-width: 1152px;
  width: 100%;
  background-color: #ffffff;
`;
