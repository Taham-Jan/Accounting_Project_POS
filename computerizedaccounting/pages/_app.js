import "../styles/globals.css";
import "../styles/style.css";

import * as React from "react";
import Head from "next/head";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { CacheProvider } from "@emotion/react";
import createEmotionCache from "../src/createEmotionCache";
import FullLayout from "../src/layouts/FullLayout";
import LoadingBar from "react-top-loading-bar";
import { useState } from "react";
import { useRouter } from "next/router";
import { useEffect } from "react";
import theme from "../src/theme/theme";


// Client-side cache, shared for the whole session of the user in the browser.
const clientSideEmotionCache = createEmotionCache();

export default function MyApp(props) {

  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props;
  const [progress, setProgress] = useState(0);
  const router = useRouter();
  
 
    

  useEffect(() => {
  
    router.events.on("routeChangeStart", () => {
      setProgress(40);
    });
    router.events.on("routeChangeComplete", () => {
      setProgress(100);
    });
  }, [router.query]);
  
  

  
  return (
    <CacheProvider value={emotionCache}>
      <ThemeProvider theme={theme}>
        <FullLayout >
        <LoadingBar
          color="rgb(99 102 241)"
          height={4}
          waitingTime={400}
          progress={progress}
          onLoaderFinished={() => setProgress(0)}
          />
        <CssBaseline />

        <Component  {...pageProps} />
        </FullLayout>
      </ThemeProvider>
    </CacheProvider>
  );


}
