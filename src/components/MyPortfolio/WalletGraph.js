import React from 'react'
import { Doughnut } from 'react-chartjs-2'
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js'
import { Card } from '../../globalComponents'
import sel from '../../assets/tokens/sel.png'
import busd from '../../assets/tokens/busd.png'
import usdt from '../../assets/tokens/usdt.png'
import dai from '../../assets/tokens/dai.png'
import eth from '../../assets/tokens/eth.png'
import bnb from '../../assets/tokens/bnb.png'
import TokenBalance from '../TokenBalance'

ChartJS.register(ArcElement, Tooltip, Legend)

const WalletGraph = ({ visible }) => {
  const tokens = [
    { title: 'SEL', value: '12000', icon: sel },
    { title: 'BUSD', value: '1000', icon: busd },
    { title: 'DAI', value: '200', icon: dai },
    { title: 'USDT', value: '2000', icon: usdt },
    { title: 'ETH', value: '8000', icon: eth },
    { title: 'BNB', value: '3000', icon: bnb },
  ]
  const inVisibleToken = [
    { title: 'SEL', value: '', icon: sel },
    { title: 'BUSD', value: '', icon: busd },
    { title: 'DAI', value: '', icon: dai },
    { title: 'USDT', value: '', icon: usdt },
    { title: 'ETH', value: '', icon: eth },
    { title: 'BNB', value: '', icon: bnb },
  ]

  const newLabels = []
  const tokenValues = []
  const result = tokens.filter((item) => newLabels.push(item.title))
  const vaules = tokens.filter((item) => tokenValues.push(item.value))

  const data = {
    labels: newLabels,
    datasets: [
      {
        label: '# of Votes',
        data: tokenValues,
        backgroundColor: [
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 99, 132, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(153, 102, 255, 0.2)',
          'rgba(255, 159, 64, 0.2)',
        ],
        borderColor: [
          'rgba(54, 162, 235, 1)',
          'rgba(255, 99, 132, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)',
        ],
        borderWidth: 1,
      },
    ],
  }

  const VisibleToken = () => {
    return (
      <div>
        {tokens.map((token) => (
          <TokenBalance
            image={token.icon}
            TokenName={token.title}
            balance={token.value}
            loading={false}
          />
        ))}
      </div>
    )
  }

  const InVisibleToken = () => {
    return (
      <div>
        {inVisibleToken.map((token) => (
          <TokenBalance
            image={token.icon}
            TokenName={token.title}
            balance={token.value}
            loading={false}
          />
        ))}
      </div>
    )
  }

  return (
    <Card.Auto>
      <div className="graph-container">
        <Doughnut data={data} />
      </div>
      {/* <div className="home-buttons-options-container">
        {visible ? <VisibleToken /> : <InVisibleToken />}
      </div> */}
    </Card.Auto>
  )
}

export default WalletGraph
