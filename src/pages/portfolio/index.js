import React, { useEffect, useState } from 'react'
import { Tabs } from 'antd'
import { useNavigate } from 'react-router-dom'
import MyPortfolio from './my-portfolio'
import Receive from './receive'
import Send from './send'

const { TabPane } = Tabs

const Portfolio = () => {
  //=========state ========
  const [visible, setVisible] = useState(true)
  let navigate = useNavigate()

  const onVisible = () => {
    setVisible(true)
  }
  const inVisible = () => {
    setVisible(false)
  }

  useEffect(() => {
    navigate('/portfolio')
  }, [navigate])

  return (
    <Tabs defaultActiveKey="/overview">
      <TabPane tab="Overview" key="/overview">
        <MyPortfolio
          visible={visible}
          onVisible={onVisible}
          inVisible={inVisible}
        />
      </TabPane>
      <TabPane tab="Send" key="/send">
        <Send />
      </TabPane>
      <TabPane tab="Received" key="/recieved">
        <Receive />
      </TabPane>
    </Tabs>
  )
}

export default Portfolio
