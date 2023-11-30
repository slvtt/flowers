import React, { PropsWithChildren } from "react";
import { Container as MuiContainer } from "@mui/system";
import { ContainerProps } from "@mui/system/Container/ContainerProps";
import { styled } from "@mui/material/styles";

interface PageContainerProps extends PropsWithChildren {}

const Container = styled(MuiContainer)(({ theme }) => ({
  [theme.breakpoints.up("sm")]: {
    padding: 24,
  },
}));
const PageContainer: React.FC<PageContainerProps & ContainerProps> = ({
  children,
  ...props
}) => {
  return <Container {...props}>{children}</Container>;
};

export default PageContainer;
