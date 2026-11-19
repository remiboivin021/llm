# Developer Guide

How to work on `llm`.

> **Status.** The project is in its design phase. There is no build, no test suite and no entry point yet. This guide documents what exists today and marks the rest **planned**. It grows with the code.

> **Audience:** people modifying `llm`. For the project overview, read [`README.md`](./README.md).

## Table of contents

1. [Repository layout](#repository-layout)
2. [Prerequisites](#prerequisites)
3. [Setup](#setup)
4. [Build, run and test](#build-run-and-test)
5. [Checks before a commit](#checks-before-a-commit)
6. [Workflow](#workflow)
7. [Conventions](#conventions)

## Repository layout

```
llm/
├── src/llm/
│   ├── tokenizer/      # BPE (empty)
│   ├── data/           # preparation, dataset (empty)
│   ├── model/          # transformer (empty)
│   ├── training/       # loss, optimizer, scheduler, loop (empty)
│   ├── inference/      # sampling (empty)
│   └── eval/           # perplexity (empty)
├── tests/unit/         # mirrors src/llm/ (empty)
├── data/               # raw/, processed/, tokenizer/ (not versioned)
├── checkpoints/        # not versioned
├── .pre-commit-config.yaml
├── .commitlintrc.js
├── mkdocs.yml
└── LICENSE             # GNU GPL v3
```

Rule: a test for `src/llm/model/attention.py` lives in `tests/unit/model/test_attention.py`.

## Prerequisites

Not pinned yet. Planned: Python 3.11 or later, and PyTorch for tensors and autograd. The model, the tokenizer and the training loop are written by hand; no high-level model or trainer library is used. Versions are pinned in `pyproject.toml` when it exists.

## Setup

```bash
git clone <repository-url>
cd llm
```

No dependency installation is available yet: there is no `pyproject.toml`.

## Build, run and test

Not available (planned): train the tokenizer, prepare the data, train the model, generate text, run the tests. Add each command to this section in the same change that makes it work.

## Checks before a commit

`.pre-commit-config.yaml` defines the hooks: whitespace and file checks, `black`, `flake8` (with bugbear, simplify and cognitive-complexity plugins), `mypy`, `bandit`, `codespell`, `gitmoji` and `commitlint`. Tool settings are passed as hook arguments, so no `pyproject.toml` or `.flake8` is needed yet. The `gitmoji` and `commitlint` hooks need Node.js on your `PATH` (`default_language_version` uses the installed Node). Install the hooks with:

```bash
pip install pre-commit
pre-commit install   # installs the pre-commit, prepare-commit-msg and commit-msg hooks
```

On `git commit` without `-m`, the `gitmoji` hook opens a picker in the terminal: choose the gitmoji, type the title as `<type>(<scope>): <description>`, then the optional body. The hook does nothing without a terminal, and skips amend, merge and rebase. Its settings are in `.gitmojirc.json`.

Commit message rules are in [`CONTRIBUTING.md`](./CONTRIBUTING.md), and the commit header is enforced by `.commitlintrc.js`. A `pytest` hook is **planned**: add it in the same change that adds the first test and a `pyproject.toml`.

## Workflow

- Branch from `main`: `feat/`, `bugfix/`, `hotfix/`, `refactor/`, `docs/`, `test/`, `ci/`.
- Commit with a gitmoji and Conventional Commits, in English.
- Keep history linear: update with `git rebase origin/main`, push with `--force-with-lease`.
- Open a pull request against `main`. Merge by rebase or fast-forward only. Command recipes are in [`GIT.md`](./GIT.md).
- One commit per logical layer, with its tests in the same commit (code first, then the scripts that use it).
- Every commit builds and passes tests on its own, and mixes no refactor with a behavior change.

## Conventions

### Priority order

When principles conflict, apply this order:

1. **Correctness**: the code does what the requirement says, including failure modes. A silent numerical bug costs days of training.
2. **Reproducibility**: the same config and seed give the same result.
3. **Simplicity**: the simplest design that meets 1 and 2.
4. **Performance**: measure before optimizing.
5. **Reuse and elegance**: DRY, abstractions, generality.

### Clean code

- Name things by intent. Put the unit or the shape in the name or the docstring when it matters: `n_heads`, `context_length_tokens`, tensors documented as `(batch, seq, dim)`.
- Keep functions small, with one level of abstraction and few arguments. Keep McCabe complexity at 10 or less.
- Comment the why, not the what. Delete dead code and commented-out code. Git keeps history.
- Add type hints to public functions and data structures. Prefer dataclasses to loose dicts.
- Validate at the boundary (config, file formats, shapes) and fail fast on invalid input.
- No magic numbers. Name every constant and keep one source of truth for it (vocabulary size, special token ids, context length).

### YAGNI, KISS, DRY

- Build what the current step needs. No speculative options, plugin systems or generic frameworks.
- Prefer a plain function to a class hierarchy. Prefer explicit configuration to implicit behavior.
- Remove duplicated **knowledge** (a hyperparameter, a tensor layout, a special token id), not code that only looks alike. Extract an abstraction at the third occurrence.

### Structure

- **Single responsibility:** one module, one reason to change. Keep data, model, loss, optimizer, loop and logging in separate modules.
- **Config separate from code:** the model config is a dataclass in `model/config.py`. Values live in versioned files.
- **Thin scripts:** entry points read a config and call the library. They hold no logic worth testing.
- Prefer composition to inheritance.

### Errors and unimplemented behavior

- Unimplemented behavior fails loudly. Do not return a fake success or a placeholder value. Mark the spot with `NOT-IMPLEMENTED(#issue): reason` and open the issue in the same change.
- Never swallow an exception. Catch only what you can handle. Log or re-raise with context.
- Never load untrusted pickle files. Checkpoints and datasets come from known sources.

### Reproducibility

- Seed every source of randomness (Python, NumPy, PyTorch) and record the seed with each run.
- Keep hyperparameters in config files under version control, not hard-coded in scripts.
- Record the library versions, the config and the commit of every training run.
- A checkpoint stores model weights, optimizer state, scheduler state, step and RNG state, so a run resumes exactly.

### Tests

- Test behavior, not implementation. Use the Arrange, Act, Assert pattern.
- A bug fix comes with a regression test.
- Skipped tests for unimplemented behavior reference the issue.
- Tests are fast and use tiny models and tiny data. No test needs a GPU, a network or a real dataset.
- Invariants that need a test: attention causality, shape of every module, tokenizer round trip (`decode(encode(x)) == x`), loss decreases on a tiny overfit batch, resume from a checkpoint reproduces the next step.

### Results honesty

- Report the loss and perplexity with the dataset and the split they come from.
- Do not claim quality that no evaluation supports.
- Do not commit secrets, keys, datasets or model weights.
