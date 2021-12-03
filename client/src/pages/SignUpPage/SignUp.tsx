import SignUpTitle from 'components/SignUp/SignUpTitle';
import SignUpContent from 'components/SignUp/SignUpContent';
import Header from 'components/Header/Header';
import Footer from 'components/Footer/Footer';
import { SignUpContainer, SignUpWrap } from './styled';

const SignUp = () => {
  return (
    <SignUpContainer>
      <Header />
      <SignUpWrap>
        <SignUpTitle />
        <SignUpContent />
      </SignUpWrap>
      <Footer />
    </SignUpContainer>
  );
};
export default SignUp;
