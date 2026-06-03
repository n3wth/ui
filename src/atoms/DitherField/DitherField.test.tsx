import { render } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import { DitherField } from './DitherField'

describe('DitherField', () => {
  it('renders a canvas', () => {
    const { container } = render(<DitherField />)
    expect(container.querySelector('canvas')).toBeInTheDocument()
  })
})
