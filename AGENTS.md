# TaskFlow Development Guidelines

## General Rules

- Use TypeScript.
- Prefer small and reusable components.
- Keep code simple and readable.
- Do not introduce new dependencies unless necessary.
- Do not modify unrelated files.
- Preserve existing functionality.
- Do not remove existing functionality without explicit approval.

## Before Coding

Before making changes:

1. Inspect the existing implementation.
2. Identify the files that need to be changed.
3. Explain the implementation plan.
4. Do not make changes until the plan is approved.

## During Coding

- Follow the existing project structure.
- Keep each component focused on one responsibility.
- Avoid unnecessary refactoring.
- Avoid changing working code unless it is required for the requested feature.

## After Coding

After making changes:

1. Run the appropriate tests.
2. Run `npm run build`.
3. Run lint if available.
4. Report any errors.
5. Summarize the changes made.

## Git

- Keep commits focused on one feature or change.
- Use clear commit messages.
- Do not commit unrelated changes.