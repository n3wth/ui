import { useState } from 'react'
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '../../src/molecules/Card'
import { NavLink } from '../../src/molecules/NavLink'
import { CommandBox } from '../../src/molecules/CommandBox'
import { ThemeToggle } from '../../src/molecules/ThemeToggle'
import { Toast, ToastContainer } from '../../src/molecules/Toast'
import {
  Modal,
  ModalHeader,
  ModalTitle,
  ModalDescription,
  ModalBody,
  ModalFooter,
  ModalCloseButton,
} from '../../src/molecules/Modal'
import { Tabs, TabsList, TabsTab, TabsPanel } from '../../src/molecules/Tabs'
import { Button } from '../../src/atoms/Button'
import { Icon } from '../../src/atoms/Icon'
import type { Theme } from '../../src/hooks/useTheme'
import type { ModalSize } from '../../src/molecules/Modal'
import { DemoSection, DemoBlock } from './DemoSection'
import { CodeSnippet } from './CodeSnippet'

interface MoleculesSectionProps {
  theme: Theme
  onThemeToggle: () => void
}

export function MoleculesSection({ theme, onThemeToggle }: MoleculesSectionProps) {
  const [modalOpen, setModalOpen] = useState(false)
  const [modalSize, setModalSize] = useState<ModalSize>('md')
  const [showToast, setShowToast] = useState(false)
  const [toastVariant, setToastVariant] = useState<'default' | 'success' | 'error' | 'warning' | 'info'>('success')
  const [tabValue, setTabValue] = useState('tab1')
  const [tabVariant, setTabVariant] = useState<'underline' | 'pill'>('underline')

  return (
    <DemoSection id="molecules" title="Molecules" description="Combinations of atoms forming functional UI patterns.">
      {/* Cards */}
      <DemoBlock title="Card">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Default Card</CardTitle>
              <CardDescription>Basic border card</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-[var(--color-grey-400)]">
                Cards contain content and actions about a single subject.
              </p>
            </CardContent>
            <CardFooter>
              <Button size="sm" variant="secondary">Action</Button>
            </CardFooter>
          </Card>
          <Card variant="glass">
            <CardHeader>
              <CardTitle>Glass Card</CardTitle>
              <CardDescription>With backdrop blur</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-[var(--color-grey-400)]">
                Glass morphism variant with subtle transparency.
              </p>
            </CardContent>
          </Card>
          <Card variant="interactive">
            <CardHeader>
              <CardTitle>Interactive Card</CardTitle>
              <CardDescription>Hover to see effects</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-[var(--color-grey-400)]">
                Gradient border and shine sweep on hover.
              </p>
            </CardContent>
          </Card>
        </div>
        <CodeSnippet className="mt-4" code={`<Card variant="glass">
  <CardHeader>
    <CardTitle>Glass Card</CardTitle>
    <CardDescription>With backdrop blur</CardDescription>
  </CardHeader>
  <CardContent>Content here</CardContent>
  <CardFooter>
    <Button size="sm" variant="secondary">Action</Button>
  </CardFooter>
</Card>`} />
      </DemoBlock>

      {/* Tabs */}
      <DemoBlock title="Tabs">
        <div className="space-y-4">
          <div className="flex gap-2 items-center">
            <span className="text-xs text-[var(--color-grey-400)] mr-2">Variant:</span>
            {(['underline', 'pill'] as const).map((v) => (
              <button
                key={v}
                onClick={() => setTabVariant(v)}
                className={`px-2 py-1 text-xs rounded-full border transition-colors ${
                  tabVariant === v
                    ? 'bg-[var(--color-white)] text-[var(--color-bg)] border-[var(--color-white)]'
                    : 'bg-transparent text-[var(--color-grey-400)] border-[var(--glass-border)]'
                }`}
              >
                {v}
              </button>
            ))}
          </div>

          <div className="p-6 rounded-2xl border border-[var(--glass-border)] bg-[var(--glass-bg)]">
            <Tabs value={tabValue} onChange={setTabValue} variant={tabVariant}>
              <TabsList>
                <TabsTab value="tab1">Overview</TabsTab>
                <TabsTab value="tab2">Features</TabsTab>
                <TabsTab value="tab3">Settings</TabsTab>
              </TabsList>
              <TabsPanel value="tab1">
                <p className="text-sm text-[var(--color-grey-400)] py-4">
                  Overview content with animated indicator that follows the active tab.
                </p>
              </TabsPanel>
              <TabsPanel value="tab2">
                <p className="text-sm text-[var(--color-grey-400)] py-4">
                  Features: keyboard navigation (arrow keys), focus management, controlled/uncontrolled modes.
                </p>
              </TabsPanel>
              <TabsPanel value="tab3">
                <p className="text-sm text-[var(--color-grey-400)] py-4">
                  Settings panel. Tabs support both underline and pill variants.
                </p>
              </TabsPanel>
            </Tabs>
          </div>
        </div>
        <CodeSnippet className="mt-4" code={`<Tabs value={tab} onChange={setTab} variant="${tabVariant}">
  <TabsList>
    <TabsTab value="tab1">Overview</TabsTab>
    <TabsTab value="tab2">Features</TabsTab>
  </TabsList>
  <TabsPanel value="tab1">Overview content</TabsPanel>
  <TabsPanel value="tab2">Features content</TabsPanel>
</Tabs>`} />
      </DemoBlock>

      {/* Modal */}
      <DemoBlock title="Modal">
        <div className="space-y-4">
          <div className="flex flex-wrap gap-2 items-center">
            <span className="text-xs text-[var(--color-grey-400)] mr-2">Size:</span>
            {(['sm', 'md', 'lg'] as const).map((s) => (
              <button
                key={s}
                onClick={() => setModalSize(s)}
                className={`px-2 py-1 text-xs rounded-full border transition-colors ${
                  modalSize === s
                    ? 'bg-[var(--color-white)] text-[var(--color-bg)] border-[var(--color-white)]'
                    : 'bg-transparent text-[var(--color-grey-400)] border-[var(--glass-border)]'
                }`}
              >
                {s}
              </button>
            ))}
          </div>
          <Button variant="secondary" onClick={() => setModalOpen(true)}>
            Open Modal ({modalSize})
          </Button>
        </div>

        <Modal isOpen={modalOpen} onClose={() => setModalOpen(false)} size={modalSize}>
          <ModalHeader>
            <div>
              <ModalTitle>Modal Title</ModalTitle>
              <ModalDescription>This is a description of the modal content.</ModalDescription>
            </div>
            <ModalCloseButton onClick={() => setModalOpen(false)} />
          </ModalHeader>
          <ModalBody>
            <p className="text-sm text-[var(--color-grey-400)]">
              Modal with focus trap, Escape key close, backdrop click close,
              body scroll lock, and smooth enter/exit animations.
              Portal rendered to document.body.
            </p>
          </ModalBody>
          <ModalFooter>
            <Button variant="ghost" size="sm" onClick={() => setModalOpen(false)}>
              Cancel
            </Button>
            <Button variant="primary" size="sm" onClick={() => setModalOpen(false)}>
              Confirm
            </Button>
          </ModalFooter>
        </Modal>

        <CodeSnippet className="mt-4" code={`<Modal isOpen={open} onClose={() => setOpen(false)} size="${modalSize}">
  <ModalHeader>
    <div>
      <ModalTitle>Modal Title</ModalTitle>
      <ModalDescription>Description text</ModalDescription>
    </div>
    <ModalCloseButton onClick={() => setOpen(false)} />
  </ModalHeader>
  <ModalBody>Content here</ModalBody>
  <ModalFooter>
    <Button variant="ghost" onClick={() => setOpen(false)}>Cancel</Button>
    <Button onClick={() => setOpen(false)}>Confirm</Button>
  </ModalFooter>
</Modal>`} />
      </DemoBlock>

      {/* Toast */}
      <DemoBlock title="Toast">
        <div className="space-y-4">
          <div className="flex flex-wrap gap-2 items-center">
            <span className="text-xs text-[var(--color-grey-400)] mr-2">Variant:</span>
            {(['default', 'success', 'error', 'warning', 'info'] as const).map((v) => (
              <button
                key={v}
                onClick={() => setToastVariant(v)}
                className={`px-2 py-1 text-xs rounded-full border transition-colors ${
                  toastVariant === v
                    ? 'bg-[var(--color-white)] text-[var(--color-bg)] border-[var(--color-white)]'
                    : 'bg-transparent text-[var(--color-grey-400)] border-[var(--glass-border)]'
                }`}
              >
                {v}
              </button>
            ))}
          </div>
          <Button variant="secondary" onClick={() => setShowToast(true)}>
            Show Toast ({toastVariant})
          </Button>
        </div>

        {showToast && (
          <ToastContainer position="top-right">
            <Toast
              variant={toastVariant}
              title={`${toastVariant.charAt(0).toUpperCase() + toastVariant.slice(1)} Toast`}
              description="This is a toast notification with auto-dismiss."
              duration={4000}
              onDismiss={() => setShowToast(false)}
            />
          </ToastContainer>
        )}

        <CodeSnippet className="mt-4" code={`// Standalone
<Toast
  variant="${toastVariant}"
  title="Toast Title"
  description="Toast description"
  duration={5000}
  onDismiss={() => setShow(false)}
/>

// With useToast hook + Provider
const { toast } = useToast()
toast.${toastVariant === 'default' ? '' : toastVariant + '('}{ title: 'Done!', description: 'Action completed' }${toastVariant === 'default' ? '' : ')'}`} />
      </DemoBlock>

      {/* NavLink */}
      <DemoBlock title="NavLink">
        <div className="p-6 rounded-2xl border border-[var(--glass-border)] bg-[var(--glass-bg)] flex flex-wrap gap-6">
          <NavLink href="#" variant="underline" isActive>Active</NavLink>
          <NavLink href="#" variant="underline">Inactive</NavLink>
          <NavLink href="#" variant="pill">Pill</NavLink>
          <NavLink href="#" variant="pill" isActive>Active Pill</NavLink>
        </div>
        <CodeSnippet className="mt-4" code={`<NavLink href="/about" variant="underline" isActive>About</NavLink>
<NavLink href="/docs" variant="pill">Docs</NavLink>`} />
      </DemoBlock>

      {/* CommandBox */}
      <DemoBlock title="CommandBox">
        <div className="max-w-md">
          <CommandBox command="npm install @n3wth/ui" />
        </div>
        <CodeSnippet className="mt-4" code={`<CommandBox command="npm install @n3wth/ui" />`} />
      </DemoBlock>

      {/* ThemeToggle */}
      <DemoBlock title="ThemeToggle">
        <div className="flex gap-4 items-center">
          <ThemeToggle theme={theme} onToggle={onThemeToggle} size="sm" />
          <ThemeToggle theme={theme} onToggle={onThemeToggle} size="md" />
          <span className="text-sm text-[var(--color-grey-400)]">Current: {theme}</span>
        </div>
        <CodeSnippet className="mt-4" code={`const { theme, toggleTheme } = useTheme()
<ThemeToggle theme={theme} onToggle={toggleTheme} size="md" />`} />
      </DemoBlock>
    </DemoSection>
  )
}
