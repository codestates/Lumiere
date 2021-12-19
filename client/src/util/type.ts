/* eslint-disable */
export interface Users {
  general?: {
    email: string;
  };
  kakao?: {
    email: string;
    uuid: number;
  };
  google?: {
    email: string;
    uuid: number;
  };
  naver?: {
    email: string;
    uuid: number;
  };
  active: {
    isClosed: boolean;
    lastAccessTime: Date;
  };
  _id: string;
  name: string;
  createdAt: Date;
}

export interface AdminUsersType {
  users: [Users];
  page: number;
  pages: number;
}

export interface Product {
  likes: [string];
  artist: Artists;
  artCode: string;
  title: string;
  image: string;
  theme: string;
  info: {
    details: string;
    size: string;
    canvas: number;
    createdAt: string;
  };
  price: number;
  view: number;
  inStock: boolean;
  updatedAt: Date;
  _id?: string;
}

export interface AdminProductsType {
  products: [Product];
  page: number;
  pages: number;
}

export interface ProductDetail {
  productDetail: {
    _id: string;
    artCode: string;
    title: string;
    image: string;
    theme: string;
    artist: {
      _id: string;
      code: string;
      name: string;
      aka: string;
      record: string;
    };
    info: {
      details: string;
      size: string;
      canvas: number;
      createdAt: string;
    };
    likes: [string];
    price: number;
    inStock: boolean;
  };
  productsByArtist: [
    {
      _id: string;
      image: string;
    },
  ];
  productsByRandom: [
    {
      _id: string;
      image: string;
    },
  ];
}

export interface ArtistDetailType {
  artistDetail: {
    _id: string;
    likes: [string];
    code: string;
    name: string;
    aka: string;
    record: string;
  };
  products: [
    {
      image: string;
      inStock: boolean;
      _id: string;
    },
  ];
}

export interface Artists {
  code: string;
  name: string;
  aka: string;
  record: string;
  thumbnail: string;
  joinAt: Date;
  countOfWorks: number;
  isActive: boolean;
  _id?: string;
}

export interface ArtistsType {
  artists: [Artists];
  page: number;
  pages: number;
}

export interface AdminArtistsType {
  artists: [Artists];
  page: number;
  pages: number;
}

// Admin Order
export interface Order {
  orders: [
    {
      orderItems: [
        {
          artist: string;
          image: string;
          price: number;
          product: string;
          size: string;
          title: string;
        },
      ];
      result: {
        id: string;
        paidAt?: string;
        status: number;
        updatedAt: string;
      };
      totalPrice: number;
      user: {
        general?: {
          email: string;
        };
        kakao?: {
          email: string;
        };
        naver?: {
          email: string;
        };
        google?: {
          email: string;
        };
        name: string;
        _id: string;
      };
      _id: string;
    },
  ];
  page: number;
  pages: number;
}

export interface Events {
  heading: string;
  content: string;
  linkname: string;
  link: string;
  image: string;
}

export interface ArtistsProduct {
  code: string;
  name: string;
  aka: string;
  record: string;
  thumbnail: string;
  joinAt: Date;
  countOfWorks: number;
  isActive: boolean;
  artCode: string;
  title: string;
  image: string;
  theme: string;
  info: {
    details: string;
    size: string;
    canvas: number;
    createdAt: string;
  };
  price: number;
}

// Order Page 배송지
export interface OrderDeliver {
  address: string;
  detailedAddress: string;
  receiver: string;
  contactNum: string;
}

// Order Page 주문자 정보
export interface OrdererUserInfo {
  name: string;
  phoneNum: string;
  email: string;
  refundTerms: string;
}

// Order page 배송 요청사항
export interface OrderDelierDetail {
  receiveAt: string;
  requestedTerms: string;
}

// Order Page 결제 예정 금액
export interface OrderPrice {
  shippingPrice: number;
  totalPrice: number;
}

// Order Page 주문작품
export interface OrderProducts {
  artist: {
    _id: string;
    name: string;
  };
  info: {
    size: string;
    canvas: number;
  };
  image: string;
  inStock: boolean;
  price: number;
  title: string;
  _id: string;
}

//  IMPORT IMP.request_pay함수 첫번째 인자 type
export interface RequestPayAdditionalParams {
  digital?: boolean;
  vbank_due?: string;
  m_redirect_url?: string;
  app_scheme?: string;
  biz_num?: string;
}

export interface Display {
  card_quota?: number[];
}

export interface RequestPayParams extends RequestPayAdditionalParams {
  pg?: string;
  pay_method: string;
  escrow?: boolean;
  merchant_uid: string;
  name?: string;
  amount: number;
  custom_data?: any;
  tax_free?: number;
  currency?: string;
  language?: string;
  buyer_name?: string;
  buyer_tel: string;
  buyer_email?: string;
  buyer_addr?: string;
  buyer_postcode?: string;
  notice_url?: string | string[];
  display?: Display;
}

// IAMPORT 콜백 함수 정의 IMP.request_pay 함수의 두번째 인자 type
export interface RequestPayAdditionalResponse {
  apply_num?: string;
  vbank_num?: string;
  vbank_name?: string;
  vbank_holder?: string | null;
  vbank_date?: number;
}

export interface RequestPayResponse extends RequestPayAdditionalResponse {
  success: boolean;
  error_code: string;
  error_msg: string;
  imp_uid: string | null;
  merchant_uid: string;
  pay_method?: string;
  paid_amount?: number;
  status?: string;
  name?: string;
  pg_provider?: string;
  pg_tid?: string;
  buyer_name?: string;
  buyer_email?: string;
  buyer_tel?: string;
  buyer_addr?: string;
  buyer_postcode?: string;
  custom_data?: any;
  paid_at?: number;
  receipt_url?: string;
}

// Mypage 주문내역
export interface MypageOrder {
  orders: [
    {
      orderItems: [
        {
          artist: string;
          image: string;
          price: number;
          product: string;
          size: string;
          title: string;
        },
      ];
      result: {
        id: string;
        paidAt: string;
        status: number;
        updatedAt: string;
      };
      totalPrice: number;
      user: string;
      _id: string;
    },
  ];
  page: number;
  pages: number;
  status?: {
    paid?: number;
    ready?: number;
    coming?: number;
    done?: number;
  };
}

export interface ZzimArtistsType {
  _id: string;
  name: string;
  aka: string;
  thumbnail: string;
  countOfWorks: number;
}

//MyPage Orderdetail

export interface OrderdetailType {
  result: {
    id: string;
    paidAt: string;
    status: number;
    updatedAt: string;
  };
  deliveryInfo: {
    address: string;
    detailedAddress: string;
    receiver: string;
    contactNum: string;
  };
  deliveryDetails: {
    receiveAt: string;
    requestedTerms: string;
  };
  ordererInfo: {
    name: string;
    phoneNum: string;
    email: string;
    refundTerms: string;
  };
  _id: string;
  user: string;
  orderItems: [
    {
      image: string;
      title: string;
      artist: string;
      size: string;
      price: number;
      product: string;
    },
  ];
  shippingPrice: number;
  totalPrice: number;
}
