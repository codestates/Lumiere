import { useState } from 'react';
import { Link } from 'react-router-dom';
import { NavContainer, NavInfoBox, UserInfoBox, NavButtonBox } from './styled';

const Nav = () => {
  const [isLogin, setIsLogin] = useState(false);

  const logoutHandler = () => {
    setIsLogin(false);
  };

  return (
    <NavContainer>
      <h1>LUMIERE</h1>
      {/* Nav Menu */}
      <ul>
        <li>
          <Link to="/">홈</Link>
          <Link to="/artlist">작품보기</Link>
          <Link to="/artists">작가</Link>
        </li>
        <li>
          <Link to="/cart">장바구니</Link>
          <Link to="/">1 : 1 문의하기</Link>
          <Link to="/">작가 신청</Link>
        </li>
      </ul>
      {isLogin ? (
        <NavInfoBox>
          <UserInfoBox>
            <img src="/images/symbol.png" alt="루미에르 심볼 로고" />
            <div>
              <span>최소훈</span>님 반갑습니다.
            </div>
          </UserInfoBox>
          <NavButtonBox>
            <Link to="/mypage">마이페이지</Link>
            <Link to="/" onClick={logoutHandler}>
              로그아웃
            </Link>
          </NavButtonBox>
        </NavInfoBox>
      ) : (
        <NavInfoBox>
          <UserInfoBox>
            <img src="/images/symbol.png" alt="루미에르 심볼 로고" />
            <p>
              더 많은 서비스를 이용하시려면
              <br /> 로그인 해주세요.
            </p>
          </UserInfoBox>
          <NavButtonBox>
            <Link to="/signup">회원가입</Link>
            <Link to="/signin">로그인</Link>
          </NavButtonBox>
        </NavInfoBox>
      )}
    </NavContainer>
  );
};
export default Nav;
