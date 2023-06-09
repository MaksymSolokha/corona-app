import { FC, useState } from 'react'
import {
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
} from '@mui/material'
import { IDropDown } from './types.ts'

const DropDown: FC<IDropDown> = ({ placeholder, dropDownMenu }) => {
  const [dropDown, setDropDown] = useState<string>('')
  const handleChange = (event: SelectChangeEvent) => {
    setDropDown(event.target.value as string)
  }

  console.log(dropDown)

  return (
    <Box
      sx={{
        width: '120px',
      }}
    >
      <FormControl variant={'standard'} size={'small'} fullWidth>
        <InputLabel id="demo-simple-select-label">{placeholder}</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={dropDown}
          label="case"
          onChange={handleChange}
        >
          {dropDownMenu?.map((item) => (
            <MenuItem key={item} value={item}>
              {item}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  )
}

export default DropDown
