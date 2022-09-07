import { Spin } from 'antd'
import { ethers } from 'ethers'
import { Card } from 'globalComponents'
import { useContext, useEffect, useState } from 'react'
import { AccountContext } from '../../context/AccountContext'
import { useAccounts } from '../../hooks/useAccounts'
import { tokens } from '../../constants/tokenContract'
import TokenBalance from '../TokenBalance'
import busd from '../../assets/tokens/busd.png'
import usdt from '../../assets/tokens/usdt.png'
import dai from '../../assets/tokens/dai.png'
import eth from '../../assets/tokens/eth.png'
import bnb from '../../assets/tokens/bnb.png'

const Assets = () => {
  const { allAccounts } = useAccounts()
  const { account: accountContext } = useContext(AccountContext)
  const [account, setAccount] = useState(accountContext)
  const [, setKeyringOptions] = useState([])
  const [balance, setBalance] = useState([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    setAccount(accountContext)
  }, [accountContext])

  useEffect(() => {
    // Get the list of accounts
    const keyringOptions = allAccounts.map((account) => ({
      key: account,
      value: account,
      icon: 'user',
    }))

    setKeyringOptions(keyringOptions)
  }, [allAccounts])

  useEffect(() => {
    if (!account) return
    async function getBalance() {
      const tokenABI = ['function balanceOf(address) view returns (uint)']
      const provider = ethers.getDefaultProvider(
        'https://data-seed-prebsc-1-s1.binance.org:8545/',
      )
      setLoading(true)
      await Promise.all(
        tokens.map(
          (i) => new ethers.Contract(i.tokenAddress, tokenABI, provider),
        ),
      )
        .then(async ([BUSD, DAI, USDT, ETH]) => {
          await Promise.all([
            BUSD.balanceOf(account),
            DAI.balanceOf(account),
            USDT.balanceOf(account),
            ETH.balanceOf(account),
            provider.getBalance(account),
          ]).then(([BUSD, DAI, USDT, ETH, BNB]) => {
            const data = [
              { title: 'BUSD', value: BUSD._hex, icon: busd },
              { title: 'DAI', value: DAI._hex, icon: dai },
              { title: 'USDT', value: USDT._hex, icon: usdt },
              { title: 'ETH', value: ETH._hex, icon: eth },
              { title: 'BNB', value: BNB._hex, icon: bnb },
            ]
            setBalance(data)
            setLoading(false)
          })
        })
        .catch(() => {
          setLoading(false)
        })
    }
    getBalance()
  }, [account])

  return (
    <>
      <div className="profile-desc">
        <Card style={{ borderRadius: '8px' }}>
          <p className="home-title">Assets</p>
          {account ? (
            <div>
              {loading ? (
                <center>
                  <Spin />
                </center>
              ) : (
                <center>
                  {balance.map((i, key) => (
                    <TokenBalance
                      image={i.icon}
                      TokenName={i.title}
                      balance={i.value}
                      loading={loading}
                      key={key}
                    />
                  ))}
                </center>
              )}
            </div>
          ) : (
            <p>You're not connect to your evm wallet.</p>
          )}
        </Card>
      </div>
    </>
  )
}

export default Assets
