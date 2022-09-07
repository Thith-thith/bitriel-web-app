import { Layout } from 'antd'
import { useEffect } from 'react'
import Sidebar from './Sidebar'
import MobileDrawer from './MobileDrawer'
import Navbar from './Navbar'

const { Footer, Content } = Layout

export default function LayoutComponent({ children }) {
  useEffect(() => {
    async function switchChain() {
      try {
        if (!window.ethereum) return
        await window.ethereum.request({
          method: 'wallet_switchEthereumChain',
          // chainId must be in hexadecimal numbers
          params: [{ chainId: '0x61' }],
        })
      } catch (error) {
        console.log('Error on switching network:', error)
      }
    }
    switchChain()
  }, [])

  return (
    <Layout hasSider>
      <Sidebar />
      <Layout>
        <MobileDrawer />
        <Content>
          <div className="wrapper">
            <div className="wrapper-sub-background">
              <Navbar />
              <div className="container">{children}</div>
            </div>
            <Footer style={{ background: '#fff' }}>
              <center>
                <p>
                  Build with &#10084;&#65039; <b>SELENDRA</b>
                </p>
              </center>
            </Footer>
          </div>
        </Content>
      </Layout>
    </Layout>
  )
}
