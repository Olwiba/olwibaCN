# Contributing

Thanks for your interest in contributing to `@olwiba/cn`. We're happy to have you here.

Please take a moment to review this document before submitting your first pull request. We also strongly recommend that you check for open issues and pull requests to see if someone else is working on something similar.

If you need any help, feel free to reach out to [@Olwiba](https://github.com/Olwiba).

## About this repository

This repository ships a single npm package: `@olwiba/cn`. It also doubles as a shadcn registry that consumers can copy components from directly.

- We use [Bun](https://bun.sh) for package management and scripts.
- We use [tsup](https://tsup.egoist.dev) to build the package.
- We use [Vite](https://vite.dev) + [TanStack Start](https://tanstack.com/start) for the docs site.
- We use [Fumadocs](https://fumadocs.dev) for documentation rendering.
- We use tag-driven GitHub Actions workflows for releases.

## Structure

This repository is structured as follows:

```
src
├── components
│   └── ui
├── demos
├── docs
├── hooks
├── lib
├── routes
└── styles
content
└── docs
public
└── r
registry.json
```

| Path                    | Description                                                                |
| ----------------------- | -------------------------------------------------------------------------- |
| `src/components/ui/`    | shadcn-style primitive components — the registry surface.                  |
| `src/demos/`            | Live preview components shown in the docs site.                            |
| `src/docs/`             | Source for shared docs shell components synced into `@olwiba/docs`.        |
| `src/hooks/`            | Shared React hooks.                                                        |
| `src/lib/`              | Utilities (`cn`, theme helpers, etc.).                                     |
| `src/routes/`           | TanStack Router file-based routes for the docs site.                       |
| `src/styles/`           | Exported CSS entrypoints (`theme.css`, `preset.css`).                      |
| `content/docs/`         | MDX documentation pages.                                                   |
| `registry.json`         | Source of truth for the shadcn registry.                                   |
| `public/r/*.json`       | Generated registry files served from `cn.olwiba.com/r/*.json`.             |

## Development

### Fork this repo

You can fork this repo by clicking the fork button in the top right corner of this page.

### Clone on your local machine

```bash
git clone https://github.com/your-username/olwibaCN.git
```

### Navigate to project directory

```bash
cd olwibaCN
```

### Create a new branch

```bash
git checkout -b my-new-branch
```

### Install dependencies

```bash
bun install
```

### Run the docs site

```bash
bun run web:dev
```

### Build the package

```bash
bun run build
```

### Build the docs site + registry assets

```bash
bun run web:build
```

### Type-check

```bash
bun run types:check
```

## Adding or Changing a Component

We use a registry system for developing components. The source of truth is `registry.json`, and `public/r/*.json` is generated from it.

When adding or modifying components, please ensure that:

1. You implement the component in `src/components/ui/<name>.tsx`.
2. You export it from `src/components/ui/index.ts` if package consumers should see it.
3. You add or update its entry in `registry.json`, including any new `registryDependencies` (other registry items it imports from).
4. You add or update its docs page under `content/docs/components/<name>.mdx`.
5. You add or update its demo under `src/demos/<name>.tsx`.
6. You run `bun run registry:build` and verify `public/r/<name>.json` reflects the changes.

## Documentation

The documentation lives in `content/docs/` and is written in [MDX](https://mdxjs.com). To preview it locally:

```bash
bun run web:dev
```

## Commit Convention

Before you create a Pull Request, please check whether your commits comply with
the commit conventions used in this repository.

When you create a commit we kindly ask you to follow the convention
`category(scope or module): message` in your commit message while using one of
the following categories:

- `feat / feature`: all changes that introduce completely new code or new
  features
- `fix`: changes that fix a bug (ideally you will additionally reference an
  issue if present)
- `refactor`: any code related change that is not a fix nor a feature
- `docs`: changing existing or creating new documentation (i.e. README, docs for
  usage of a lib or cli usage)
- `build`: all changes regarding the build of the software, changes to
  dependencies or the addition of new dependencies
- `test`: all changes regarding tests (adding new tests or changing existing
  ones)
- `ci`: all changes regarding the configuration of continuous integration (i.e.
  github actions, ci system)
- `chore`: all changes to the repository that do not fit into any of the above
  categories

  e.g. `feat(button): add new variant prop`

If you are interested in the detailed specification you can visit
https://www.conventionalcommits.org/ or check out the
[Angular Commit Message Guidelines](https://github.com/angular/angular/blob/22b96b9/CONTRIBUTING.md#-commit-message-guidelines).

## Requests for new components

If you have a request for a new component, please open a discussion or issue on GitHub. We'll be happy to help you out.

## Releases

Releases are tag-driven. The publish workflow runs automatically when a `v*` tag matching the `package.json` version is pushed.
