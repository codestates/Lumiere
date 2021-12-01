import SignInTitle from 'components/SignIn/SignInTitle';
import SignInContent from 'components/SignIn/SignInContent';
import Footer from 'components/Footer/Footer';
import { SignInContainer } from './styled';

const SignIn = () => {
  return (
    <>
      <SignInContainer>
        <SignInTitle />
        <SignInContent />
      </SignInContainer>
      <Footer />
    </>
  );
};
export default SignIn;
