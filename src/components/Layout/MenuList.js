import { Col, Menu, Row } from 'antd'
import { Link, useLocation } from 'react-router-dom'
import { routes } from '../../routes'
import docs from 'assets/sidebar-icons/docs.svg'
import setting from 'assets/sidebar-icons/setting.svg'
import { useTheme } from 'next-themes'

const buttomMenus = [
  {
    icon: docs,
    name: 'Docs',
    path: 'https://docs.selendra.org/',
    disable: false,
    external: true,
  },
  // {
  //   icon: about,
  //   name: 'About',
  //   path: 'https://www.selendra.org/about',
  //   disable: false,
  //   external: true,
  // },
  {
    icon: setting,
    name: 'Settings',
    path: '/settings',
    disable: false,
    external: false,
  },
]

export default function MenuList() {
  const { theme, setTheme } = useTheme()
  const location = useLocation()
  const active = (path) => path === location.pathname

  const sidebarTop = routes.map((i) => {
    if (!i.name) return null
    return {
      key: i.path,
      icon: (
        <img
          className="sidebar-itemIcon"
          style={active(i.path) ? { filter: 'grayscale(0%)' } : {}}
          src={i.icon}
          alt=""
          width={32}
          height={32}
        />
      ),
      label: (
        <Link to={i.path}>
          <p
            className={`sidebar-itemTitle ${
              active(i.path) && 'sidebar-itemActive'
            }`}
          >
            {i.name}
          </p>
        </Link>
      ),
    }
  })

  const sidebarBottom = buttomMenus.map((i) => {
    return {
      key: i.path,
      icon: (
        <img
          className="sidebar-itemIcon"
          style={active(i.path) ? { filter: 'grayscale(0%)' } : {}}
          src={i.icon}
          alt=""
          width={40}
          height={40}
        />
      ),
      label: i.external ? (
        <a href={i.path} target="_blank" rel="noreferrer">
          <p
            className={`sidebar-itemTitle ${
              active(i.path) && 'sidebar-itemActive'
            }`}
          >
            {i.name}
          </p>
        </a>
      ) : (
        <Link to={i.path}>
          <p
            className={`sidebar-itemTitle ${
              active(i.path) && 'sidebar-itemActive'
            }`}
          >
            {i.name}
          </p>
        </Link>
      ),
    }
  })

  return (
    <div>
      <Menu
        className="sidebar-menu sidebar-top"
        mode="inline"
        selectedKeys={[location.pathname]}
        items={sidebarTop}
      />

      <Menu
        className="sidebar-menu"
        mode="inline"
        selectedKeys={[location.pathname]}
        items={sidebarBottom}
      />
      <Row gutter={[6, 0]} justify="center" className="about-container">
        <Col xs={12} sm={12} md={20} lg={20} xl={20} xxl={20} className="about">
          <center>
            <a
              target="_blank"
              rel="noreferrer"
              href="https://github.com/selendra"
            >
              <i className="ri-github-fill github-icon"></i>
              <span className="github">Github</span>
            </a>
          </center>
        </Col>
        <Col xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
          {theme === 'light' ? (
            <i
              onClick={() => setTheme('dark')}
              className="ri-moon-fill dark-mode"
            ></i>
          ) : (
            <i
              onClick={() => setTheme('light')}
              className="ri-sun-fill dark-mode"
            ></i>
          )}
        </Col>
      </Row>
    </div>
  )
}
