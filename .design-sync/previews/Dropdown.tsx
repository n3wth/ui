import { Dropdown } from '@n3wth/ui'

const options = [
  { value: 'design', label: 'Design' },
  { value: 'engineering', label: 'Engineering' },
  { value: 'marketing', label: 'Marketing' },
  { value: 'sales', label: 'Sales', disabled: true },
]

const wrap = { maxWidth: 260 }

export function Default() {
  return (
    <div style={wrap}>
      <Dropdown options={options} placeholder="Select a team" />
    </div>
  )
}

export function Selected() {
  return (
    <div style={wrap}>
      <Dropdown options={options} defaultValue="engineering" />
    </div>
  )
}

export function Multi() {
  return (
    <div style={wrap}>
      <Dropdown
        options={options}
        multi
        defaultValues={['design', 'marketing']}
        placeholder="Select teams"
      />
    </div>
  )
}

export function Searchable() {
  return (
    <div style={wrap}>
      <Dropdown options={options} searchable defaultValue="design" variant="glass" />
    </div>
  )
}

export function Disabled() {
  return (
    <div style={wrap}>
      <Dropdown options={options} defaultValue="design" disabled />
    </div>
  )
}
