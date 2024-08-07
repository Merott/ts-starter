# ts-starter

This is a simple and minimal starter project for TypeScript with Bun.

I often build little tools to get stuff done or experiment with new ideas. This project provides a clean starting point for those kinds of quick TypeScript projects.

It comes with ESLint, Prettier, and Vitest, which are my go-to tools for linting, formatting, and testing TypeScript code.

## How to use

```bash
PROJECT_NAME="my-new-ts-project"

# Clone
git clone --depth 1 git@github.com:Merott/ts-starter.git $PROJECT_NAME
cd $PROJECT_NAME
git remote remove origin
git commit --amend -m "init: cloned from github.com/Merott/ts-starter"

# Start
bun install
bun start
```
