import { useEffect, useState } from 'react';
import instance from 'util/axios';
import { OrderProducts } from 'util/type';
import { ZzimProductList } from './ZzimProductList';
import { ZzimProductsFilter } from './ZzimProductsFilter';
import { ZzimProductsContainer } from './styled';
import { LoadingZzimProducts } from './Loading';
import { ZzimProductsDummy } from './dummy';

interface Props {
  isLoading: boolean;
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
}

const ZzimProducts = ({ isLoading, setIsLoading }: Props) => {
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
    setIsLoading(true);
    instance.get('/products/zzim').then((res) => {
      setProductState(res.data);
      setIsLoading(false);
    });
  }, []);

  return (
    <ZzimProductsContainer>
      <ZzimProductsFilter
        checkBoxList={checkBoxList}
        setCheckBoxList={setCheckBoxList}
        setProductState={setProductState}
        productState={productState}
      />
      {isLoading ? (
        ZzimProductsDummy.map((product) => (
          <LoadingZzimProducts key={product.id} />
        ))
      ) : (
        <ZzimProductList
          productState={productState}
          checkBoxList={checkBoxList}
          setCheckBoxList={setCheckBoxList}
          setProductState={setProductState}
        />
      )}
    </ZzimProductsContainer>
  );
};
export default ZzimProducts;
