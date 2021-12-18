import Skeleton from '@mui/material/Skeleton';
import Stack from '@mui/material/Stack';
import {
  ProductContent,
  ProductDlWrap,
  ListDeleteBtnWrap,
  ListCheckLabelWrap,
} from './styled';

export const CartListLoading = () => {
  return (
    <ProductContent>
      <ListDeleteBtnWrap>
        <Stack spacing={1} style={{ width: '100%', height: '100%' }}>
          <Skeleton
            variant="text"
            animation="wave"
            width="100%"
            height="100%"
            className="loading_dt"
          />
        </Stack>
      </ListDeleteBtnWrap>
      <ListCheckLabelWrap>
        <Stack spacing={1} style={{ width: '30%', height: '20%' }}>
          <Skeleton
            variant="rectangular"
            animation="wave"
            width="100%"
            height="100%"
          />
        </Stack>
      </ListCheckLabelWrap>
      <Stack spacing={1} style={{ width: '20%', height: '100%' }}>
        <Skeleton variant="text" animation="wave" width="100%" height="15vh" />
      </Stack>
      <ProductDlWrap>
        <Skeleton
          variant="text"
          animation="wave"
          width="30%"
          height="100%"
          className="loading_dt"
        />
        <Skeleton
          variant="text"
          animation="wave"
          width="30%"
          height="100%"
          className="loading_dt"
        />
        <Skeleton
          variant="text"
          animation="wave"
          width="30%"
          height="100%"
          className="loading_dt"
        />
        <Skeleton
          variant="text"
          animation="wave"
          width="30%"
          height="100%"
          className="loading_dt"
        />
      </ProductDlWrap>
    </ProductContent>
  );
};
