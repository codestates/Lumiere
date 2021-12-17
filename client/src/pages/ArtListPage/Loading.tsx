import Skeleton from '@mui/material/Skeleton';
import Stack from '@mui/material/Stack';
import { ArtWrap, ArtInfoBox } from 'components/ArtListMapping/styled';

export const LoadingArtList = () => {
  return (
    <ArtWrap className="my-masonry-grid_column">
      <Stack spacing={1}>
        <Skeleton
          variant="rectangular"
          animation="wave"
          width="100%"
          height="30vh"
        />
      </Stack>
      <ArtInfoBox>
        <Stack spacing={1} className="title loading">
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
        </Stack>
        <Stack spacing={1} className="heartIcon">
          <Skeleton
            variant="text"
            animation="wave"
            width="100%"
            height="100%"
            className="likeit"
          />
        </Stack>
      </ArtInfoBox>
    </ArtWrap>
  );
};
