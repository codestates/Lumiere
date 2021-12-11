export interface Users {
  general: {
    email: string;
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
      canvas: string;
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
        paidAt: string;
        status: number;
        updatedAt: string;
      };
      totalPrice: number;
      user: {
        general: {
          email: string;
        };
        kakao?: string;
        naver?: string;
        google?: string;
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

// Order Page
export interface OrderDeliver {
  deliver: {
    address: string;
    receiver: string;
    request: string;
  };
}
// Order Page
export interface OrdererUserInfo {
  ordererInfo: {
    name: string;
    phoneNum: string;
    email: string;
    refundTerms: string;
  };
}
// Order Page
export interface OrderPrice {
  shippingPrice: number;
  totalPrice: number;
}
