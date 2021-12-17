import Skeleton from '@mui/material/Skeleton';
import Stack from '@mui/material/Stack';

export const LoadingSlide = () => {
  return (
    <Stack spacing={1}>
      <Skeleton variant="rectangular" animation="wave" height="80vh" />
    </Stack>
  );
};

export const LoadingLatest = () => {
  return (
    <>
      <Stack spacing={1}>
        <Skeleton
          variant="rectangular"
          animation="wave"
          width="100%"
          height="100%"
        />
      </Stack>
      <Stack spacing={1}>
        <Skeleton
          variant="rectangular"
          animation="wave"
          width="100%"
          height="100%"
        />
      </Stack>
      <Stack spacing={1}>
        <Skeleton
          variant="rectangular"
          animation="wave"
          width="100%"
          height="100%"
        />
      </Stack>
      <Stack spacing={1}>
        <Skeleton
          variant="rectangular"
          animation="wave"
          width="100%"
          height="100%"
        />
      </Stack>
      <Stack spacing={1}>
        <Skeleton
          variant="rectangular"
          animation="wave"
          width="100%"
          height="100%"
        />
      </Stack>
    </>
  );
};
