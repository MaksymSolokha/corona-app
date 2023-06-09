import { ReactNode } from 'react'

import type { BoxProps } from '@mui/material'

export interface IProps extends BoxProps {
  children: ReactNode
}

export interface IDropDown {
  placeholder: string
  dropDownMenu: string[]
}
