import styled from 'styled-components';

/* 모달 기본 구성 요소 */
export const ModalBackdrop = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  z-index: var(--modal-index);
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.2);
`;

export const ModalWrap = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
  width: 80vw;
  padding: 1.4rem;
  background-color: #ffffff;
  border-radius: 0.5rem;

  @media screen and (min-width: 768px) {
    width: 50vw;
  }
`;

export const CloseBtn = styled.div`
  cursor: pointer;
  position: absolute;
  top: 0;
  right: 0;
  padding: 0.5rem 0.6rem;
  font-size: 1.5rem;
  &:hover {
    color: var(--color-red);
  }
`;

/* 모달 컨텐츠 박스 */
export const ContentWrap = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-bottom: 2rem;

  p:nth-child(1) {
    margin: 2rem 0 0 0;
    font-size: 1.2rem;
    font-weight: 700;
  }
  p:nth-child(2) {
    margin: 1rem 0 2rem 0;
    font-size: 1.2rem;
    font-weight: 700;
  }
`;

/* 모달 버튼 박스 */
export const ButtonBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const PrimaryButton = styled.button`
  width: 100%;
  font-size: 1.2rem;
  font-weight: 800;
  color: #ffffff;
  background-color: var(--color-black);
  border: none;
  border-radius: 0.3rem;
  &:hover,
  &:focus {
    box-shadow: inset 0 0 0.6rem 0.1rem rgba(0, 0, 0, 0.6);
  }

  a {
    display: block;
    width: 100%;
    height: 100%;
    padding: 1rem 0;
    color: #ffffff;
  }
`;

/* 로그인 안내 모달 요소 */
export const GuideImgBox = styled.div`
  display: flex;
  justify-content: center;
  width: 10rem;
  height: 10rem;
  background-color: #f4ddcb;
  border-radius: 50%;
  overflow: hidden;

  > img {
    height: 100%;
  }
`;

export const YesNoModalWrap = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  position: relative;
  width: 30vw;
  padding: 3rem;
  background-color: #ffffff;
  border-radius: 1rem;
  text-align: center;

  .closeButton {
    width: 3rem;
    height: 3rem;
    position: absolute;
    top: 0;
    right: 0;
    border: none;
    color: #646464;
    background: none;
    font-weight: 700;
    font-size: 1.5em;
  }
  .closeButton:hover {
    cursor: pointer;
  }
`;

export const AdminEditProductWrap = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  position: relative;
  width: 60vw;
  padding: 3rem;
  background-color: #ffffff;
  border-radius: 1rem;
  text-align: center;
  img {
    width: 5rem;
  }

  .leftMargin {
    margin-left: 4.3rem;
  }
  .closeButton {
    width: 3rem;
    height: 3rem;
    position: absolute;
    top: 0;
    right: 0;
    border: none;
    color: #646464;
    background: none;
    font-weight: 700;
    font-size: 1.5em;
  }
  .closeButton:hover {
    cursor: pointer;
  }
`;

export const YesNoTextWrap = styled.div`
  margin-bottom: 0.1rem;
`;

export const AdminEditProductTextWrap = styled.div`
  span {
    white-space: nowrap;
    display: inline-block;
    text-align: left;
    width: 5rem;
  }
  button {
    margin: 0.5rem 1rem 0.5rem 0rem;
  }
  input,
  textarea {
    margin-left: 1rem;
    width: 20rem;
    margin-bottom: 0.3rem;
    /* margin-right: 2rem; */
  }
  .marign-left {
    margin-left: 5.2rem;
  }
  .canvasSize {
    margin-left: 1.5rem;
    width: 3rem;
    /* padding-right: 0rem; */
  }
  .checkbox {
    width: 1rem;
  }
  .lesswidth {
    width: 7rem;
  }
  .textright {
    text-align: right;
  }
  .rightmargin {
    margin-right: 5rem;
  }
  .titleTheme {
    margin-left: 0rem;
  }
`;

export const ButtonWrap = styled.div`
  display: flex;
  margin-top: 2rem;
  width: 100%;
  .nobutton:hover {
    background-color: #f00;
  }

  button {
    width: 50%;
    height: 2.5rem;
    border: none;
    border-radius: 10px;
    background-color: #9e9e9e;
    color: #ffffff;
    font-weight: 700;
    font-size: 1.1em;
    transition: all 0.5s;
  }

  button:focus,
  button:hover {
    cursor: pointer;
    outline: none;
    transform: scale(1.05);
    background-color: #000;
  }

  button:nth-child(1) {
    margin-right: 1.5em;
  }
`;

export const ModalBackDrop = styled.div`
  width: 100vw;
  height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 999;
  background-color: rgba(0, 0, 0, 0.2);
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const IntroduceText = styled.textarea`
  height: 5rem;
`;

export const TitleWrap = styled.div`
  font-size: 1rem;
  font-weight: bold;
  margin-bottom: 0.5rem;
  margin-top: 0.5rem;
`;

// AddressModal
export const AddWrap = styled.div`
  @media screen and (min-width: 768px) {
    display: flex;
    flex-direction: column;
    position: relative;
    width: 50vw;
    padding: 1.4rem;
    background-color: #ffffff;
    border-radius: 0.5rem;
  }
`;

// CartDeleteModal
export const SelectButton = styled.button`
  width: 40%;
  height: 3rem;
  font-weight: 800;
  font-size: 1.1rem;
  border: none;
  background: var(--color-black) !important;
  color: #ffffff !important;
  margin-right: 1rem;
  transition: all 0.5s;

  &:hover {
    cursor: pointer;
    outline: none;
    transform: scale(1.05);
  }
`;
