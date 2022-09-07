import { Col, Row, Spin, Avatar } from 'antd'
import { Card } from 'globalComponents'
import { useFetchBalanceSEL } from '../hooks/useFetchBalanceSEL'
import { useSubstrateState, useSubstrate } from '../context/SubstrateContext'
import { createAvatar } from '@dicebear/avatars'
import * as style from '@dicebear/avatars-bottts-sprites'
import iconSwitch from 'assets/icons/switch.svg'
import ModalSelectAccount from './AccountSelector/ModalSelectAccount'
import { useState, useEffect } from 'react'
import { useAccounts } from '../hooks/useAccounts'
import { Button } from '../globalComponents'
import { CopyToClipboard } from 'react-copy-to-clipboard'
import { toast } from 'react-hot-toast'

const address = (addr) => (addr ? addr.address : '')

export default function WalletMenu({ children }) {
  const { allAccounts } = useAccounts()
  const { currentAccount, api } = useSubstrateState()
  const {
    setCurrentAccount,
    state: { keyring },
  } = useSubstrate()
  const [state] = useFetchBalanceSEL(address(currentAccount), 'Selendra', api)
  const [modal, setModal] = useState(false)
  const [keyringOptions, setKeyringOptions] = useState([])

  let avatar = createAvatar(style, {
    seed: address(currentAccount),
    dataUri: true,
    size: 64,
    backgroundColor: 'rgba(243, 119, 71, 0.21)',
    scale: 80,
  })

  //===getting keyring =======

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
    <div>
      <Row gutter={[16, 16]}>
        <Col xs={24} sm={24} md={16} lg={16} xl={18} xxl={18}>
          <Card.Auto>
            <Row>
              <Col span={22}>
                <h5 style={{ wordBreak: 'break-all' }}>
                  <CopyToClipboard text={address(currentAccount)}>
                    <Avatar
                      src={avatar}
                      size={35}
                      onClick={() => toast.success('Copied')}
                      style={{ cursor: 'pointer' }}
                    />
                  </CopyToClipboard>
                  &nbsp; &nbsp; &nbsp;
                  {address(currentAccount)
                    ? address(currentAccount)
                    : 'Please Create Selendra Wallet'}
                </h5>
              </Col>
              <Col span={2} onClick={() => setModal(true)}>
                {keyringOptions.length > 1 ? (
                  <Button.Switch icon={iconSwitch} title="" />
                ) : (
                  ''
                )}
              </Col>
            </Row>
            <Row justify="start">
              <Col span={8}>
                {state.loading ? (
                  <Spin />
                ) : (
                  <div>
                    <h1>
                      {state.freeBalance} <span>CDM</span>
                    </h1>
                    <p>Available</p>
                  </div>
                )}
              </Col>

              <Col span={8}>
                {state.loading ? (
                  <Spin />
                ) : (
                  <div>
                    <h1>
                      {state.freeBalance} <span>CDM</span>
                    </h1>
                    <p>Total</p>
                  </div>
                )}
              </Col>
            </Row>
          </Card.Auto>
          <br />
          <Card>{children}</Card>
        </Col>
        {/* <Col xs={0} sm={0} md={8} lg={8} xl={6} xxl={6}>
          <Card.Auto>
            <Row gutter={[8, 8]} align="middle">
              <Col span={24} onClick={() => setModal(true)}>
                {keyringOptions.length > 1 ? (
                  <ButtonConnect
                    className="home-create-wallet"
                    icon={iconSwitch}
                    title="Switch Account"
                  />
                ) : (
                  <ButtonConnect
                    className="home-create-wallet"
                    icon={wallet}
                    title="Current Account"
                  />
                )}
              </Col>
              <Col span={24}>
                <Row justify="center">
                  {state.loading ? (
                    <Spin />
                  ) : (
                    <div>
                      <h1>
                        {state.freeBalance} <span>CDM</span>
                      </h1>
                      <p>Available</p>
                    </div>
                  )}
                </Row>
              </Col>
              <Col span={24}>
                <Row justify="center">
                  {state.loading ? (
                    <Spin />
                  ) : (
                    <div>
                      <h1>
                        {state.freeBalance} <span>CDM</span>
                      </h1>
                      <p>Total</p>
                    </div>
                  )}
                </Row>
              </Col>
            </Row>
          </Card.Auto>
        </Col> */}
      </Row>
      <ModalSelectAccount
        accounts={keyringOptions}
        keyring={keyring}
        currentAccount={currentAccount}
        setCurrentAccount={setCurrentAccount}
        visible={modal}
        setVisible={setModal}
      />
    </div>
  )
}
