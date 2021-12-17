import Skeleton from '@mui/material/Skeleton';
import Stack from '@mui/material/Stack';

export const LoadingQuickBtns = () => {
  return (
    <Stack spacing={1}>
      <Skeleton
        variant="circular"
        animation="wave"
        width="50px"
        height="50px"
      />
    </Stack>
  );
};
