import React from 'react'
import { Row, Col } from 'antd'
import { Card } from '../../globalComponents'
import data from './data/launchpad.json'

export const Launchpad = () => {
  return (
    <>
      <Row gutter={[16, 16]}>
        {data.map((launchpad) => (
          <Col span={12}>
            <Card.Blog link={`/launchpad/${launchpad.name}`}>
              <div className="card-background-launchpad">
                <img
                  src={launchpad.background}
                  alt=""
                  className="background-launchpad-img"
                />
              </div>
              <div className="launchpad-logo-container">
                <img alt="" src={launchpad.logo} className="launchpad-logo" />
              </div>
              <center>
                <h1>{launchpad.name}</h1>
                <p className="launchpad-bio">{launchpad.token}</p>
              </center>
              <p className="launchpad-desc">{launchpad.desc}</p>
              <div className="launchpad-desc-container">
                <Row justify="space-between">
                  <Col>
                    <p>Funraise Goal</p>
                  </Col>
                  <Col>
                    <p>{launchpad.fun_rasing}</p>
                  </Col>
                </Row>
                <Row justify="space-between">
                  <Col>
                    <p>Participants</p>
                  </Col>
                  <Col>
                    <p>{launchpad.participants}</p>
                  </Col>
                </Row>
              </div>
            </Card.Blog>
            <div className="cards-footer">
              <h5>{launchpad.type.toUpperCase()}</h5>
            </div>
          </Col>
        ))}
      </Row>
    </>
  )
}
