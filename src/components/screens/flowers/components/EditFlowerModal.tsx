import React from 'react';
import { Dialog, Stack } from '@mui/material';
import { Box } from 'src/ui/Box/Box';
import { Typography } from 'src/ui/Typography/Typography';
import { Button } from 'src/ui/Button/Button';
import { Flower, updateFlower } from 'src/api/flowers/flowers';
import { toastAlert } from 'src/ui/Alert/toastify';
import { useFlower } from 'src/components/screens/flowers/hooks/useFlower';
import { SubmitHandler, useForm } from 'react-hook-form';
import TextInput from 'src/ui/TextInput/TextInput';

interface CreateEditFlowerProps {
  open: boolean;
  onClose: () => void;
  flowerId: string;
  refresh: () => void;
}

interface EditFlowerForm extends Omit<Flower, 'name' | 'description' | 'image'> {
  name: string;
  description: string;
  imageUrl: string;
}

const EditFlowerModal: React.FC<CreateEditFlowerProps> = ({ open, onClose, flowerId, refresh }) => {
  const { flower } = useFlower(flowerId);
  const { handleSubmit, register } = useForm<EditFlowerForm>();

  const handleUpdateFlower: SubmitHandler<EditFlowerForm> = values => {
    const data = {
      name: values.name,
      image: values.imageUrl ?? flower?.image ?? '',
      description: values.description ?? flower?.description ?? '',
      ...flower
    } as Flower;

    updateFlower(data)
      .then(() =>
        toastAlert({
          content: `Цветок успешно отредактирован`,
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
      <Box
        padding='24px'
        width='600px'
        minHeight='100px'
        component='form'
        onSubmit={handleSubmit(handleUpdateFlower)}
      >
        <Typography variant='h6'>Редактировать цветок {flower?.name}</Typography>
        <Stack spacing={2}>
          <TextInput register={register('name')} label='Название' />
          <TextInput register={register('description')} label='Описание' />
          <TextInput register={register('imageUrl')} label='Ссылка на картинку' />
        </Stack>
        <Stack direction='row' mt='15px' spacing={2}>
          <Button variant='contained' sx={{ width: '100%' }} onClick={onClose} color='error'>
            Отмена
          </Button>
          <Button variant='contained' sx={{ width: '100%' }} type='submit'>
            Сохранить
          </Button>
        </Stack>
      </Box>
    </Dialog>
  );
};

export default EditFlowerModal;
