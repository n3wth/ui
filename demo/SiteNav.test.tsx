import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router'
import { describe, it, expect } from 'vitest'
import { SiteNav } from './SiteNav'

describe('SiteNav', () => {
  it('renders GitHub as an icon link, not a hamburger', () => {
    render(
      <MemoryRouter>
        <SiteNav />
      </MemoryRouter>
    )

    const github = screen.getByRole('link', { name: 'GitHub' })
    expect(github).toBeInTheDocument()
    expect(github).toHaveAttribute('href', 'https://github.com/n3wth/ui')

    // No hamburger button present
    expect(
      screen.queryByRole('button', { name: /menu|hamburger|nav/i })
    ).not.toBeInTheDocument()
  })
})
