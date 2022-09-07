import React, { useState } from 'react'
import { useParams } from 'react-router-dom'
import { Row, Col, Tabs, Anchor } from 'antd'
import data from './data/launchpad.json'
import { Card } from '../../globalComponents'
import back from '../../../public/assets/background/back.jpg'
import sel from '../../assets/sel-icon.svg'
import NotFound from '../notfound'

const { TabPane } = Tabs
const { Link } = Anchor

export const SinglePage = () => {
  const { name } = useParams()
  const [arr] = useState(data.filter((item) => item.name === name))

  const onChange = (link) => {
    console.log('Anchor:OnChange', link)
  }

  return (
    <>
      <Row gutter={[16, 16]}>
        <Col>
          <img alt="" src={sel} className="launchpad-logo" />
        </Col>
        <Col>
          <h2>
            <strong>{name}</strong>
          </h2>
          <p className="launchpad-bio">pi-token</p>
        </Col>
      </Row>
      <br />
      <Row gutter={[16, 16]}>
        <Col span={16}>
          <img src={back} alt="" className="launchpad-banner" />
        </Col>
        <Col span={8}>
          <Card>
            <p className="raise-goal">Funraise Goal</p>
            <h1 className="portfolio-money">$100000000</h1>
            <br />
            <Row justify="space-between">
              <Col>
                <p>Max Allocation</p>
              </Col>
              <Col>
                <p>
                  <strong>$1000</strong>
                </p>
              </Col>
            </Row>
            <Row justify="space-between">
              <Col>
                <p>Price per token</p>
              </Col>
              <Col>
                <p>
                  <strong>$10</strong>
                </p>
              </Col>
            </Row>
          </Card>
          <div className="cards-footer2">
            <h5>Token sale</h5>
          </div>
        </Col>
      </Row>
      <br />
      <Tabs defaultActiveKey="Descriptions">
        <TabPane tab="Descriptions" key="Descriptions">
          <Row gutter={[12, 12]}>
            <Col span={20}>
              <div className="launchpad-desc-container2">
                <ul>
                  <li>
                    Unreal Engine 5 provides stunning photo-realistic graphics
                    and boundless opportunities for interoperability with other
                    metaverses.
                  </li>
                  <li>
                    Collaboration with world-renowned urban city planners
                    responsible for designing parts of real-world major cities.
                  </li>
                  <li>
                    Cinematic artists recruited from world-class VFX and game
                    studios.
                  </li>
                  <li>
                    LAND alteration feature enables flexible control of digital
                    real estate, unlocking customization through LAND Sharing
                    and Compilation.
                  </li>
                  <li>
                    Flexible building tools invite users of all skill levels to
                    enjoy seamless and intuitive creation experiences.
                  </li>
                  <li>
                    Immersive social engagement layers include the Prana system
                    and collaborative LAND clearing incentives.
                  </li>
                  <li>
                    Curated PvP Dome unlocks social viewing experiences and
                    win2earn opportunities for participants.
                  </li>
                </ul>
              </div>
            </Col>
            <Col span={4}>
              <Anchor affix={false} onChange={onChange}>
                <Link href="#components-anchor-demo-basic" title="Basic demo" />
                <Link
                  href="#components-anchor-demo-static"
                  title="Static demo"
                />
                <Link href="#API" title="API">
                  <Link href="#Anchor-Props" title="Anchor Props" />
                  <Link href="#Link-Props" title="Link Props" />
                </Link>
              </Anchor>
            </Col>
          </Row>
        </TabPane>
        <TabPane tab="Backers" key="backers">
          <NotFound />
        </TabPane>
        <TabPane tab="Contract" key="contract">
          <NotFound />
        </TabPane>
      </Tabs>
    </>
  )
}
