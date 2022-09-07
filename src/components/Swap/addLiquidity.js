import React, { useState } from 'react'
import { Form, Select, Slider, Row, Col } from 'antd'
import { Card, Button, Input } from '../../globalComponents'
import usdtSel from '../../assets/tokens/usdt-sel.png'
import busdSel from '../../assets/tokens/busd-sel.png'
import daiSel from '../../assets/tokens/dai-sel.png'

const { Option } = Select

export const AddLiquidity = () => {
  const [liquidity, setLiquidity] = useState('')
  const [filter, setFilter] = useState([])

  const formatter = (value) => `${value}%`

  // ===pair liquidity tokens

  const pair = [
    {
      title: 'USDT - SEL',
      first_symble: 'USDT',
      second__symble: 'SEL',
      icon: usdtSel,
      received: '1.20 USDT-SEL',
      exchange: '1 USDT ~ 0.03 SEL',
      first_pool: '200 USDT',
      second_pool: '2000000.00201 SEL',
      fee: '1.00222 SEL',
    },
    {
      title: 'BUSD - SEL',
      first_symble: 'BUSD',
      second__symble: 'SEL',
      icon: busdSel,
      received: '1.20 BUSD-SEL',
      exchange: '1 BUSD ~ 0.03 SEL',
      first_pool: '200 BUSD',
      second_pool: '2000000.00201 SEL',
      fee: '1.00222 SEL',
    },
    {
      title: 'DAI - SEL',
      first_symble: 'DAI',
      second__symble: 'SEL',
      icon: daiSel,
      received: '1.20 DAI-SEL',
      exchange: '1 DAI ~ 0.03 SEL',
      first_pool: '200 DAI',
      second_pool: '2000000.00201 SEL',
      fee: '1.00222 SEL',
    },
  ]

  const handleChange = (value) => {
    setLiquidity(`${value}`)
    setFilter(pair.filter((data) => data.title === value))
  }

  return (
    <>
      <div className="liquidity-container">
        <Card>
          <div className="swap-form-container">
            <h1>Add Liquidity</h1>
            <p>Add liquidity to a pool and get the tokens of the pair.</p>
            <br />
            <Form layout="vertical">
              <Form.Item label="Select pair">
                <Select
                  onChange={handleChange}
                  className="funan-select"
                  placeholder="Select pair"
                >
                  {pair.map((data, index) => (
                    <Option value={data.title} key={index}>
                      <img src={data.icon} alt="" height={25} />{' '}
                      <span>{data.title}</span>
                    </Option>
                  ))}
                </Select>
              </Form.Item>
              {liquidity === '' || liquidity === null ? (
                ''
              ) : (
                <>
                  {filter.map((data) => (
                    <>
                      <Form.Item label={data.first_symble} name="first_pool">
                        <Input.Number min={0} medium no_afterfix />
                      </Form.Item>
                      <br />
                      <Form.Item label={data.second__symble} name="second_pool">
                        <Input.Number min={0} medium no_afterfix />
                      </Form.Item>
                      <Form.Item>
                        <Card.Auto reverse>
                          <center>
                            <h1>
                              {data.first_symble} + {data.second__symble}
                            </h1>
                          </center>
                          <br />
                          <Row gutter={[12, 12]}>
                            <Col span={24}>
                              <Row justify="space-between">
                                <Col>
                                  <p>Minimum LP Token Received</p>
                                </Col>
                                <Col>
                                  <h4>{data.received}</h4>
                                </Col>
                              </Row>
                            </Col>
                            <Col span={24}>
                              <Row justify="space-between">
                                <Col>
                                  <p>Exchange Rate</p>
                                </Col>
                                <Col>
                                  <h4>{data.exchange}</h4>
                                </Col>
                              </Row>
                            </Col>
                            <Col span={24}>
                              <Row justify="space-between">
                                <Col>
                                  <p>Current Pool Size</p>
                                </Col>
                                <Col>
                                  <h4>
                                    {data.first_pool} + {data.second_pool}
                                  </h4>
                                </Col>
                              </Row>
                            </Col>
                            <Col span={24}>
                              <Row justify="space-between">
                                <Col>
                                  <p>Fee</p>
                                </Col>
                                <Col>
                                  <h4>{data.fee}</h4>
                                </Col>
                              </Row>
                            </Col>
                          </Row>
                        </Card.Auto>
                      </Form.Item>
                      <br />
                      <Form.Item>
                        <Button.Primary block medium>
                          Add Liquidity
                        </Button.Primary>
                      </Form.Item>
                    </>
                  ))}
                </>
              )}
            </Form>
          </div>
        </Card>
      </div>
    </>
  )
}
