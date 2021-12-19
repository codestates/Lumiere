import {
  FacebookShareButton,
  FacebookIcon,
  TwitterShareButton,
  TwitterIcon,
} from 'react-share';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { ImLink } from 'react-icons/im';
import { ShareContainer, ShareBtnWrap } from './styled';

interface Props {
  clickToShareHandler: () => void;
  linkCopyAlertHandler: () => void;
}

const ShareBox = ({ clickToShareHandler, linkCopyAlertHandler }: Props) => {
  const currentUrl = window.location.href;

  const sendKakaoMessage = () => {
    window.Kakao.Link.sendDefault({
      objectType: 'feed', // 메시지 형식
      content: {
        title: 'Lumiere에 초대합니다.',
        description: '그림 쇼핑몰 루미에르 입니다.',
        imageUrl: '/images/logo.png',
        link: {
          webUrl: currentUrl,
          mobileWebUrl: currentUrl,
        },
      },
      buttons: [
        {
          title: '작품 구경하기',
          link: {
            webUrl: currentUrl,
            mobileWebUrl: currentUrl,
          },
        },
      ],
    });
  };

  return (
    <ShareContainer>
      <h4>공유하기</h4>
      <button type="button" onClick={clickToShareHandler}>
        &times;
      </button>
      <ShareBtnWrap>
        <FacebookShareButton url={currentUrl}>
          <FacebookIcon />
        </FacebookShareButton>
        <TwitterShareButton url={currentUrl}>
          <TwitterIcon />
        </TwitterShareButton>
        <button type="button" onClick={sendKakaoMessage}>
          <img src="/images/kakao.png" alt="카카오 공유하기" />
        </button>
        <CopyToClipboard text={currentUrl}>
          <button type="button" onClick={linkCopyAlertHandler}>
            <ImLink />
          </button>
        </CopyToClipboard>
      </ShareBtnWrap>
    </ShareContainer>
  );
};
export default ShareBox;
