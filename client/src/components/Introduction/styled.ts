import styled from 'styled-components';

export const IntroductionWrap = styled.div`
  display: flex;
  flex-direction: column;
  padding-top: 1rem;
  text-align: center;
`;

export const DescriptionWrap = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 2rem 4%;
  padding: 0 4% 0.5rem;
  font-size: 0.8rem;
  color: #777777;
  border-bottom: 1px solid #aaaaaa;
`;

export const ImageWrap = styled.div`
  position: relative;

  > div {
    position: absolute;
    top: 15%;
    left: 48.3%;
    transform: translateX(-50%);
    width: 25%;
    height: 43%;
    background: #ffffff;
  }
  img {
    width: 100%;
    height: 100%;
    object-fit: contain;
  }
`;

export const TitleBox = styled.div`
  margin-bottom: 1rem;

  > h1 {
    font-family: 'Times New Roman';
    font-size: 5rem;
    font-weight: bold;
    margin-bottom: 1rem;
  }
  > h3 {
    font-size: 1.3rem;
    font-weight: 700;
  }
`;

export const TextWrap = styled.div`
  display: flex;
  padding: 2rem 1rem;

  > div {
    flex: 1;
    padding: 0.5rem 4%;
    > h4 {
      font-weight: 700;
      margin-bottom: 0.8rem;
    }
    > p {
      word-break: keep-all;
      line-height: 1.4;
    }
  }
  > div:nth-child(2) {
    border-left: 1px solid var(--color-black);
    border-right: 1px solid var(--color-black);
  }
`;
