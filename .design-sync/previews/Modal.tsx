import {
  Modal,
  ModalHeader,
  ModalTitle,
  ModalDescription,
  ModalBody,
  ModalFooter,
  ModalCloseButton,
  Button,
} from '@n3wth/ui'

// Modal portals to document.body and renders as a fixed, centered overlay —
// isOpen is set true for every story since there's no interaction in a
// static capture; onClose is a no-op (nothing dispatches it here).
const noop = () => {}

export function Default() {
  return (
    <Modal isOpen onClose={noop} ariaLabel="Delete project">
      <ModalHeader>
        <div>
          <ModalTitle>Delete project</ModalTitle>
          <ModalDescription>This action cannot be undone.</ModalDescription>
        </div>
        <ModalCloseButton onClick={noop} />
      </ModalHeader>
      <ModalBody>
        <p style={{ fontSize: 14, color: 'var(--color-grey-400)', margin: 0 }}>
          Deleting <strong>marketing-site</strong> will permanently remove its repository,
          deploys, and environment variables.
        </p>
      </ModalBody>
      <ModalFooter>
        <Button size="sm" variant="ghost" onClick={noop}>
          Cancel
        </Button>
        <Button size="sm" variant="secondary" onClick={noop}>
          Delete project
        </Button>
      </ModalFooter>
    </Modal>
  )
}

export function SmallSize() {
  return (
    <Modal isOpen onClose={noop} size="sm" ariaLabel="Confirm sign out">
      <ModalHeader>
        <ModalTitle>Sign out?</ModalTitle>
      </ModalHeader>
      <ModalBody>
        <p style={{ fontSize: 14, color: 'var(--color-grey-400)', margin: 0 }}>
          You&apos;ll need to sign back in to access your dashboard.
        </p>
      </ModalBody>
      <ModalFooter>
        <Button size="sm" variant="ghost" onClick={noop}>
          Cancel
        </Button>
        <Button size="sm" variant="primary" onClick={noop}>
          Sign out
        </Button>
      </ModalFooter>
    </Modal>
  )
}

export function LargeSize() {
  return (
    <Modal isOpen onClose={noop} size="lg" ariaLabel="Invite teammates">
      <ModalHeader>
        <ModalTitle>Invite teammates</ModalTitle>
        <ModalCloseButton onClick={noop} />
      </ModalHeader>
      <ModalBody>
        <p style={{ fontSize: 14, color: 'var(--color-grey-400)', margin: 0 }}>
          Share this link with anyone you want to join the workspace. Anyone with the link can
          request to join.
        </p>
      </ModalBody>
      <ModalFooter>
        <Button size="sm" variant="secondary" onClick={noop}>
          Copy link
        </Button>
      </ModalFooter>
    </Modal>
  )
}
