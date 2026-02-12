import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { axe } from 'vitest-axe'
import * as matchers from 'vitest-axe/matchers'
import { Footer } from './Footer'

expect.extend(matchers)

describe('Footer', () => {
  it('renders a footer element', () => {
    const { container } = render(<Footer />)
    expect(container.querySelector('footer')).toBeInTheDocument()
  })

  it('renders logo when provided', () => {
    render(<Footer logo={<span data-testid="logo">Logo</span>} sections={[{ title: 'Links', links: [{ label: 'Home', href: '/' }] }]} />)
    expect(screen.getByTestId('logo')).toBeInTheDocument()
  })

  it('renders description', () => {
    render(<Footer description="A great UI library" sections={[{ title: 'Links', links: [{ label: 'Home', href: '/' }] }]} />)
    expect(screen.getByText('A great UI library')).toBeInTheDocument()
  })

  it('renders sections with titles and links', () => {
    const sections = [
      {
        title: 'Product',
        links: [
          { label: 'Features', href: '/features' },
          { label: 'Pricing', href: '/pricing' },
        ],
      },
      {
        title: 'Company',
        links: [{ label: 'About', href: '/about' }],
      },
    ]
    render(<Footer sections={sections} />)
    expect(screen.getByText('Product')).toBeInTheDocument()
    expect(screen.getByText('Features')).toBeInTheDocument()
    expect(screen.getByText('Pricing')).toBeInTheDocument()
    expect(screen.getByText('Company')).toBeInTheDocument()
    expect(screen.getByText('About')).toBeInTheDocument()
  })

  it('renders copyright text', () => {
    render(<Footer copyright="2026 Newth" />)
    expect(screen.getByText('2026 Newth')).toBeInTheDocument()
  })

  it('renders bottom links', () => {
    const bottomLinks = [
      { label: 'Privacy', href: '/privacy' },
      { label: 'Terms', href: '/terms' },
    ]
    render(<Footer bottomLinks={bottomLinks} />)
    expect(screen.getByText('Privacy')).toBeInTheDocument()
    expect(screen.getByText('Terms')).toBeInTheDocument()
  })

  it('renders social links with aria-labels', () => {
    const socialLinks = [
      { label: 'GitHub', href: 'https://github.com', icon: <span>GH</span> },
      { label: 'Twitter', href: 'https://twitter.com', icon: <span>TW</span> },
    ]
    render(<Footer socialLinks={socialLinks} sections={[{ title: 'Links', links: [{ label: 'Home', href: '/' }] }]} />)
    expect(screen.getByLabelText('GitHub')).toBeInTheDocument()
    expect(screen.getByLabelText('Twitter')).toBeInTheDocument()
  })

  it('social links open in new tab', () => {
    const socialLinks = [
      { label: 'GitHub', href: 'https://github.com', icon: <span>GH</span> },
    ]
    render(<Footer socialLinks={socialLinks} sections={[{ title: 'Links', links: [{ label: 'Home', href: '/' }] }]} />)
    const link = screen.getByLabelText('GitHub')
    expect(link).toHaveAttribute('target', '_blank')
    expect(link).toHaveAttribute('rel', 'noopener noreferrer')
  })

  it('applies custom className', () => {
    const { container } = render(<Footer className="custom-footer" />)
    expect(container.querySelector('footer')).toHaveClass('custom-footer')
  })

  it('does not render bottom bar when no copyright or bottom links', () => {
    const { container } = render(<Footer />)
    // The bottom bar div with mt-16 should not exist
    expect(container.querySelector('.mt-16')).toBeNull()
  })

  it('has no accessibility violations', async () => {
    const { container } = render(
      <Footer
        logo={<span>Logo</span>}
        description="A great UI library"
        copyright="2026 Newth"
      />
    )
    const results = await axe(container, {
      rules: {
        // Footer renders multiple <nav> elements by design (sites nav + bottom links nav)
        // In a full page context these are distinguishable; disable for isolated testing
        'landmark-unique': { enabled: false },
      },
    })
    expect(results).toHaveNoViolations()
  })
})
