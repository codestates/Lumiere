export interface Users {
  general: {
    email: String;
    password: String;
  };
  google: {
    uuid: String;
    token: String;
    email: String;
  };
  naver: {
    uuid: String;
    token: String;
    email: String;
  };
  kakao: {
    uuid: String;
    token: String;
    email: String;
  };
  name: String;
  active: {
    lastAccessTime: Date;
    isClosed: Boolean;
  };
  isAdmin: Boolean;
}

export interface Product {
  artCode: String;
  title: String;
  image: String;
  theme: String;
  info: {
    details: String;
    size: String;
    canvas: String;
    createdAt: String;
  };
  price: Number;
  count: Number;
  inStock: Boolean;
  updatedAt: Date;
}

export interface Artists {
  code: String;
  name: String;
  aka: String;
  record: String;
  thumbnail: String;
  joinAt: Date;
  countOfWorks: Number;
  isActive: Boolean;
}

export interface Order {
  orderItems: [
    {
      image: String;
      title: String;
      artist: String;
      size: String;
      price: Number;
    },
  ];
  result: {
    id: String;
    paidAt: Date;
    status: Number;
    updatedAt: Date;
  };
  deliver: {
    address: String;
    receiver: String;
    request: String;
  };
  ordererInfo: {
    name: String;
    phoneNum: String;
    email: String;
    refundTerms: String;
  };
  shippingPrice: Number;
  totalPrice: Number;
  deliveredAt: Date;
}

export interface Events {
  heading: String;
  content: String;
  linkname: String;
  link: String;
  image: String;
}
