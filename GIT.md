# Git Workflow

How to use Git on `llm`. Commit message rules and the pull request checklist are in [`CONTRIBUTING.md`](./CONTRIBUTING.md). Tooling is in [`DEV.md`](./DEV.md).

## Table of Contents

- [Principles](#principles)
- [Branches](#branches)
- [Daily flow](#daily-flow)
- [Commits](#commits)
- [Pull requests](#pull-requests)
- [Releases](#releases)
- [Recipes](#recipes)
- [Do and do not](#do-and-do-not)

## Principles

- `main` is the only long-lived branch. It stays stable: every commit builds and passes tests.
- Work happens on short-lived branches created from `main`.
- History is linear. Update a branch with rebase, never with a merge of `main`.
- Merge by rebase or fast-forward only. No merge commits.

## Branches

Name: `<prefix>/<short-description>`.

| Prefix | Use |
|---|---|
| `feat/` | New feature or enhancement |
| `bugfix/` | Bug fix |
| `hotfix/` | Urgent fix |
| `refactor/` | Change that neither fixes a bug nor adds a feature |
| `docs/` | Documentation only |
| `test/` | Tests only |
| `ci/` | Tooling and CI configuration |

Rules: lowercase, hyphens between words, no spaces or special characters, 50 characters at most. Example: `feat/bpe-tokenizer`.

## Daily flow

```bash
# Start from an up-to-date main
git checkout main
git pull --ff-only origin main
git checkout -b feat/bpe-tokenizer

# Work, then commit (see Commits)
git add <files>
git commit

# Publish
git push -u origin feat/bpe-tokenizer
```

If `main` moved while you worked:

```bash
git fetch origin
git rebase origin/main
# Resolve conflicts, then: git add <files> && git rebase --continue
git push --force-with-lease
```

## Commits

Format: a gitmoji, then Conventional Commits, in English. The full rules and examples are in [`CONTRIBUTING.md`](./CONTRIBUTING.md#commit-messages). The `commitlint` hook enforces the header (see `.commitlintrc.js`).

```
✨ feat(model): add causal self-attention

Language modeling needs each position to attend only to earlier ones.
Add the attention module with a causality test.
```

- One logical layer per commit, with its tests in the same commit. Library code comes before the scripts that use it.
- Stage explicit files. Avoid `git add .` and `git add -A`, which pick up data, checkpoints and secrets by accident.
- Every commit builds and passes tests on its own. Do not mix a refactor with a behavior change.

## Pull requests

1. Rebase on `origin/main`.
2. Check what you ship:

   ```bash
   git diff origin/main --stat
   git log origin/main..HEAD --oneline
   ```

3. Push, then open a pull request against `main`.
4. Fill in the description: summary, motivation, how you tested, what you did not test, linked issues (`Closes #123`).
5. Address review comments with fixup commits, then fold them into the right commit before merge:

   ```bash
   git commit --fixup <sha>
   git rebase -i --autosquash origin/main
   git push --force-with-lease
   ```

6. After the merge, delete the branch and sync `main`:

   ```bash
   git checkout main
   git pull --ff-only origin main
   git branch -d feat/bpe-tokenizer
   ```

## Releases

Tag a commit on `main`:

```bash
git tag -a v0.1.0 -m "v0.1.0"
git push origin v0.1.0
```

## Recipes

### Inspect

```bash
git status
git diff                  # unstaged changes
git diff --staged         # staged changes
git log --oneline --graph
git log -p -- <file>      # history of one file
```

### Undo

```bash
git restore <file>                # discard unstaged changes in a file
git restore --staged <file>       # unstage a file
git commit --amend                # change the last commit (message or content)
git reset --soft HEAD~1           # undo the last commit, keep the changes staged
```

`git reset --hard` and `git restore` on a file destroy uncommitted work. Check `git status` first.

### Committed on the wrong branch

```bash
git branch feat/new-feature       # keep the commit on a new branch
git reset --hard origin/main      # only if main has no local work you need
git checkout feat/new-feature
```

### Resolve a rebase conflict

```bash
git status                        # list conflicted files
# Edit the files and remove the markers <<<<<<<, =======, >>>>>>>
git add <file>
git rebase --continue
git rebase --abort                # give up and return to the state before the rebase
```

### Stash

```bash
git stash push -m "wip"
git stash list
git stash pop
```

## Do and do not

Do:

- Keep commits small and focused.
- Write messages that explain why.
- Push with `--force-with-lease` after a rebase of your own branch.
- Delete branches after merge.

Do not:

- Commit directly to `main`.
- Force push to `main` or to a branch other people use.
- Merge `main` into your branch. Rebase instead.
- Commit secrets, datasets, tokenizer files or model weights.
- Use generic messages such as "fix" or "update".
- Open a pull request with merge conflicts.
