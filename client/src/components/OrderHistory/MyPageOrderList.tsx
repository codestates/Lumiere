import {
  ListContainer,
  OrderNumberDescription,
  DtDdWrap,
  ImgWrap,
  ProductDlWrap,
  ProductWrap,
  TotalPriceWrap,
  OrderStatus,
  Management,
  AllProductWrap,
} from './styled';

const MypageOrderList = () => {
  return (
    <ListContainer>
      <OrderNumberDescription>
        <DtDdWrap>
          <div>
            <dt>주문번호</dt>
            <dd>20211215123456</dd>
          </div>
          <div>
            <dt>결제일자</dt>
            <dd className="smalldd">2021-11-26T13:23:33</dd>
          </div>
        </DtDdWrap>
        <button type="button" className="detailView">
          상세보기
        </button>
      </OrderNumberDescription>
      <AllProductWrap>
        <ProductWrap>
          <ImgWrap>
            <img src="#" alt="그림" />
          </ImgWrap>
          <ProductDlWrap>
            <dt>2013-5</dt>
            <dd>주단태</dd>
            <dd>52x73cm(20호)</dd>
            <dd>80,000원</dd>
          </ProductDlWrap>
        </ProductWrap>
        <ProductWrap>
          <ImgWrap>
            <img src="#" alt="그림" />
          </ImgWrap>
          <ProductDlWrap>
            <dt>2013-5</dt>
            <dd>주단태</dd>
            <dd>52x73cm(20호)</dd>
            <dd>80,000원</dd>
          </ProductDlWrap>
        </ProductWrap>
      </AllProductWrap>
      <TotalPriceWrap>
        <div className="mobile-Only shipping">
          상품 80,000원 +배송비 10,000원
        </div>
        <div className="totalPrice">
          <div className="mobile-Only">총 결제 금액</div>
          <div className="realtotalPrice">90,000원</div>
        </div>
      </TotalPriceWrap>
      <OrderStatus>
        <div>결제 완료</div>
      </OrderStatus>
      <Management>
        <button type="button">취소</button>
        <button type="button">반품</button>
      </Management>
    </ListContainer>
  );
};
export default MypageOrderList;
