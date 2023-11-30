import React, { PropsWithChildren, useEffect } from "react";
import { Box } from "src/ui/Box/Box";
import { useRouter } from "next/router";
import PageContainer from "src/components/common/PageContainer/PageContainer";
import { getAuthTokens } from "src/utils/helpers/authHelper";

interface LayoutProps extends PropsWithChildren {}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const router = useRouter();

  useEffect(() => {
    const refresh_token = getAuthTokens().access_token;
    if (!refresh_token) router.push("/auth");
  }, []);

  return (
    <PageContainer maxWidth="xl" sx={{ display: "flex", gap: 3 }}>
      <Box width="100%">{children}</Box>
    </PageContainer>
  );
};

export default Layout;
