type Option = {
  label: string
  value: string
}

export interface IProps {
  name: string
  value: string
  handleChange: (newValue: string) => void
  options: Option[]
  label: string
}
