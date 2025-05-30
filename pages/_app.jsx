import React from 'react';
import RouterWrapper from '../Components/Layout/RouterWrapper';
import '../styles/globals.css'; // Adjust path as needed

function MyApp({ Component, pageProps }) {
  return (
    <RouterWrapper>
      <Component {...pageProps} />
    </RouterWrapper>
  );
}

export default MyApp;
