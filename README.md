<a id="readme-top"></a>

[![Contributors][contributors-shield]][contributors-url]
[![Forks][forks-shield]][forks-url]
[![Stargazers][stars-shield]][stars-url]
[![Issues][issues-shield]][issues-url]
[![project_license][license-shield]][license-url]
[![Tech][tech-shield]][tech-url]

<br />
<div align="center">
<h3 align="center">llm</h3>

  <p align="center">
    A decoder-only language model written from scratch in Python: tokenizer, data pipeline, transformer, training loop and text generation (status: design phase, nothing shipped)
    <br />
    <a href="./docs/index.md"><strong>Explore the docs »</strong></a>
    <br />
    <br />
    <a href="https://github.com/remiboivin021/llm/issues/new?labels=bug">Report Bug</a>
    &middot;
    <a href="https://github.com/remiboivin021/llm/issues/new?labels=enhancement">Request Feature</a>
  </p>
</div>

<!-- TABLE OF CONTENTS -->
<details>
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
      <ul>
        <li><a href="#built-with">Built With</a></li>
      </ul>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#prerequisites">Prerequisites</a></li>
        <li><a href="#installation">Installation</a></li>
      </ul>
    </li>
    <li><a href="#usage">Usage</a></li>
    <li><a href="#contributing">Contributing</a></li>
    <li><a href="#license">License</a></li>
  </ol>
</details>

<!-- ABOUT THE PROJECT -->
## About The Project

A GPT-style language model where every component is written by hand and tested in isolation. The goal is to understand and own the full stack, not to compete with existing models. The target is a small model (a few million parameters) trained end to end on one GPU or a CPU.

> **Repository status.** What follows describes **design decisions and a plan**, not shipped code. The repository currently contains only the directory layout: empty packages under `src/llm/` (`tokenizer`, `data`, `model`, `training`, `inference`, `eval`), an empty `tests/unit/`, and the placeholder folders `data/` and `checkpoints/`. There is no `pyproject.toml`, no training run, no test and no result, and no performance is claimed. Anything marked **planned** is not implemented.

**Architecture (planned)**

| Stage | Package | Content |
|---|---|---|
| Tokenizer | `src/llm/tokenizer/` | Byte-level BPE: vocabulary training, encode, decode |
| Data | `src/llm/data/` | Cleaning, tokenization into binary shards, dataset and batching |
| Model | `src/llm/model/` | Config dataclass, causal self-attention, MLP, normalization, positional encoding, transformer block, full model |
| Training | `src/llm/training/` | Loss, AdamW with weight decay, warmup and cosine schedule, checkpoints, training loop |
| Inference | `src/llm/inference/` | Greedy, temperature, top-k and top-p sampling |
| Evaluation | `src/llm/eval/` | Validation loss and perplexity |

- The model is a GPT-style decoder: token embedding, a stack of pre-norm blocks (causal self-attention, MLP), a final norm and a language-model head.
- Hyperparameters live in versioned config files, not in the code.

**Build pipeline (planned)**

1. Byte-level BPE tokenizer, with a round-trip test (`decode(encode(x)) == x`).
2. Data preparation and dataset.
3. Model: attention (with a causality test), block, full model.
4. Loss, optimizer and scheduler.
5. Training loop with exact resume from a checkpoint.
6. Sampling.
7. Evaluation: validation loss and perplexity.

**Goals and non-goals**

- Goals: implement each component by hand, keep every run reproducible (seed, config, library versions and commit recorded).
- Non-goals: matching the quality of large public models, distributed training, production serving.

**Known risks**

- Compute: training speed and memory on the target hardware are **not measured**. Model size is chosen after a first measurement.
- Data: the training corpus and its license are not chosen yet.
- Correctness: causality is the main invariant of the model. Changing a future token must not change the output at earlier positions.

<p align="right">(<a href="#readme-top">back to top</a>)</p>


### Built With

