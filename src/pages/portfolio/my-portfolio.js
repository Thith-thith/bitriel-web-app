import React from 'react'
import { Row, Col, Divider } from 'antd'
import { Card } from 'globalComponents'
import wallet from '../../assets/icons/wallet.svg'
import sel from '../../assets/SEL-coin-transparent.png'
import Assets from '../../components/MyPortfolio/assets'
import staking from '../../assets/icons/staking.svg'
import WalletGraph from '../../components/MyPortfolio/WalletGraph'
import { CryptoAvatar } from '../../globalComponents'

const MyPortfolio = ({ inVisible, onVisible, visible }) => {
  return (
    <>
      <Row gutter={[16, 16]}>
        <Col xs={24} sm={24} md={12} lg={12} xl={12} xxl={12}>
          <Row gutter={[16, 16]}>
            <Col span={24}>
              <Card.Auto>
                <Row gutter={[24, 24]}>
                  <Col span={8}>
                    <img
                      src={wallet}
                      alt=""
                      height={70}
                      className="my-portfolio"
                    />
                  </Col>
                  <Col span={14}>
                    {visible ? (
                      <>
                        <h4>My Portfolio</h4>
                        <h1 className="portfolio-money">$ 24000.00</h1>
                        <p className="portfolio-equalto">≈ 1.000111 BTC</p>
                      </>
                    ) : (
                      <>
                        <h4>My Portfolio</h4>
                        <h1 className="portfolio-money">*******</h1>
                        <p className="portfolio-equalto">*********</p>
                      </>
                    )}
                  </Col>
                  <img src={sel} alt="" className="portfolio-sel-transparent" />
                  <div>
                    {visible ? (
                      <i
                        onClick={inVisible}
                        className="ri-eye-fill portfolio-visible-wallet"
                      ></i>
                    ) : (
                      <i
                        onClick={onVisible}
                        class="ri-eye-off-fill portfolio-visible-wallet"
                      ></i>
                    )}
                  </div>
                </Row>
              </Card.Auto>
            </Col>
            <Col span={24}>
              <Card.Auto>
                {visible ? (
                  <>
                    <div className="portfolio-staking">
                      <h3>Staking</h3>
                      <img src={staking} heigh={20} alt="" />
                    </div>
                    <div className="portfolio-staking-token">
                      <div>
                        <CryptoAvatar addrees="seXPXpZ2gRzTwduXWHngtT8F2X9azCwKDoLphmTY73aTwPfuU" />
                        <span className="portfolio-validator-name">BETA</span>
                      </div>
                      <p>Validator</p>
                    </div>
                    <div className="portfolio-staking-token">
                      <p>
                        <strong>350.00%</strong>
                      </p>
                      <p>APR</p>
                    </div>
                    <div className="portfolio-staking-token">
                      <p>
                        <strong>12000.0023</strong>
                      </p>
                      <p>Locked SEL</p>
                    </div>
                    <div className="portfolio-staking-token">
                      <p>
                        <strong>350.0001</strong>
                      </p>
                      <p>Cumulative Interest</p>
                    </div>
                    <Divider />
                    <div className="portfolio-staking-token">
                      <p className="portfolio-overall">
                        <strong>$10.01</strong>
                      </p>
                      <p className="portfolio-overall">Overall</p>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="portfolio-staking">
                      <h3>Staking</h3>
                      <img src={staking} heigh={20} alt="" />
                    </div>
                    <div className="portfolio-staking-token">
                      <div>
                        <CryptoAvatar addrees="seXPXpZ2gRzTwduXWHngtT8F2X9azCwKDoLphmTY73aTwPfuU" />
                        <span className="portfolio-validator-name">BETA</span>
                      </div>
                      <p>Validator</p>
                    </div>
                    <div className="portfolio-staking-token">
                      <p>
                        <strong>**********</strong>
                      </p>
                      <p>APR</p>
                    </div>
                    <div className="portfolio-staking-token">
                      <p>
                        <strong>**********</strong>
                      </p>
                      <p>Locked SEL</p>
                    </div>
                    <div className="portfolio-staking-token">
                      <p>
                        <strong>**********</strong>
                      </p>
                      <p>Cumulative Interest</p>
                    </div>
                    <Divider />
                    <div className="portfolio-staking-token">
                      <p className="portfolio-overall">
                        <strong>**********</strong>
                      </p>
                      <p className="portfolio-overall">Overall</p>
                    </div>
                  </>
                )}
              </Card.Auto>
            </Col>
          </Row>
        </Col>
        <Col xs={24} sm={24} md={12} lg={12} xl={12} xxl={12}>
          <WalletGraph visible={visible} />
        </Col>

        <Col span={24}>
          <Assets />
        </Col>
      </Row>
    </>
  )
}

export default MyPortfolio
