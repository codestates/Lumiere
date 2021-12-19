/* eslint no-underscore-dangle: 0 */
import { useState, useEffect } from 'react';
import { useLocation } from 'react-router';
import Header from 'components/Header/Header';
import Footer from 'components/Footer/Footer';
import QuickBtns from 'components/QuickBtns/QuickBtns';
import OrderHistory from 'components/OrderHistory/OrderHistory';
import ZzimProducts from 'components/ZzimProducts/ZzimProducts';
import ZzimArtists from 'components/ZzimArtists/ZzimArtists';
import VerifyPassword from 'components/VerifyPassword/VerifyPassword';
import instance from 'util/axios';
import ChangePassword from 'components/ChangePassword/ChangePassword';
import UserLeave from 'components/UserLeave/UserLeave';
import { MdOutlineArrowForwardIos } from 'react-icons/md';
import { MypageOrder } from 'util/type';
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
} from './styled';

const MyPage = () => {
  const [currentTab, setCurrentTab] = useState(0);
  const [pwdMatch, setPwdMatch] = useState(false);
  const [oldPwd, setOldPwd] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [userData, setUserData] = useState<MypageOrder>({
    orders: [
      {
        orderItems: [
          {
            artist: '',
            image: '',
            price: 0,
            product: '',
            size: '',
            title: '',
          },
        ],
        result: {
          id: '',
          paidAt: '',
          status: 0,
          updatedAt: '',
        },
        totalPrice: 0,
        user: '',
        _id: '',
      },
    ],
    page: 1,
    pages: 1,
  });

  const location = useLocation();

  useEffect(() => {
    if (location.state === 'ZzimProducts') setCurrentTab(1);
  }, []);

  useEffect(() => {
    instance.get('/orders/mine').then((res) => {
      setUserData(res.data);
    });
  }, []);

  const selectTabHandler = (id: number) => {
    if (pwdMatch) {
      setOldPwd('');
      setPwdMatch(false);
    }
    location.state = '';
    setCurrentTab(id);
  };

  const tabHandler = () => {
    const userInfo = localStorage.getItem('lumiereUserInfo');

    if (currentTab === 0) {
      return <OrderHistory isLoading={isLoading} setIsLoading={setIsLoading} />;
    }
    if (currentTab === 1) {
      return <ZzimProducts isLoading={isLoading} setIsLoading={setIsLoading} />;
    }
    if (currentTab === 2) {
      return <ZzimArtists isLoading={isLoading} setIsLoading={setIsLoading} />;
    }
    if (currentTab === 3) {
      if (userInfo) {
        const { social } = JSON.parse(userInfo);
        if (social) {
          return <div>소셜 간편로그인 회원은 비밀번호 변경이 불가능합니다</div>;
        }
        if (!social && pwdMatch) {
          return <ChangePassword oldPwd={oldPwd} />;
        }
      }
      return (
        <VerifyPassword
          pwdMatch={pwdMatch}
          setPwdMatch={setPwdMatch}
          setOldPwd={setOldPwd}
        />
      );
    }
    if (userInfo) {
      const { social } = JSON.parse(userInfo);
      if (social || pwdMatch) {
        return <UserLeave />;
      }
    }
    return (
      <VerifyPassword
        pwdMatch={pwdMatch}
        setPwdMatch={setPwdMatch}
        setOldPwd={setOldPwd}
      />
    );
  };

  return (
    <MyPageContainer>
      <Header />
      <MyPageWrap>
        <StatusWrap>
          <h1>마이페이지</h1>
          <StatusList>
            <li>
              <div>{userData.status?.paid || 0}</div>
              <span>결제완료</span>
            </li>
            <MdOutlineArrowForwardIos />
            <li>
              <div>{userData.status?.ready || 0}</div>
              <span>상품/배송준비중</span>
            </li>
            <MdOutlineArrowForwardIos />
            <li>
              <div>{userData.status?.coming || 0}</div>
              <span>배송중</span>
            </li>
            <MdOutlineArrowForwardIos />
            <li>
              <div>{userData.status?.done || 0}</div>
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
          <ContentWrap>
            {location.state === 'ZzimProducts' ? (
              <ZzimProducts isLoading={isLoading} setIsLoading={setIsLoading} />
            ) : (
              tabHandler()
            )}
          </ContentWrap>
        </ContentContainer>
      </MyPageWrap>
      <QuickBtns isLoading={isLoading} />
      <Footer />
    </MyPageContainer>
  );
};

export default MyPage;
