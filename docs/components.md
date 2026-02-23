# Components

All components are organized using atomic design: atoms (primitives), molecules (compound), and organisms (layouts).

```tsx
import { Button, Card, Nav, useTheme } from '@n3wth/ui'
```

## Atoms

### Button

Interactive button with variants, responsive sizing, and loading state.

```tsx
<Button variant="primary" size="lg">Submit</Button>
<Button variant="glass" isLoading>Saving...</Button>
<Button variant="ghost" leftIcon={<Icon name="plus" />}>Add item</Button>
<Button asChild><a href="/page">Link button</a></Button>
<Button size={{ base: 'sm', md: 'md', lg: 'lg' }}>Responsive</Button>
```

| Prop | Type | Default | Description |
|---|---|---|---|
| `variant` | `'primary' \| 'secondary' \| 'ghost' \| 'glass'` | `'primary'` | Visual style |
| `size` | `'sm' \| 'md' \| 'lg' \| { base?, md?, lg? }` | `'md'` | Size or responsive object |
| `isLoading` | `boolean` | `false` | Show spinner, disable button |
| `leftIcon` | `ReactNode` | - | Icon before label |
| `rightIcon` | `ReactNode` | - | Icon after label |
| `asChild` | `boolean` | `false` | Render as child element (e.g. `<a>`) |
| `touchTarget` | `boolean` | `false` | Ensure 44px minimum (WCAG 2.5.5) |

### Badge

Semantic label pill.

```tsx
<Badge variant="sage">Active</Badge>
<Badge variant="coral" size="sm">Error</Badge>
```

| Prop | Type | Default | Description |
|---|---|---|---|
| `variant` | `'default' \| 'sage' \| 'coral' \| 'mint' \| 'gold' \| 'outline'` | `'default'` | Color variant |
| `size` | `'sm' \| 'md'` | `'md'` | Text size |

### Input

Text input with icon and error support.

```tsx
<Input placeholder="Search..." leftIcon={<Icon name="search" />} />
<Input variant="glass" error="Required field" />
```

| Prop | Type | Default | Description |
|---|---|---|---|
| `variant` | `'default' \| 'glass'` | `'default'` | Visual style |
| `inputSize` | `'sm' \| 'md' \| 'lg'` | `'md'` | Input height |
| `leftIcon` | `ReactNode` | - | Icon on the left |
| `rightIcon` | `ReactNode` | - | Icon on the right |
| `error` | `boolean \| string` | - | Error state; string shows message below |
| `labelId` | `string` | - | Accessible label ID |

### Icon

Renders icons from the iconoir-react library.

```tsx
<Icon name="check" size="md" />
<Icon name="github" size={24} />
```

| Prop | Type | Default | Description |
|---|---|---|---|
| `name` | `IconName` | required | Icon identifier |
| `size` | `'xs' \| 'sm' \| 'md' \| 'lg' \| 'xl' \| number` | `'md'` | Icon size |

**Available icons:** `arrow-right`, `arrow-left`, `arrow-up`, `arrow-down`, `chevron-right`, `chevron-left`, `chevron-down`, `chevron-up`, `check`, `x`, `copy`, `search`, `menu`, `sun`, `moon`, `external`, `github`, `terminal`, `code`, `sparkles`, `plus`, `minus`, `settings`, `user`, `heart`, `star`, `mail`, `calendar`, `clock`, `bell`, `home`, `folder`, `file`, `trash`, `edit`, `eye`, `eye-off`, `lock`, `unlock`, `link`, `external-link`, `download`, `upload`, `refresh`, `filter`, `sort`, `grid`, `list`, `more-horizontal`, `more-vertical`, `info`, `warning`, `success`, `error`

### Switch

Accessible toggle control.

```tsx
<Switch checked={enabled} onChange={setEnabled} label="Enable feature" />
```

