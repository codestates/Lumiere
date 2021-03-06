import Skeleton from '@mui/material/Skeleton';
import Stack from '@mui/material/Stack';
import {
  OrderContentContainer,
  Title,
  FindAddressBtn,
  AllContentWrap,
  AddressContent,
  OrderUserInfo,
  LabelWrap,
  ProductContentWrap,
  ImgWrap,
  ProductDlWrap,
  CountWrap,
  DescriptionWrap,
  ClickBtn,
  PayTitle,
} from 'components/Order/styled';
import { ContentWrap, ContentLeft, ContentRight } from './styled';

export const OrderLoading = () => {
  return (
    <ContentWrap>
      <ContentLeft>
        <OrderContentContainer>
          <Title>
            <Skeleton
              variant="text"
              animation="wave"
              width="15%"
              height="25%"
            />
          </Title>
          <FindAddressBtn
            style={{ width: '10%', height: '15%', border: 'none' }}
          >
            <Skeleton
              variant="text"
              animation="wave"
              width="100%"
              height="100%"
            />
          </FindAddressBtn>
          <AllContentWrap>
            <AddressContent>
              <Skeleton
                variant="text"
                animation="wave"
                width="100%"
                height="100%"
              />
            </AddressContent>
            <OrderUserInfo>
              <Skeleton
                variant="text"
                animation="wave"
                width="80%"
                height="100%"
              />
            </OrderUserInfo>
            <br />
            <OrderUserInfo>
              <Skeleton
                variant="text"
                animation="wave"
                width="50%"
                height="100%"
              />
            </OrderUserInfo>
            <br />
            <OrderUserInfo>
              <Skeleton
                variant="text"
                animation="wave"
                width="50%"
                height="100%"
              />
            </OrderUserInfo>
          </AllContentWrap>
        </OrderContentContainer>
        <OrderContentContainer>
          <Title>
            <Skeleton
              variant="text"
              animation="wave"
              width="15%"
              height="25%"
            />
          </Title>
          <AllContentWrap>
            <form>
              <LabelWrap>
                <Skeleton
                  variant="text"
                  animation="wave"
                  width="12%"
                  height="25%"
                />
                <Stack spacing={1} style={{ width: '80%', height: '100%' }}>
                  <Skeleton
                    variant="text"
                    animation="wave"
                    width="100%"
                    height="100%"
                  />
                </Stack>
              </LabelWrap>
              <LabelWrap>
                <Skeleton
                  variant="text"
                  animation="wave"
                  width="12%"
                  height="25%"
                />
                <Stack spacing={1} style={{ width: '80%', height: '100%' }}>
                  <Skeleton
                    variant="text"
                    animation="wave"
                    width="100%"
                    height="100%"
                  />
                </Stack>
              </LabelWrap>
              <LabelWrap>
                <Skeleton
                  variant="text"
                  animation="wave"
                  width="12%"
                  height="25%"
                />
                <Stack spacing={1} style={{ width: '80%', height: '100%' }}>
                  <Skeleton
                    variant="text"
                    animation="wave"
                    width="100%"
                    height="100%"
                  />
                </Stack>
              </LabelWrap>
              <LabelWrap>
                <Skeleton
                  variant="text"
                  animation="wave"
                  width="12%"
                  height="25%"
                />
                <Stack spacing={1} style={{ width: '80%', height: '100%' }}>
                  <Skeleton
                    variant="text"
                    animation="wave"
                    width="100%"
                    height="100%"
                  />
                </Stack>
              </LabelWrap>
            </form>
          </AllContentWrap>
        </OrderContentContainer>
        <OrderContentContainer>
          <Title>
            <Skeleton
              variant="text"
              animation="wave"
              width="15%"
              height="25%"
            />
          </Title>
          <AllContentWrap>
            <form>
              <LabelWrap>
                <Skeleton
                  variant="text"
                  animation="wave"
                  width="12%"
                  height="25%"
                />
                <Stack spacing={1} style={{ width: '80%', height: '100%' }}>
                  <Skeleton
                    variant="text"
                    animation="wave"
                    width="100%"
                    height="100%"
                  />
                </Stack>
              </LabelWrap>
              <LabelWrap>
                <Skeleton
                  variant="text"
                  animation="wave"
                  width="12%"
                  height="25%"
                />
                <Stack spacing={1} style={{ width: '80%', height: '100%' }}>
                  <Skeleton
                    variant="text"
                    animation="wave"
                    width="100%"
                    height="100%"
                  />
                </Stack>
              </LabelWrap>
            </form>
          </AllContentWrap>
        </OrderContentContainer>
        <OrderContentContainer>
          <Title>
            <Skeleton
              variant="text"
              animation="wave"
              width="15%"
              height="25%"
            />
          </Title>
          <ProductContentWrap>
            <ImgWrap>
              <Stack spacing={1} style={{ width: '100%', height: '100%' }}>
                <Skeleton
                  variant="rectangular"
                  animation="wave"
                  width="100%"
                  height="100%"
                />
              </Stack>
            </ImgWrap>
            <ProductDlWrap>
              <Skeleton
                variant="text"
                animation="wave"
                width="50%"
                height="100%"
              />
              <Skeleton
                variant="text"
                animation="wave"
                width="50%"
                height="100%"
              />
              <Skeleton
                variant="text"
                animation="wave"
                width="50%"
                height="100%"
              />
              <Skeleton
                variant="text"
                animation="wave"
                width="50%"
                height="100%"
              />
            </ProductDlWrap>
          </ProductContentWrap>
          <ProductContentWrap>
            <ImgWrap>
              <Stack spacing={1} style={{ width: '100%', height: '100%' }}>
                <Skeleton
                  variant="rectangular"
                  animation="wave"
                  width="100%"
                  height="100%"
                />
              </Stack>
            </ImgWrap>
            <ProductDlWrap>
              <Skeleton
                variant="text"
                animation="wave"
                width="50%"
                height="100%"
              />
              <Skeleton
                variant="text"
                animation="wave"
                width="50%"
                height="100%"
              />
              <Skeleton
                variant="text"
                animation="wave"
                width="50%"
                height="100%"
              />
              <Skeleton
                variant="text"
                animation="wave"
                width="50%"
                height="100%"
              />
            </ProductDlWrap>
          </ProductContentWrap>
        </OrderContentContainer>
      </ContentLeft>
      <ContentRight>
        <OrderContentContainer mobile="mobile">
          <ContentWrap style={{ flexDirection: 'column' }}>
            <PayTitle>
              <Skeleton
                variant="text"
                animation="wave"
                width="50%"
                height="100%"
              />
            </PayTitle>
            <CountWrap>
              <DescriptionWrap>
                <Skeleton
                  variant="text"
                  animation="wave"
                  width="30%"
                  height="100%"
                />
                <Skeleton
                  variant="text"
                  animation="wave"
                  width="60%"
                  height="100%"
                />
              </DescriptionWrap>
              <DescriptionWrap>
                <Skeleton
                  variant="text"
                  animation="wave"
                  width="30%"
                  height="100%"
                />
                <Skeleton
                  variant="text"
                  animation="wave"
                  width="60%"
                  height="100%"
                />
              </DescriptionWrap>
              <DescriptionWrap>
                <Skeleton
                  variant="text"
                  animation="wave"
                  width="30%"
                  height="100%"
                />
                <Skeleton
                  variant="text"
                  animation="wave"
                  width="60%"
                  height="100%"
                />
              </DescriptionWrap>
            </CountWrap>
            <ClickBtn type="button" style={{ background: '#c8c8c8' }}>
              <Stack spacing={1} style={{ width: '100%', height: '100%' }}>
                <Skeleton
                  variant="rectangular"
                  animation="wave"
                  width="100%"
                  height="100%"
                />
              </Stack>
            </ClickBtn>
          </ContentWrap>
        </OrderContentContainer>
      </ContentRight>
    </ContentWrap>
  );
};
