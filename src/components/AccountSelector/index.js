import Icon from '@ant-design/icons'
import { toast } from 'react-hot-toast'
import { Card } from 'globalComponents'
import { useState, useEffect } from 'react'
import { Button, Col, Row } from 'antd'
import { CopyToClipboard } from 'react-copy-to-clipboard'
import { getUsername, shortenAddress } from '../../utils'
import { useSubstrate } from '../../context/SubstrateContext'
import ButtonConnect from './ButtonConnect'
import CreateWallet from '../CreateWallet'
import RestoreWallet from '../RestoreWallet'
import ModalSelectAccount from './ModalSelectAccount'
import selendra from 'assets/sel-icon.svg'
import create from 'assets/icons/create-wallet-orange.svg'
import restore from 'assets/icons/restore.svg'

import { ReactComponent as Edit } from 'assets/icons/edit.svg'
import { ReactComponent as Copy } from 'assets/icons/copy-red.svg'
const EditIcon = (props) => <Icon component={Edit} {...props} />
const CopyIcon = (props) => <Icon component={Copy} {...props} />
const address = (addr) => (addr ? addr.address : '')

export default function AccountSelector({ keyringOptions }) {
  const {
    setCurrentAccount,
    state: { keyring, currentAccount },
  } = useSubstrate()
  const [modal, setModal] = useState(false)
  const [visible, setVisible] = useState(false)
  const [createWalletVisible, setCreateWalletVisible] = useState(false)

  const initialAddress =
    keyringOptions.length > 0 ? keyringOptions[0].value : ''

  // when all account got removed
  useEffect(() => {
    currentAccount && keyringOptions.length === 0 && setCurrentAccount('')
  }, [currentAccount, keyringOptions, setCurrentAccount])

  // Set the initial address
  useEffect(() => {
    // `setCurrentAccount()` is called only when currentAccount is null (uninitialized)
    !currentAccount &&
      initialAddress &&
      setCurrentAccount(keyring.getPair(initialAddress))
  }, [currentAccount, setCurrentAccount, keyring, initialAddress])

  return (
    <div>
      <Card>
        <Row
          gutter={[0, 12]}
          justify="center"
          align="middle"
          className="home-wallet-container"
        >
          <Col>
            <img
              alt=""
              src={selendra}
              height={70}
              width={70}
              className="account-avatar"
            />
            <div className="account-active" />
          </Col>
          <Col>
            {keyringOptions.length > 0 ? (
              <div>
                <h1 className="address-name">
                  {getUsername(address(currentAccount))}
                </h1>
                <Button
                  type="link"
                  icon={<EditIcon className="swicth-icon" />}
                  style={{ paddingLeft: '0' }}
                  onClick={() => setModal(true)}
                >
                  Switch
                </Button>
                <CopyToClipboard text={address(currentAccount)}>
                  <Button
                    type="link"
                    icon={<CopyIcon className="copy-icon" />}
                    style={{ paddingLeft: '0' }}
                    onClick={() => toast.success('Copied')}
                  >
                    Copy
                  </Button>
                </CopyToClipboard>
              </div>
            ) : (
              <p style={{ fontWeight: '500' }}>
                You don't have Selendra wallet yet.
              </p>
            )}
          </Col>
          <Col span={24}>
            <center>
              <p>{shortenAddress(address(currentAccount))}</p>
            </center>
          </Col>
          <Col span={24} className="home-buttons-options-container">
            <Row gutter={[24, 24]} justify="center">
              <Col onClick={() => setCreateWalletVisible(true)}>
                <ButtonConnect
                  className="home-create-wallet"
                  icon={create}
                  title="Create Wallet"
                />
              </Col>
              <Col onClick={() => setVisible(true)}>
                <ButtonConnect
                  className="home-restore-wallet"
                  icon={restore}
                  title="Restore Wallet"
                />
              </Col>
            </Row>
          </Col>
        </Row>
      </Card>

      <ModalSelectAccount
        accounts={keyringOptions}
        keyring={keyring}
        currentAccount={currentAccount}
        setCurrentAccount={setCurrentAccount}
        visible={modal}
        setVisible={setModal}
      />
      <RestoreWallet visible={visible} setVisible={setVisible} />
      <CreateWallet
        visible={createWalletVisible}
        setVisible={setCreateWalletVisible}
      />
    </div>
  )
}
