import Skeleton from '@mui/material/Skeleton';
import Stack from '@mui/material/Stack';
import {
  OrderListContainer,
  ListContainer,
  OrderNumberDescription,
  DtDdWrap,
  ImgWrap,
  ProductDlWrap,
  ProductWrap,
  TotalPriceWrap,
  OrderStatus,
  Management,
  AllProductWrap,
} from './styled';

export const LoadingOrderList = () => {
  return (
    <OrderListContainer>
      <div>
        <ListContainer>
          <OrderNumberDescription>
            <DtDdWrap style={{ width: '100%', height: '100%' }}>
              <Stack spacing={1} style={{ width: '100%', height: '100%' }}>
                <Skeleton
                  variant="text"
                  animation="wave"
                  width="100%"
                  height="100%"
                  className="loading_dt"
                />
                <Skeleton
                  variant="text"
                  animation="wave"
                  width="100%"
                  height="100%"
                />
              </Stack>
              <Stack spacing={1} style={{ width: '100%', height: '100%' }}>
                <Skeleton
                  variant="text"
                  animation="wave"
                  width="100%"
                  height="100%"
                />
              </Stack>
            </DtDdWrap>
            <Stack spacing={1}>
              <Skeleton
                variant="rectangular"
                animation="wave"
                className="detailView"
                width="100%"
                height="100%"
              />
            </Stack>
          </OrderNumberDescription>
          <AllProductWrap>
            <ProductWrap>
              <ImgWrap>
                <Skeleton
                  variant="rectangular"
                  animation="wave"
                  width="100%"
                  height="100%"
                />
              </ImgWrap>
              <ProductDlWrap>
                <Skeleton
                  variant="text"
                  animation="wave"
                  width="100%"
                  height="100%"
                />
                <Skeleton
                  variant="text"
                  animation="wave"
                  width="100%"
                  height="100%"
                />
                <Skeleton
                  variant="text"
                  animation="wave"
                  width="100%"
                  height="100%"
                />
                <Skeleton
                  variant="text"
                  animation="wave"
                  width="100%"
                  height="100%"
                />
              </ProductDlWrap>
            </ProductWrap>
          </AllProductWrap>
          <TotalPriceWrap>
            <Stack
              spacing={1}
              className="mobile-Only shipping"
              style={{ width: '100%', height: '100%' }}
            >
              <Skeleton
                variant="text"
                animation="wave"
                width="100%"
                height="100%"
              />
            </Stack>
            <Stack
              spacing={1}
              className="totalPrice"
              style={{ width: '100%', height: '100%' }}
            >
              <Skeleton
                variant="text"
                animation="wave"
                className="mobile-Only"
                width="100%"
                height="100%"
              />
              <Skeleton
                variant="text"
                animation="wave"
                className="realtotalPrice"
                width="100%"
                height="100%"
              />
            </Stack>
          </TotalPriceWrap>
          <OrderStatus>
            <Stack spacing={1} style={{ width: '50%', height: '20%' }}>
              <Skeleton
                variant="text"
                animation="wave"
                width="100%"
                height="100%"
              />
            </Stack>
          </OrderStatus>
          <Management>
            <Skeleton
              variant="text"
              animation="wave"
              width="100%"
              height="100%"
            />
            <Skeleton
              variant="text"
              animation="wave"
              width="100%"
              height="100%"
            />
          </Management>
        </ListContainer>
      </div>
    </OrderListContainer>
  );
};
