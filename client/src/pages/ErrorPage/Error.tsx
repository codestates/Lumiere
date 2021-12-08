import Header from 'components/Header/Header';
import { ErrorContainer } from './styled';

const Error = () => {
  return (
    <ErrorContainer>
      <Header />
      <img src="/images/error.png" alt="에러 안내 이미지" />
    </ErrorContainer>
  );
};

export default Error;
