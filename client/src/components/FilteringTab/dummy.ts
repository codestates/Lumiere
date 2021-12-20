export const tabMenus = [
  {
    id: 0,
    name: '테마',
    content: [
      { id: 0, parent: 0, name: '인물' },
      { id: 1, parent: 0, name: '풍경' },
      { id: 2, parent: 0, name: '정물' },
      { id: 3, parent: 0, name: '동물' },
      { id: 4, parent: 0, name: '상상' },
      { id: 5, parent: 0, name: '추상' },
    ],
  },
  {
    id: 1,
    name: '사이즈',
    content: [
      { id: 10, parent: 1, name: '1~5호' },
      { id: 11, parent: 1, name: '6~10호' },
      { id: 12, parent: 1, name: '~20호' },
      { id: 13, parent: 1, name: '~30호' },
      { id: 14, parent: 1, name: '~40호' },
      { id: 15, parent: 1, name: '~60호' },
      { id: 16, parent: 1, name: '~100호' },
    ],
  },
  {
    id: 2,
    name: '구매가격',
    content: [
      { id: 20, parent: 2, name: '10~20만원' },
      { id: 21, parent: 2, name: '20~30만원' },
      { id: 22, parent: 2, name: '30~50만원' },
      { id: 23, parent: 2, name: '50~70만원' },
      { id: 24, parent: 2, name: '70~100만원' },
      { id: 25, parent: 2, name: '100만원~' },
    ],
  },
];

export const tabTypes: {
  [key: number]: {
    theme?: string;
    sizeMin?: number;
    sizeMax?: number;
    priceMin?: number;
    priceMax?: number;
  };
} = {
  0: { theme: '인물' },
  1: { theme: '풍경' },
  2: { theme: '정물' },
  3: { theme: '동물' },
  4: { theme: '상상' },
  5: { theme: '추상' },

  10: { sizeMin: 1, sizeMax: 5 },
  11: { sizeMin: 6, sizeMax: 10 },
  12: { sizeMin: 11, sizeMax: 20 },
  13: { sizeMin: 21, sizeMax: 30 },
  14: { sizeMin: 31, sizeMax: 40 },
  15: { sizeMin: 41, sizeMax: 60 },
  16: { sizeMin: 61, sizeMax: 100 },

  20: { priceMin: 100000, priceMax: 200000 },
  21: { priceMin: 200000, priceMax: 300000 },
  22: { priceMin: 300000, priceMax: 500000 },
  23: { priceMin: 500000, priceMax: 700000 },
  24: { priceMin: 700000, priceMax: 1000000 },
  25: { priceMin: 1000000 },
};
