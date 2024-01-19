'use client'

// @ts-nocheck
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import XIcon from '../../public/x.svg';
import { theme } from '@/utils/theme';
import { ThemeProvider } from '@mui/material';

export default function Modal1({
  open,
  onClose,
  content = <></>,
  preventCloseByBackdrop = false,
  width = 400,
}: {
  open: boolean;
  onClose: Function;
  content: any;
  preventCloseByBackdrop?: boolean;
  width?: number;
}) {
  const handleClose = (event: any, reason: any) => {
    // if preventCloseByBackdrop is enabled, exit the function if the close reason is backdropClick
    if (reason === "backdropClick" && preventCloseByBackdrop) return null;

    onClose();
  };

  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={{
          position: 'absolute' as 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width,
          bgcolor: 'var(--bg-primary)',
          border: '2px solid #000',
          borderRadius: '10px',
          boxShadow: 24,
          p: 4,
        }}>
            <div>
              <XIcon
                fill="var(--text-secondary)"
                width="30px"
                height="auto"
                style={{
                  float: 'right',
                  margin: '-30px -30px 0 0',
                  cursor: 'pointer',
                }}
                onClick={() => onClose()}
              />
            </div>
            <ThemeProvider theme={theme}>
              {content}
            </ThemeProvider>
        </Box>
      </Modal>
    </div>
  );
}
