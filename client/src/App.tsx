import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import SignIn from 'pages/SignInPage/SignIn';
import SignUp from 'pages/SignUpPage/SignUp';
import Landing from 'pages/LandingPage/Landing';
import ArtList from 'pages/ArtListPage/ArtList';
import Artists from 'pages/ArtistsPage/Artists';
import MyPage from 'pages/MyPage/MyPage';
import Zzim from 'pages/MyPage/ZzimPage/Zzim';

function App() {
  return (
    <Router>
      <Routes>
        <Route path={'/'} element={<Landing />} />
        <Route path={'/signin'} element={<SignIn />} />
        <Route path={'/signup'} element={<SignUp />} />
        <Route path={'/artlist'} element={<ArtList />} />
        <Route path={'/artists'} element={<Artists />} />
        <Route path={'/mypage'} element={<MyPage />} />
        <Route path={'/mypage/zzim'} element={<Zzim />} />
      </Routes>
    </Router>
  );
}

export default App;