Badges below show the intended stack. Only Python is used today; the rest is **planned** and not yet declared (there is no `pyproject.toml`).

* [![Python][Python]][python-url]
* [![PyTorch][PyTorch]][pytorch-url] (tensors and autograd only: the model, tokenizer and training loop are written by hand)
* [![NumPy][NumPy]][numpy-url]

<p align="right">(<a href="#readme-top">back to top</a>)</p>


<!-- GETTING STARTED -->
## Getting Started

No setup or run procedure is available: there is no dependency file and no entry point. This section will be filled once a tested command exists.

### Prerequisites

To be defined (planned: Python 3.11 or later, PyTorch, optionally a GPU). Versions are not pinned.

### Installation

Not available (planned).

<p align="right">(<a href="#readme-top">back to top</a>)</p>


<!-- USAGE EXAMPLES -->
## Usage

Not available: no entry point is implemented (planned: training the tokenizer, preparing the data, training the model, generating text).

<p align="right">(<a href="#readme-top">back to top</a>)</p>


<!-- CONTRIBUTING -->
## Contributing

Contributions are welcome, especially on the parts marked **planned**. For a suggestion, open an issue with the `enhancement` label or a pull request.

1. Clone the project
2. Create a branch (`git checkout -b feat/my-feature`), prefixes: `feat/`, `bugfix/`, `refactor/`, `docs/`, `test/`, `ci/`
3. Commit using gitmoji + Conventional Commits, in English (`git commit -m "✨ feat(tokenizer): add byte-level BPE"`)
4. Push the branch (`git push origin feat/my-feature`)
5. Open a Pull Request

Update your branch with rebase, not merge.

For more info please read [CONTRIBUTING.md](./CONTRIBUTING.md), [DEV.md](./DEV.md) and [GIT.md](./GIT.md)

<p align="right">(<a href="#readme-top">back to top</a>)</p>

### Top contributors:

<a href="https://github.com/remiboivin021/llm/graphs/contributors">
  <img src="https://contrib.rocks/image?repo=remiboivin021/llm" alt="contrib.rocks image" />
</a>

<!-- LICENSE -->
## License

Distributed under the GNU GPL v3 license. See [`LICENSE`](./LICENSE) for more information.

<p align="right">(<a href="#readme-top">back to top</a>)</p>


[tech-shield]: https://img.shields.io/badge/python-3670A0?style=for-the-badge&logo=python&logoColor=ffdd54
[tech-url]: https://www.python.org/
[contributors-shield]: https://img.shields.io/github/contributors/remiboivin021/llm.svg?style=for-the-badge
[contributors-url]: https://github.com/remiboivin021/llm/graphs/contributors
[forks-shield]: https://img.shields.io/github/forks/remiboivin021/llm.svg?style=for-the-badge
[forks-url]: https://github.com/remiboivin021/llm/network/members
[stars-shield]: https://img.shields.io/github/stars/remiboivin021/llm.svg?style=for-the-badge
[stars-url]: https://github.com/remiboivin021/llm/stargazers
[issues-shield]: https://img.shields.io/github/issues/remiboivin021/llm.svg?style=for-the-badge
[issues-url]: https://github.com/remiboivin021/llm/issues
[license-shield]: https://img.shields.io/github/license/remiboivin021/llm.svg?style=for-the-badge
[license-url]: https://github.com/remiboivin021/llm/blob/main/LICENSE

[Python]: https://img.shields.io/badge/Python-3670A0?style=for-the-badge&logo=python&logoColor=ffdd54
[python-url]: https://www.python.org/
[PyTorch]: https://img.shields.io/badge/PyTorch-EE4C2C?style=for-the-badge&logo=pytorch&logoColor=white
[pytorch-url]: https://pytorch.org/
[NumPy]: https://img.shields.io/badge/NumPy-013243?style=for-the-badge&logo=numpy&logoColor=white
[numpy-url]: https://numpy.org/
