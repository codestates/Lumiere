/* eslint no-underscore-dangle: 0 */
import { useState, useEffect } from 'react';
import instance from 'util/axios';
import Header from 'components/Header/Header';
import { useRecoilState } from 'recoil';
import { IsSigninState } from 'States/IsLoginState';
import Footer from 'components/Footer/Footer';
import QuickBtns from 'components/QuickBtns/QuickBtns';
import OrderHistory from 'components/OrderHistory/OrderHistory';
import ZzimProducts from 'components/ZzimProducts/ZzimProducts';
import ZzimArtists from 'components/ZzimArtists/ZzimArtists';
import { MdOutlineArrowForwardIos } from 'react-icons/md';
import { tabMenus } from './dummy';
import {
  MyPageContainer,
  MyPageWrap,
  StatusWrap,
  StatusList,
  ContentContainer,
  ContentWrap,
  TabContainer,
  TabList,
  TabMenu,
  MenuListWrap,
} from './styled';

const MyPage = () => {
  const [isLogin, setIsLogin] = useRecoilState(IsSigninState);
  const [currentTab, setCurrentTab] = useState(0);
  const [currentMenu, setCurrentMenu] = useState(-1);

  useEffect(() => {
    // axios 요청
  }, []);

  const selectTabHandler = (id: number) => {
    setCurrentTab(id);
  };

  const tabHandler = () => {
    if (currentTab === 0) {
      return <OrderHistory />;
    }
    if (currentTab === 1) {
      return <ZzimProducts />;
    }
    if (currentTab === 2) {
      return <ZzimArtists />;
    }
    if (currentTab === 3) {
      return <ZzimArtists />;
    }
    return <ZzimArtists />;
  };

  return (
    <MyPageContainer>
      <Header />
      <MyPageWrap>
        <StatusWrap>
          <h1>마이페이지</h1>
          <StatusList>
            <li>
              <div>1</div>
              <span>결제완료</span>
            </li>
            <MdOutlineArrowForwardIos />
            <li>
              <div>0</div>
              <span>상품/배송준비중</span>
            </li>
            <MdOutlineArrowForwardIos />
            <li>
              <div>0</div>
              <span>배송중</span>
            </li>
            <MdOutlineArrowForwardIos />
            <li>
              <div>0</div>
              <span>배송완료</span>
            </li>
          </StatusList>
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
          </TabContainer>
        </StatusWrap>
        <ContentContainer>
          <ContentWrap>{tabHandler()}</ContentWrap>
        </ContentContainer>
      </MyPageWrap>
      <QuickBtns />
      <Footer />
    </MyPageContainer>
  );
};

export default MyPage;