| Prop | Type | Default | Description |
|---|---|---|---|
| `checked` | `boolean` | - | Controlled state |
| `defaultChecked` | `boolean` | - | Uncontrolled initial state |
| `onChange` | `(checked: boolean) => void` | - | Change callback |
| `disabled` | `boolean` | `false` | Disable interaction |
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` | Switch size |
| `label` | `string` | - | Accessible label (aria-label) |

### Avatar

Image with fallback initials.

```tsx
<Avatar src="/photo.jpg" alt="Jane" size="lg" />
<Avatar fallback="JD" size="md" />
```

| Prop | Type | Default | Description |
|---|---|---|---|
| `src` | `string` | - | Image URL |
| `alt` | `string` | - | Alt text |
| `fallback` | `string` | - | Fallback text when image fails |
| `size` | `'xs' \| 'sm' \| 'md' \| 'lg' \| 'xl'` | `'md'` | Avatar size |

### Progress

Horizontal progress bar.

```tsx
<Progress value={65} variant="success" />
```

| Prop | Type | Default | Description |
|---|---|---|---|
| `value` | `number` | required | Current value (0-100) |
| `max` | `number` | `100` | Maximum value |
| `variant` | `'default' \| 'success' \| 'warning' \| 'error'` | `'default'` | Color variant |

### Tooltip

Hover/focus tooltip.

```tsx
<Tooltip content="More info" position="top">
  <Button variant="ghost">Hover me</Button>
</Tooltip>
```

| Prop | Type | Default | Description |
|---|---|---|---|
| `content` | `ReactNode` | required | Tooltip content |
| `position` | `'top' \| 'bottom' \| 'left' \| 'right'` | `'top'` | Placement |
| `children` | `ReactNode` | required | Trigger element |

### Skeleton

Loading placeholder with shimmer animation.

```tsx
<Skeleton className="h-4 w-48" />
<CardSkeleton />
```

### CodeBlock

Syntax-highlighted code display with copy button.

```tsx
<CodeBlock code="npm install @n3wth/ui" language="bash" />
```

### AnimatedText

GSAP-powered character-by-character text reveal. Requires `gsap` peer dependency.

```tsx
<AnimatedText text="Hello World" stagger={0.03} delay={0.2} />
```

### Other atoms

- **Label** - Styled `<label>` element
- **Textarea** - Styled `<textarea>` with auto-resize support
- **Separator** - Horizontal or vertical divider
- **Shape** - SVG geometric shapes (circle, square, triangle, diamond, hexagon, semicircle, arc, pill, star) with pattern fills and responsive sizing
- **Character** - Playful SVG character illustrations with configurable expression and accessories
- **SpeechBubble** - Dialogue bubble for Character component
- **ScrollIndicator** - Animated scroll-down indicator
- **HamburgerIcon** - Animated hamburger/close menu icon
- **NoiseOverlay** - Subtle grain texture overlay

## Molecules

### Card

Compound card component with sub-components.

```tsx
<Card variant="glass" padding="lg">
  <CardHeader>
    <CardTitle>Title</CardTitle>
    <CardDescription>Subtitle text</CardDescription>
  </CardHeader>
  <CardContent>Body content here</CardContent>
  <CardFooter>
    <Button>Action</Button>
  </CardFooter>
</Card>
```

| Prop | Type | Default | Description |
|---|---|---|---|
| `variant` | `'default' \| 'glass' \| 'interactive'` | `'default'` | Card style |
| `padding` | `'none' \| 'sm' \| 'md' \| 'lg'` | `'md'` | Internal padding |

**Sub-components:** `CardHeader`, `CardTitle` (accepts `as` prop for heading level), `CardDescription`, `CardContent`, `CardFooter`

### Modal

Portal-rendered modal dialog with focus trap, scroll lock, and keyboard handling.

```tsx
const [open, setOpen] = useState(false)

<Modal isOpen={open} onClose={() => setOpen(false)} size="md">
  <ModalHeader>
    <ModalTitle>Confirm action</ModalTitle>
    <ModalCloseButton onClick={() => setOpen(false)} />
  </ModalHeader>
  <ModalBody>Are you sure?</ModalBody>
  <ModalFooter>
    <Button variant="secondary" onClick={() => setOpen(false)}>Cancel</Button>
    <Button>Confirm</Button>
  </ModalFooter>
