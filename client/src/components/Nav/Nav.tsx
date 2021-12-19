import { useRecoilState } from 'recoil';
import { IsSigninState } from 'States/IsLoginState';
import instance from 'util/axios';
import { saveAs } from 'file-saver';
import { Link } from 'react-router-dom';
import { NavContainer, NavInfoBox, UserInfoBox, NavButtonBox } from './styled';

const Nav = () => {
  const [isLogin, setIsLogin] = useRecoilState(IsSigninState);
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

  const fileSaveHandler = () => {
    saveAs('/files/LUMIERE.zip', 'LUMIERE');
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
          {isLogin && <Link to="/cart">장바구니</Link>}
          <a href="https://pf.kakao.com/_Sxhxexbb/chat">1 : 1 문의하기</a>
          <button type="button" onClick={fileSaveHandler}>
            작가 신청
          </button>
          {isLogin && userInfo && JSON.parse(userInfo).isAdmin ? (
            <Link to="/admin/product">어드민페이지</Link>
          ) : null}
        </li>
      </ul>
      {isLogin ? (
        <NavInfoBox>
          <UserInfoBox>
            <img src="/images/symbol.png" alt="루미에르 심볼 로고" />
            <div>
              <span>{userInfo && JSON.parse(userInfo).name}</span>님 반갑습니다.
            </div>
          </UserInfoBox>
          <NavButtonBox>
            <Link to="/mypage">마이페이지</Link>
            <div
              role="button"
              tabIndex={0}
              onKeyDown={logoutHandler}
              onClick={logoutHandler}
            >
              로그아웃
            </div>
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
