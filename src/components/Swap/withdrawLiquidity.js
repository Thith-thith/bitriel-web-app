import React, { useState } from 'react'
import { Select, Form, Row, Col, Slider } from 'antd'
import { Card, Button, Input } from '../../globalComponents'
import usdtSel from '../../assets/tokens/usdt-sel.png'
import busdSel from '../../assets/tokens/busd-sel.png'
import daiSel from '../../assets/tokens/dai-sel.png'

const { Option } = Select

export const WithdrawLiquidtidy = () => {
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
      total: '120000',
      staked: '3000',
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
      total: '120000',
      staked: '3000',
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
      total: '120000',
      staked: '3000',
      exchange: '1 DAI ~ 0.03 SEL',
      first_pool: '200 DAI',
      second_pool: '2000000.00201 SEL',
      fee: '1.00222 SEL',
    },
  ]

  function handleChange(value) {
    setLiquidity(`${value}`)
    setFilter(pair.filter((data) => data.title === value))
  }

  const label = liquidity.split(' ')

  const CardInfoHeader = () => (
    <Card.Auto reverse>
      <Row gutter={[12, 12]} justify="space-around">
        <Col span={8}>
          <center>
            <p>Total Liquidity Tokens</p>
            <h3>0</h3>
          </center>
        </Col>
        <Col span={8}>
          <center>
            <p>Staked</p>
            <h3>0</h3>
          </center>
        </Col>
        <Col span={8}>
          <center>
            <p>Fee</p>
            <h3>0</h3>
          </center>
        </Col>
      </Row>
    </Card.Auto>
  )

  const CardInfoOutro = () => (
    <>
      {filter.map((data) => (
        <>
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
        </>
      ))}
    </>
  )

  return (
    <>
      <div className="liquidity-container">
        <Card>
          <div className="swap-form-container">
            <h1>Withdraw Liquidity</h1>
            <p>Remove liquidity from a pool.</p>
            <br />
            <CardInfoHeader />
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
                      <img src={data.icon} alt="" height={25} />
                      <span>{data.title}</span>
                    </Option>
                  ))}
                </Select>
              </Form.Item>
              {liquidity ? (
                <>
                  <Form.Item label={label[0]} name="first_amount">
                    <Input.Number min={0} medium no_afterfix />
                  </Form.Item>
                  <Form.Item label={label[2]} name="second_amount">
                    <Input.Number min={0} medium no_afterfix />
                  </Form.Item>
                </>
              ) : (
                ''
              )}

              <Form.Item>{filter !== null ? <CardInfoOutro /> : ''}</Form.Item>
              <br />
              <Form.Item>
                <Button.Primary block medium>
                  Withdraw
                </Button.Primary>
              </Form.Item>
            </Form>
          </div>
        </Card>
      </div>
    </>
  )
}