</Modal>
```

| Prop | Type | Default | Description |
|---|---|---|---|
| `isOpen` | `boolean` | required | Open state |
| `onClose` | `() => void` | required | Close callback |
| `size` | `'sm' \| 'md' \| 'lg' \| 'full'` | `'md'` | Modal width |
| `closeOnBackdropClick` | `boolean` | `true` | Close when clicking backdrop |
| `closeOnEscape` | `boolean` | `true` | Close on Escape key |
| `ariaLabel` | `string` | - | Accessible label |

**Sub-components:** `ModalHeader`, `ModalTitle`, `ModalDescription`, `ModalBody`, `ModalFooter`, `ModalCloseButton`

### Tabs

Tabbed interface with animated indicator.

```tsx
<Tabs defaultValue="tab1" variant="underline">
  <TabsList>
    <TabsTab value="tab1">Overview</TabsTab>
    <TabsTab value="tab2">Details</TabsTab>
  </TabsList>
  <TabsPanel value="tab1">Overview content</TabsPanel>
  <TabsPanel value="tab2">Details content</TabsPanel>
</Tabs>
```

| Prop | Type | Default | Description |
|---|---|---|---|
| `value` | `string` | - | Controlled active tab |
| `defaultValue` | `string` | - | Initial active tab (uncontrolled) |
| `onChange` | `(value: string) => void` | - | Tab change callback |
| `variant` | `'underline' \| 'pill'` | `'underline'` | Indicator style |

**Keyboard navigation:** Arrow keys, Home, End

### Accordion

Expandable content sections.

```tsx
<Accordion type="single" collapsible>
  <AccordionItem value="item1">
    <AccordionTrigger>Section 1</AccordionTrigger>
    <AccordionContent>Content 1</AccordionContent>
  </AccordionItem>
  <AccordionItem value="item2">
    <AccordionTrigger>Section 2</AccordionTrigger>
    <AccordionContent>Content 2</AccordionContent>
  </AccordionItem>
</Accordion>
```

| Prop | Type | Default | Description |
|---|---|---|---|
| `type` | `'single' \| 'multiple'` | `'single'` | Allow one or many open |
| `value` | `string[]` | - | Controlled open items |
| `defaultValue` | `string[]` | - | Initial open items |
| `onChange` | `(value: string[]) => void` | - | Change callback |
| `collapsible` | `boolean` | `false` | Allow closing all items (single mode) |

### Toast

Notification toasts. Requires `ToastProvider` wrapper.

```tsx
// App root
<ToastProvider maxToasts={5} position="top-right">
  <App />
</ToastProvider>

// In any component
const { toast } = useToast()

toast.success({ title: 'Saved', description: 'Changes saved.' })
toast.error({ title: 'Error', description: 'Something went wrong.' })
toast.warning({ title: 'Warning', description: 'Check your input.' })
toast.info({ title: 'Info', description: 'New version available.' })
```

| Provider Prop | Type | Default | Description |
|---|---|---|---|
| `maxToasts` | `number` | `5` | Maximum visible toasts |
| `position` | `'top-right' \| 'top-left' \| 'bottom-right' \| 'bottom-left'` | `'top-right'` | Toast position |

### Dropdown

Custom select dropdown.

```tsx
<Dropdown>
  <DropdownTrigger>Options</DropdownTrigger>
  <DropdownMenu>
    <DropdownItem onClick={() => {}}>Edit</DropdownItem>
    <DropdownItem onClick={() => {}}>Delete</DropdownItem>
  </DropdownMenu>
