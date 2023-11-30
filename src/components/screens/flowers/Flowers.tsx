import React from 'react';
import { useFlowers } from 'src/components/screens/flowers/hooks/useFlowers';
import { Box } from 'src/ui/Box/Box';
import FlowersTable from 'src/components/screens/flowers/components/FlowersTable';
import { Stack } from '@mui/material';
import { Button } from 'src/ui/Button/Button';
import { useRouter } from 'next/router';
import DeleteFlowerModal from 'src/components/screens/flowers/components/DeleteFlowerModal';
import { useQuery } from 'src/utils/hooks/useQuery';
import EditFlowerModal from 'src/components/screens/flowers/components/EditFlowerModal';
import CreateFlowerModal from 'src/components/screens/flowers/components/CreateFlowerModal';

interface FlowersProps {}

enum ModalAliasesEnum {
  delete = 'deleteFlower',
  create = 'createFlower',
  update = 'updateFlower'
}

const Flowers: React.FC<FlowersProps> = () => {
  const { flowers, refresh, loading } = useFlowers();
  const router = useRouter();
  const { deleteFlower: deleteFlowerId, updateFlower: updateFlowerId } = useQuery([
    'deleteFlower',
    'updateFlower'
  ]);

  const onCloseDeleteModal = () => router.push(router.pathname);
  const onOpenDeleteModal = (id: string) =>
    router.push({ query: { [ModalAliasesEnum.delete]: id } });

  const onCloseUpdateModal = () => router.push(router.pathname);
  const onOpenUpdateModal = (id: string) =>
    router.push({ query: { [ModalAliasesEnum.update]: id } });

  const onOpenCreateModal = () => router.push({ query: { [ModalAliasesEnum.create]: 'true' } });

  return (
    <Box>
      <Stack direction='row' mb='24px'>
        <Button variant='contained' onClick={onOpenCreateModal}>
          Добавить цветок
        </Button>
      </Stack>
      <FlowersTable onDelete={onOpenDeleteModal} onEdit={onOpenUpdateModal} flowers={flowers} />
      <DeleteFlowerModal
        open={!!router.query.deleteFlower}
        onClose={onCloseDeleteModal}
        refresh={refresh}
        flowerId={deleteFlowerId}
      />
      <EditFlowerModal
        open={!!router.query.updateFlower}
        onClose={onCloseUpdateModal}
        refresh={refresh}
        flowerId={updateFlowerId}
      />
      <CreateFlowerModal
        open={!!router.query.createFlower}
        onClose={onCloseUpdateModal}
        refresh={refresh}
      />
    </Box>
  );
};

export default Flowers;
