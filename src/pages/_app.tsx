// @ts-ignore - Next.js CSS imports are valid at runtime
import '../styles/globals.css'
import type { AppProps } from 'next/app'


export default function App({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />
}
