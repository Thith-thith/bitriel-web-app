import React, { useState } from 'react'
import { Segmented } from 'antd'
import { AddLiquidity } from './addLiquidity'
import { WithdrawLiquidtidy } from './withdrawLiquidity'

export const Liquidity = () => {
  const [value, setValue] = useState('Add Liquidity')
  return (
    <>
      <Segmented
        options={['Add Liquidity', 'Withdraw']}
        value={value}
        onChange={setValue}
      />
      {value === 'Add Liquidity' ? <AddLiquidity /> : <WithdrawLiquidtidy />}
    </>
  )
}
