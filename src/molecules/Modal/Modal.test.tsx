import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Modal, ModalHeader, ModalTitle, ModalDescription, ModalBody, ModalFooter, ModalCloseButton } from './Modal'

function renderModal(props: Partial<React.ComponentProps<typeof Modal>> = {}) {
  const onClose = props.onClose ?? vi.fn()
  return render(
    <Modal isOpen={true} onClose={onClose} {...props}>
      <ModalHeader>
        <ModalTitle>Test Modal</ModalTitle>
        <ModalCloseButton onClick={onClose} />
      </ModalHeader>
      <ModalBody>Modal body content</ModalBody>
      <ModalFooter>
        <button>Cancel</button>
        <button>Confirm</button>
      </ModalFooter>
    </Modal>
  )
}

describe('Modal', () => {
  it('renders dialog with role="dialog"', () => {
    renderModal()
    // The dialog is inside an aria-hidden backdrop, so we need hidden: true
    expect(screen.getByRole('dialog', { hidden: true })).toBeInTheDocument()
  })

  it('has aria-modal="true"', () => {
    renderModal()
    expect(screen.getByRole('dialog', { hidden: true })).toHaveAttribute('aria-modal', 'true')
  })

  it('renders children', () => {
    renderModal()
    expect(screen.getByText('Test Modal')).toBeInTheDocument()
    expect(screen.getByText('Modal body content')).toBeInTheDocument()
  })

  it('does not render when isOpen is false', () => {
    render(
      <Modal isOpen={false} onClose={vi.fn()}>
        <div>Hidden</div>
      </Modal>
    )
    expect(screen.queryByRole('dialog', { hidden: true })).toBeNull()
  })

  it('calls onClose on Escape key', async () => {
    const user = userEvent.setup()
    const onClose = vi.fn()
    renderModal({ onClose })
    await user.keyboard('{Escape}')
    expect(onClose).toHaveBeenCalledOnce()
  })

  it('does not call onClose on Escape when closeOnEscape is false', async () => {
    const user = userEvent.setup()
    const onClose = vi.fn()
    renderModal({ onClose, closeOnEscape: false })
    await user.keyboard('{Escape}')
    expect(onClose).not.toHaveBeenCalled()
  })

  it('applies ariaLabel when provided', () => {
    render(
      <Modal isOpen={true} onClose={vi.fn()} ariaLabel="Custom label">
        Content
      </Modal>
    )
    expect(screen.getByRole('dialog', { hidden: true })).toHaveAttribute('aria-label', 'Custom label')
  })

  it('has displayName', () => {
    expect(Modal.displayName).toBe('Modal')
  })
})

describe('ModalCloseButton', () => {
  it('renders with default aria-label "Close"', () => {
    render(<ModalCloseButton />)
    expect(screen.getByLabelText('Close')).toBeInTheDocument()
  })

  it('renders with custom aria-label', () => {
    render(<ModalCloseButton ariaLabel="Dismiss" />)
    expect(screen.getByLabelText('Dismiss')).toBeInTheDocument()
  })

  it('calls onClick when clicked', async () => {
    const user = userEvent.setup()
    const onClick = vi.fn()
    render(<ModalCloseButton onClick={onClick} />)
    await user.click(screen.getByLabelText('Close'))
    expect(onClick).toHaveBeenCalledOnce()
  })

  it('has displayName', () => {
    expect(ModalCloseButton.displayName).toBe('ModalCloseButton')
  })
})

describe('Modal sub-components displayNames', () => {
  it('ModalHeader', () => {
    expect(ModalHeader.displayName).toBe('ModalHeader')
  })

  it('ModalTitle', () => {
    expect(ModalTitle.displayName).toBe('ModalTitle')
  })

  it('ModalDescription', () => {
    expect(ModalDescription.displayName).toBe('ModalDescription')
  })

  it('ModalBody', () => {
    expect(ModalBody.displayName).toBe('ModalBody')
  })

  it('ModalFooter', () => {
    expect(ModalFooter.displayName).toBe('ModalFooter')
  })
})
