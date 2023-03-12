import '@/styles/globals.css'
import AuthContextProvider from '../contexts/AuthContext'
import Layout from '@/components/Layout'

export default function App({ Component, pageProps }) {
  return (
    <AuthContextProvider>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </AuthContextProvider>
  )
}
