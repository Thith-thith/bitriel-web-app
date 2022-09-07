import { Row, Col } from 'antd'
import { Card } from 'globalComponents'
import { useContext, useEffect, useState } from 'react'
import { AccountContext } from '../context/AccountContext'
import { useAccounts } from '../hooks/useAccounts'
import Wallet from '../components/Wallet'
import AccountSelector from '../components/AccountSelector'

export default function Home() {
  const { allAccounts } = useAccounts()
  const { account: accountContext, isTrust } = useContext(AccountContext)
  const [account, setAccount] = useState(accountContext)
  const [keyringOptions, setKeyringOptions] = useState([])

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

  return (
    <div className="home-container">
      <Row gutter={[24, 24]}>
        <Col span={24}>
          <Row gutter={[16, 16]}>
            <Col xs={24} sm={25} md={12} lg={12} xl={12} xxl={12}>
              <AccountSelector keyringOptions={keyringOptions} />
            </Col>
            {!account && keyringOptions.length === 0 && (
              <Col xs={24} sm={25} md={12} lg={12} xl={12} xxl={12}>
                <Card>
                  <p>You don't have any wallet yet.</p>
                </Card>
              </Col>
            )}

            {/* Selendra wallet */}
            {keyringOptions.length > 0 &&
              keyringOptions.map((account, key) => (
                <Col xs={24} sm={25} md={12} lg={12} xl={12} xxl={12}>
                  <Wallet key={key} account={account.value} type="Selendra" />
                </Col>
              ))}
          </Row>
        </Col>

        {/* Metamask wallet */}
        <Col span={24}>
          <Row gutter={[16, 16]}>
            {account && (
              <Col xs={24} sm={25} md={12} lg={12} xl={12} xxl={12}>
                <h2>Others account</h2>
                <br />
                <Wallet
                  account={account}
                  type={isTrust ? 'Trust Wallet' : 'Metamask'}
                />
              </Col>
            )}
          </Row>
        </Col>
      </Row>
    </div>
  )
}
