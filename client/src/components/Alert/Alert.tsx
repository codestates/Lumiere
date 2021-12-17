/* eslint-disable react/jsx-props-no-spreading */
import * as React from 'react';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert, { AlertProps } from '@mui/material/Alert';

interface Props {
  open: boolean;
  severity: string;
  alertMessage: string;
  alertCloseHandler: () => void;
}

const Notification = React.forwardRef<HTMLDivElement, AlertProps>(
  function Notification(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  },
);

const Alert = ({ open, severity, alertMessage, alertCloseHandler }: Props) => {
  return (
    <span>
      {/* Alert */}
      {severity === 'success' && (
        <Snackbar
          open={open}
          autoHideDuration={1000}
          anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
          onClose={alertCloseHandler}
          style={{ background: 'rgba(255, 255, 255, 0.9)' }}
        >
          <Notification
            onClose={alertCloseHandler}
            variant="outlined"
            severity="success"
            sx={{ width: '100%' }}
          >
            {alertMessage}
          </Notification>
        </Snackbar>
      )}
      {severity === 'warning' && (
        <Snackbar
          open={open}
          autoHideDuration={1000}
          anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
          onClose={alertCloseHandler}
          style={{ background: 'rgba(255, 255, 255, 0.9)' }}
        >
          <Notification
            onClose={alertCloseHandler}
            variant="outlined"
            severity="warning"
            sx={{ width: '100%' }}
          >
            {alertMessage}
          </Notification>
        </Snackbar>
      )}
    </span>
  );
};

export default Alert;
