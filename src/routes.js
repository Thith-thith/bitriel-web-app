import Index from './pages'
import Earn from './pages/earn'
import Staking from './pages/earns/staking'
import SetupStaking from './pages/earns/staking/setupStaking'
// import Payout from './pages/earn/staking/payout'
import Home from './pages/home'
import Receive from './pages/portfolio/receive'
import Send from './pages/portfolio/send'
import NotFound from './pages/notfound'
import Setting from './pages/settings'
import Connect from './pages/connect'
import Sidebar from './components/Layout'
import PageRouteAnimation from './components/Animations/PageRoute'
import wallet from './assets/sidebar-icons/wallet.svg'
import home from './assets/sidebar-icons/home.svg'
import transfer from './assets/sidebar-icons/transfer.svg'
import earn from './assets/sidebar-icons/earn.svg'
import launchpad from './assets/sidebar-icons/launchpad.svg'
import Portfolio from './pages/portfolio'
import Swap from './pages/swap'
import { Launchpad } from './pages/launchpad'
import { SinglePage } from './pages/launchpad/launchpad-singlepage'

const routes = [
  {
    path: '/',
    element: <Index />,
  },
  {
    path: '/home',
    name: 'Home',
    icon: home,
    element: (
      <Sidebar>
        <PageRouteAnimation myKey="home">
          <Home />
        </PageRouteAnimation>
      </Sidebar>
    ),
  },
  {
    path: '/portfolio',
    name: 'Portfolio',
    icon: wallet,
    element: (
      <Sidebar>
        <PageRouteAnimation myKey="/portfolio">
          <Portfolio />
        </PageRouteAnimation>
      </Sidebar>
    ),
  },
  // {
  //   path: '/portfolio/transfer/send',
  //   element: (
  //     <Sidebar>
  //       <PageRouteAnimation myKey="/portfolio/transfer/send">
  //         <Send />
  //       </PageRouteAnimation>
  //     </Sidebar>
  //   ),
  // },
  // {
  //   path: '/portfolio/transfer/received',
  //   element: (
  //     <Sidebar>
  //       <PageRouteAnimation myKey="portfolio/transfer/received">
  //         <Send />
  //       </PageRouteAnimation>
  //     </Sidebar>
  //   ),
  // },

  // {
  //   path: 'wallet/send',
  //   element: (
  //     <Sidebar>
  //       <PageRouteAnimation myKey="wallet/send">
  //         <Send />
  //       </PageRouteAnimation>
  //     </Sidebar>
  //   ),
  // },
  {
    path: '/swap',
    name: 'Swap',
    icon: transfer,
    element: (
      <Sidebar>
        <PageRouteAnimation myKey="swap">
          <Swap />
        </PageRouteAnimation>
      </Sidebar>
    ),
  },
  {
    path: '/swap/liquidity/add',
    element: (
      <Sidebar>
        <PageRouteAnimation myKey="swap/liquidity/add">
          <Home />
        </PageRouteAnimation>
      </Sidebar>
    ),
  },
  {
    path: '/swap/liquidity/withdraw',
    element: (
      <Sidebar>
        <PageRouteAnimation myKey="swap/liquidity/withdraw">
          <Home />
        </PageRouteAnimation>
      </Sidebar>
    ),
  },
  {
    path: '/wallet/send',
    element: (
      <Sidebar>
        <PageRouteAnimation myKey="wallet/send">
          <Send />
        </PageRouteAnimation>
      </Sidebar>
    ),
  },
  {
    path: 'wallet/receive',
    element: (
      <Sidebar>
        <PageRouteAnimation myKey="wallet/receive">
          <Receive />
        </PageRouteAnimation>
      </Sidebar>
    ),
  },
  {
    path: '/earn',
    name: 'Earn',
    icon: earn,
    element: (
      <Sidebar>
        <PageRouteAnimation myKey="earn">
          <Earn />
        </PageRouteAnimation>
      </Sidebar>
    ),
  },
  // {
  //   path: '/earns',
  //   name: 'Earns',
  //   icon: earn,
  //   element: (
  //     <Sidebar>
  //       <PageRouteAnimation myKey="earns">
  //         <Staking />
  //       </PageRouteAnimation>
  //     </Sidebar>
  //   ),
  // },
  // {
  //   path: 'earn/pool',
  //   element: (
  //     <Sidebar>
  //       <PageRouteAnimation myKey="earn/pool">
  //         <Payout />
  //       </PageRouteAnimation>
  //     </Sidebar>
  //   ),
  // },
  {
    path: '/earn/staking/setup/:id',
    element: (
      <Sidebar>
        <PageRouteAnimation myKey="/earn/staking/setup/:id">
          <SetupStaking />
        </PageRouteAnimation>
      </Sidebar>
    ),
  },
  {
    path: '/launchpad',
    name: 'Launchpad',
    icon: launchpad,
    element: (
      <Sidebar>
        <Launchpad />
      </Sidebar>
    ),
  },
  {
    path: '/launchpad/:name',
    element: (
      <Sidebar>
        <PageRouteAnimation myKey="about">
          <SinglePage />
        </PageRouteAnimation>
      </Sidebar>
    ),
  },
  {
    path: 'settings',
    element: (
      <Sidebar>
        <PageRouteAnimation myKey="settngs">
          <Setting />
        </PageRouteAnimation>
      </Sidebar>
    ),
  },
  {
    path: 'connect',
    element: (
      <Sidebar>
        <PageRouteAnimation myKey="about">
          <Connect />
        </PageRouteAnimation>
      </Sidebar>
    ),
  },
  {
    path: '*',
    element: (
      <Sidebar>
        <NotFound />
      </Sidebar>
    ),
  },
]

export { routes }
