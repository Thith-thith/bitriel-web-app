import React, { useState } from 'react'
import {
  Tabs,
  Form,
  Select,
  Space,
  Slider,
  Row,
  Col,
  Collapse,
  Divider,
} from 'antd'
import { Card } from '../../globalComponents'
import swap from '../../assets/sidebar-icons/transfer.svg'
import { Button, Input } from '../../globalComponents'
import busd from '../../assets/tokens/busd.png'
import usdt from '../../assets/tokens/usdt.png'
import dai from '../../assets/tokens/dai.png'
import eth from '../../assets/tokens/eth.png'
import bnb from '../../assets/tokens/bnb.png'
import sel from '../../assets/tokens/sel.png'
import btc from '../../assets/tokens/btc.png'
import { Liquidity } from '../../components/Swap/index'
import { CaretRightOutlined } from '@ant-design/icons'

const { TabPane } = Tabs
const { Option } = Select
const { Panel } = Collapse

const Swap = () => {
  const formatter = (value) => `${value}%`
  const [state, setState] = useState({
    payee: '',
    recieved: '',
  })

  // ----sample of tokens ----
  const tokens = [
    { title: 'SEL', value: '12000', icon: sel },
    { title: 'BUSD', value: '1000', icon: busd },
    { title: 'DAI', value: '200', icon: dai },
    { title: 'USDT', value: '2000', icon: usdt },
    { title: 'ETH', value: '8000', icon: eth },
    { title: 'BNB', value: '3000', icon: bnb },
    { title: 'BTC', value: '3000', icon: btc },
  ]

  const arrRecieved = tokens.filter((data) => data.title !== state.payee)

  const handlePayWith = (value) => {
    setState({ ...state, payee: `${value}` })
  }

  const handleRecieved = (value) => {
    setState({ ...state, recieved: `${value}` })
  }

  const handleSwapToken = () => {
    setState({ payee: `${state.recieved}`, recieved: `${state.payee}` })
  }

  const payWith = (
    <Select
      style={{
        width: 110,
      }}
      // defaultValue={tokens[0].title}
      value={state.payee}
      onChange={handlePayWith}
    >
      {tokens.map((data) => (
        <Option value={data.title}>
          <Space>
            <div>
              <img src={data.icon} alt="" height={30} />
            </div>
            <div> {data.title}</div>
          </Space>
        </Option>
      ))}
    </Select>
  )

  const receivedWith = (
    <Select
      style={{
        width: 110,
      }}
      // defaultValue={tokens[1].title}
      value={state.recieved}
      onChange={handleRecieved}
    >
      {arrRecieved.map((data) => (
        <Option value={data.title}>
          <Space>
            <div>
              <img src={data.icon} alt="" height={30} />
            </div>
            <div> {data.title}</div>
          </Space>
        </Option>
      ))}
    </Select>
  )

  return (
    <Tabs defaultActiveKey="1">
      <TabPane tab="Swap" key="/swap">
        <Card>
          <div className="swap-form-container">
            <Form layout="vertical">
              <Form.Item>
                <Row gutter={[12, 12]}>
                  <Col span={10}>
                    <Form.Item
                      name="pay"
                      label="Pay with"
                      rules={[
                        {
                          required: true,
                          message: 'Fill the amount!',
                        },
                      ]}
                    >
                      <Input.Number
                        medium
                        addonAfter={payWith}
                        defaultValue={0}
                        min={0}
                      />
                    </Form.Item>
                  </Col>
                  <Col span={4}>
                    <Form.Item onClick={handleSwapToken}>
                      <center>
                        <img src={swap} alt="" className="swap-icon" />
                      </center>
                    </Form.Item>
                  </Col>
                  <Col span={10}>
                    <Form.Item
                      name="received"
                      label="Recieved"
                      rules={[
                        {
                          required: true,
                          message: 'Fill the amount!',
                        },
                      ]}
                    >
                      <Input.Number
                        medium
                        addonAfter={receivedWith}
                        defaultValue={0}
                        min={0}
                        disabled
                      />
                    </Form.Item>
                  </Col>
                </Row>
              </Form.Item>
              {/* <Form.Item>
                <p>Balnace: 12000 SEL</p>
                <Slider
                  className="token-slider-amount"
                  // value={(decimal * 100) / balance}
                  tipFormatter={formatter}
                  // onChange={slidToNumber}
                  marks={{
                    0: '0',
                    25: '25%',
                    50: '50%',
                    75: '75%',
                    100: {
                      style: {
                        color: '#f50',
                      },
                      label: <strong>MAX</strong>,
                    },
                  }}
                />
              </Form.Item> */}
              <Form.Item className="swap-token-details">
                <p className="swap-rates">1 SEL ~ 0.00301 BUSD</p>
                <Collapse
                  bordered={false}
                  expandIcon={({ isActive }) => (
                    <>
                      <span>{isActive ? 'Hide' : 'Details'} &nbsp;</span>
                      <CaretRightOutlined rotate={isActive ? 270 : 90} />
                    </>
                  )}
                  className="site-collapse-custom-collapse"
                >
                  <Panel key="1" className="site-collapse-custom-panel">
                    <Card.Auto reverse>
                      <Row justify="space-between">
                        <Col>
                          <p>Expected Output</p>
                        </Col>
                        <Col>
                          <h4>1000 {state.recieved}</h4>
                        </Col>
                      </Row>
                      <Row justify="space-between">
                        <Col>
                          <p>Price Impact</p>
                        </Col>
                        <Col>
                          <h4>0.00%</h4>
                        </Col>
                      </Row>
                      <Divider />
                      <Row justify="space-between">
                        <Col>
                          <p>Minimum received after slippage (0.50%)</p>
                        </Col>
                        <Col>
                          <h4>989 {state.recieved}</h4>
                        </Col>
                      </Row>
                      <Row justify="space-between">
                        <Col>
                          <p>Fee</p>
                        </Col>
                        <Col>
                          <h4>~$1.21</h4>
                        </Col>
                      </Row>
                    </Card.Auto>
                  </Panel>
                </Collapse>
              </Form.Item>
              <Form.Item>
                <Button.Primary block medium>
                  SWAP
                </Button.Primary>
              </Form.Item>
            </Form>
          </div>
        </Card>
      </TabPane>
      <TabPane tab="Liquidity" key="/liquidity">
        <Liquidity />
      </TabPane>
    </Tabs>
  )
}

export default Swap
