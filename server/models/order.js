import mongoose from 'mongoose';

const orderSchema = mongoose.Schema(
  {
    user: {
      // 결제자
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
    orderItems: [
      // 주문 상품 내역
      {
        image: { type: String, required: true },
        title: { type: String, required: true },
        artist: { type: String, required: true }, // 주단태
        size: { type: String, required: true }, // 52x73cm(20호)
        price: { type: Number, required: true },
        product: {
          // 구매한 상품이 어떤 상품인지 파악해야하니 연결한다.
          type: mongoose.Schema.Types.ObjectId,
          required: true,
          ref: 'Product',
        },
        _id: false,
      },
    ],
    result: {
      id: { type: String, required: true }, // 주문번호 YYYYMMDD + 6자리 총 12자리
      paidAt: { type: Date, required: true, default: Date.now }, // 결제일자
      status: { type: Number, required: true, default: 0 }, //  상태 (결제완료 0, 발송준비중 1, 배송중 2, 배송완료 3, 반품요청중 4, 결제취소 5)
      updatedAt: { type: Date, required: true, default: Date.now }, // status 업데이트 일자
    },
    deliver: {
      // 배송 정보 (주소, 받는이 정보, 요청사항)
      address: { type: String, required: true },
      receiver: { type: String, required: true }, // 김로또 / 010-7777-7777
      request: { type: String, required: true }, // 문 앞에 놓아주세요 / 도착 시 문자주세요
    },
    ordererInfo: {
      // 주문자 정보
      name: { type: String, required: true },
      phoneNum: { type: String, required: true }, // 연락처
      email: { type: String, required: true }, // 결제내역 알림을 위한 이메일 주소
      refundTerms: { type: String, required: true }, // 품절 시 환불 내용
    },
    shippingPrice: { type: Number, required: true, default: 0 },
    totalPrice: { type: Number, required: true, default: 0 },
  },
  {
    versionKey: false,
  },
);

const Order = mongoose.model('Order', orderSchema);

export default Order;
