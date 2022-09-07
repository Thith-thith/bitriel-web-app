import React, { useContext, useState, useEffect } from 'react'
import { Row, Col, message } from 'antd'
import { Card, Modal } from './../../globalComponents'
import metamask from '../../assets/metamask.png'
import trustwallet from '../../assets/trustwallet.png'
import ModalMetamask from '../ModalMetamask'
import { AccountContext } from '../../context/AccountContext'
import { useNavigate } from 'react-router-dom'

const ModalEVM = ({ connect, onCancel }) => {
  const { connectMetamask, connectTrust, account } = useContext(AccountContext)
  const navigate = useNavigate()
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    if (account) {
      navigate('/home')
      message.info("You've already connected!")
    }
  }, [account, navigate])

  function onConnect() {
    const { ethereum } = window
    ethereum ? connectMetamask() : setVisible(true)
  }

  return (
    <Modal visible={connect} onOk={onCancel} onCancel={onCancel}>
      <div className="connect__container2">
        <div>
          <center>
            <h2 className="connect__title">Connect Wallet</h2>
          </center>
          <br />
          <Row gutter={[80, 80]} justify="center">
            <Col>
              <center className="connect__wallet" onClick={onConnect}>
                <img src={metamask} alt="" width={48} />
                <p>Metamask</p>
              </center>
            </Col>
            <Col>
              <center className="connect__wallet" onClick={connectTrust}>
                <img src={trustwallet} alt="" width={48} />
                <p>Trust Wallet</p>
              </center>
            </Col>
          </Row>
        </div>
      </div>
      <ModalMetamask visible={visible} setVisible={setVisible} />
    </Modal>
  )
}

export default ModalEVM
