import { useState } from 'react'
import { toast } from 'react-hot-toast'
import { Card } from 'globalComponents'
import { Button, Col, Row, Spin } from 'antd'
import { CopyToClipboard } from 'react-copy-to-clipboard'
import { useFetchBalanceSEL } from 'hooks/useFetchBalanceSEL'
import { useSubstrateState } from 'context/SubstrateContext'
import { shortenAddress } from 'utils'
import ModalAccount from './ModalAccount'
import sel from 'assets/sel-icon.svg'
import metamask from 'assets/metamask.png'
import trustwallet from 'assets/trustwallet.png'
import { getUsername } from '../../utils'

import Icon from '@ant-design/icons'
import { ReactComponent as Edit } from 'assets/icons/edit.svg'
import { ReactComponent as Copy } from 'assets/icons/copy-red.svg'
const EditIcon = (props) => <Icon component={Edit} {...props} />
const CopyIcon = (props) => <Icon component={Copy} {...props} />

export default function Wallet({ account, type }) {
  const { api } = useSubstrateState()
  const [state] = useFetchBalanceSEL(account, type, api)
  const [visible, setVisible] = useState(false)

  return (
    <div>
      <Card>
        <Row gutter={[12, 12]} justify="center" align="middle">
          <Col>
            <center>
              <img
                alt=""
                src={
                  type === 'Metamask'
                    ? metamask
                    : type === 'Selendra'
                    ? sel
                    : trustwallet
                }
                height={50}
                width={50}
                className="account-avatar"
              />
              <p>{type}</p>
            </center>
          </Col>

          <Col>
            <div>
              <h1 className="address-name">
                {getUsername(account)}{' '}
                {/* <span className="home-account-type"> ( {type} )</span> */}
              </h1>

              <Button
                type="link"
                icon={<EditIcon className="swicth-icon" />}
                style={{ paddingLeft: '0' }}
                onClick={() => setVisible(true)}
              >
                Settings
              </Button>
              <CopyToClipboard text={account}>
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
          </Col>
          <Col span={24}>
            <center>
              <p>{shortenAddress(account)}</p>
            </center>
          </Col>
          <Col span={24} className="home-buttons-options-container">
            <Spin spinning={state.loading} />
            {!state.loading && (
              <>
                <div className="home-token-list">
                  <p>Available</p>
                  <p>{state.freeBalance} CDM</p>
                </div>
                <div className="home-token-list">
                  <p>Locked</p>
                  <p>0 CDM</p>
                </div>
                <div className="home-token-list">
                  <p>Total</p>
                  <p>{state.freeBalance} CDM</p>
                </div>
              </>
            )}
          </Col>
        </Row>
      </Card>

      <ModalAccount
        visible={visible}
        setVisible={setVisible}
        account={account}
        type={type}
      />
    </div>
  )
}
