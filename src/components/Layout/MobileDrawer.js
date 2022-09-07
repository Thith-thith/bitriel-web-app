import { useState } from 'react'
import { useTheme } from 'next-themes'
import { Col, Drawer, Row } from 'antd'
import MenuList from './MenuList'
import logo from 'assets/bitriel.png'
import menu from 'assets/menu.svg'
import menuWhite from 'assets/menu-white.svg'
import { Link } from 'react-router-dom'

export default function MobileDrawer() {
  const { theme } = useTheme()

  const [visible, setVisible] = useState(false)

  const showDrawer = () => {
    setVisible(true)
  }
  const onClose = () => {
    setVisible(false)
  }

  return (
    <div>
      <Row justify="space-between" className="mobile-drawer-header">
        <Col xs={12} sm={12} md={12} lg={0} xl={0}>
          <Link to="/home">
            <img alt="" src={logo} height={30} />
          </Link>
        </Col>
        <Col xs={2} sm={2} md={3} lg={0} xl={0}>
          <img
            alt=""
            src={theme === 'light' ? menu : menuWhite}
            width={32}
            height={32}
            onClick={showDrawer}
          />
        </Col>
      </Row>
      <Drawer
        width="280"
        className="mobile-drawer"
        placement="right"
        closable={false}
        onClose={onClose}
        visible={visible}
        bodyStyle={
          theme === 'light'
            ? { background: 'rgba(255, 255, 255, 0.822)' }
            : {
                background:
                  ' linear-gradient(229.92deg, #192e3c 1.72%, #003f69 77.82%)',
              }
        }
      >
        <div style={{ padding: '24px' }}>
          <img src={logo} alt="selendra-logo" width="50%" />
        </div>
        <MenuList />
      </Drawer>
    </div>
  )
}
