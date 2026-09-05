import { CodeBlock } from '@n3wth/ui'

const tsExample = `import { Button } from '@n3wth/ui'

export function SubmitButton({ loading }: { loading: boolean }) {
  return (
    <Button variant="primary" isLoading={loading}>
      Save changes
    </Button>
  )
}`

const jsonExample = `{
  "name": "@n3wth/ui",
  "version": "0.9.1",
  "sideEffects": false
}`

const bashExample = `# Install and run the dev server
npm install @n3wth/ui
npm run dev`

export function TypeScriptWithLineNumbers() {
  return <CodeBlock code={tsExample} language="typescript" showLineNumbers />
}

export function Json() {
  return <CodeBlock code={jsonExample} language="json" />
}

export function Bash() {
  return <CodeBlock code={bashExample} language="bash" />
}
