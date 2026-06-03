import { render } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import { MarkIdentity, MarkFork, MarkNodes, MarkShield, MarkCube, Marks } from './Marks'

describe('Marks', () => {
  it('renders each mark as an svg', () => {
    for (const Mark of [MarkIdentity, MarkFork, MarkNodes, MarkShield, MarkCube]) {
      const { container, unmount } = render(<Mark />)
      expect(container.querySelector('svg')).toBeInTheDocument()
      unmount()
    }
  })

  it('exposes a namespaced map', () => {
    expect(Marks.Identity).toBe(MarkIdentity)
    expect(Marks.Cube).toBe(MarkCube)
  })

  it('forwards size', () => {
    const { container } = render(<MarkIdentity size={48} />)
    expect(container.querySelector('svg')).toHaveAttribute('width', '48')
  })
})
