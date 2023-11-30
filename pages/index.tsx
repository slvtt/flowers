import * as React from "react";
import type { NextPage } from "next";
import { Typography } from "@mui/material";
import Layout from "src/components/Layout/Layout";
import Flowers from "src/components/screens/flowers/Flowers";

const Home: NextPage = () => {
  return (
    <Layout>
      <Flowers />
    </Layout>
  );
};

export default Home;
