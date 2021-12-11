import { useRecoilState } from 'recoil';
import { IsSigninState } from 'States/IsLoginState';
import instance from 'util/axios';
import { useNavigate } from 'react-router';
import { Link } from 'react-router-dom';
import { NavContainer, NavInfoBox, UserInfoBox, NavButtonBox } from './styled';

const Nav = () => {
  const [isLogin, setIsLogin] = useRecoilState(IsSigninState);

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
        history('/');
      })
      .catch((err) => {
        console.log(err);
        localStorage.removeItem('lumiereUserInfo');
        setIsLogin(false);
        history('/');
      });
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
          <Link to="/">1 : 1 문의하기</Link>
          <Link to="/">작가 신청</Link>
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
