# next-starter

This is a simple and minimal starter project for Next.js with Bun.

It comes with TypeScript, as well as ESLint, Prettier, and Vitest, which are my go-to tools for linting, formatting, and testing TypeScript code.

## How to use

```bash
PROJECT_NAME="my-nextjs-project"

# Clone
git clone -b next-app --single-branch --depth 1 git@github.com:Merott/ts-starter.git $PROJECT_NAME
cd $PROJECT_NAME
git remote remove origin
git commit --amend -m "init: cloned from github.com/Merott/ts-starter/tree/next-app"

# Start
bun install
bun run dev

# open "http://localhost:3000"
```
