// Header format: "<gitmoji> <type>(<scope>)!: <description>", for example
// "✨ feat(tokenizer): add byte-level BPE training".
// The gitmoji is an emoji character, not a ":shortcode:".
module.exports = {
  extends: ["@commitlint/config-conventional"],
  parserPreset: {
    parserOpts: {
      headerPattern:
        /^\p{Extended_Pictographic}️?\s(\w+)(?:\(([^)]*)\))?!?: (.+)$/u,
      headerCorrespondence: ["type", "scope", "subject"],
    },
  },
  rules: {
    // Project rule: 72 characters, gitmoji included.
    "header-max-length": [2, "always", 72],
  },
};
