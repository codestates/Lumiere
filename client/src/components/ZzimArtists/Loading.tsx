import Skeleton from '@mui/material/Skeleton';
import Stack from '@mui/material/Stack';
import {
  ArtistsContentWrap,
  ArtistsContent,
  ImgWrap,
  ArtistDlWrap,
  ListDeleteBtnWrap,
  ListCheckLabelWrap,
} from './styled';

export const LoadingZzimArtists = () => {
  return (
    <ArtistsContentWrap>
      <ArtistsContent>
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
        <ArtistDlWrap>
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
        </ArtistDlWrap>
      </ArtistsContent>
    </ArtistsContentWrap>
  );
};
