import * as React from "react";
import { ReactElement } from "react";
import { AppProps } from "next/app";
import { NextPageWithLayout } from "src/types/types";
import { ThemeProvider } from "@mui/material/styles";
import theme from "src/theme";
import { CssBaseline } from "@mui/material";
import "src/index.css";
import createEmotionCache from "src/createEmotionCache";
import { CacheProvider, EmotionCache } from "@emotion/react";
import ErrorBoundary from "src/components/ErrorBoundary/ErrorBoundary";
import { Provider } from "react-redux";
import { store } from "src/redux/store";
import Head from "next/head";

interface MyAppProps extends AppProps {
  emotionCache?: EmotionCache;
  Component: NextPageWithLayout;
}

const clientSideEmotionCache = createEmotionCache();

export default function MyApp(props: MyAppProps) {
  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props;
  const getLayout = Component.getLayout ?? ((page: ReactElement) => page);

  return (
    <React.Fragment>
      <Head>
        <title>Template</title>
      </Head>
      <ErrorBoundary>
        <Provider store={store}>
          <CacheProvider value={emotionCache}>
            <ThemeProvider theme={theme}>
              <CssBaseline />
              {getLayout(<Component {...pageProps} />)}
            </ThemeProvider>
          </CacheProvider>
        </Provider>
      </ErrorBoundary>
    </React.Fragment>
  );
}
