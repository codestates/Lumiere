import {
  OrderNumberDescription,
  DtDdWrap,
  BtnWrap,
  AllProductWrap,
  ProductWrap,
  ImgWrap,
  TotalPriceWrap,
  ProductDlWrap,
  OrderInfoWrap,
  DeliveryInfo,
  UserInfo,
  DeleveryReq,
  Menu,
} from './styled';

const OrderDetailContent = () => {
  return (
    <>
      <OrderNumberDescription>
        <DtDdWrap>
          <div>
            <div>
              <dt>주문번호</dt>
              <dd>20211221000000</dd>
            </div>
            <div>
              <dt>결제일자</dt>
              <dd className="smalldd">2021-11-26T13:23:33</dd>
            </div>
          </div>
          <div>
            <button type="button" className="orderstatus">
              결제완료
            </button>
          </div>
        </DtDdWrap>
        <BtnWrap>
          <button type="button">취소</button>
          <button type="button">반품</button>
        </BtnWrap>
      </OrderNumberDescription>
      <Menu>
        <div>
          <div>상품정보</div>
          <div>주문금액</div>
        </div>
      </Menu>
      <AllProductWrap>
        <ProductWrap>
          <ImgWrap>
            <img src="#" alt="살고싶어" />
          </ImgWrap>
          <ProductDlWrap>
            <dt>2013-3-5</dt>
            <dd>주단태</dd>
            <dd>52x73cm(20호)</dd>
            <dd>80,000원</dd>
          </ProductDlWrap>
        </ProductWrap>
      </AllProductWrap>
      <TotalPriceWrap>
        <div className="mobile-Only shipping">상품 80000원 + 배송 10000원</div>
        <div className="totalPrice">
          <div className="mobile-Only">총 결제 금액</div>
          <div className="realtotalPrice">90,000원</div>
        </div>
      </TotalPriceWrap>
      <OrderInfoWrap>
        <DeliveryInfo>
          <h2>배송지</h2>
          <div>
            <div>
              [18030] 서울특별시 서초구 서초대로 396, 강남빌딩 20층
              (스파크플러스 강남2호점)
            </div>
            <div>김로또</div>
            <div>010-7777-7777</div>
          </div>
        </DeliveryInfo>
        <UserInfo>
          <h2>주문자 정보</h2>
          <div>
            <div>
              <dt>주문자명</dt>
              <dd>김로또</dd>
            </div>
            <div>
              <dt>연락처</dt>
              <dd>010-7777-7777</dd>
            </div>
            <div>
              <dt>이메일</dt>
              <dd>aldzkwp1912@naver.com</dd>
            </div>
            <div>
              <dt>품절시 환불</dt>
              <dd>주문 시 결제수단으로 환불받기</dd>
            </div>
          </div>
        </UserInfo>
        <DeleveryReq>
          <h2>배송 요청사항</h2>
          <div>
            <div>
              <dt>수령위치</dt>
              <dd>문 앞에 놓아주세요</dd>
            </div>
            <div>
              <dt>택배배송 요청사항</dt>
              <dd>부재시 문 앞에 놓아주세요.</dd>
            </div>
          </div>
        </DeleveryReq>
      </OrderInfoWrap>
    </>
  );
};
export default OrderDetailContent;
