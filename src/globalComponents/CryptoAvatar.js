import { createAvatar } from '@dicebear/avatars'
import * as style from '@dicebear/avatars-bottts-sprites'
import { Avatar as AntAvatar } from 'antd'

export default function Avatar({ addrees, children, ...restProps }) {
  let generator = createAvatar(style, {
    seed: addrees,
    dataUri: true,
    size: 64,
    backgroundColor: 'rgba(243, 119, 71, 0.21)',
    scale: 80,
  })
  return (
    <AntAvatar {...restProps} src={generator}>
      {children}
    </AntAvatar>
  )
}
