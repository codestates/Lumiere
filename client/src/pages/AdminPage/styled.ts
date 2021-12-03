import styled from 'styled-components/macro';

export const TableWrap = styled.div`
  border: 3px black solid;
  button {
    margin-bottom: 1rem;
  }
`;

export const Table = styled.table`
  padding: 1rem;
  border: 1px black solid;
  tr {
    :last-child {
      td {
        border-bottom: 1;
      }
    }
  }
  th,
  td {
    margin: 0;
    padding: 2rem;
    border-bottom: 1px solid black;
    border-right: 1px solid black;
    :last-child {
      border-right: 0;
    }
  }
  div {
    text-align: center;
  }
`;

export const ProductInfoWrap = styled.div`
  display: flex;
  border-bottom: 1px black solid;
  padding-bottom: 1rem;
  flex-direction: row;
  div {
    margin-right: 1.5rem;
    margin-top: 1.5rem;
  }
`;

export const TitleSpan = styled.span`
  font-weight: bold;
  font-size: 1.5rem;
`;

export const ProductInfoWrap2 = styled.div`
  div {
    margin-bottom: 1rem;
  }
`;