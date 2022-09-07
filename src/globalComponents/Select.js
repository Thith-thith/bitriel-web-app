import { Select as AntSelect } from 'antd'

export default function Select({ medium, children, ...restProps }) {
  return (
    <AntSelect
      className={`
    funan-select
    ${medium && 'funan-selectMedium'}
  `}
    >
      <div {...restProps}>
        <AntSelect.Option>{children}</AntSelect.Option>
      </div>
    </AntSelect>
  )
}
