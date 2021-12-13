import Header from 'components/Header/Header';
import Footer from 'components/Footer/Footer';
import {
  PaymentContainer,
  PaymentWrap,
  PaymentTitleWrap,
  PaymentTitle,
  ButtonWrap,
  H1Wrap,
} from './styled';

const PaymentFinished = () => {
  return (
    <PaymentContainer>
      <Header />
      <PaymentTitleWrap>
        <PaymentTitle>결제 완료</PaymentTitle>
      </PaymentTitleWrap>
      <PaymentWrap>
        <H1Wrap>
          <div>결제가 완료되었습니다.</div>
          <div>주문내역은 마이페이지에서 조회 가능합니다.</div>
        </H1Wrap>
        <ButtonWrap>
          <div
            role="button"
            tabIndex={0}
            className="leftButton"
            onClick={() => {
              window.location.assign('/artlist');
            }}
            onKeyDown={() => {
              window.location.assign('/artlist');
            }}
          >
            작품 더 구경하기
          </div>
          <div
            role="button"
            tabIndex={0}
            className="rightButton"
            onClick={() => {
              window.location.assign('/mypage');
            }}
            onKeyDown={() => {
              window.location.assign('/mypage');
            }}
          >
            마이페이지로 이동
          </div>
        </ButtonWrap>
      </PaymentWrap>
      <Footer />
    </PaymentContainer>
  );
};
export default PaymentFinished;
