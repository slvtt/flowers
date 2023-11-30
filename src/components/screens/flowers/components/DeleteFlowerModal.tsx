import React, { useEffect, useState } from 'react';
import { Box } from 'src/ui/Box/Box';
import { Typography } from 'src/ui/Typography/Typography';
import { Dialog, Stack } from '@mui/material';
import { Button } from 'src/ui/Button/Button';
import { deleteFlower, Flower, getFlower } from 'src/api/flowers/flowers';
import { toastAlert } from 'src/ui/Alert/toastify';
import { useFlower } from 'src/components/screens/flowers/hooks/useFlower';

interface DeleteFlowerModalProps {
  open: boolean;
  onClose: () => void;
  flowerId: string;
  refresh: () => void;
}

const DeleteFlowerModal: React.FC<DeleteFlowerModalProps> = ({
  open,
  onClose,
  flowerId,
  refresh
}) => {
  const { flower } = useFlower(flowerId);

  const handleDeleteFlower = () => {
    deleteFlower(flowerId)
      .then(() =>
        toastAlert({
          content: `Цветок успешно удален`,
          options: { type: 'success' }
        })
      )
      .then(() => onClose())
      .then(() => refresh())
      .catch(e => e)
      .finally(() => onClose());
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <Box padding='24px' width='600px' minHeight='100px'>
        <Typography variant='h6'>Удалить цветок {flower?.name}?</Typography>
        <Stack direction='row' mt='15px' spacing={2}>
          <Button variant='contained' sx={{ width: '100%' }} onClick={onClose}>
            Отмена
          </Button>
          <Button
            variant='contained'
            sx={{ width: '100%' }}
            color='error'
            onClick={handleDeleteFlower}
          >
            Удалить
          </Button>
        </Stack>
      </Box>
    </Dialog>
  );
};

export default DeleteFlowerModal;
