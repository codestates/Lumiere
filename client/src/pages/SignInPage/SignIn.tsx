import SignInTitle from 'components/SignIn/SignInTitle';
import SignInContent from 'components/SignIn/SignInContent';
import Footer from 'components/Footer/Footer';
import Header from 'components/Header/Header';
import { useEffect } from 'react';
import { SignInWrap, SignInContainer } from './styled';

const SignIn = () => {
  useEffect(() => {
    const local = localStorage.getItem('recoil-persist');
    const res = JSON.parse(local || '{}').LoginState;
    if (res) window.location.reload();
  }, []);
  return (
    <SignInContainer>
      <Header />
      <SignInWrap>
        <SignInTitle />
        <SignInContent />
      </SignInWrap>
      <Footer />
    </SignInContainer>
  );
};
export default SignIn;
