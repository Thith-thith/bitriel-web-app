import React from 'react'
import './loading.css'
import { useLottie } from 'lottie-react'
import blockAnimation from '../../assets/block.json'

export default function Spin() {
  const options = {
    animationData: blockAnimation,
    loop: true,
  }
  const { View } = useLottie(options)
  return (
    // <div className="lds-ellipsis">
    //   <div></div>
    //   <div></div>
    //   <div></div>
    //   <div></div>
    // </div>
    <div className="loading-container">{View}</div>
  )
}
