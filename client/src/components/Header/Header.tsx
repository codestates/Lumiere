import { useState } from 'react';
import { useRecoilState } from 'recoil';
import { IsSigninState } from 'States/IsLoginState';
import instance from 'util/axios';
import { saveAs } from 'file-saver';
import { useNavigate } from 'react-router';
import { Link } from 'react-router-dom';
import { HiMenuAlt1 } from 'react-icons/hi';
import { AiOutlinePoweroff } from 'react-icons/ai';
import LoginGuideModal from 'components/Modal/LoginGuideModal';
import {
  RiHeartLine,
  RiUserLine,
  RiShoppingCart2Line,
  RiSearchLine,
  RiCloseFill,
} from 'react-icons/ri';
import { UserInfoBox, NavButtonBox } from 'components/Nav/styled';
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
  SearchContainer,
  SearchWrap,
  SearchBarInputWrapper,
} from './styled';

const Header = () => {
  const [isLogin, setIsLogin] = useRecoilState(IsSigninState);
  const [showMenu, setShowMenu] = useState<boolean>(false);
  const [clickModal, setClickModal] = useState<boolean>(false);
  const [isOpenLoginModal, setIsOpenLoginModal] = useState<boolean>(false);
  const [isSearch, setIsSearch] = useState<boolean>(false);
  const [searchInput, setSearchInput] = useState<string>('');

  const history = useNavigate();
  const userInfo = localStorage.getItem('lumiereUserInfo');

  const logoutHandler = () => {
    // axios 요청
    instance
      .get('/users/logout')
      .then(() => {
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

  const heartMoveHandler = () => {
    if (!isLogin) {
      setClickModal(!clickModal);
    } else {
      history('/mypage', { state: 'ZzimProducts' });
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

  const searchHandler = () => {
    setIsSearch(!isSearch);
  };

  const searchInputHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchInput(e.target.value);
  };

  const fileSaveHandler = () => {
    saveAs('/files/LUMIERE.zip', 'LUMIERE');
  };

  return (
    <div>
      <HeaderContainer>
        {clickModal && (
          <LoginGuideModal clickModalHandler={clickModalHandler} />
        )}
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
                <button type="button" onClick={fileSaveHandler}>
                  작가 신청
                </button>
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
          {/* <SearchBox /> */}
          <IconBox>
            <button type="button" onClick={searchHandler}>
              {isSearch ? <RiCloseFill /> : <RiSearchLine />}
            </button>
            <button type="button" onClick={cartMoveHandler}>
              <RiShoppingCart2Line />
            </button>
            <button type="button" onClick={heartMoveHandler}>
              <RiHeartLine />
            </button>
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
        {/* 검색창 */}
        <SearchContainer className={isSearch ? 'search' : ''}>
          <SearchWrap>
            <form
              action="/search/"
              id="header-searchBar-form"
              method="get"
              acceptCharset="utf-8"
            >
              <div id="header-searchBar-inner">
                <SearchBarInputWrapper>
                  <input
                    type="search"
                    name="sq"
                    id="header-searchBar-sq"
                    placeholder="작가 이름, 작가 활동명, 작품 제목, 작품 재료"
                    onChange={searchInputHandler}
                  />
                  <label htmlFor="header-searchBar-submit">
                    <input
                      type="submit"
                      id="header-searchBar-submit"
                      title="검색"
                      value=""
                    />
                    <RiSearchLine />
                  </label>
                </SearchBarInputWrapper>
              </div>
            </form>
          </SearchWrap>
        </SearchContainer>
      </HeaderContainer>
    </div>
  );
};
export default Header;
