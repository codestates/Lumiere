import SignInTitle from 'components/SignIn/SignInTitle';
import SignInContent from 'components/SignIn/SignInContent';
import Footer from 'components/Footer/Footer';
import Header from 'components/Header/Header';
import { SignInWrap, SignInContainer } from './styled';

const SignIn = () => {
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
