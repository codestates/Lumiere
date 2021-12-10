import { OrderProducts } from 'util/type';
import { useComma } from 'util/functions';
import {
  OrderContentContainer,
  Title,
  ProductContentWrap,
  ImgWrap,
  ProductDlWrap,
} from './styled';

type ProductProps = {
  // 배열을 넘겼으니 배열을 받아야함
  productState: OrderProducts[];
  setProductState: (data: Array<OrderProducts>) => void;
};

export const OrderProduct = ({
  productState,
  setProductState,
}: ProductProps) => {
  return (
    <OrderContentContainer>
      <Title>주문작품</Title>
      {productState.map((el) => {
        return (
          <ProductContentWrap key={el.title}>
            <ImgWrap>
              <img src={el.image} alt={`${el.artist} ${el.image}`} />
            </ImgWrap>
            <ProductDlWrap>
              <dt>{el.title}</dt>
              <dd>{el.artist.name}</dd>
              <dd>{`${el.info.size}(${el.info.canvas}호)`}</dd>
              <dd>{`${useComma(el.price)} 원`}</dd>
            </ProductDlWrap>
          </ProductContentWrap>
        );
      })}
    </OrderContentContainer>
  );
};
