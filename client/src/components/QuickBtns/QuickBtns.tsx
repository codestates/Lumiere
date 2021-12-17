import { QuickBtnsContainer } from './styled';
import { LoadingQuickBtns } from './Loading';

const QuickBtns = ({ isLoading }: { isLoading: boolean }) => {
  return (
    <QuickBtnsContainer>
      <a href="https://pf.kakao.com/_Sxhxexbb/chat">
        {isLoading ? (
          <LoadingQuickBtns />
        ) : (
          <img src="/images/kakao.png" alt="Top Button" />
        )}
      </a>
      <a href="#top">
        {isLoading ? (
          <LoadingQuickBtns />
        ) : (
          <img src="/images/top_btn.png" alt="Top Button" />
        )}
      </a>
    </QuickBtnsContainer>
  );
};
export default QuickBtns;