</Dropdown>
```

### Other molecules

- **CommandBox** - Command palette / search UI with filtered options
- **ThemeToggle** - Sun/moon toggle button for dark/light mode
- **NavLink** - Styled anchor with active state and underline animation
- **MobileDrawer** - Slide-in drawer for mobile navigation
- **ErrorBoundary** - React error boundary with fallback UI
- **CompositeShape** - Combine multiple `Shape` components with preset configurations

## Organisms

### Nav

Fixed navigation bar with responsive mobile menu and scroll-based visibility.

```tsx
<Nav
  logo="My App"
  logoHref="/"
  items={[
    { label: 'Features', href: '#features' },
    { label: 'Docs', href: '/docs' },
    { label: 'GitHub', href: 'https://github.com/...', external: true },
  ]}
  theme={theme}
  onThemeToggle={toggleTheme}
  fixed
  hideOnScroll
  showThemeToggle
/>
```

| Prop | Type | Default | Description |
|---|---|---|---|
| `logo` | `ReactNode` | - | Logo content |
| `logoHref` | `string` | `'/'` | Logo link |
| `items` | `NavItem[]` | - | Navigation links |
| `theme` | `'dark' \| 'light'` | - | Current theme |
| `onThemeToggle` | `() => void` | - | Theme toggle callback |
| `showThemeToggle` | `boolean` | `true` | Show theme toggle button |
| `fixed` | `boolean` | `false` | Fixed position at top |
| `hideOnScroll` | `boolean` | `false` | Hide on scroll down, show on scroll up |

**NavItem:** `{ label: string, href: string, isActive?: boolean, external?: boolean }`

### Hero

Page hero section with badge, gradient text, and CTAs.

```tsx
<Hero
  badge="v1.0"
  title="Build something great"
  description="A design system for modern apps."
  ctas={[
    { label: 'Get Started', href: '/start' },
    { label: 'View Source', href: '/github', variant: 'secondary' },
  ]}
  align="center"
  size="large"
  gradient
/>
```

| Prop | Type | Default | Description |
|---|---|---|---|
| `badge` | `string` | - | Small pill above title |
| `title` | `ReactNode` | required | Hero heading |
| `description` | `ReactNode` | - | Subheading text |
| `ctas` | `HeroCTA[]` | - | Call-to-action buttons |
| `align` | `'left' \| 'center'` | `'center'` | Text alignment |
| `size` | `'default' \| 'large'` | `'default'` | Title size |
| `gradient` | `boolean` | `true` | Apply gradient text effect |

**HeroCTA:** `{ label: string, href: string, variant?: 'primary' \| 'secondary' }`

### Section

Content section wrapper with consistent container sizing.

```tsx
<Section id="features" size="lg" spacing="lg">
  <SectionHeader title="Features" description="What's included." />
  {/* Content */}
</Section>
```

| Prop | Type | Default | Description |
|---|---|---|---|
| `size` | `'sm' \| 'md' \| 'lg' \| 'full'` | `'lg'` | Max-width constraint |
| `spacing` | `'none' \| 'sm' \| 'md' \| 'lg'` | `'md'` | Vertical padding |
| `container` | `boolean` | `true` | Apply container max-width and padding |

### Footer

Site footer with optional rich layout.

```tsx
// Simple footer
<Footer currentSite="ui" />

// Rich footer
<Footer
  logo={<span className="font-display text-lg font-semibold">My App</span>}
  description="A design system for modern web apps."
  sections={[
    {
      title: 'Docs',
      links: [
        { label: 'Getting Started', href: '/docs' },
        { label: 'Components', href: '/docs/components' },
      ],
    },
  ]}
  socialLinks={[{ label: 'GitHub', href: 'https://github.com', icon: <Icon name="github" /> }]}
  copyright="2026 My App"
/>
```

| Prop | Type | Default | Description |
|---|---|---|---|
| `logo` | `ReactNode` | - | Logo (enables rich layout) |
| `description` | `string` | - | Below logo text |
| `sections` | `FooterSection[]` | - | Link columns |
| `socialLinks` | `Array<{label, href, icon}>` | - | Social media icons |
| `sites` | `FooterSite[]` | n3wth ecosystem | Site navigation bar |
| `currentSite` | `string` | - | Highlight current site |
| `legalLinks` | `FooterLink[]` | Terms/Privacy | Legal links |
| `copyright` | `string` | Auto-generated | Copyright text |
