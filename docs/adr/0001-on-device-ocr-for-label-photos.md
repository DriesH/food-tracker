# On-device OCR for Label Photos

We read Label Photos with on-device OCR and our own parser, not a vision LLM. The app must cost nothing to run, and OCR is free and works offline. The price is a parser that turns raw text into Nutrition Facts for NL, FR, DE and EN labels, plus a required review step, because OCR misreads digits.

## Considered Options

- **Vision LLM (Claude Haiku 4.5 / Sonnet 5)**: much less parsing work and better on messy labels, but a small cost per photo and it needs internet. Rejected on cost.
- **OCR first, LLM as fallback**: still has a running cost. Rejected for the same reason.
