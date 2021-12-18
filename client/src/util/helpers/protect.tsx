import { Outlet, Navigate } from 'react-router';
import { useRecoilState } from 'recoil';
import { IsSigninState } from 'States/IsLoginState';
import * as ROUTES from '../constants/routes';

// 로그인이 안되면 랜딩으로, 되면 해당 라우트 허용
// If not, return element that will navigate to login page
// If authorized, return an outlet that will render child elements
export function PrivateRoute() {
  const [IsLogin, setIsLogin] = useRecoilState(IsSigninState);

  return IsLogin ? <Outlet /> : <Navigate to={ROUTES.SIGNIN} />;
}

export function IsUserRedirect() {
  const [IsLogin, setIsLogin] = useRecoilState(IsSigninState);

  return IsLogin === false ? <Outlet /> : <Navigate to={ROUTES.LANDING} />;
}
