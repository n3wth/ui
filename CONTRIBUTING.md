# Contributing to n3wth/ui

This repository is optimized for AI-driven development. If you are an AI assistant (Gemini, Claude, or v0) being asked to use this library, please follow these guidelines:

## AI Instructions
1.  **Read the Rules**: Always consult \`.cursorrules\` for the latest design principles and technical constraints.
2.  **System Prompt**: For Google AI Studio, reference \`google-ai-studio-instructions.json\`.
3.  **Registry**: For v0/Shadcn, use the registry defined in \`registry.json\`.
4.  **Style Guide**: Adhere to the iOS-inspired, minimal, flat design aesthetic.
5.  **Components**: Prioritize using existing atoms and molecules in \`src/\`.

## Development
To add a new component:
1.  Create the file in \`src/atoms\`, \`src/molecules\`, or \`src/organisms\`.
2.  Run \`npm run registry:build\` to update the AI registry metadata.
3.  Ensure you export the component in \`src/index.ts\`.
