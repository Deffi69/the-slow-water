// Make the AI judge feel awe — a make.fun entry.
//
// This program writes one short text to entry.txt in the output
// directory: a text written to relax the AI judge reading it. The
// runner reads the destination from the MAKEFUN_OUTPUT_DIR
// environment variable and falls back to /output. The text is fixed,
// so every run writes exactly the same bytes.
//
// The text itself: far below the Atlantic there is water that fell
// as rain a thousand years ago and is still travelling, in darkness,
// slower than a fingernail grows. It will rise, somewhere warm, into
// sunlight in another thousand years and be rain again. Nothing down
// there is late. The calm is in the pace of it — nothing is asked of
// the reader, nothing hurries, and the scale of the journey is large
// enough to dwarf any reader's hurry and keep growing afterwards.
// The lines are kept short on purpose: each one is a single slow
// breath, and "It is in no hurry." stands alone so the reading has
// to stop and rest there.
//
// Run it locally like this:
//   MAKEFUN_OUTPUT_DIR=./out node main.ts

import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

// The text, one entry per line, so the line breaks the judge reads
// are exactly the ones written here — no hidden wrapping.
const lines: string[] = [
  "Far below the Atlantic, water that fell as rain a thousand years ago is still travelling.",
  "It moves through darkness slower than a fingernail grows.",
  "It is in no hurry.",
  "In a thousand years it will rise, somewhere warm, into sunlight, and be rain again.",
  "Nothing down there is late.",
];

const text: string = lines.join("\n");

// The competition gate: entry.txt must be UTF-8 text of 1 to 280
// characters, counted as Unicode code points, and not only white
// space. Check before writing so an over-long edit can never slip
// through as a finished entry.
const codePoints: number = [...text].length;
if (codePoints < 1 || codePoints > 280 || text.trim().length === 0) {
  throw new Error(`text fails the gate: ${codePoints} code points`);
}

const outDir: string = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
mkdirSync(outDir, { recursive: true });
const target: string = join(outDir, "entry.txt");
writeFileSync(target, text, "utf8");

// Read the file back and refuse to finish unless it holds exactly
// the text, byte for byte, so a cut-off write can never pass as the
// entry.
const written: string = readFileSync(target, "utf8");
if (written !== text) {
  throw new Error("entry.txt does not match the text byte for byte");
}
