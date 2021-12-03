import SignInTitle from 'components/SignIn/SignInTitle';
import SignInContent from 'components/SignIn/SignInContent';
import Footer from 'components/Footer/Footer';
import Header from 'components/Header/Header';
import { SignInWrap, SignInContainer, FooterHandler } from './styled';

const SignIn = () => {
  return (
    <>
      <Header />
      <SignInContainer>
        <SignInWrap>
          <SignInTitle />
          <SignInContent />
        </SignInWrap>
      </SignInContainer>
      <FooterHandler>
        <Footer />
      </FooterHandler>
    </>
  );
};
export default SignIn;
