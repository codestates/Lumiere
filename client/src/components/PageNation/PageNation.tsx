import Pagination from 'react-js-pagination';
import { PaginatorWrap } from './styled';

interface GreetingProps {
  curPage: number;
  totalPages: number;
  pageChangeHandler: (page: number) => void;
}
const PageNation = ({
  curPage,
  totalPages,
  pageChangeHandler,
}: GreetingProps) => {
  return (
    <PaginatorWrap>
      {window.scrollTo(0, 0)}
      <Pagination
        activePage={curPage}
        itemsCountPerPage={1}
        pageRangeDisplayed={5}
        totalItemsCount={totalPages}
        prevPageText="<"
        nextPageText=">"
        onChange={pageChangeHandler}
      />
    </PaginatorWrap>
  );
};
export default PageNation;
