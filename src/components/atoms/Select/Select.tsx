import React, { FC } from 'react'
import { IProps } from './types'
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select as MuiSelect,
  SelectChangeEvent,
} from '@mui/material'

const Select: FC<IProps> = ({ name, value, handleChange, options, label }) => {
  const onChange = (e: SelectChangeEvent) => handleChange(e.target.value)
  return (
    <FormControl>
      <InputLabel id={name}>{label}</InputLabel>
      <MuiSelect
        labelId={name}
        id={`select-${name}`}
        value={value}
        label="Age"
        onChange={onChange}
      >
        {options.map(({ value, label }) => (
          <MenuItem key={label} value={value}>
            {label}
          </MenuItem>
        ))}
      </MuiSelect>
    </FormControl>
  )
}

export default Select
