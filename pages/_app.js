import { AuthProvider } from '@/Authenticator'
import '@/styles/globals.css'
// Prevents MUI icons from not appearing on server load 
import { CacheProvider } from '@emotion/react';
import createCache from '@emotion/cache';
import { Analytics } from '@vercel/analytics/react';

const cache = createCache({
  key: 'css',
  prepend: true,
});

export default function App({ Component, pageProps }) {
  return (
    <AuthProvider>
      <CacheProvider value={cache}>

        <Component {...pageProps} />
        <Analytics />

      </CacheProvider>

    </AuthProvider>

  )
}
