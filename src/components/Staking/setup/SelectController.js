import { Col, Row } from 'antd'
import { useAccounts } from 'hooks/useAccounts'
import { getUsername, shortenAddress } from 'utils'
import ErrorHandling from '../ErrorHandling'
import { CryptoAvatar, Card } from '../../../globalComponents'

const selectedStyle = {
  borderColor: '#03a9f4',
}

export default function SelectController({
  nominate,
  form,
  setForm,
  warning,
  error,
}) {
  const { allAccounts } = useAccounts()

  return (
    <Card>
      <h2>Set Controller Account</h2>
      <br />
      <Row gutter={[16, 8]}>
        {allAccounts.map((i, key) => (
          <Col span={8} key={key}>
            <div
              className="staking-controller "
              style={i === form.controller ? selectedStyle : {}}
              onClick={() =>
                setForm({
                  stash: form.stash,
                  controller: i,
                  payee: form.payee,
                  bond: form.bond,
                  nominate: nominate,
                })
              }
            >
              <center>
                <CryptoAvatar addrees={i} />
                <h3>{getUsername(i)}</h3>
                <p>{shortenAddress(i)}</p>
              </center>
            </div>
          </Col>
        ))}
        {/* Controller error */}
        <ErrorHandling warning={warning} error={error} />
      </Row>
    </Card>
  )
}
