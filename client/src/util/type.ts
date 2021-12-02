export interface Users {
  general: {
    email: string;
    password: string;
  };
  google: {
    uuid: string;
    token: string;
    email: string;
  };
  naver: {
    uuid: string;
    token: string;
    email: string;
  };
  kakao: {
    uuid: string;
    token: string;
    email: string;
  };
  name: string;
  active: {
    lastAccessTime: Date;
    isClosed: boolean;
  };
  isAdmin: boolean;
}

export interface Product {
  artCode: string;
  title: string;
  image: string;
  theme: string;
  info: {
    details: string;
    size: string;
    canvas: string;
    createdAt: string;
  };
  price: number;
  count: number;
  inStock: boolean;
  updatedAt: Date;
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
}

export interface Order {
  orderItems: [
    {
      image: string;
      title: string;
      artist: string;
      size: string;
      price: number;
    },
  ];
  result: {
    id: string;
    paidAt: Date;
    status: number;
    updatedAt: Date;
  };
  deliver: {
    address: string;
    receiver: string;
    request: string;
  };
  ordererInfo: {
    name: string;
    phoneNum: string;
    email: string;
    refundTerms: string;
  };
  shippingPrice: number;
  totalPrice: number;
  // deliveredAt: Date;
  user: {
    name: string;
    _id: string;
  };
}

export interface Events {
  heading: string;
  content: string;
  linkname: string;
  link: string;
  image: string;
}
