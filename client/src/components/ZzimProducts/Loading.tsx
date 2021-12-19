import Skeleton from '@mui/material/Skeleton';
import Stack from '@mui/material/Stack';
import {
  ProductContentWrap,
  ProductContent,
  ImgWrap,
  ProductDlWrap,
  ListDeleteBtnWrap,
  ListCheckLabelWrap,
} from './styled';

export const LoadingZzimProducts = () => {
  return (
    <ProductContentWrap>
      <ProductContent>
        <ListDeleteBtnWrap>
          <Stack spacing={1} style={{ width: '100%', height: '100%' }}>
            <Skeleton
              variant="rectangular"
              animation="wave"
              width="100%"
              height="100%"
            />
          </Stack>
        </ListDeleteBtnWrap>
        <ListCheckLabelWrap>
          <Skeleton
            variant="rectangular"
            animation="wave"
            width="1.5rem"
            height="1.5rem"
          />
        </ListCheckLabelWrap>
        <ImgWrap>
          <Skeleton
            variant="rectangular"
            animation="wave"
            width="100%"
            height="100%"
          />
        </ImgWrap>
        <ProductDlWrap>
          <Stack spacing={1} className="ddwrap">
            <Skeleton
              variant="text"
              animation="wave"
              width="90%"
              height="3rem"
            />
            <Skeleton
              variant="text"
              animation="wave"
              width="90%"
              height="1.5rem"
            />
            <Skeleton
              variant="text"
              animation="wave"
              width="90%"
              height="1.5rem"
            />
          </Stack>
        </ProductDlWrap>
      </ProductContent>
    </ProductContentWrap>
  );
};
