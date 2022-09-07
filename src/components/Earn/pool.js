import React from 'react'
import { Row, Col } from 'antd'
import { Card, Button } from '../../globalComponents'
import sel from '../../assets/sel-icon.svg'
import pools from './data/pools.json'

export const Pools = () => {
  return (
    <>
      <Row gutter={[16, 16]}>
        <Col span={24}>
          <Card.Auto>
            <h1>Overview</h1>
            <br />
            <div className="staking-overview">
              <Row gutter={[12, 12]}>
                <Col>
                  <img src={sel} alt="" height={90} />
                </Col>
                <Col>
                  <p>Available to Stake</p>
                  <h1 className="portfolio-money">24000.00 SEL</h1>
                  <p className="portfolio-equalto">≈ 1.000111 BTC</p>
                </Col>
              </Row>
              <Row gutter={[12, 12]}>
                <Col>
                  <img src={sel} alt="" height={90} />
                </Col>
                <Col>
                  <p>Total Locked</p>
                  <h1 className="portfolio-money">124000.00 SEL</h1>
                  <p className="portfolio-equalto">≈ 2.000111 BTC</p>
                </Col>
              </Row>
            </div>
          </Card.Auto>
        </Col>
        <Col span={24}>
          <Row gutter={[16, 16]}>
            {pools.map((data, index) => {
              const {
                pool_name,
                state,
                point,
                is_joined,
                claimable,
                nominees,
                members,
              } = data

              return (
                <>
                  <Col xs={24} sm={24} md={12} lg={12} xl={12} xxl={12}>
                    <Card key={index}>
                      <div className="portfolio-staking-token">
                        <div>
                          {/* <CryptoAvatar addrees={validator_address} /> */}
                          <span className="portfolio-validator-name">
                            {pool_name}
                          </span>
                        </div>
                        {is_joined ? (
                          <div className="is-staking-container">
                            <i className="ri-auction-fill is-staking"></i>
                          </div>
                        ) : (
                          ''
                        )}
                      </div>
                      <br />
                      <Card.Auto reverse>
                        <Row justify="space-between">
                          <Col>
                            <p>State</p>
                          </Col>
                          <Col>
                            <h4>{state ? 'Open' : 'Closed'}</h4>
                          </Col>
                        </Row>
                        <Row justify="space-between">
                          <Col>
                            <p>Point</p>
                          </Col>
                          <Col>
                            <h4>{point}</h4>
                          </Col>
                        </Row>
                      </Card.Auto>
                      <br />
                      <Card.Auto reverse>
                        <Row justify="space-between">
                          <Col>
                            <p>Claimable</p>
                          </Col>
                          <Col>
                            <h4>{claimable}</h4>
                          </Col>
                        </Row>
                        <Row justify="space-between">
                          <Col>
                            <p>Nominees</p>
                          </Col>
                          <Col>
                            <h4>{nominees}</h4>
                          </Col>
                        </Row>
                        <Row justify="space-between">
                          <Col>
                            <p>Members</p>
                          </Col>
                          <Col>
                            <h4>{members}</h4>
                          </Col>
                        </Row>
                      </Card.Auto>
                      <br />
                      {is_joined ? (
                        <Button.Primary block medium>
                          Stop
                        </Button.Primary>
                      ) : (
                        <Button.Primary block medium>
                          Join
                        </Button.Primary>
                      )}
                    </Card>
                  </Col>
                </>
              )
            })}
          </Row>
        </Col>
      </Row>
    </>
  )
}
