import '../styles/globals.css'
import React from 'react';

type Props = {
  Component: Function;
  pageProps: any;
}

function MyApp({ Component, pageProps }: Props) {
  return <Component {...pageProps} />
}

export default MyApp
