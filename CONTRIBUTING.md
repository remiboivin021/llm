# Contributing to llm

Thanks for considering a contribution. `llm` is a language model written from scratch in Python: tokenizer, data pipeline, transformer, training loop and text generation. The project is in its **design phase**: the directories exist but most of the code does not (see [`README.md`](./README.md)). Contributions on the parts marked **planned** are especially welcome.

## Table of Contents

- [Reporting Bugs](#reporting-bugs)
- [Suggesting Enhancements](#suggesting-enhancements)
- [Contributing Code](#contributing-code)
- [Pull Request Process](#pull-request-process)
- [Commit Messages](#commit-messages)

## Reporting Bugs

Check existing issues first, then open a new one. Include:

- Steps to reproduce, with the config and the seed.
- Observed and expected behavior.
- Environment: OS, Python version, PyTorch version, hardware (CPU or GPU and driver).

## Suggesting Enhancements

Open an issue that states the problem, the proposed change and the alternatives you considered. For a structural decision (architecture, tokenizer, data format), propose it in the issue before writing code.

## Contributing Code

1. Clone the repository and set up your environment with [`DEV.md`](./DEV.md).
2. Create a branch from `main`. Prefixes: `feat/`, `bugfix/`, `hotfix/`, `refactor/`, `docs/`, `test/`, `ci/`. Example: `feat/bpe-tokenizer`.
3. Make your change. Add or update tests and docs with it.
4. Commit following [Commit Messages](#commit-messages).
5. Update your branch with `git rebase origin/main`. Do not merge `main` into it.
6. Push with `git push --force-with-lease` if you rewrote history, then open a pull request against `main`.

Keep one logical layer per commit, with its tests in the same commit. Put library code before the scripts that use it.

## Pull Request Process

In the description, give the summary, the motivation, how you tested, and linked issues (`Closes #123`). Before you submit:

- [ ] The change is one topic.
- [ ] Pre-commit hooks pass (see [`DEV.md`](./DEV.md)).
- [ ] Tests exist for new behavior. Anything unimplemented is marked `NOT-IMPLEMENTED(#issue): reason`, with a linked issue.
- [ ] Docs are updated.
- [ ] The branch is rebased on `main`.
- [ ] You state what was **not** tested, and which dataset and split any reported metric comes from.

Merge: rebase or fast-forward only.

## Commit Messages

Format: a gitmoji, then Conventional Commits, in English.

```
<gitmoji> <type>(<scope>)!: <description>

<body: why, not how>

<footer: BREAKING CHANGE: ..., Refs: #123>
```

Example:

```
✨ feat(tokenizer): add byte-level BPE training

The project had no way to turn text into token ids. Add vocabulary
training, encode and decode, with a round-trip test.

Refs: #12
```

- Types: `feat`, `fix`, `perf`, `refactor`, `test`, `docs`, `build`, `ci`, `chore`, `revert`, `style`.
- Suggested scopes: `tokenizer`, `data`, `model`, `training`, `inference`, `eval`.
- Imperative mood, lowercase description, no final period.
- The `gitmoji` pre-commit hook helps you write the header (see [`DEV.md`](./DEV.md#checks-before-a-commit)). Run `git commit` without `-m` to use it.
- `commitlint` (`.commitlintrc.js`) requires an emoji character before the type (not a `:shortcode:`) and limits the header to 72 characters, gitmoji included.

## Questions?

Open an issue for discussion.
