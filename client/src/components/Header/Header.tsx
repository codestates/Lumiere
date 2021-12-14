import { useState } from 'react';
import { useRecoilState } from 'recoil';
import { IsSigninState } from 'States/IsLoginState';
import instance from 'util/axios';
import { useNavigate } from 'react-router';
import { Link } from 'react-router-dom';
import { HiMenuAlt1 } from 'react-icons/hi';
import { BiSearch, BiHeart } from 'react-icons/bi';
import { AiOutlineShoppingCart, AiOutlinePoweroff } from 'react-icons/ai';
import { RiUserLine } from 'react-icons/ri';
import { UserInfoBox, NavButtonBox } from 'components/Nav/styled';
import LoginGuideModal from 'components/Modal/LoginGuideModal';
import Nav from '../Nav/Nav';
import {
  HeaderContainer,
  HeaderWrap,
  HambugerBtn,
  MainMenu,
  AdminMenu,
  LogoBox,
  IconBox,
  HeaderInfoBox,
} from './styled';

const Header = () => {
  const [isLogin, setIsLogin] = useRecoilState(IsSigninState);
  const [showMenu, setShowMenu] = useState<boolean>(false);
  const [clickModal, setClickModal] = useState<boolean>(false);
  const [isOpenLoginModal, setIsOpenLoginModal] = useState<boolean>(false);

  const history = useNavigate();
  const userInfo = localStorage.getItem('lumiereUserInfo');

  const logoutHandler = () => {
    // axios 요청
    instance
      .get('/users/logout')
      .then((res) => {
        console.log(res);
        localStorage.removeItem('lumiereUserInfo');
        setIsLogin(false);
        window.location.reload();
      })
      .catch((err) => {
        if (err.response.status === 401) {
          alert('로그인이 만료되었습니다. 다시 로그인해주세요.');
          localStorage.removeItem('lumiereUserInfo');
          setIsLogin(false);
          window.location.assign('/signin');
        } else window.location.assign('/error');
      });
  };

  const showMenuBox = () => {
    setShowMenu(!showMenu);
  };

  const clickModalHandler = () => {
    setClickModal(!clickModal);
  };

  const cartMoveHandler = () => {
    if (!isLogin) {
      setClickModal(!clickModal);
    } else {
      history('/cart');
    }
  };

  const openLoginModalHandler = () => {
    setIsOpenLoginModal(!isOpenLoginModal);
  };

  const goToMyPageHandler = () => {
    if (!isLogin) {
      openLoginModalHandler();
    } else {
      window.location.assign('/mypage');
    }
  };
  return (
    <HeaderContainer>
      {clickModal && <LoginGuideModal clickModalHandler={clickModalHandler} />}
      <HeaderWrap>
        <HambugerBtn onClick={showMenuBox}>
          <HiMenuAlt1 />
        </HambugerBtn>
        <LogoBox>
          <Link to="/">
            <img src="/images/logo.png" alt="루미에르 로고" />
          </Link>
        </LogoBox>
        {/* 모바일 Nav */}
        {showMenu && <Nav />}
        {/* 웹 Nav */}
        <MainMenu>
          <ul>
            <li>
              <Link
                to="/"
                className={window.location.pathname === '/' ? 'curPage' : ''}
              >
                홈
              </Link>
            </li>
            <li>
              <Link
                to="/artlist"
                className={
                  window.location.pathname === '/artlist' ? 'curPage' : ''
                }
              >
                작품보기
              </Link>
            </li>
            <li>
              <Link
                to="/artists"
                className={
                  window.location.pathname === '/artists' ? 'curPage' : ''
                }
              >
                작가
              </Link>
            </li>
            <li>
              <Link to="/">작가 신청</Link>
            </li>
            <li>
              <div
                role="button"
                tabIndex={0}
                onClick={() => goToMyPageHandler()}
                onKeyDown={() => goToMyPageHandler()}
                className={
                  window.location.pathname === '/mypage' ? 'curPage' : ''
                }
              >
                마이페이지
              </div>
            </li>
            {isLogin && userInfo && JSON.parse(userInfo).isAdmin ? (
              <AdminMenu>
                <Link to="/admin/product">어드민페이지</Link>
                <ul>
                  <li>
                    <Link to="/admin/order">결제/배송 관리</Link>
                  </li>
                  <li>
                    <Link to="/admin/product">작품 관리</Link>
                  </li>
                  <li>
                    <Link to="/admin/user">유저 관리</Link>
                  </li>
                  <li>
                    <Link to="/admin/artist">작가 관리</Link>
                  </li>
                  <li>
                    <Link to="/admin/banner">배너 관리</Link>
                  </li>
                </ul>
              </AdminMenu>
            ) : null}
          </ul>
        </MainMenu>
        <IconBox>
          <div>
            <BiSearch />
          </div>
          <button type="button" onClick={cartMoveHandler}>
            <AiOutlineShoppingCart />
          </button>
          <div>
            <BiHeart />
          </div>
        </IconBox>
        {isLogin ? (
          <HeaderInfoBox>
            <UserInfoBox>
              <Link to="/mypage">
                <RiUserLine />
                <div>
                  <span>{userInfo && JSON.parse(userInfo).name}</span>님
                </div>
              </Link>
              <div
                role="button"
                tabIndex={0}
                onClick={logoutHandler}
                onKeyDown={logoutHandler}
              >
                <AiOutlinePoweroff />
              </div>
            </UserInfoBox>
          </HeaderInfoBox>
        ) : (
          <HeaderInfoBox>
            <NavButtonBox>
              <Link to="/signin">로그인</Link>
              <Link to="/signup">회원가입</Link>
            </NavButtonBox>
          </HeaderInfoBox>
        )}
      </HeaderWrap>
      {/* Modal */}
      {isOpenLoginModal && (
        <LoginGuideModal clickModalHandler={openLoginModalHandler} />
      )}
    </HeaderContainer>
  );
};
export default Header;
