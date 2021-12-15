import { useEffect, useState } from 'react';
import instance from 'util/axios';
import { OrderProducts } from 'util/type';
import { ZzimProductList } from './ZzimProductList';
import { ZzimProductsFilter } from './ZzimProductsFilter';

const ZzimProducts = () => {
  const [checkBoxList, setCheckBoxList] = useState<string[]>([]);
  const [productState, setProductState] = useState<Array<OrderProducts>>([
    {
      artist: {
        _id: '',
        name: '',
      },
      image: '',
      inStock: true,
      info: {
        size: '',
        canvas: 0,
      },
      price: 0,
      title: '',
      _id: '',
    },
  ]);
  useEffect(() => {
    instance.get('/products/zzim').then((res) => {
      setProductState(res.data);
    });
  }, []);

  return (
    <>
      <ZzimProductsFilter
        checkBoxList={checkBoxList}
        setCheckBoxList={setCheckBoxList}
        setProductState={setProductState}
        productState={productState}
      />
      <ZzimProductList
        productState={productState}
        checkBoxList={checkBoxList}
        setCheckBoxList={setCheckBoxList}
        setProductState={setProductState}
      />
    </>
  );
};
export default ZzimProducts;
