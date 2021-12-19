import { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import SignIn from 'pages/SignInPage/SignIn';
import SignUp from 'pages/SignUpPage/SignUp';
import Landing from 'pages/LandingPage/Landing';
import ArtList from 'pages/ArtListPage/ArtList';
import ArtDetail from 'pages/ArtDetailPage/ArtDetail';
import Artists from 'pages/ArtistListPage/ArtistList';
import Cart from 'pages/CartPage/Cart';
import MyPage from 'pages/MyPage/MyPage';
import Order from 'pages/OrderPage/Order';
import OrderDetail from 'pages/OrderDetail/OrderDetail';
import PaymentFinished from 'pages/PaymentFinishedPage/PaymentFinished';
import AdminOrder from 'pages/AdminOrderPage/AdminOrder';
import AdminProduct from 'pages/AdminProductPage/AdminProduct';
import AdminUser from 'pages/AdminUserPage/AdminUser';
import AdminArtist from 'pages/AdminArtist/AdminArtist';
import AdminBanner from 'pages/AdminBannerPage/AdminBanner';
import ArtistDetail from 'pages/ArtistDetailPage/ArtistDetail';
import Error from 'pages/ErrorPage/Error';
import Callback from 'pages/CallbackPage/Callback';
import { GlobalStyle } from 'styles/global-style';
import SearchResult from 'pages/SearchResult/SearchResult';
import ScrollToTop from 'components/ScrollToTop/ScrollToTop';
import * as ROUTES from './util/constants/routes';
import { IsUserRedirect, PrivateRoute } from './util/helpers/protect';

function App() {
  useEffect(() => {
    // Kakao 공유 SDK 초기화
    window.Kakao.init(process.env.REACT_APP_KAKAO);
    window.Kakao.isInitialized();
  }, []);

  return (
    <>
      <GlobalStyle />
      <Router>
        <ScrollToTop />
        <Routes>
          <Route path={ROUTES.LANDING} element={<Landing />} />
          <Route path={ROUTES.SIGNIN} element={<IsUserRedirect />}>
            <Route path="/signin" element={<SignIn />} />
          </Route>
          <Route path={ROUTES.SIGNUP} element={<IsUserRedirect />}>
            <Route path={ROUTES.SIGNUP} element={<SignUp />} />
          </Route>
          <Route path="/artlist" element={<ArtList />} />
          <Route path="/search/" element={<SearchResult />} />
          <Route path="/artdetail/:id" element={<ArtDetail />} />
          <Route path="/artists" element={<Artists />} />
          <Route path="/artistdetail/:id" element={<ArtistDetail />} />
          <Route path={ROUTES.CART} element={<PrivateRoute />}>
            <Route path={ROUTES.CART} element={<Cart />} />
          </Route>
          <Route path={ROUTES.ORDER} element={<PrivateRoute />}>
            <Route path={ROUTES.ORDER} element={<Order />} />
          </Route>
          <Route path={ROUTES.ORDERDETAIL} element={<PrivateRoute />}>
            <Route path="/orderdetail/:id" element={<OrderDetail />} />
          </Route>
          <Route path={ROUTES.PAYMENTFINISHED} element={<PrivateRoute />}>
            <Route path="/paymentfinished" element={<PaymentFinished />} />
          </Route>
          <Route path={ROUTES.MYPAGE} element={<PrivateRoute />}>
            <Route path="/mypage" element={<MyPage />} />
          </Route>
          <Route path={ROUTES.ADMINORDER} element={<PrivateRoute />}>
            <Route path="/admin/order" element={<AdminOrder />} />
          </Route>
          <Route path={ROUTES.ADMINPRODUCT} element={<PrivateRoute />}>
            <Route path="/admin/product" element={<AdminProduct />} />
          </Route>
          <Route path={ROUTES.ADMINUSER} element={<PrivateRoute />}>
            <Route path="/admin/user" element={<AdminUser />} />
          </Route>
          <Route path={ROUTES.ADMINARTIST} element={<PrivateRoute />}>
            <Route path="/admin/artist" element={<AdminArtist />} />
          </Route>
          <Route path={ROUTES.ADMINBANNER} element={<PrivateRoute />}>
            <Route path="/admin/banner" element={<AdminBanner />} />
          </Route>
          <Route path="/error" element={<Error />} />
          <Route path={ROUTES.CALLBACK} element={<IsUserRedirect />}>
            <Route path="/oauth/:corp" element={<Callback />} />
          </Route>
        </Routes>
      </Router>
    </>
  );
}

export default App;
