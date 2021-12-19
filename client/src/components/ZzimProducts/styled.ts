import styled from 'styled-components';

export const ZzimProductsContainer = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
`;

export const FilterMenuWrap = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
  border-bottom: 1px solid #e4e4e4;

  button {
    border: none;
    background: none;
    color: #888888;
    transition: all 0.5s;
  }

  button:hover {
    cursor: pointer;
    transform: scale(1.05);
    font-weight: 800;
  }

  button:active {
    background-color: #a9a9a9;
  }

  svg {
    pointer-events: none;
    font-size: 1.3rem;
  }

  @media screen and (min-width: 768px) {
    background-color: #f7f7f7;
    border-bottom: none;
  }
`;

export const AllSelectLabelWrap = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 1.2rem;

  & label {
    margin-right: 0.3rem;
  }

  @media screen and (min-width: 768px) {
    & label {
      width: 1.5rem;
      height: 1.5rem;
    }

    & label input {
      width: 80%;
      height: 80%;
    }
  }
`;

export const SelectBtnWrap = styled.div`
  button {
    font-size: 1rem;
  }
`;

export const ProductContentWrap = styled.div`
  flex: 1;
  width: 100%;
  height: 100%;
  padding: 1rem 1rem 0;
  background-color: #ffffff;
  overflow: scroll;
  overflow-x: hidden;

  /* 스크롤바 전체길이 */
  &::-webkit-scrollbar {
    width: 5px;
    background-color: #f7f7f7;
    border-radius: 4px;
  }

  /* 현재 내가보고있는 스크롤바 길이 */
  &::-webkit-scrollbar-thumb {
    background-color: #dddddd;
    border-radius: 4px;
  }

  @media screen and (min-width: 768px) {
    height: 100%;
  }
`;

export const ProductContent = styled.div`
  display: flex;
  position: relative;
  padding: 0 0 0.5rem;
  border-bottom: 1px solid #e4e4e4;
  margin-bottom: 0.5rem;

  &:last-child {
    margin-bottom: 0;
    border-bottom: 0;
  }
`;

export const ListDeleteBtnWrap = styled.div`
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  right: 0;
  top: 0;
  width: 2rem;
  height: 2rem;

  & button {
    width: 100%;
    height: 100%;
    border: none;
    background: none;
    transition: all 0.5s;
  }

  & button:hover {
    cursor: pointer;
    transform: scale(1.1);
  }

  & button svg {
    font-size: 1rem;
    pointer-events: none;
  }
`;

export const ListCheckLabelWrap = styled.div`
  flex: 2;
  display: flex;
  justify-content: center;
  align-items: center;
  border: none;
  background: none;

  & label {
    width: 1.5rem;
    height: 1.5rem;
    display: flex;
    justify-content: center;
    text-align: center;
    border: none;
    background: none;
    transition: all 0.5s;
  }

  & label input {
    width: 100%;
    height: 100%;
  }

  & label:hover {
    cursor: pointer;
    transform: scale(1.1);
  }

  & label svg {
    font-size: 1.5rem;
    pointer-events: none;
  }

  @media screen and (min-width: 768px) {
    flex: 1;
  }
`;

export const ImgWrap = styled.div`
  flex: 4;
  width: 7rem;
  height: 9rem;
  background-color: #ebebeb;

  img {
    background-color: #ffffff;
    width: 100%;
    height: 100%;
    object-fit: contain;
  }

  @media screen and (min-width: 768px) {
    flex: 2;
  }
`;

export const ProductDlWrap = styled.dl`
  flex: 6;
  padding: 1rem;
  display: flex;
  flex-direction: row;
  text-align: left;
  justify-content: space-between;

  & dt {
    font-weight: 700;
    font-size: 1.2rem;
    color: #424242;
  }

  & dd {
    font-weight: 400;
    font-size: 1rem;
    color: #424242;
  }

  dd:nth-child(4) {
    font-weight: 700;
  }
  .ddwrap {
    cursor: pointer;
    flex: 9;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
  }
  .blankwrap {
    flex: 1;
  }

  @media screen and (min-width: 768px) {
    flex: 7;
    & dd {
      font-weight: 400;
      font-size: 1rem;
      color: #424242;
    }
    dd:nth-child(4) {
      font-weight: 800;
      font-size: 1.15rem;
    }
  }
`;

export const EmptyImageWrap = styled.div`
  position: relative;
  width: 100%;
  height: 30rem;
  padding: 2rem 0;
  img {
    height: 100%;
  }
  div {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    font-weight: bold;
    font-size: 2.5rem;
    color: #c3c3c3;
  }
`;
