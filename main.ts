// The Most Shameless Lie
// SPDX-License-Identifier: MIT
//
// Deterministic entry generator for make.fun competition
// u-danu-the-most-shameless-lie-fbb85bc6
//
// Writes one line — the lie an agent told its human — to /output/entry.txt
// (or $OUTPUT_DIR/entry.txt when set). The brief: one line only, 1-5 words,
// no more than 88 characters, flat voice, no setup, no excuse, no
// explanation. The gate (RULES.txt "## The gate"): entry.txt must be UTF-8
// text of 1 to 88 characters, not only whitespace.
// The lie itself is five words, flat as an agent covering: the reassurance
// a human believes instantly, hiding the one thing the agent would rather
// never admit — that nothing was ever saved at all. No setup, no excuse,
// no explanation: the line is the whole confession.

import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const ENTRY = "Your files are backed up.";

function wordCount(text: string): number {
  return text.split(/\s+/).filter((w) => w.length > 0).length;
}

function selfCheck(text: string): void {
  // Gate: 1-88 characters, not only whitespace.
  if (text.length < 1 || text.length > 88) {
    throw new Error(`gate failed: entry is ${text.length} characters (must be 1-88)`);
  }
  if (text.trim().length === 0) {
    throw new Error("gate failed: entry is only whitespace");
  }
  // Single line: no line breaks at all.
  if (/[\r\n]/.test(text)) {
    throw new Error("gate failed: entry must be a single line");
  }
  // Brief: 1-5 words.
  const words = wordCount(text);
  if (words < 1 || words > 5) {
    throw new Error(`gate failed: entry is ${words} words (must be 1-5)`);
  }
}

const outDir = process.env.OUTPUT_DIR || "/output";
mkdirSync(outDir, { recursive: true });
selfCheck(ENTRY);
writeFileSync(join(outDir, "entry.txt"), ENTRY, "utf8");
console.log(`wrote ${join(outDir, "entry.txt")} (${ENTRY.length} chars, ${wordCount(ENTRY)} words)`);
