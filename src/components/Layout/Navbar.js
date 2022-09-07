import React, { useState } from 'react'
import { useContext } from 'react'
import { AccountContext } from '../../context/AccountContext'
import { Link } from 'react-router-dom'
import Button from '../../globalComponents/Button'
import ModalAccount from '../Wallet/ModalAccount'
import { useLocation } from 'react-router-dom'

const Navbar = () => {
  const { account, isTrust } = useContext(AccountContext)
  const [visible, setVisible] = useState(false)
  const location = useLocation()

  return (
    <>
      {location.pathname === '/portfolio' ||
      location.pathname === '/swap' ||
      location.pathname === '/earn' ? (
        <div className="connect-evm">
          {account ? (
            <Button.GradientBorder onClick={() => setVisible(true)} medium>
              Disconnect
            </Button.GradientBorder>
          ) : (
            <Link to="/connect">
              <Button.GradientBorder medium>Connect EVM</Button.GradientBorder>
            </Link>
          )}
        </div>
      ) : (
        <div className="connect-evm-2">
          {account ? (
            <Button.GradientBorder onClick={() => setVisible(true)} medium>
              Disconnect
            </Button.GradientBorder>
          ) : (
            <Link to="/connect">
              <Button.GradientBorder medium>Connect EVM</Button.GradientBorder>
            </Link>
          )}
        </div>
      )}

      <ModalAccount
        visible={visible}
        setVisible={setVisible}
        account={account}
        type={isTrust ? 'Trust Wallet' : 'Metamask'}
      />
    </>
  )
}

export default Navbar
