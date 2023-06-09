import { FC } from 'react'

import { Container } from './styles'
import { IProps } from './types'

const Filters: FC<IProps> = ({ children, ...props }) => {
  return <Container {...props}>{children}</Container>
}

export default Filters
