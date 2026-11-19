# llm

A decoder-only language model written from scratch in Python: tokenizer, data pipeline, transformer, training loop and text generation. The goal is to understand and own every component, not to compete with existing models.

!!! note "Status: design phase"
    The repository contains the directory layout only. There is no code, no test and no result yet. Pages for each component are added in the same change as the code they document.

## Goals

- Implement each component by hand and test it in isolation.
- Train a small model (a few million parameters) end to end on one GPU or a CPU.
- Keep every run reproducible: seed, config, library versions and commit are recorded.

Non-goals: matching the quality of large public models, distributed training, production serving.

## Planned components

| Stage | What it does |
|---|---|
| Tokenizer | Byte-level BPE: vocabulary training, encode, decode |
| Data | Cleaning, tokenization into binary shards, batching |
| Model | GPT-style decoder: causal self-attention, MLP, normalization, positional encoding |
| Training | Loss, AdamW, warmup and cosine schedule, checkpoints, training loop |
| Inference | Greedy, temperature, top-k and top-p sampling |
| Evaluation | Validation loss and perplexity |

The build order follows the table, from tokenizer to evaluation.
