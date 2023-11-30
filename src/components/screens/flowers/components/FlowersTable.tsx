import React from 'react';
import { Flower } from 'src/api/flowers/flowers';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import TableBody from '@mui/material/TableBody';
import TableContainer from '@mui/material/TableContainer';
import { IconButton } from 'src/ui/IconButton/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

interface FlowersTableProps {
  flowers: Flower[];
  onDelete: (id: string) => void;
  onEdit: (id: string) => void;
}

const FlowersTable: React.FC<FlowersTableProps> = ({ flowers, onDelete, onEdit }) => {
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 750 }} aria-label='simple table'>
        <TableHead>
          <TableRow>
            <TableCell>Название</TableCell>
            <TableCell align='right'>Дата добавления</TableCell>
            <TableCell align='right'>Дата удаления</TableCell>
            <TableCell align='right'>Ссылка на изображение</TableCell>
            <TableCell align='right'>Краткое описание</TableCell>
            <TableCell align='right'></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {flowers.map(row => (
            <TableRow key={row.id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
              <TableCell component='th' scope='row'>
                {row.name}
              </TableCell>
              <TableCell align='right'>{row.createdAt}</TableCell>
              <TableCell align='right'>{row.deletedAt}</TableCell>
              <TableCell align='right'>{row.image}</TableCell>
              <TableCell align='right'>{row.description.slice(0, 50)}...</TableCell>
              <TableCell align='right'>
                <IconButton onClick={() => onDelete(row.id)}>
                  <DeleteIcon />
                </IconButton>
                <IconButton onClick={() => onEdit(row.id)}>
                  <EditIcon />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default FlowersTable;
