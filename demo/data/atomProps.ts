import type { PropDefinition } from '../components/PropsTable'

export const buttonProps: PropDefinition[] = [
  {
    name: 'variant',
    type: "'primary' | 'secondary' | 'ghost' | 'glass'",
    defaultValue: "'primary'",
    description: 'Visual style variant of the button',
  },
  {
    name: 'size',
    type: "'sm' | 'md' | 'lg' | { base?: size; md?: size; lg?: size }",
    defaultValue: "'md'",
    description: 'Size of the button. Can be responsive object',
  },
  {
    name: 'children',
    type: 'ReactNode',
    required: true,
    description: 'Button content',
  },
  {
    name: 'isLoading',
    type: 'boolean',
    defaultValue: 'false',
    description: 'Shows loading spinner',
  },
  {
    name: 'leftIcon',
    type: 'ReactNode',
    description: 'Icon to display on the left',
  },
  {
    name: 'rightIcon',
    type: 'ReactNode',
    description: 'Icon to display on the right',
  },
  {
    name: 'touchTarget',
    type: 'boolean',
    defaultValue: 'false',
    description: 'Ensures 44px minimum touch target (WCAG 2.5.5)',
  },
  {
    name: 'disabled',
    type: 'boolean',
    description: 'Disables the button',
  },
]

export const badgeProps: PropDefinition[] = [
  {
    name: 'variant',
    type: "'default' | 'sage' | 'coral' | 'mint' | 'gold' | 'outline'",
    defaultValue: "'default'",
    description: 'Visual style variant of the badge',
  },
  {
    name: 'size',
    type: "'sm' | 'md'",
    defaultValue: "'sm'",
    description: 'Size of the badge',
  },
  {
    name: 'children',
    type: 'ReactNode',
    required: true,
    description: 'Badge content',
  },
]

export const inputProps: PropDefinition[] = [
  {
    name: 'variant',
    type: "'default' | 'glass'",
    defaultValue: "'default'",
    description: 'Visual style variant of the input',
  },
  {
    name: 'inputSize',
    type: "'sm' | 'md' | 'lg'",
    defaultValue: "'md'",
    description: 'Size of the input',
  },
  {
    name: 'leftIcon',
    type: 'ReactNode',
    description: 'Icon to display on the left',
  },
  {
    name: 'rightIcon',
    type: 'ReactNode',
    description: 'Icon to display on the right',
  },
  {
    name: 'error',
    type: 'boolean | string',
    description: 'Shows error state styling or error message',
  },
  {
    name: 'labelId',
    type: 'string',
    description: 'Associated label id for accessibility',
  },
]

export const iconProps: PropDefinition[] = [
  {
    name: 'name',
    type: 'IconName',
    required: true,
    description: 'Name of the icon to display',
  },
  {
    name: 'size',
    type: "'xs' | 'sm' | 'md' | 'lg' | 'xl'",
    defaultValue: "'md'",
    description: 'Size of the icon',
  },
  {
    name: 'color',
    type: 'string',
    description: 'Custom color for the icon',
  },
  {
    name: 'className',
    type: 'string',
    description: 'Additional CSS classes',
  },
]
