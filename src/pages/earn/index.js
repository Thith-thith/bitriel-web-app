import React from 'react'
import { Tabs } from 'antd'
import { Staking } from '../../components/Earn/staking'
import { Pools } from '../../components/Earn/pool'
import { Validators } from '../../components/Earn/validators'

const { TabPane } = Tabs

export default function Earn() {
  const onChange = (key) => {
    console.log(key)
  }

  return (
    <>
      <Tabs defaultActiveKey="Stake" onChange={onChange}>
        <TabPane tab="Stake" key="Stake">
          <Staking />
        </TabPane>
        <TabPane tab="Pool" key="Pool">
          <Pools />
        </TabPane>
        <TabPane tab="Validators" key="Validators">
          <Validators />
        </TabPane>
      </Tabs>
    </>
  )
}
