import React from 'react';
import { Dialog, Stack } from '@mui/material';
import { Box } from 'src/ui/Box/Box';
import { Typography } from 'src/ui/Typography/Typography';
import { Button } from 'src/ui/Button/Button';
import { createFlower, Flower } from 'src/api/flowers/flowers';
import { toastAlert } from 'src/ui/Alert/toastify';
import { SubmitHandler, useForm } from 'react-hook-form';
import TextInput from 'src/ui/TextInput/TextInput';

interface CreateFlowerProps {
  open: boolean;
  onClose: () => void;
  refresh: () => void;
}

interface CreateFlowerForm extends Omit<Flower, 'name' | 'description' | 'image'> {
  name: string;
  description: string;
  imageUrl: string;
}

const CreateFlowerModal: React.FC<CreateFlowerProps> = ({ open, onClose, refresh }) => {
  const { handleSubmit, register } = useForm<CreateFlowerForm>();

  const handleCreateFlower: SubmitHandler<CreateFlowerForm> = values => {
    const data = {
      name: values.name,
      image: values.imageUrl,
      description: values.description
    } as Flower;

    createFlower(data)
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
        onSubmit={handleSubmit(handleCreateFlower)}
      >
        <Typography variant='h6'>Создать цветок </Typography>
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
            Создать
          </Button>
        </Stack>
      </Box>
    </Dialog>
  );
};

export default CreateFlowerModal;
