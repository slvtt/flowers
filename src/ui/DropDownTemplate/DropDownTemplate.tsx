import React, { ReactElement } from 'react';
import { Menu } from '@mui/material';

interface DropDownChildrenProps {
  isOpenDropDown: boolean;
  onClickDropDown: (event: React.MouseEvent<HTMLElement>) => void;
  onCloseDropDown: () => void;
}

interface DropDownProps {
  renderButton: (props: DropDownChildrenProps) => ReactElement;
  children: (props: DropDownChildrenProps) => ReactElement | Array<ReactElement>;
}

const DropDownTemplate: React.FC<DropDownProps> = ({ renderButton, children }) => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const isOpenDropDown = Boolean(anchorEl);

  const onClickDropDown = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const onCloseDropDown = () => {
    setAnchorEl(null);
  };

  return (
    <>
      {renderButton({ isOpenDropDown, onCloseDropDown, onClickDropDown })}
      <Menu
        MenuListProps={{
          'aria-labelledby': 'long-button'
        }}
        anchorEl={anchorEl}
        open={isOpenDropDown}
        onClose={onCloseDropDown}
      >
        {children({ onCloseDropDown, onClickDropDown, isOpenDropDown })}
      </Menu>
    </>
  );
};

export default DropDownTemplate;
